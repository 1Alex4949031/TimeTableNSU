<script setup>

import {logOut} from "@/js/axios-auth-request";
import {getAllTimetable, getGroupTimetable, getRoomTimetable, getTeacherTimetable} from "@/js/get-timetable";
import {activateNewTimetable, createNewTimetable} from "@/js/timetable-setting-request";
import {toast} from "vue3-toastify";

async function getExampleGroup() {
  const timetable = await getGroupTimetable("21213");
  console.log("Обрабатываю " + timetable)
  for (let x of timetable) {
    const {id, subjectName, teacher} = x
    console.log(id, subjectName, teacher)
  }
}

async function getExampleTeacher() {
  const timetable = await getTeacherTimetable("miginsky");
  console.log("Обрабатываю " + timetable)
  for (let x of timetable) {
    const {id, subjectName, teacher} = x
    console.log(id, subjectName, teacher)
  }
}

async function getExampleRoom() {
  const timetable = await getRoomTimetable("306");
  console.log("Обрабатываю " + timetable)
  for (let x of timetable) {
    const {id, subjectName, teacher} = x
    console.log(id, subjectName, teacher)
  }
}

async function getExampleAll() {
  const timetable = await getAllTimetable();
  console.log("Обрабатываю " + timetable)
  for (let x of timetable) {
    const {id, subjectName, teacher, room} = x
    console.log(id, subjectName, teacher, room)
  }
}


async function ToastTest() {
  const toastId = "41"
  const toastPromise = toast(
      "hi",
      {
        toastId: toastId,
        autoClose: false,
        type: "loading",
        position: toast.POSITION.BOTTOM_RIGHT,
      },
  )
  console.log(toast.isActive(toastId))
  await toastPromise
  if (toast.isActive(toastId)) {
    toast.update(toastId,
        {
          autoClose: 1000,
          type: toast.TYPE.SUCCESS,
          position: toast.POSITION.BOTTOM_RIGHT,
        });
    console.log("Up")
  }
}
</script>

<template>
  <div>
    <p>Admin Pages</p>
    <b-row>
      <b-col>
        <b-row>
          <b-col>
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
              <router-link to="/removeBase">Remove base</router-link>
            </div>
            <div>
              <router-link to="/" @click="logOut()">Logout</router-link>
            </div>
          </b-col>
          <b-col>
            <div>
              <router-link to="/newPlan">Plane Control</router-link>
            </div>
            <div>
              <router-link to="/newConstraint">Constraint add</router-link>
            </div>
            <div>
              <router-link to="/removeConstraint">Constraint remove</router-link>
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col>
        <div>
          <button @click="createNewTimetable()">Создать новое расписание</button>
        </div>
        <div>
          <button @click="createNewTimetable(true)">Создать новое расписание по тестовым данным</button>
        </div>
        <div>
          <button @click="activateNewTimetable()">Активировать новое расписание</button>
        </div>
      </b-col>
    </b-row>
    <div>
      Запросы(кроме all) вытаскивают расписание для конкретного имени которое есть в дефолтном
      конфиге(в новом расписании их надо добавить чтобы работали)
    </div>
    <div>
      <router-link to="/" @click="getExampleGroup()">get Group Timetable</router-link>
    </div>
    <div>
      <router-link to="/" @click="getExampleRoom()">get Room Timetable</router-link>
    </div>
    <div>
      <router-link to="/" @click="getExampleTeacher()">get Teacher Timetable</router-link>
    </div>
    <div>
      <router-link to="/" @click="getExampleAll()">get All Timetable</router-link>
    </div>
    <div>
      <router-link to @click="ToastTest()">Toast test</router-link>
    </div>
  </div>
</template>

<style scoped>

</style>