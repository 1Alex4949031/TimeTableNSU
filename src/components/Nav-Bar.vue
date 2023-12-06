<script setup>

import {openModalAuth, openModalDayTimeSelect} from "@/js/ModalLogic";
import DayTimeSelectModal from "@/components/Day-Time-Select-Modal.vue";
import LoginModal from "@/components/Login-Modal.vue";
import {isUserLogin} from "@/js/axios-request";
import router from "@/router/router";
import logo from '@/assets/images/logo.png'

function routeToOptions() {
  router.push('/admNav');
}

</script>

<template>

  <b-navbar toggleable="lg" type="dark" variant="light">
    <b-navbar-brand>
      <b-row class="brand-row">
        <img class="logo" :src=logo alt="Logo">
        <b-col class="text">TimeTable</b-col>
      </b-row>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

      <b-navbar-nav class="custom-navbar-nav">

        <b-nav-item v-if="isUserLogin === 'User'" @click="openModalAuth()">Вход</b-nav-item>
        <b-nav-item v-else @click="routeToOptions">Опции</b-nav-item>

        <b-nav-item @click="openModalDayTimeSelect()">Первичный выбор предпочтений</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

  <div class="modals">
    <LoginModal/>
    <DayTimeSelectModal/>
  </div>
</template>

<style scoped>
.brand-row{
  justify-content: center;
  align-items: center;
}
.text {
  font-weight: 700;
  color: black;
}

.logo {
  width: 65px;
}

.custom-navbar-nav {
  margin-left: auto;
}
</style>