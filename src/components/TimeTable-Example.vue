<script setup>
import {ref} from "vue";
import Loader3d from "@/components/loaders/Loader-3d.vue";

const daysOfWeek = ref(['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']);
const timeSlots = ref(['9:00', '10:50', '12:40', '14:30', '16:20', '18:10', '20:00']);
const schedule = ref({
  'Понедельник': {
    '9:00': [{subject: 'Математика', classroom: '5050', teacher: 'Саня Лапушинский'}],
    '10:50': [{subject: 'Физика', classroom: '5012', teacher: 'Саня Лапушинский'}],
    '12:40': [{subject: 'Физ-ра', classroom: 'Спортзал', teacher: 'Саня Лапушинский'}],
    '14:30': [{subject: 'Английский', classroom: '4412', teacher: 'Саня Лапушинский'}],
    '16:20': [{subject: 'История', classroom: 'На улице', teacher: 'Саня Лапушинский'}],
    '18:10': [{subject: 'Физика', classroom: '5012', teacher: 'Саня Лапушинский'}],
  },
  'Вторник': {
    '14:30': [{subject: 'Английский', classroom: '4412', teacher: 'Саня Лапушинский'}],
    '16:20': [{subject: 'История', classroom: 'На улице', teacher: 'Саня Лапушинский'}],
    '18:10': [{subject: 'Физика', classroom: '5012', teacher: 'Саня Лапушинский'}],
  },
  'Среда': {
    '10:50': [{subject: 'Физика', classroom: '5012', teacher: 'Саня Лапушинский'}],
    '12:40': [{subject: 'Физ-ра', classroom: 'Спортзал', teacher: 'Саня Лапушинский'}],
    '14:30': [{subject: 'Английский', classroom: '4412', teacher: 'Саня Лапушинский'}],
  },
  'Четверг': {
    '16:20': [{subject: 'История', classroom: 'На улице', teacher: 'Саня Лапушинский'}],
    '18:10': [{subject: 'Физика', classroom: '5012', teacher: 'Саня Лапушинский'}],
  },
  'Пятница': {
    '9:00': [{subject: 'Математика', classroom: '5050', teacher: 'Саня Лапушинский'}],
    '10:50': [{subject: 'Физика', classroom: '5012', teacher: 'Саня Лапушинский'}],
    '12:40': [{subject: 'Физ-ра', classroom: 'Спортзал', teacher: 'Саня Лапушинский'}],
    '14:30': [{subject: 'Английский', classroom: '4412', teacher: 'Саня Лапушинский'}],
    '16:20': [{subject: 'История', classroom: 'На улице', teacher: 'Саня Лапушинский'}],
    '18:10': [{subject: 'Физика', classroom: '5012', teacher: 'Саня Лапушинский'}],

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
                 :draggable="true"
                 @dragstart="handleDragStart($event, day, timeSlot, lesson)">
              <div class="class-cell-info">
                <div class="lesson-img"/>
                <div class="subject-info lec-background">
                  {{ lesson.subject }} <br>
                  <span class="nav-teacher">
                     {{ lesson.teacher }}
                  </span> <br>
                  <span class="nav-room">
                    {{ lesson.classroom }}
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
  <Loader3d/>
</template>

<style scoped>

.lesson-img {
  background-color: rgba(144, 238, 144, 0.8);
  border-radius: 50px;
  position: absolute;
  width: 25px;
  height: 25px;
  right: -8px;
  top: -8px;
}

.lec-background {
  background-color: rgba(144, 238, 144, 0.2);
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
  font-weight: 500;
  font-size: 15px;
}

.nav-teacher {
  font-weight: 400;
  font-size: 18px;
}

.class-cell-info {
  position: relative;
  transition: transform 0.2s ease;
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