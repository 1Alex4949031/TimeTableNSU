<script setup>

import {onMounted, ref} from "vue";
import {allSub, checkAllowed, selectedSubjects} from "@/js/edit-timetable";
import {getAllTimetable} from "@/js/get-timetable";

const daysOfWeek = ref(['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']);
const timeSlots = ref(['9:00', '10:50', '12:40', '14:30', '16:20', '18:10', '20:00']);
const schedule = ref({
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
  return schedule.value[day]?.[time] || [];
};

const handleDragOver = event => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

const handleDragStart = (event, day, timeSlot, lesson) => {
  onMove.value = true
  checkAllowed(lesson.id, allowedArr)

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
  if (!schedule.value[toDay]) {
    schedule.value[toDay] = {};
  }
  if (!schedule.value[toDay][toTimeSlot]) {
    schedule.value[toDay][toTimeSlot] = [];
  }
  if (lesson) {
    schedule.value[toDay][toTimeSlot].push(lesson);
    const fromLessons = schedule.value[fromDay][fromTimeSlot];
    const lessonIndex = fromLessons.findIndex(l => l.subject === lesson.subject && l.classroom === lesson.classroom && l.id === lesson.id);
    if (lessonIndex > -1) {
      fromLessons.splice(lessonIndex, 1);
    }
  }
};

onMounted(async () => {
  for (const sub of Object.values(selectedSubjects.value)) {
    try {
      schedule.value[daysOfWeek.value[sub.dayNumber - 1]][timeSlots.value[sub.pairNumber-1]]
          .push({subject: sub.subjectName, classroom: sub.room, id: sub.id, teacher: sub.teacher})
    } catch (E) {
      schedule.value[daysOfWeek.value[sub.dayNumber - 1]][timeSlots.value[sub.pairNumber-1]] =
          [{subject: sub.subjectName, classroom: sub.room, id: sub.id, teacher: sub.teacher}]
    }
  }

  const subjects = await getAllTimetable(true)
  allSub.value = {}
  for (const sub of subjects) {
    allSub.value[sub.id] = sub;
  }
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
            <div v-for="lesson in getClassInfo(day, timeSlot)" :key="lesson.subject"
                 class="lesson"
                 :draggable="true"
                 @dragstart="handleDragStart($event, day, timeSlot, lesson)">
              <span>{{ lesson.subject }}</span><span>{{ lesson.teacher }}</span><br>
              <span>{{ lesson.classroom }}</span><span> {{ lesson.id }}</span>
            </div>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </b-col>
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
  background-color: #425e2b;
}
</style>