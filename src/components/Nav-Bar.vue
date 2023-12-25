<script setup>

import {openModalAuth} from "@/js/ModalLogic";
import LoginModal from "@/components/Login-Modal.vue";
import {isUserLogin} from "@/js/axios-auth-request";
import router from "@/router/router";
import logo from '@/assets/images/logo_green.svg'

function routeToOptions() {
  router.push('/admNav');
}

function routeToMain() {
  router.push('/');
}

</script>

<template>

  <b-navbar toggleable="lg" type="dark" variant="light">
    <b-navbar-brand>
      <b-row class="brand-row" @click="routeToMain">
        <img class="logo" :src=logo alt="Logo">
        <b-col>
          <b-button class="text custom-btn">Главная</b-button>
        </b-col>
      </b-row>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

      <b-navbar-nav class="custom-navbar-nav">

        <b-nav-form>
          <b-button v-if="isUserLogin === 'User'" class="custom-btn" @click="openModalAuth()">Вход</b-button>
          <b-button v-else class="custom-btn" @click="routeToOptions">Опции</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

  <div class="modals">
    <LoginModal/>
  </div>
</template>

<style scoped>
.custom-btn {
  background-color: #fff;
  color: black;
  border: 1px solid #ced4da;
  border-radius: 20px;
  transition: background-color 0.5s ease;
}

.brand-row {
  cursor: pointer;
  justify-content: center;
  align-items: center;
}

.text {
  font-weight: 500;
  color: black;
}

.logo {
  width: 65px;
}

.custom-navbar-nav {
  margin-left: auto;
}

@media (max-width: 599px) {
  .text {
    font-size: 18px;
  }
}


@media (min-width: 600px) and (max-width: 899px) {
  .text {
    font-size: 20px;
  }
}

@media (min-width: 900px) {
  .text {
    font-size: 20px;
  }
}
</style>