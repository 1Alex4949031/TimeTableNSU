<script setup>

import {isUserLogin, logOut} from "@/js/axios-auth-request";
import imageModal from "@/assets/images/imageModal1.png";
import router from "@/router/router";
import {logs} from "@/js/socket";

function routeToPage(page) {
  router.push(page)
}

</script>

<template>
  <div v-if="isUserLogin === 'Admin'">
    <b-row data-aos="fade-in" data-aos-duration="1000" data-aos-once="true">
      <b-col md="6" class="d-flex flex-column  align-items-center">
        <h2 class="title mb-3 mt-4 ms-1 me-1">Панель администратора</h2>
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
        <b-button class="custom-btn mt-2 mb-2" @click="logOut()">Выход</b-button>
      </b-col>
      <b-col md="6">
        <b-col class="mt-3 me-3 ms-3 mb-1">
          <h4 class="mb-3 mt-4 ms-1 me-1">
            Список недавних изменений
          </h4>
<!--          <b-img :src="imageModal" alt="Image" fluid class="rounded-custom"></b-img>-->
          <div v-for="log in logs" :key = "log">{{ log.description || log}}</div>
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