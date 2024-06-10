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

const getBackgroundClass = (item) => {
  switch (item.pairType) {
    case 'lab':
      return 'lab-background';
    case 'prac':
      return 'prac-background';
    default:
      return 'lec-background';
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
              <div class="class-cell-info" :class="{ 'has-border': getSchedule(day, pair).length >= 2 }">
                <img class="lesson-svg" :src="getLessonImage(item)" :alt="item.pairType">
                <div class="subject-info" :class="getBackgroundClass(item)">
                  {{ item.subjectName }} <br>
                  <span v-for="group in item.groups.split(',')"
                        :key="group"
                        @click="goToGroupTimetable(group)"
                        class="nav-group">
                  {{ group }}
                </span> <br>
                  <span class="nav-room" @click="goToRoomTimetable(item.room)">
                    {{ item.room }}
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
.lab-background {
  background-color: rgba(255, 168, 0, 0.2);
}

.prac-background {
  background-color: rgba(0, 117, 255, 0.2);
}

.lec-background {
  background-color: rgba(144, 238, 144, 0.2);
}


.class-cell-info.has-border {
  margin-top: 5px;
  margin-bottom: 5px;
  border-bottom: 1px solid #ddd;
}


.lesson-svg {
  position: absolute;
  width: 25px;
  height: 25px;
  right: -8px;
  top: -8px;
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

.subject-info {
  border-radius: 10px;
  padding: 10px;
  color: rgba(0, 0, 0, 0.91);
  font-size: 19px;
  text-align: left;
  margin: 10px auto;
  font-weight: 600;
}

.nav-room {
  cursor: pointer;
  font-weight: 500;
  font-size: 15px;
}

.nav-group {
  cursor: pointer;
  margin-right: 10px;
  font-weight: 400;
  font-size: 18px;
}
</style>