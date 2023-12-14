<script setup>
import router from "@/router/router";

import exampleImg1 from '@/assets/images/example1.png'
import exampleImg2 from '@/assets/images/example2.png'
import exampleImg3 from '@/assets/images/example3.png'
import universityHomeImg from '@/assets/images/university-home.png'
import facultiesImg from '@/assets/images/faculties.png'
import groupsImg from '@/assets/images/groups.png'
import teachersImg from '@/assets/images/teachers.png'
import {openModalAuth} from "@/js/ModalLogic";
import {isUserLogin} from "@/js/axios-auth-request";


function toFaculties() {
  router.push('/faculties')
}

function toTeachers() {
  router.push('/teachers')
}

function toOptions() {
  router.push('/admNav')
}

function toAllGroups() {
  router.push('/all_groups')
}
</script>


<template>
  <b-container data-aos="fade-in" data-aos-duration="1300" data-aos-once="true" fluid="true"
               class="px-0 d-flex flex-column vh-100">
    <b-row class="flex-grow-1">
      <b-col cols="12" class="p-0">
        <div class="background-image"></div>
      </b-col>
    </b-row>

    <b-row class="d-flex align-items-start justify-content-center">
      <b-col cols="12" class="text-center">
        <div class="text-content">Удобное расписание для вашего образовательного учреждения!</div>
      </b-col>
    </b-row>
  </b-container>

  <b-container data-aos="fade-in" data-aos-duration="1000" data-aos-once="true" class="my-2">
    <b-col class="transparent-line mt-3 mb-4"></b-col>
    <b-row>
      <b-col md="7">
        <b-img :src="universityHomeImg" fluid class="custom-image"></b-img>
      </b-col>
      <b-col md="5" class="section-for-teachers align-self-center mt-4 mb-4">
        <b-col class="d-flex justify-content-center mt-2 mb-2">
          <h1 class="text-for-teacher">Для учителей</h1>
        </b-col>
        <b-col class="d-flex justify-content-center align-content-between mt-2 mb-2 ms-5 me-5">
          <h4 v-if="isUserLogin === 'User'" class="text-for-teacher-description">Для того, чтобы добавлять предпочтения,
            пожалуйста, свяжитесь с администратором и войдите в систему!</h4>
          <h4 v-else class="text-for-teacher-description">Вы успешно вошли в систему, теперь можно внести предпочтения
            перейдя в соответствующий раздел!</h4>
        </b-col>
        <b-col class="nav-faculty mt-2 mb-2">
          <b-button v-if="isUserLogin === 'User'" class="custom-btn" @click="openModalAuth()">Войти в систему</b-button>
          <b-button v-else class="custom-btn" @click="toOptions">В раздел опций</b-button>
        </b-col>
      </b-col>
    </b-row>

    <b-col class="transparent-line mt-3 mb-2"></b-col>
    <b-row class="mb-2 text-center">
      <b-col>
        <h2 class="text-content">Расписание</h2>
      </b-col>
    </b-row>

    <b-row class="mt-4 mb-1">
      <b-col md="4" class="navigate-image mb-3" @click="toFaculties">
        <b-img class="nav-img image-example" :src="facultiesImg" alt="Картинка 1"></b-img>
        <h3 class="centered-text">По факультетам</h3>
      </b-col>

      <b-col md="4" class="navigate-image mb-3" @click="toAllGroups">
        <b-img class="nav-img image-example" :src="groupsImg" alt="Картинка 2"></b-img>
        <h3 class="centered-text">По группам</h3>
      </b-col>

      <b-col md="4" class="navigate-image mb-1" @click="toTeachers">
        <b-img class="nav-img image-example" :src="teachersImg" alt="Картинка 3"></b-img>
        <h3 class="centered-text">По учителям</h3>
      </b-col>
    </b-row>

    <b-col class="transparent-line mt-3 mb-2"></b-col>
    <b-row class="mb-3 text-center">
      <b-col>
        <h2 class="text-content">Как это работает?</h2>
      </b-col>
    </b-row>

    <b-row>
      <b-col md="4" class="mb-3">
        <b-img class="image-example" :src="exampleImg1" alt="Картинка 1"></b-img>
        <b-col>
          <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et
            dolore magna aliqua ut enim ad.</p>
        </b-col>
      </b-col>

      <b-col md="4" class="mb-3">
        <b-img class="image-example" :src="exampleImg2" alt="Картинка 2"></b-img>
        <b-col>
          <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et
            dolore magna aliqua ut enim ad.</p>
        </b-col>
      </b-col>

      <b-col md="4" class="mb-3">
        <b-img class="image-example" :src="exampleImg3" alt="Картинка 3"></b-img>
        <b-col>
          <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et
            dolore magna aliqua ut enim ad.</p>
        </b-col>
      </b-col>
    </b-row>
  </b-container>
</template>

<style scoped>
.transparent-line {
  width: 100%;
  border-top: 2px solid #EAEAEA;
}

.text-for-teacher-description {
  text-align: center;
}

.custom-btn {
  background-color: #fff;
  color: black;
  border: 1px solid #ced4da;
  border-radius: 20px;
  width: 70%;
  font-size: 1.5rem;
  transition: background-color 0.5s ease;
}

.navigate-image:hover .centered-text {
  opacity: 0;
  visibility: hidden;
}

.text-for-teacher {
  text-align: center;
  font-weight: 600;
  color: black;
}

.centered-text {
  position: absolute;
  top: 40%;
  left: 10%;
  color: white;
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

.nav-img {
  filter: brightness(50%);
  transition: transform 0.3s ease, filter 0.3s ease;
}

.nav-img:hover {
  filter: brightness(95%);
  transition: transform 0.3s ease, filter 0.3s ease;
}

.nav-faculty:hover h3 {
  transform: scale(1.2);
  transition: transform 0.3s ease;
}

.nav-faculty h3 {
  transition: transform 0.3s ease;
}

.custom-image {
  border-radius: 130px;
}

.nav-faculty {
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.description {
  margin-top: 30px;
  font-weight: 300;
  color: black;
}

.image-example {
  border-radius: 50px;
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: cover
}

.background-image {
  height: 100%;
  background-image: url('@/assets/images/university.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0 25px 50px 0 rgba(0, 0, 0, 0.5);
}

.text-content {
  font-weight: 700;
  color: black;
  margin-top: 1rem;
}

@media (max-width: 599px) {
  .text-content {
    font-size: 25px;
  }

  .text-for-teacher {
    font-size: 30px;
  }

  .text-for-teacher-description {
    font-size: 18px;
  }
}


@media (min-width: 600px) and (max-width: 899px) {
  .text-content {
    font-size: 30px;
  }

  .text-for-teacher {
    font-size: 30px;
  }

  .text-for-teacher-description {
    font-size: 25px;
  }
}

@media (min-width: 900px) {
  .text-content {
    font-size: 40px;
  }

  .text-for-teacher {
    font-size: 40px;
  }

  .text-for-teacher-description {
    font-size: 25px;
  }
}
</style>