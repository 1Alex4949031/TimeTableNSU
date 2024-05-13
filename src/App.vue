<template>
  <NavBar/>
  <router-view/>
  <FooterComponent/>
  <div>
    <p>{{ message }}</p>
    <button v-if="!isConnected" @click="connect">Connect</button>
    <button v-if="isConnected" @click="disconnect">Disconnect</button>
  </div>
</template>

<style>
html, body {
  overflow-x: hidden;
}
</style>

<script setup>
import NavBar from "@/components/Nav-Bar.vue";
import FooterComponent from "@/components/Footer-Component.vue";
import {connect, disconnect, isConnected, message} from "@/js/socket";



</script>