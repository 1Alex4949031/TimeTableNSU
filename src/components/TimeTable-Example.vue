<script setup>
import {ref} from "vue";

const daysOfWeek = ref(['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']);
const timeSlots = ref(['9:00', '10:50', '12:40', '14:30', '16:20', '18:10', '20:00']);
const schedule = ref({
  'Понедельник': {
    '9:00': {subject: 'Математика', classroom: '5050'},
    '10:50': {subject: 'Физика', classroom: '5012'},
    '12:40': {subject: 'Физ-ра', classroom: 'Спортзал'},
    '14:30': {subject: 'Английский', classroom: '4412'},
    '16:20': {subject: 'История', classroom: 'На улице'},
    '18:10': {subject: 'Физика', classroom: '5012'},
  },
  'Вторник': {
    '14:30': {subject: 'Английский', classroom: '4412'},
    '16:20': {subject: 'История', classroom: 'На улице'},
    '18:10': {subject: 'Физика', classroom: '5012'},
  },
  'Среда': {
    '10:50': {subject: 'Физика', classroom: '5012'},
    '12:40': {subject: 'Физ-ра', classroom: 'Спортзал'},
    '14:30': {subject: 'Английский', classroom: '4412'},
  },
  'Четверг': {
    '16:20': {subject: 'История', classroom: 'На улице'},
    '18:10': {subject: 'Физика', classroom: '5012'},
  },
  'Пятница': {
    '9:00': {subject: 'Математика', classroom: '5050'},
    '10:50': {subject: 'Физика', classroom: '5012'},
    '12:40': {subject: 'Физ-ра', classroom: 'Спортзал'},
    '14:30': {subject: 'Английский', classroom: '4412'},
    '16:20': {subject: 'История', classroom: 'На улице'},
    '18:10': {subject: 'Физика', classroom: '5012'},
  }
});

const getClassInfo = (day, time) => {
  return schedule.value[day]?.[time] || null;
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
        <td v-for="day in daysOfWeek" :key="day">
          <div class="class-cell">
            <div v-if="getClassInfo(day, timeSlot)">
              <span>{{ getClassInfo(day, timeSlot).subject }}</span><br>
              <span>{{ getClassInfo(day, timeSlot).classroom }}</span>
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

.class-cell {
  min-height: 60px;
}
</style>