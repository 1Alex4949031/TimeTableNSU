<!--<script setup>-->
<!--import {isSelected, toggleSelection} from "@/js/selected-timetable";-->

<!--const time = ["9:00", "10:50", "12:40", "14:30", "16:20", "18:10", "20:00"]-->

<!--</script>-->

<!--<template>-->
<!--  <div class="subScreen-modal" data-aos="fade-in" data-aos-duration="1000" data-aos-once="true">-->
<!--    <table>-->
<!--      <tr>-->
<!--        <td></td>-->
<!--        <td>Пн</td>-->
<!--        <td>Вт</td>-->
<!--        <td>Ср</td>-->
<!--        <td>Чт</td>-->
<!--        <td>Пт</td>-->
<!--        <td>Сб</td>-->
<!--      </tr>-->
<!--      <tr v-for="lessonNumber in 7" :key="lessonNumber">-->
<!--        <td>-->
<!--          {{ time[lessonNumber - 1] }}-->
<!--        </td>-->
<!--        <td v-for="day in 6" :key="day"-->
<!--            :class="{ selected: isSelected(lessonNumber, day) }"-->
<!--            class="circle"-->
<!--            @click="toggleSelection(lessonNumber, day)">-->
<!--          <div class="inner-element">{{ lessonNumber }}, {{ day }}</div>-->
<!--        </td>-->
<!--      </tr>-->
<!--    </table>-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped>-->
<!--.circle {-->
<!--  border-radius: 15%;-->
<!--}-->

<!--.selected {-->
<!--  background-color: lightgreen;-->
<!--}-->

<!--table {-->
<!--  border-collapse: collapse;-->
<!--}-->

<!--td {-->
<!--  padding: 10px;-->
<!--  cursor: pointer;-->
<!--}-->

<!--td:hover {-->
<!--  background-color: lightblue;-->
<!--}-->

<!--</style>-->

<script setup>
import { isSelected, toggleSelection } from "@/js/selected-timetable";

const time = ["9:00", "10:50", "12:40", "14:30", "16:20", "18:10", "20:00"];
</script>

<template>
  <b-col class="subScreen-modal mt-1 mb-2" data-aos="fade-in" data-aos-duration="1000" data-aos-once="true">
    <table>
      <tr>
        <th></th>
        <th>Пн</th>
        <th>Вт</th>
        <th>Ср</th>
        <th>Чт</th>
        <th>Пт</th>
        <th>Сб</th>
      </tr>
      <tr v-for="lessonNumber in 7" :key="lessonNumber">
        <td>{{ time[lessonNumber - 1] }}</td>
        <td v-for="day in 6" :key="day"
            :class="{ 'selected': isSelected(lessonNumber, day) }"
            class="time-slot"
            @click="toggleSelection(lessonNumber, day)">
          <div class="inner-element" v-if="isSelected(lessonNumber, day)">✖</div>
        </td>
      </tr>
    </table>
  </b-col>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
}

.time-slot {
  cursor: pointer;
  transition: background-color 0.3s;
}

.time-slot:hover {
  background-color: #f0f0f0;
}

.selected .inner-element {
  color: lightcoral;
  font-size: large;
  line-height: 1;
}

th {
  background-color: #f8f8f8;
}

.subScreen-modal {
  max-width: 600px;
  margin: auto;
}
</style>