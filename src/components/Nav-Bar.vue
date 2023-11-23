<script setup>
import LogInModal from "@/components/Login-Modal.vue";
import {openModalAuth} from "@/JS/ModalLogic";
</script>

<template>

  <b-navbar toggleable="lg" type="dark" variant="light">
    <b-navbar-brand class="text" href="#">TimeTable</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="custom-navbar-nav">
        <b-nav-item @click="openModalAuth()">Вход</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

  <div class="modals">
    <LogInModal/>
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