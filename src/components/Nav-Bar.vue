<script setup>

import {openModalAuth} from "@/js/ModalLogic";
import LoginModal from "@/components/Login-Modal.vue";
import {isUserLogin} from "@/js/axios-auth-request";
import router from "@/router/router";
import logo from '@/assets/images/logo.png'

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
        <b-col class="text">Расписание для ваc!</b-col>
      </b-row>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

      <b-navbar-nav class="custom-navbar-nav">

        <b-nav-item v-if="isUserLogin === 'User'" @click="openModalAuth()">Вход</b-nav-item>
        <b-nav-item v-else @click="routeToOptions">Опции</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

  <div class="modals">
    <LoginModal/>
  </div>
</template>

<style scoped>
.brand-row{
  cursor: pointer;
  justify-content: center;
  align-items: center;
}
.text {
  font-weight: 600;
  color: black;
}

.logo {
  width: 65px;
}

.custom-navbar-nav {
  margin-left: auto;
}
</style>