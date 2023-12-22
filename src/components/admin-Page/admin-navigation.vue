<script setup>

import {isUserLogin, logOut} from "@/js/axios-auth-request";
import {getAllTimetable, getGroupTimetable, getRoomTimetable, getTeacherTimetable} from "@/js/get-timetable";
import {activateNewTimetable, createNewTimetable} from "@/js/timetable-setting-request";
import {toast} from "vue3-toastify";
import imageModal from "@/assets/images/imageModal1.png";
import router from "@/router/router";

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

function routeToPage(page) {
  router.push(page)
}

</script>

<template>
  <div v-if="isUserLogin === 'Admin'">
    <b-row>
      <b-col md="6" class="d-flex flex-column  align-items-center">
        <h2 class="title mb-3 mt-3">Администратор</h2>
        <b-button class="custom-btn-blue mt-2 mb-2" @click="routeToPage('/newGroup')">Добавление группы</b-button>
        <b-button class="custom-btn-blue mt-2 mb-2" @click="routeToPage('/newTeacher')">Добавление учителя</b-button>
        <b-button class="custom-btn-blue mt-2 mb-2" @click="routeToPage('/newRoom')">Добавление комнаты</b-button>
        <b-button class="custom-btn-blue mt-2 mb-2" @click="routeToPage('/newSubj')">Добавление предмета</b-button>
        <b-button class="custom-btn-blue mt-2 mb-2" @click="routeToPage('/newPlan')">Добавление учебного плана</b-button>
        <b-button class="custom-btn-blue mt-2 mb-2" @click="routeToPage('/newConstraint')">Добавление ограничений</b-button>
        <b-button class="custom-btn-red mt-2 mb-2" @click="routeToPage('/removeConstraint')">Удаление
          ограничений
        </b-button>
        <b-button class="custom-btn-red mt-2 mb-2" @click="routeToPage('/removeBase')">Удаление параметров
          расписания
        </b-button>
        <b-button class="custom-btn mt-2 mb-2" @click="logOut()">Выход</b-button>
      </b-col>
      <b-col md="6">
        <b-col>
          <b-img :src="imageModal" alt="Image" fluid class="rounded-custom"></b-img>
        </b-col>
      </b-col>
    </b-row>


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

  <div v-else>
    <p>Teacher Page</p>
    <div>
      <div>
        <router-link to="/newConstraint">Constraint add</router-link>
      </div>
      <div>
        <router-link to="/removeConstraint">Constraint remove</router-link>
      </div>
      <div>
        <router-link to="/" @click="logOut()">Logout</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rounded-custom {
  border-radius: 130px;
}

.title {
  font-weight: 700;
  font-size: 1.8rem;
}


.custom-btn-blue {
  background-color: #fff;
  color: black;
  border: 1px solid #ced4da;
  border-radius: 20px;
  font-size: 1.5rem;
  width: 90%;
  transition: background-color 0.5s ease;
}

.custom-btn-blue:hover {
  background-color: #6398FF;
  color: white;
  border: 1px solid #fff;
}

.custom-btn-red {
  background-color: #fff;
  color: black;
  border: 1px solid #ced4da;
  border-radius: 20px;
  font-size: 1.5rem;
  width: 90%;
  transition: background-color 0.5s ease;
}

.custom-btn-red:hover {
  background-color: #FF5656;
  color: white;
  border: 1px solid #fff;
}


.custom-btn{
  background-color: #fff;
  color: black;
  border: 1px solid #ced4da;
  border-radius: 20px;
  font-size: 1.5rem;
  width: 90%;
  transition: background-color 0.5s ease;
}
</style>