<script setup>

import {closeModalDayTimeSelect, isVisibleDayTimeSelect} from "@/JS/ModalLogic";
import {reactive} from "vue";

const tableArray = reactive(Array(7).fill().map(() => Array(6).fill(false)))

const time = ["9:00", "10:50", "12:40", "14:30", "16:20", "18:10", "20:00"]
function toggleSelection(row, col) {
  console.log(row + col)
  // Переключение состояния ячейки
  tableArray[row - 1][col - 1] = !tableArray[row - 1][col - 1];
}

function isSelected(row, col) {
  // Проверка, выбрана ли ячейка
  return tableArray[row - 1][col - 1];
}

</script>

<template>
  <transition name="localFade">
    <div class="subScreen-modal" v-if="isVisibleDayTimeSelect">
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
        <tr v-for="row in 7" :key="row">
          <td>
            {{time[row-1]}}
          </td>
          <td v-for="col in 6" :key="col"
              :class="{ selected: isSelected(row, col) }"
              class="circle"
              @click="toggleSelection(row, col)">
            <div class="inner-element">{{ row }}, {{ col }}</div>
          </td>
        </tr>
      </table>

      <div>
        <button @click="closeModalDayTimeSelect()">
          Закрыть
        </button>
      </div>
    </div>
  </transition>
</template>

<style scoped>

.circle {
  border-radius: 15%;
}

.selected {
  background-color: lightgreen; /* Цвет фона для выбранных ячеек */
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

.subScreen-modal {
  animation: slideDown 0.3s ease;
  position: fixed; /* Фиксированное позиционирование относительно окна браузера */
  background: rgba(255, 255, 255, 1);
  z-index: 10000; /* Z-индекс для позиционирования поверх других элементов */
  display: flex;
}
</style>