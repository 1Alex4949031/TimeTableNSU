<script setup>

import {logOut} from "@/js/axios-request";
</script>

<template>
  <div>
    <p>Admin Pages</p>
    <div>
      <router-link to="/newGroup">Group Control</router-link>
    </div>
    <div>
      <router-link to="/newTeacher">Teacher Control</router-link>
    </div>
    <div>
      <router-link to="/newRoom">Room Control</router-link>
    </div>
    <div>
      <router-link to="/newSubj">Subject Control</router-link>
    </div>
    <div>
      <router-link to="/" @click="logOut()">Logout</router-link>
    </div>
  </div>
</template>

<style scoped>

</style>