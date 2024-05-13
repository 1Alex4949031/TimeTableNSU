<script setup>

import {ref} from "vue";

const daysOfWeek = ref(['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']);
const timeSlots = ref(['9:00', '10:50', '12:40', '14:30', '16:20', '18:10', '20:00']);
const schedule = ref({
  'Понедельник': {
    '9:00': [{subject: 'Математика', classroom: '5050'}],
    '10:50': [{subject: 'Физика', classroom: '5012'}],
    '12:40': [{subject: 'Физ-ра', classroom: 'Спортзал'}],
    '14:30': [{subject: 'Английский', classroom: '4412'}],
    '16:20': [{subject: 'История', classroom: 'На улице'}],
    '18:10': [{subject: 'Физика', classroom: '5012'}],
  },
  'Вторник': {
    '14:30': [{subject: 'Английский', classroom: '4412'}],
    '16:20': [{subject: 'История', classroom: 'На улице'}],
    '18:10': [{subject: 'Физика', classroom: '5012'}],
  },
  'Среда': {
    '10:50': [{subject: 'Физика', classroom: '5012'}],
    '12:40': [{subject: 'Физ-ра', classroom: 'Спортзал'}],
    '14:30': [{subject: 'Английский', classroom: '4412'}],
  },
  'Четверг': {
    '16:20': [{subject: 'История', classroom: 'На улице'}],
    '18:10': [{subject: 'Физика', classroom: '5012'}],
  },
  'Пятница': {
    '9:00': [{subject: 'Математика', classroom: '5050'}],
    '10:50': [{subject: 'Физика', classroom: '5012'}],
    '12:40': [{subject: 'Физ-ра', classroom: 'Спортзал'}],
    '14:30': [{subject: 'Английский', classroom: '4412'}],
    '16:20': [{subject: 'История', classroom: 'На улице'}],
    '18:10': [{subject: 'Физика', classroom: '5012'}],
  }
});
const getClassInfo = (day, time) => {
  return schedule.value[day]?.[time] || [];
};

const handleDragOver = event => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

const handleDragStart = (event, day, timeSlot, lesson) => {
  const dragData = {day, timeSlot, lesson};
  event.dataTransfer.setData('text/plain', JSON.stringify(dragData));
  event.dataTransfer.effectAllowed = 'move';
};

const handleDrop = (event, day, timeSlot) => {
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
    const lessonIndex = fromLessons.findIndex(l => l.subject === lesson.subject && l.classroom === lesson.classroom);
    if (lessonIndex > -1) {
      fromLessons.splice(lessonIndex, 1);
    }
  }
};

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
      <tr v-for="(timeSlot, index) in timeSlots" :key="index">
        <th>{{ timeSlot }}</th>
        <td v-for="day in daysOfWeek" :key="day"
            @dragover.prevent="handleDragOver"
            @drop.prevent="handleDrop($event, day, timeSlot)">
          <div class="class-cell">
            <div v-for="lesson in getClassInfo(day, timeSlot)" :key="lesson.subject"
                 class="lesson"
                 :draggable="true"
                 @dragstart="handleDragStart($event, day, timeSlot, lesson)">
              <span>{{ lesson.subject }}</span><br>
              <span>{{ lesson.classroom }}</span>
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

</style>