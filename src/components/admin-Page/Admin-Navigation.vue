<script setup>

import {isUserLogin, logOut} from "@/js/axios-auth-request";
import imageModal from "@/assets/images/imageModal1.png";
import router from "@/router/router";
import groupPng from "@/assets/images/group.png";

function routeToPage(page) {
  router.push(page)
}

</script>

<template>
  <div v-if="isUserLogin === 'Admin'">
    <b-row data-aos="fade-in" data-aos-duration="1000" data-aos-once="true">
      <b-col md="6">
        <h2 class="title mb-3 mt-4 ms-1 me-1">Панель администратора</h2>
        <h2 class="title ms-1 me-1">Добавление</h2>
        <b-row class="mt-1 mx-1 mb-1">
          <b-col md="4" class="navigate-image mb-3">
            <b-img class="nav-img image-example" :src="groupPng" alt="Картинка 1"></b-img>
            <h3 class="centered-text">Группа</h3>
          </b-col>

          <b-col md="4" class="navigate-image mb-3">
            <b-img class="nav-img image-example" :src="groupPng" alt="Картинка 2"></b-img>
            <h3 class="centered-text">Учитель</h3>
          </b-col>

          <b-col md="4" class="navigate-image mb-3">
            <b-img class="nav-img image-example" :src="groupPng" alt="Картинка 3"></b-img>
            <h3 class="centered-text">Комната</h3>
          </b-col>

          <b-col md="4" class="navigate-image mb-3">
            <b-img class="nav-img image-example" :src="groupPng" alt="Картинка 3"></b-img>
            <h3 class="centered-text">Предмет</h3>
          </b-col>

          <b-col md="4" class="navigate-image mb-3">
            <b-img class="nav-img image-example" :src="groupPng" alt="Картинка 3"></b-img>
            <h3 class="centered-text">Учебный план</h3>
          </b-col>

          <b-col md="4" class="navigate-image mb-3">
            <b-img class="nav-img image-example" :src="groupPng" alt="Картинка 3"></b-img>
            <h3 class="centered-text">Ограничения</h3>
          </b-col>
        </b-row>
        <h2 class="title ms-1 me-1">Взаимодействие с расписанием</h2>
        <b-row class="mt-1 mx-1 mb-1">
          <b-col md="6" class="navigate-image mb-3">
            <b-img class="nav-img image-example" :src="groupPng" alt="Картинка 1"></b-img>
            <h3 class="centered-text">Расписание</h3>
          </b-col>

          <b-col md="6" class="navigate-image mb-3">
            <b-img class="nav-img image-example" :src="groupPng" alt="Картинка 2"></b-img>
            <h3 class="centered-text">Потенциальное расписание</h3>
          </b-col>
        </b-row>

        <h2 class="title ms-1 me-1">Удаление</h2>
        <b-row class="mt-1 mx-1 mb-1">
          <b-col md="6" class="navigate-image mb-3">
            <b-img class="nav-img image-example" :src="groupPng" alt="Картинка 1"></b-img>
            <h3 class="centered-text">Параметры расписания</h3>
          </b-col>

          <b-col md="6" class="navigate-image mb-3">
            <b-img class="nav-img image-example" :src="groupPng" alt="Картинка 2"></b-img>
            <h3 class="centered-text">Ограничения</h3>
          </b-col>
        </b-row>


        <b-button class="custom-btn-blue mt-2 mb-2" @click="routeToPage('/newGroup')">Добавление группы</b-button>
        <b-button class="custom-btn-blue mt-2 mb-2" @click="routeToPage('/newTeacher')">Добавление учителя</b-button>
        <b-button class="custom-btn-blue mt-2 mb-2" @click="routeToPage('/newRoom')">Добавление комнаты</b-button>
        <b-button class="custom-btn-blue mt-2 mb-2" @click="routeToPage('/newSubj')">Добавление предмета</b-button>
        <b-button class="custom-btn-blue mt-2 mb-2" @click="routeToPage('/newPlan')">Добавление учебного плана
        </b-button>
        <b-button class="custom-btn-blue mt-2 mb-2" @click="routeToPage('/newConstraint')">Добавление ограничений
        </b-button>
        <b-button class="custom-btn-blue mt-2 mb-2" @click="routeToPage('/createTimetable')">Создание расписания
        </b-button>
        <b-button class="custom-btn-red mt-2 mb-2" @click="routeToPage('/removeConstraint')">Удаление
          ограничений
        </b-button>
        <b-button class="custom-btn-red mt-2 mb-2" @click="routeToPage('/removeBase')">Удаление параметров
          расписания
        </b-button>
        <b-button class="custom-btn-red mt-2 mb-2" @click="routeToPage('/potential')">Изменение потенциального
          расписания
          расписания
        </b-button>
        <b-button class="custom-btn-blue mt-2 mb-2" @click="routeToPage('/changes_log')">Лог изменений</b-button>
        <b-button class="custom-btn mt-2 mb-2" @click="logOut()">Выход</b-button>
      </b-col>
      <b-col md="6">
        <b-col class="mt-3 me-3 ms-3 mb-1">
          <b-img :src="imageModal" alt="Image" fluid class="rounded-custom"></b-img>
        </b-col>
      </b-col>
    </b-row>
  </div>

  <div v-else>
    <b-row data-aos="fade-in" data-aos-duration="1000" data-aos-once="true">
      <b-col md="6" class="d-flex flex-column align-items-center">
        <h2 class="title mb-3 mt-4 ms-1 me-1">Панель учителя</h2>
        <b-button class="custom-btn-blue mt-2 mb-2" @click="routeToPage('/newConstraint')">Добавление ограничений
        </b-button>
        <b-button class="custom-btn-red mt-2 mb-2" @click="routeToPage('/removeConstraint')">Удаление ограничений
        </b-button>
        <b-button class="custom-btn mt-2 mb-2" @click="logOut()">Выход</b-button>
      </b-col>
      <b-col md="6">
        <b-col class="mt-3 me-3 ms-3 mb-1">
          <b-img :src="imageModal" alt="Image" fluid class="rounded-custom"></b-img>
        </b-col>
      </b-col>
    </b-row>
  </div>
</template>

<style scoped>
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

.rounded-custom {
  border-radius: 130px;
}

.title {
  text-align: center;
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


.custom-btn {
  background-color: #fff;
  color: black;
  border: 1px solid #ced4da;
  border-radius: 20px;
  font-size: 1.5rem;
  width: 90%;
  transition: background-color 0.5s ease;
}
</style>