<script setup>

import {logOut} from "@/js/axios-auth-request";
import {getGroup, getRoom, getTeacher} from "@/js/get-timetable";

async function getExampleGroup() {
  const timetable = await getGroup("21213");
  console.log("Обрабатываю " + timetable)
  for (let x of timetable){
    const {id, subjectName, teacher} = x
    console.log(id, subjectName, teacher)
  }
}

async function getExampleTeacher() {
  const timetable = await getTeacher("miginsky");
  console.log("Обрабатываю " + timetable)
  for (let x of timetable){
    const {id, subjectName, teacher} = x
    console.log(id, subjectName, teacher)
  }
}

async function getExampleRoom() {
  const timetable = await getRoom("306");
  console.log("Обрабатываю " + timetable)
  for (let x of timetable){
    const {id, subjectName, teacher} = x
    console.log(id, subjectName, teacher)
  }
}
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
      <router-link to="/newPlan">Plane Control</router-link>
    </div>
    <div>
      <router-link to="/" @click="logOut()">Logout</router-link>
    </div>
    <div>
      <router-link to="/" @click="getExampleGroup()">get Group</router-link>
    </div>
    <div>
      <router-link to="/" @click="getExampleRoom()">get Room</router-link>
    </div>
    <div>
      <router-link to="/" @click="getExampleTeacher()">get Teacher</router-link>
    </div>
  </div>
</template>

<style scoped>

</style>