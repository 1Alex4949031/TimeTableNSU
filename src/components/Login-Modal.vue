<script setup>
import {ref} from "vue";
import {closeModalAuth, isVisibleAuth} from "@/js/ModalLogic";
import {auth} from "@/js/axios-request";

const email = ref('admin@gmail.com')
const password = ref('admin')
const imageModal = require('@/assets/images/imageModal1.png')

</script>

<template>
  <transition enter-active-class="modal-enter-active"
              leave-active-class="modal-leave-active">
    <div class="fullscreen-modal" v-if="isVisibleAuth">
      <button @click="closeModalAuth" class="close-button">Закрыть</button>
      <b-container fluid="sm" class="my-4">
        <b-row>
          <b-col md="6" class="d-flex flex-column justify-content-center">
            <h2 class="modal-title mb-4">Вход</h2>
            <b-form>
              <b-form-group class="form-group" id="input-group-1" label="Логин" label-for="input-1">
                <b-form-input class="custom-input" v-model="email" id="input-1"
                              placeholder="Введите ваш логин"></b-form-input>
              </b-form-group>
              <b-form-group class="form-group" id="input-group-2" label="Пароль" label-for="input-2">
                <b-form-input class="custom-input" v-model="password" type="password" id="input-2"
                              placeholder="Введите ваш пароль"></b-form-input>
              </b-form-group>
              <b-button class="custom-btn mt-4" @click="auth(email.valueOf(), password.valueOf())">Вход</b-button>
            </b-form>
          </b-col>
          <b-col md="6" class="mt-3">
            <b-img :src=imageModal alt="Modal image" fluid class="rounded-custom"></b-img>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </transition>
</template>

<style scoped>
.form-group {
  letter-spacing: 3px;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
}

.custom-btn {
  font-family: 'Montserrat', sans-serif;
  background-color: #fff;
  color: black;
  border: 1px solid #ced4da;
  border-radius: 20px;
  width: 100%;
  font-size: 1.5rem;
  transition: background-color 0.5s ease;
}

.custom-input {
  font-family: 'Montserrat', sans-serif;
  border: 1px solid #ced4da;
  border-radius: 20px;
  font-size: 1.5rem;
  line-height: 2;
  color: #495057;
  background-color: #fff;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.modal-title {
  font-size: 50px;
}

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
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.fullscreen-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  z-index: 1000;
  display: flex;
  align-content: start;
  overflow-y: auto;
}
</style>