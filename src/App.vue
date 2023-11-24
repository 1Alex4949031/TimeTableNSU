<template>
  <NavBar/>
  <router-view/>
  <FooterComponent/>
</template>

<style>

</style>

<script setup>
import NavBar from "@/components/Nav-Bar.vue";
import FooterComponent from "@/components/Footer-Component.vue";
</script>