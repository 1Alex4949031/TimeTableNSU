<script setup>
import router from "@/router/router";
import {useRoute} from 'vue-router';
import {onMounted, ref} from "vue";
import {getTeacherTimetable} from "@/js/get-timetable";
import {days, pairTimes} from "@/js/data-for-show";
import labSvg from '@/assets/images/lab.svg'
import pracSvg from '@/assets/images/prac.svg'
import lecSvg from '@/assets/images/lec.svg'

const isLoaded = ref(false);
const route = useRoute();
const timetable = ref([]);
const teacherName = route.params.teacherName;

onMounted(async () => {
  timetable.value = await getTeacherTimetable(teacherName);
  isLoaded.value = true
})

const getSchedule = (dayName, pairNumber) => {
  const dayNumber = days.indexOf(dayName) + 1;
  return timetable.value.filter(
      (item) => item.dayNumber === dayNumber && item.pairNumber === pairNumber
  );
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

const goToGroupTimetable = (groupNumber) => {
  router.push({path: `/${groupNumber}/table`});
};

const goToRoomTimetable = (roomNumber) => {
  router.push({path: `/rooms/${roomNumber}/table`});
};
</script>

<template>
  <b-col md="6" data-aos="fade-in" data-aos-duration="1800" data-aos-once="true">
    <b-col class="mt-4 ms-4 me-4">
      <h1>Расписание преподавателя {{ teacherName }}</h1>
    </b-col>
  </b-col>
  <b-col class="schedule-container ms-4 me-4 mt-4 mb-4"
         data-aos="fade-in" data-aos-duration="1800" data-aos-once="true">
    <h4 class="mt-1" v-if="!isLoaded">Загрузка...</h4>
    <h4 class="mt-1" v-else-if="timetable.length === 0">Похоже, такого преподавателя не существует!</h4>
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
              <img class="lesson-svg" :src="getLessonImage(item)" :alt="item.pairType">
              <div class="class-cell-info">
                {{ item.subjectName }} <br>
                <span v-for="group in item.groups.split(',')"
                      :key="group"
                      @click="goToGroupTimetable(group)"
                      class="group-link">
                  {{ group }}
                </span> <br>
                <span class="nav-room" @click="goToRoomTimetable(item.room)">
                    {{ item.room }}
                  </span> <br>
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

.group-link {
  cursor: pointer;
  margin-right: 10px;
}

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