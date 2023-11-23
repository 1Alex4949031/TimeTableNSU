<script setup>

import LogInModal from "@/components/LogIn-Modal.vue";
import {openModalAuth, openModalDayTimeSelect} from "@/JS/ModalLogic";
import DayTimeSelectModal from "@/components/Day-Time-Select-Modal.vue";

</script>

<template>

  <b-navbar toggleable="lg" type="dark" variant="light">
    <b-navbar-brand class="text" href="#">TimeTable</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="custom-navbar-nav">
        <b-nav-item @click="openModalAuth()">Login</b-nav-item>
        <b-nav-item @click="openModalDayTimeSelect()">DayTime select</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

  <div class="modals">
    <LogInModal/>
    <DayTimeSelectModal/>
  </div>
</template>

<style scoped>
.text{
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  color: black;
}
.custom-navbar-nav {
  margin-left: auto;
}
</style>