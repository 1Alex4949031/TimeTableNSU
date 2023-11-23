<script setup>
import {ref} from "vue";
import {closeModalAuth, isVisibleAuth} from "@/JS/ModalLogic";

const login = ref('79134745790')
const password = ref('test')
const imageModal = require('@/assets/images/imageModal.png')
</script>

<template>
  <transition enter-active-class="modal-enter-active"
              leave-active-class="modal-leave-active">
    <div class="fullscreen-modal" v-if="isVisibleAuth">
      <button @click="closeModalAuth" class="close-button">Закрыть</button>
      <b-container fluid="sm" class="my-4">
        <b-row>
          <b-col md="6" class="d-flex flex-column justify-content-center">
            <h2 class="modal-title">Вход</h2>
            <b-form>
              <b-form-group id="input-group-1" label="Логин" label-for="input-1">
                <b-form-input v-model="login" id="input-1" placeholder="Введите ваш логин"></b-form-input>
              </b-form-group>
              <b-form-group id="input-group-2" label="Пароль" label-for="input-2">
                <b-form-input v-model="password" type="password" id="input-2"
                              placeholder="Введите ваш пароль"></b-form-input>
              </b-form-group>
              <b-button variant="primary" type="submit">Вход</b-button>
            </b-form>
          </b-col>
          <b-col md="6">
            <b-img :src=imageModal alt="Modal image" fluid class="rounded-custom"></b-img>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </transition>
</template>

<style scoped>
@keyframes slide-fade-in {
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}


@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.modal-enter-active {
  animation: slide-fade-in 0.5s ease;
}

.modal-leave-active {
  animation: fade-out 0.3s ease;
}

.rounded-custom {
  border-radius: 130px;
}

.close-button {
  position: absolute; /* Абсолютное позиционирование для кнопки закрытия */
  top: 10px; /* Отступ сверху */
  right: 10px; /* Отступ справа */
  cursor: pointer; /* Добавление стиля курсора для интерактивности */
}

.fullscreen-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  z-index: 10000;
  display: flex;
  align-content: start;
}
</style>