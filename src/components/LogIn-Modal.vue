<script setup>
import {ref} from "vue";
import {closeModalAuth, isVisibleAuth} from "@/JS/ModalLogic";

const login = ref('79134745790')
const password = ref('test')
</script>

<template>
  <transition name="localFade">
    <div class="fullscreen-modal " v-if="isVisibleAuth">
      <button @click="closeModalAuth" class="close-button">Закрыть</button>
      <div class="grid-container">
        <h1>LogInn</h1>
        <div>
          <b-form-input v-model="login" placeholder="Login"></b-form-input>
          <b-form-input v-model="password" placeholder="Password"></b-form-input>
        </div>
        <div>
          <b-button pill variant="success" @click="console.log('Click!!')">Button</b-button>
        </div>
      </div>

    </div>
  </transition>
</template>

<style scoped>

.grid-container {
  display: grid;
  grid-template-rows: repeat(2, 1fr); /* 3 ряда с равным распределением пространства */
  height: 80%; /* Установите желаемую высоту контейнера */
  justify-content: space-evenly;
}


.close-button {
  position: absolute; /* Абсолютное позиционирование для кнопки закрытия */
  top: 10px; /* Отступ сверху */
  right: 10px; /* Отступ справа */
  cursor: pointer; /* Добавление стиля курсора для интерактивности */

  /* Дополнительные стили для кнопки закрытия, например, размер, цвет и т.д. */
}

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
  align-content: start;
}
</style>