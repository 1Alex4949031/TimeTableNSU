<script setup>

import {isUserLogin, logOut} from "@/js/axios-auth-request";
import router from "@/router/router";
import groupPng from "@/assets/images/group.png";
import planPng from "@/assets/images/plan.png";
import roomPng from "@/assets/images/room.png";
import subjectPng from "@/assets/images/subject.png";
import teacherPng from "@/assets/images/teacher.png";
import constraintPng1 from "@/assets/images/constraint1.png";
import constraintPng2 from "@/assets/images/constraint2.png";
import tablePng from "@/assets/images/table.png";
import potentialTablePng1 from "@/assets/images/potential_table1.png";
import potentialTablePng2 from "@/assets/images/potential_table2.png";
import logoutPng from "@/assets/images/logout.png";
import changesPng from "@/assets/images/changes.png";


function routeToPage(page) {
  router.push(page)
}

</script>

<template>
  <div v-if="isUserLogin === 'Admin'">
    <b-col md="12" data-aos="fade-in" data-aos-duration="1300" data-aos-once="true">
      <h2 class="title mb-3 mt-4">Панель администратора</h2>
      <b-col class="transparent-line my-2"></b-col>
      <h3 class="subtitle mt-2">Добавление</h3>
      <b-row class="mt-1 mx-5 mb-1">
        <b-col md="4" class="navigate-image mb-3">
          <b-img class="nav-img image-example" @click="routeToPage('/newGroup')" :src="groupPng"
                 alt="Группа"></b-img>
          <h3 class="centered-text">Группа</h3>
        </b-col>

        <b-col md="4" class="navigate-image mb-3">
          <b-img class="nav-img image-example" @click="routeToPage('/newTeacher')" :src="teacherPng"
                 alt="Учитель"></b-img>
          <h3 class="centered-text">Учитель</h3>
        </b-col>

        <b-col md="4" class="navigate-image mb-3">
          <b-img class="nav-img image-example" @click="routeToPage('/newRoom')" :src="roomPng"
                 alt="Комната"></b-img>
          <h3 class="centered-text">Комната</h3>
        </b-col>

        <b-col md="4" class="navigate-image mb-3">
          <b-img class="nav-img image-example" @click="routeToPage('/newSubj')" :src="subjectPng"
                 alt="Предмет"></b-img>
          <h3 class="centered-text">Предмет</h3>
        </b-col>

        <b-col md="4" class="navigate-image mb-3">
          <b-img class="nav-img image-example" @click="routeToPage('/newPlan')" :src="planPng"
                 alt="Учебный план"></b-img>
          <h3 class="centered-text">Учебный план</h3>
        </b-col>

        <b-col md="4" class="navigate-image mb-3">
          <b-img class="nav-img image-example" @click="routeToPage('/newConstraint')" :src="constraintPng1"
                 alt="Ограничения"></b-img>
          <h3 class="centered-text">Ограничения</h3>
        </b-col>
      </b-row>
      <b-col class="transparent-line my-2"></b-col>
      <h3 class="subtitle mt-2">Взаимодействие с расписанием</h3>
      <b-row class="mt-1 mx-5 mb-1">
        <b-col md="6" class="navigate-image mb-3">
          <b-img class="nav-img image-example" @click="routeToPage('/createTimetable')" :src="tablePng"
                 alt="Расписание"></b-img>
          <h3 class="centered-text">Расписание</h3>
        </b-col>

        <b-col md="6" class="navigate-image mb-3">
          <b-img class="nav-img image-example" @click="routeToPage('/potential')" :src="potentialTablePng1"
                 alt="Потенциальное расписание"></b-img>
          <h3 class="centered-text">Потенциальное расписание</h3>
        </b-col>
      </b-row>

      <b-col class="transparent-line my-2"></b-col>
      <h3 class="subtitle mt-2">Удаление</h3>
      <b-row class="mt-1 mx-5 mb-1">
        <b-col md="6" class="navigate-image mb-3">
          <b-img class="nav-img image-example" @click="routeToPage('/removeBase')" :src="potentialTablePng2"
                 alt="Параметры расписания"></b-img>
          <h3 class="centered-text">Параметры расписания</h3>
        </b-col>

        <b-col md="6" class="navigate-image mb-3">
          <b-img class="nav-img image-example" @click="routeToPage('/removeConstraint')" :src="constraintPng2"
                 alt="Ограничения"></b-img>
          <h3 class="centered-text">Ограничения</h3>
        </b-col>
      </b-row>

      <b-col class="transparent-line my-2"></b-col>
      <h3 class="subtitle mt-2">Дополнительно</h3>

      <b-row class="mt-1 mx-5 mb-1">
        <b-col md="6" class="navigate-image mb-3">
          <b-img class="nav-img image-example" @click="routeToPage('/changes_log')" :src="changesPng"
                 alt="Изменения"></b-img>
          <h3 class="centered-text">Изменения</h3>
        </b-col>

        <b-col md="6" class="navigate-image mb-3">
          <b-img class="nav-img image-example" @click="logOut()" :src="logoutPng"
                 alt="Выход"></b-img>
          <h3 class="centered-text">Выход</h3>
        </b-col>
      </b-row>
    </b-col>
  </div>

  <div v-else>
    <b-col md="12" data-aos="fade-in" data-aos-duration="1300" data-aos-once="true">
      <h2 class="title mb-3 mt-4 ms-1 me-1">Панель учителя</h2>
      <b-row class="mt-1 mx-5 mb-1">
        <b-col md="4" class="navigate-image mb-3">
          <b-img class="nav-img image-example" @click="routeToPage('/newConstraint')" :src="constraintPng1"
                 alt="Ограничения"></b-img>
          <h3 class="centered-text">Добавление ограничений</h3>
        </b-col>
        <b-col md="4" class="navigate-image mb-3">
          <b-img class="nav-img image-example" @click="routeToPage('/removeConstraint')" :src="constraintPng2"
                 alt="Ограничения"></b-img>
          <h3 class="centered-text">Удаление огрничений</h3>
        </b-col>
        <b-col md="4" class="navigate-image mb-3">
          <b-img class="nav-img image-example" @click="logOut()" :src="logoutPng"
                 alt="Выход"></b-img>
          <h3 class="centered-text">Выход</h3>
        </b-col>
      </b-row>
    </b-col>
  </div>
</template>

<style scoped>
.transparent-line {
  margin-left: 50px;
  margin-right: 50px;
  border-top: 2px solid #EAEAEA;
}

.centered-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
}

.image-example {
  border-radius: 50px;
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: cover
}

.nav-img {
  filter: brightness(50%);
  transition: transform 0.3s ease, filter 0.3s ease;
}

.nav-img:hover {
  filter: brightness(95%);
  transition: transform 0.3s ease, filter 0.3s ease;
}

.navigate-image:hover .centered-text {
  opacity: 0;
  visibility: hidden;
}

.navigate-image {
  cursor: pointer;
  position: relative;
  text-align: center;
  object-fit: cover;
  border-radius: 40px;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.navigate-image:hover img {
  transform: scale(1.05);
  transition: transform 0.3s ease, filter 0.3s ease;
}

.subtitle {
  text-align: center;
  font-weight: lighter;
  font-size: 1.7rem;
}

.title {
  text-align: center;
  font-weight: 700;
  font-size: 1.8rem;
}
</style>