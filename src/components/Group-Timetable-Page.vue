<script setup>
import {useRoute} from 'vue-router';
import {onMounted, ref} from "vue";
import {getGroupTimetable} from "@/js/get-timetable";
import {days, pairTimes} from "@/js/data-for-show";
import labSvg from '@/assets/images/lab.svg'
import pracSvg from '@/assets/images/prac.svg'
import lecSvg from '@/assets/images/lec.svg'
import router from "@/router/router";


const isLoaded = ref(false);
const route = useRoute();
const timetable = ref([]);
const groupNumber = route.params.group;

onMounted(async () => {
  timetable.value = await getGroupTimetable(groupNumber);
  isLoaded.value = true
})

const getSchedule = (dayName, pairNumber) => {
  const dayNumber = days.indexOf(dayName) + 1;
  return timetable.value.filter(
      (item) => item.dayNumber === dayNumber && item.pairNumber === pairNumber
  );
};

const goToTeacherTimetable = (teacher) => {
  router.push({path: `/teachers/${teacher}/table`});
};

const goToRoomTimetable = (roomNumber) => {
  router.push({path: `/rooms/${roomNumber}/table`});
};

const getLessonImage = (item) => {
  switch (item.pairType) {
    case 'lab':
      return labSvg;
    case 'prac':
      return pracSvg;
    default:
      return lecSvg;
  }
};

</script>

<template>
  <b-col md="6" data-aos="fade-in" data-aos-duration="1800" data-aos-once="true">
    <b-col class="mt-4 ms-4 me-4">
      <h1>Расписание группы {{ groupNumber }}</h1>
    </b-col>
  </b-col>
  <b-col class="schedule-container ms-4 me-4 mt-4 mb-4"
         data-aos="fade-in" data-aos-duration="1800" data-aos-once="true">
    <h4 class="mt-1" v-if="!isLoaded">Загрузка...</h4>
    <h4 class="mt-1" v-else-if="timetable === null">Похоже, такого расписания не существует!</h4>
    <table v-else class="schedule-table">
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
              <div class="class-cell-info" :class="{ 'has-border': getSchedule(day, pair).length >= 2 }">
                <img class="lesson-svg" :src="getLessonImage(item)" :alt="item.pairType">
                <div class="subject-info">
                  {{ item.subjectName }} <br>
                  <span class="nav-room" @click="goToRoomTimetable(item.room)">
                    {{ item.room }}
                  </span> <br>
                  <span class="nav-teacher" @click="goToTeacherTimetable(item.teacher)">
                    {{ item.teacher }}
                  </span> <br>
                </div>
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
.nav-room {
  cursor: pointer;
}

.nav-teacher {
  cursor: pointer;
}

.class-cell-info.has-border {
  margin-top: 5px;
  margin-bottom: 5px;
  border-bottom: 1px solid #ddd; /* Граница между предметами */
}

.subject-info {
  margin-right: 30px;
}

.lesson-svg {
  position: absolute;
  width: 25px;
  height: 25px;
  right: 0;
  top: 0;
}

.class-cell-info {
  position: relative;
}

.class-cell {
  min-height: 60px;
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

</style>