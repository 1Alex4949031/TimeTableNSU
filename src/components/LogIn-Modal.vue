<script setup>
import {ref} from "vue";
import {closeModalAuth, isVisibleAuth} from "@/JS/ModalLogic";

const login = ref('79134745790')
const password = ref('test')
</script>

<template>
  <transition>
    <div class="fullscreen-modal" v-if="isVisibleAuth">
      <div>
        <h1>LogInn</h1>
        <button @click="closeModalAuth">Закрыть</button>
      </div>
      <div>
        <input v-model="login" type="text">
        <input v-model="password" type="text">
      </div>
    </div>
  </transition>
</template>

<style scoped>

@keyframes slideDown {
  from {
    transform: translateY(-100%); /* Начало анимации за пределами экрана сверху */
    opacity: 0;
  }
  to {
    transform: translateY(0); /* Окончание анимации в нормальном положении */
    opacity: 1;
  }
}

.localFade-enter-active, .localFade-leave-active {
  transition: opacity 0.5s ease;
}

.localFade-enter-from, .localFade-leave-to {
  opacity: 0;
}

.fullscreen-modal {
  animation: slideDown 0.3s ease;
  position: fixed; /* Фиксированное позиционирование относительно окна браузера */
  top: 0;
  left: 0;
  width: 100%; /* Ширина на весь экран */
  height: 100%; /* Высота на весь экран */
  background: rgba(255, 255, 255, 1);
  z-index: 10000; /* Z-индекс для позиционирования поверх других элементов */
  display: flex; /* Используйте Flexbox для выравнивания содержимого */
  justify-content: space-evenly; /* Горизонтальное выравнивание содержимого */
  align-items: center; /* Вертикальное выравнивание содержимого */
}
</style>