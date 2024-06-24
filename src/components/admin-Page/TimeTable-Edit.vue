<script setup>
import {useRoute} from 'vue-router';
import {onMounted, onUnmounted, reactive, ref, computed} from "vue";
import {checkAllowed, getSelectedSub} from "@/js/edit-timetable";
import Multiselect from "@vueform/multiselect";
import {getAllowedOption, saveEditRequest} from "@/js/edit-implementing";
import labSvg from '@/assets/images/lab.svg'
import pracSvg from '@/assets/images/prac.svg'
import lecSvg from '@/assets/images/lec.svg'
import editSvg from "@/assets/images/edit.svg";
import LoaderCommon from "@/components/loaders/Loader-Common.vue";
import {connect, disconnect} from "@/js/socket";

const showLoader = ref(true);

const isEditOpen = ref(false);
const selectedLesson = ref()

const editPosition = ref({day: '', slot: ''})
const allowedOptions = ref([])
const teachers = ref([])
const teacher = ref("")
const group = ref()
const subject = ref("")
const allRooms = ref([])
const room = ref("")
const isAllowedMove = ref(true)
const errorStatus = ref(false)

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
      connect()
      console.log("Pair id:", getSelectedSub().id)
      allowedOptions.value = await getAllowedOption(getSelectedSub().id)
      if (allowedOptions.value === null) {
        errorStatus.value = true
      } else {
        const sub = getSelectedSub()

        const newSub = {
          subject: sub.subjectName,
          pairType: sub.pairType,
          room: sub.room,
          id: sub.id,
          teacher: sub.teacher,
          group: sub.groups,
          actual: true
        }
        console.log(newSub)
        const subMirror = {
          subject: sub.subjectName,
          room: sub.room,
          pairType: sub.pairType,
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
        checkAllowed(sub, allowedOptions, allowedArr, allRooms, teachers)
        showLoader.value = false;
      }
      //for (const sub of Object.values(selectedSubjects.value)) {


      // const subjects = await getAllTimetable(true)
      // allSub.value = {}
      // for (const sub of subjects) {
      //   allSub.value[sub.id] = sub;
      // }
    }
)
onUnmounted(() => {
  disconnect();
})
const getLessonImage = (pairType) => {
  switch (pairType) {
    case 'lab':
      return labSvg;
    case 'prac':
      return pracSvg;
    default:
      return lecSvg;
  }
};

const getBackgroundClass = (pairType) => {
  switch (pairType) {
    case 'lab':
      return 'lab-background';
    case 'prac':
      return 'prac-background';
    default:
      return 'lec-background';
  }
};


const route = useRoute()
const groupNumber = computed(() => route.params.group)

</script>

<template>
  <b-col md="12" data-aos="fade-in" data-aos-duration="1800" data-aos-once="true">
    <b-col class="mt-4 ms-4 me-4">
      <h1> Изменение пар группы {{ groupNumber }}</h1>
    </b-col>
  </b-col>
  <b-col class="schedule-container ms-4 me-4 mt-4 mb-4">
    <div class="loader-container" v-if="showLoader">
      <LoaderCommon/>
    </div>
    <b-col class="mb-4">
      <table class="schedule-table">
        <thead>
        <tr>
          <th>Время</th>
          <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(timeSlot, indexSlot) in timeSlots" :key="indexSlot" class="table-row">
          <th>{{ timeSlot }}</th>
          <td v-for="(day, indexDay) in daysOfWeek" :key="indexDay"
              @dragover.prevent="handleDragOver"
              @drop.prevent="handleDrop($event, day, timeSlot)">
            <div class="class-cell"
                 :class="{allowed: onMove && allowedArr[indexDay][indexSlot], noAllowed: onMove && !allowedArr[indexDay][indexSlot]}">
              <div v-for="lesson in getClassInfo(day, timeSlot)" :key="lesson.subject">
                <div
                    v-if="lesson.actual || getClassInfo(day,timeSlot).find(l => l.id === lesson.id && l.actual === true) === undefined"
                    class="class-cell-info"
                    :class="{actual : lesson.actual, previous: !lesson.actual, invalid : !isAllowedMove && lesson.actual}"
                    :draggable="lesson.actual"
                    @dragstart="handleDragStart($event, day, timeSlot, lesson)">
                  <img class="lesson-svg" :src="getLessonImage(lesson.pairType)" :alt="lesson.pairType">
                  <div class="subject-info" :class="getBackgroundClass(lesson.pairType)">
                    {{ lesson.subject }} <br>
                    <span class="nav-teacher">
                    {{ lesson.teacher }}
                  </span> <br>
                    <span class="nav-room">
                    {{ lesson.room }}
                  </span> <br>
                  </div>
                  <img
                      v-if="lesson.actual"
                      @click="editLesson(lesson)"
                      class="edit-icon"
                      :src="editSvg" alt="Edit"/>
                </div>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </b-col>
    <b-button class="custom-btn-blue" @click="saveEditServer()">Сохранить</b-button>
  </b-col>
  <transition enter-active-class="modal-enter-active"
              leave-active-class="modal-leave-active">
    <div class="edit-modal" v-if="isEditOpen">
      <b-container fluid="sm" class="my-4">
        <b-col class="d-flex flex-column justify-content-center">
          <h2 class="mb-4">Изменение пары</h2>
          <b-form>
            <b-form-group class="form-group" label="Преподователь" label-for="input-subject-teacher">
              <Multiselect
                  v-model="teacher"
                  :options="teachers"
              />
            </b-form-group>
            <!--              <b-form-group class="form-group" label="Группы" label-for="input-subject-groups">-->
            <!--                <Multiselect-->
            <!--                    v-model="group"-->
            <!--                    :options="allGroups"-->
            <!--                />-->
            <!--              </b-form-group>-->
            <!--              <b-form-group class="form-group" label="Предмет" label-for="input-subject-groups">-->
            <!--                <b-form-select v-model="subject" :options="allSubject" id="input-subject-groups"></b-form-select>-->
            <!--              </b-form-group>-->
            <b-form-group class="form-group" label="Список комнат">
              <Multiselect
                  v-model="room"
                  :options="allRooms"
              />
            </b-form-group>
          </b-form>
          <b-col class="buttons-edit">
            <b-button @click="isEditOpen = false" class="custom-btn-red">
              Отменить
            </b-button>
            <b-button @click="saveEdit()" class="custom-btn-green">
              Сохранить
            </b-button>
          </b-col>
        </b-col>
      </b-container>
    </div>
  </transition>
</template>

<style scoped>
.nav-teacher {
  font-weight: 400;
  font-size: 18px;
}

.nav-room {
  font-weight: 500;
  font-size: 15px;
}

.subject-info {
  border-radius: 10px;
  padding: 10px;
  color: rgba(0, 0, 0, 0.91);
  font-size: 19px;
  text-align: left;
  margin: 10px auto;
  font-weight: 600;
}

.lab-background {
  background-color: rgba(255, 168, 0, 0.2);
}

.prac-background {
  background-color: rgba(0, 117, 255, 0.2);
}

.lec-background {
  background-color: rgba(144, 238, 144, 0.2);
}

.loader-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1000;
}

.custom-btn-blue {
  background-color: #fff;
  color: black;
  border: 1px solid #ced4da;
  border-radius: 20px;
  width: 40%;
  font-size: 1rem;
  transition: background-color 0.5s ease;
}

.custom-btn-blue:hover {
  background-color: rgba(0, 113, 255, 0.8);
  color: white;
  border: 1px solid #fff;
}

.custom-btn-green {
  background-color: #fff;
  color: black;
  border: 1px solid #ced4da;
  border-radius: 20px;
  font-size: 1rem;
  transition: background-color 0.5s ease;
}

.custom-btn-green:hover {
  background-color: rgba(30, 236, 9, 0.8);
  color: white;
  border: 1px solid #fff;
}

.custom-btn-red {
  background-color: #fff;
  color: black;
  border: 1px solid #ced4da;
  border-radius: 20px;
  font-size: 1rem;
  transition: background-color 0.5s ease;
}

.custom-btn-red:hover {
  background-color: #FF5656;
  color: white;
  border: 1px solid #fff;
}

.schedule-container {
  position: relative;
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
  background-color: rgba(242, 242, 242, 0.5);
}

.class-cell-info {
  position: relative;
}

.class-cell {
  min-height: 60px;
  border-radius: 5px;
}

.allowed {
  border-radius: 10px;
  background-color: #b1fd6d;
}

.noAllowed {
  border-radius: 10px;
  background-color: rgba(197, 197, 197, 0.92);
}

.invalid {
  border-radius: 10px;
  background-color: #f15555 !important;
}

.actual {
  background-color: #ffffff;
}

.previous {
  border-radius: 10px;
  background-color: rgba(154, 149, 149, 0.53);
}

.edit-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 600px;
  background: rgba(255, 255, 255, 1);
  z-index: 1000;
  display: flex;
  align-content: start;
  overflow-y: auto;
  border: 1px solid #4b4f54;
  border-radius: 30px;
  padding: 20px;
  box-sizing: border-box;
}

@media (min-width: 768px) {
  .edit-modal {
    width: 600px;
  }
}

.lesson-svg {
  position: absolute;
  width: 25px;
  height: 25px;
  right: -8px;
  top: -8px;
}

.edit-icon {
  font-size: 16px;
  position: absolute;
  right: 5px;
  bottom: 10px;
}

.buttons-edit {
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
}
</style>