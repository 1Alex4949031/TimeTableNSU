<script setup>
import {useRoute} from 'vue-router';
import {onMounted, ref} from "vue";
import {getGroupTimetable} from "@/js/get-timetable";
import {days, pairTimes} from "@/js/data-for-show";

const route = useRoute();
const timetable = ref([]);
const groupNumber = route.params.group;

onMounted(async () => {
  timetable.value = await getGroupTimetable(groupNumber);
})

const getSchedule = (dayName, pairNumber) => {
  const dayNumber = days.indexOf(dayName) + 1;
  return timetable.value.filter(
      (item) => item.dayNumber === dayNumber && item.pairNumber === pairNumber
  );
};
</script>

<template>
  <b-row data-aos="fade-in" data-aos-duration="1300" data-aos-once="true">
    <b-col md="6">
      <b-col class="mt-4 ms-4 me-4">
        <h1>Расписание группы {{ groupNumber }}</h1>
      </b-col>
    </b-col>
  </b-row>
  <b-col class="schedule-container ms-4 me-4 mt-4 mb-4"
         data-aos="fade-in" data-aos-duration="1300" data-aos-once="true">
    <table class="schedule-table">
      <thead>
      <tr>
        <th>Время</th>
        <th v-for="day in days" :key="day">{{ day }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="pair in Object.keys(pairTimes).length" :key="pair">
        <td>{{ pairTimes[pair] }}</td>
        <td v-for="day in days" :key="day">
          <div class="class-cell">
            <div v-for="item in getSchedule(day, pair)" :key="item.id">
              {{ item.subjectName }} <br>
              {{ item.room }}
              {{ item.teacher }}
              {{ item.pairType }}
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