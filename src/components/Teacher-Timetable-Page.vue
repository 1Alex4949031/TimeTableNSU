<script setup>
import {useRoute} from 'vue-router';
import {onMounted, ref} from "vue";
import {getTeacherTimetable} from "@/js/get-timetable";
import {days, pairTimes} from "@/js/data-for-show";
import labSvg from '@/assets/images/lab.svg'
import pracSvg from '@/assets/images/prac.svg'
import lecSvg from '@/assets/images/lec.svg'

const route = useRoute();
const timetable = ref([]);
const teacherName = route.params.teacherName;

onMounted(async () => {
  timetable.value = await getTeacherTimetable(teacherName);
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
        <h1>Расписание преподавателя {{ teacherName }}</h1>
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
              <!--Можно будет упростить-->
              <img class="lesson-svg" v-if="item.pairType === 'lab'" :src="labSvg" alt="Lab">
              <img class="lesson-svg" v-else-if="item.pairType === 'prac'" :src="pracSvg" alt="Prac">
              <img class="lesson-svg" v-else :src="lecSvg" alt="Lec">
              <div class="class-cell-info">
                {{ item.subjectName }} <br>
                {{ item.room }} <br>
                {{ item.teacher }} <br>
                {{ item.pairType }} <br>
              </div>
            </div>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </b-col>
</template>

<style scoped>
.lesson-svg {
  position: absolute;
  width: 25px;
  height: 25px;
  right: 0;
  top: 0;
}

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
}

.schedule-table thead th {
  background-color: #f2f2f2;
}

.class-cell {
  position: relative;
  min-height: 60px;
}
</style>