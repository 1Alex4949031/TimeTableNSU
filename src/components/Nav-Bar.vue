<script setup>

import {openModalAuth, openModalDayTimeSelect} from "@/js/ModalLogic";
import DayTimeSelectModal from "@/components/Day-Time-Select-Modal.vue";
import LoginModal from "@/components/Login-Modal.vue";
import {isUserLogin} from "@/js/axios-request";


</script>

<template>

  <b-navbar toggleable="lg" type="dark" variant="light">
    <b-navbar-brand class="text" href="#">TimeTable</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="custom-navbar-nav">

        <b-nav-item v-if="isUserLogin === 'User'" @click="openModalAuth()">Вход</b-nav-item>
        <b-nav-item v-else>Профиль</b-nav-item>

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
.text {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  color: black;
}

.custom-navbar-nav {
  margin-left: auto;
}
</style>