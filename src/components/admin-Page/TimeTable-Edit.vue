<script setup>

import {onMounted, reactive, ref} from "vue";
import {checkAllowed, selectedSubjects} from "@/js/edit-timetable";
import closeSvg from "@/assets/images/close.svg";
import Multiselect from "@vueform/multiselect";
import {getAllowedOption, saveEditRequest} from "@/js/edit-implementing";

const isEditOpen = ref(false);
const selectedLesson = ref()

const editPosition = ref({day: '', slot: ''})
const allowedOptions = ref([])
const teachers = ref([])
const teacher = ref("")
const allGroups = ref([])
const group = ref()
const allSubject = ref([])
const subject = ref("")
const allRooms = ref([])
const room = ref("")
const isAllowedMove = ref(true)

const daysOfWeek = ref(['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']);
const timeSlots = ref(['9:00', '10:50', '12:40', '14:30', '16:20', '18:10', '20:00']);
const schedule = reactive({
  'Понедельник': {},
  'Вторник': {},
  'Среда': {},
  'Четверг': {},
  'Пятница': {},
  'Суббота': {}
});
const onMove = ref(false)
const allowedArr = ref([
  [false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false],
  [false, true, false, false, false, false, false],
  [false, false, false, false, false, false, false],
  [false, false, false, false, false, true, false],
  [false, false, false, false, false, false, false]
])//[day] [slot]
const getClassInfo = (day, time) => {
  return schedule[day]?.[time] || [];
};
const handleDragOver = event => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};
const handleDragStart = (event, day, timeSlot, lesson) => {
  onMove.value = true

  const dragData = {day, timeSlot, lesson};
  event.dataTransfer.setData('text/plain', JSON.stringify(dragData));
  event.dataTransfer.effectAllowed = 'move';
};
const handleDrop = (event, day, timeSlot) => {
  onMove.value = false
  const data = JSON.parse(event.dataTransfer.getData('text/plain'));
  if (data && data.day && data.timeSlot) {
    moveClass(data.day, data.timeSlot, day, timeSlot, data.lesson);
  }
};
const moveClass = (fromDay, fromTimeSlot, toDay, toTimeSlot, lesson) => {
  if (!schedule[toDay]) {
    schedule[toDay] = {};
  }
  if (!schedule[toDay][toTimeSlot]) {
    schedule[toDay][toTimeSlot] = [];
  }
  if (lesson) {
    editPosition.value["day"] = toDay
    editPosition.value["slot"] = toTimeSlot
    schedule[toDay][toTimeSlot].push(lesson);
    const fromLessons = schedule[fromDay][fromTimeSlot];
    const lessonIndex = fromLessons.findIndex(l =>
        l.id === lesson.id && l.teacher === lesson.teacher && l.room === lesson.room &&
        l.subject === lesson.subject && l.room === lesson.room && l.actual === lesson.actual);
    if (lessonIndex > -1) {
      fromLessons.splice(lessonIndex, 1);
    }
  }
  isAllowedMove.value = checkAllowed(getEditSubject(), allowedOptions, allowedArr, allRooms, teachers)
};

function editLesson(lesson) {
  selectedLesson.value = lesson
  isEditOpen.value = true;

  teacher.value = lesson.teacher
  room.value = lesson.room
  subject.value = lesson.subject
  group.value = lesson.group

}

function saveEdit() {
  isEditOpen.value = false;
  selectedLesson.value.teacher = teacher.value
  selectedLesson.value.room = room.value
  selectedLesson.value.subject = subject.value
  selectedLesson.value.group = group.value
  isAllowedMove.value = checkAllowed(getEditSubject(), allowedOptions, allowedArr, allRooms, teachers)
}

function saveEditServer() {
  console.log("save")
  console.log(selectedSubjects.value)
  console.log(schedule[editPosition.value['day']][editPosition.value["slot"]].find(l => l.actual === true), editPosition.value)
  const newPairData = schedule[editPosition.value['day']][editPosition.value["slot"]].find(l => l.actual === true);
  saveEditRequest({
    subjectId: newPairData['id'],
    newRoom: newPairData["room"],
    newTeacherFullName: newPairData['teacher'],
    newDayNumber: daysOfWeek.value.indexOf(editPosition.value['day']) + 1,
    newPairNumber: timeSlots.value.indexOf(editPosition.value['slot']) + 1
  })
  // for (const day of daysOfWeek.value) {
  //   for (const slot of timeSlots.value) {
  //     console.log(day, slot, schedule[day].value ? [slot] : 1)
  //   }
  // }
}
function getEditSubject() {
  const newPairData = schedule[editPosition.value['day']][editPosition.value["slot"]].find(l => l.actual === true);
  newPairData["dayNumber"] = daysOfWeek.value.indexOf(editPosition.value['day']) + 1
  newPairData["pairNumber"] = timeSlots.value.indexOf(editPosition.value['slot']) + 1
  return newPairData
}

onMounted(async () => {
  // getTeachers(teachers)
  // allSubject.value = await getSubject()
  // const rawRoom = await getRoom()
  // allRooms.value = processRoom(rawRoom)
  // const rawGroup = await getGroups()
  // for (let x of rawGroup) {
  //   allGroups.value.push(x.groupNumber)
  // }
  allowedOptions.value = await getAllowedOption(selectedSubjects.value.id)
  console.log("allowed get", selectedSubjects.value, allowedOptions.value)

  const sub = selectedSubjects.value

  const newSub = {
    subject: sub.subjectName,
    room: sub.room,
    id: sub.id,
    teacher: sub.teacher,
    group: sub.groups,
    actual: true
  }
  const subMirror = {
    subject: sub.subjectName,
    room: sub.room,
    id: sub.id,
    teacher: sub.teacher,
    group: sub.groups,
    actual: false
  }
  try {
    editPosition.value["day"] = daysOfWeek.value[sub.dayNumber - 1]
    editPosition.value["slot"] = timeSlots.value[sub.pairNumber - 1]
    schedule[daysOfWeek.value[sub.dayNumber - 1]][timeSlots.value[sub.pairNumber - 1]]
        .push(newSub)
    schedule[daysOfWeek.value[sub.dayNumber - 1]][timeSlots.value[sub.pairNumber - 1]]
        .push(subMirror)
  } catch (E) {
    schedule[daysOfWeek.value[sub.dayNumber - 1]][timeSlots.value[sub.pairNumber - 1]] =
        [newSub]
    schedule[daysOfWeek.value[sub.dayNumber - 1]][timeSlots.value[sub.pairNumber - 1]]
        .push(subMirror)
  }

  console.log("allowed chechk")
  checkAllowed(selectedSubjects.value, allowedOptions, allowedArr, allRooms, teachers)

  //for (const sub of Object.values(selectedSubjects.value)) {


  // const subjects = await getAllTimetable(true)
  // allSub.value = {}
  // for (const sub of subjects) {
  //   allSub.value[sub.id] = sub;
  // }
})
</script>

<template>
  <b-col class="schedule-container ms-4 me-4 mt-4 mb-4">
    <table class="schedule-table">
      <thead>
      <tr>
        <th>Время</th>
        <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(timeSlot, indexSlot) in timeSlots" :key="indexSlot">
        <th>{{ timeSlot }}</th>
        <td v-for="(day, indexDay) in daysOfWeek" :key="indexDay"
            @dragover.prevent="handleDragOver"
            @drop.prevent="handleDrop($event, day, timeSlot)">
          <div class="class-cell" :class="{allowed: onMove && allowedArr[indexDay][indexSlot]}">
            <div v-for="lesson in getClassInfo(day, timeSlot)" :key="lesson.subject">
              <div v-if="lesson.actual"
                   class="lesson actual"
                   :class="{invalid : !isAllowedMove}"
                   :draggable="true"
                   @dragstart="handleDragStart($event, day, timeSlot, lesson)">
                <span>{{ lesson.subject }} </span><span>{{ lesson.teacher }}</span><br>
                <span>{{ lesson.room }} </span><span> {{ lesson.id }}</span>
                <button @click="editLesson(lesson)">edit</button>
              </div>
              <div
                  v-else-if="getClassInfo(day,timeSlot).find(l => l.id === lesson.id && l.actual === true) === undefined"
                  class="lesson previous">
                <span>{{ lesson.subject }} </span><span>{{ lesson.teacher }}</span><br>
                <span>{{ lesson.room }} </span><span> {{ lesson.id }}</span>
              </div>
            </div>
          </div>
        </td>
      </tr>
      </tbody>
      <b-button @click="saveEditServer()">Save</b-button>
    </table>
  </b-col>
  <transition enter-active-class="modal-enter-active"
              leave-active-class="modal-leave-active">
    <div class="edit-modal" v-if="isEditOpen">
      <b-button @click="isEditOpen = false" class="close-button">
        <b-img :src="closeSvg"></b-img>
      </b-button>
      <b-container fluid="sm" class="my-4">
        <b-row>
          <b-col md="6" class="d-flex flex-column justify-content-center">
            <h2 class="modal-title mb-4">Изменение пары</h2>
            <b-form>
              <b-form-group class="form-group" label="Преподователь" label-for="input-subject-teacher">
                <Multiselect
                  v-model="teacher"
                  :options="teachers"
              />
              </b-form-group>
              <b-form-group class="form-group" label="Группы" label-for="input-subject-groups">
                <Multiselect
                    v-model="group"
                    :options="allGroups"
                />
              </b-form-group>
              <b-form-group class="form-group" label="Предмет" label-for="input-subject-groups">
                <b-form-select v-model="subject" :options="allSubject" id="input-subject-groups"></b-form-select>
              </b-form-group>
              <b-form-group class="form-group" label="Список комнат">
                <Multiselect
                    v-model="room"
                    :options="allRooms"
                />
              </b-form-group>
            </b-form>
          </b-col>
        </b-row>
      </b-container>
      <b-button @click="saveEdit()" class="allowed">
        <b-img :src="closeSvg"></b-img>
      </b-button>
    </div>
  </transition>
</template>

<style scoped>
.schedule-container {
  overflow-x: auto;
}

.schedule-table {
  width: 100%;
  border-collapse: collapse;
}

.schedule-table th,
.schedule-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.schedule-table thead th {
  background-color: #f2f2f2;
}

.lesson {
  border: 1px solid #ced4da;
  margin-bottom: 5px;
}

.class-cell {
  min-height: 60px;
  display: flex;
  flex-direction: column;
}

.allowed {
  background-color: #8aee34;
}
.invalid {
  background-color: #f15555 !important;
}
.actual {
  background-color: #ffffff;
}

.previous {
  background-color: #a4a4a4;
}

.edit-modal {
  position: fixed;
  top: 50px;
  left: 60px;
  width: 80%;
  height: 80%;
  background: rgba(255, 255, 255, 1);
  z-index: 1000;
  display: flex;
  align-content: start;
  overflow-y: auto;
  border: 3px solid #4b4f54;
  border-radius: 10px;
}
</style>