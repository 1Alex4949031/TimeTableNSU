<script setup>
import {isSelected, toggleSelection} from "@/js/selected-timetable";

const time = ["9:00", "10:50", "12:40", "14:30", "16:20", "18:10", "20:00"]

</script>

<template>
  <div class="subScreen-modal" data-aos="fade-in" data-aos-duration="1000" data-aos-once="true">
    <table>
      <tr>
        <td></td>
        <td>Пн</td>
        <td>Вт</td>
        <td>Ср</td>
        <td>Чт</td>
        <td>Пт</td>
        <td>Сб</td>
      </tr>
      <tr v-for="lessonNumber in 7" :key="lessonNumber">
        <td>
          {{ time[lessonNumber - 1] }}
        </td>
        <td v-for="day in 6" :key="day"
            :class="{ selected: isSelected(lessonNumber, day) }"
            class="circle"
            @click="toggleSelection(lessonNumber, day)">
          <div class="inner-element">{{ lessonNumber }}, {{ day }}</div>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.circle {
  border-radius: 15%;
}

.selected {
  background-color: lightgreen;
}

table {
  border-collapse: collapse;
}

td {
  padding: 10px;
  cursor: pointer;
}

td:hover {
  background-color: lightblue;
}

</style>