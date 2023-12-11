<script setup>
import router from "@/router/router";

import exampleImg1 from '@/assets/images/example1.png'
import exampleImg2 from '@/assets/images/example2.png'
import exampleImg3 from '@/assets/images/example3.png'
import universityHomeImg from '@/assets/images/university-home.png'
import facultiesImg from '@/assets/images/faculties.png'
import groupsImg from '@/assets/images/groups.png'
import teachersImg from '@/assets/images/teachers.png'


function onClick() {
  router.push('/faculties')
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

  <b-container data-aos="fade-in" data-aos-duration="1000" data-aos-once="true" class="my-5">
    <b-row>
      <b-col>
        <b-img :src="universityHomeImg" fluid class="custom-image"></b-img>
      </b-col>
      <b-col md="6" class="nav-faculty" @click="onClick">
        <h3>По факультетам</h3>
      </b-col>
    </b-row>

    <b-row class="mb-3 text-center">
      <b-col>
        <h2 class="text-content">Расписание</h2>
      </b-col>
    </b-row>

    <b-row class="mt-4 mb-4">
      <b-col md="4" class="navigate-image mb-3">
        <b-img class="nav-img image-example" :src="facultiesImg" alt="Картинка 1"></b-img>
        <h3 class="centered-text">По факультетам</h3>
      </b-col>

      <b-col md="4" class="navigate-image mb-3">
        <b-img class="nav-img image-example" :src="groupsImg" alt="Картинка 2"></b-img>
        <h3 class="centered-text">По группам</h3>
      </b-col>

      <b-col md="4" class="navigate-image mb-3">
        <b-img class="nav-img image-example" :src="teachersImg" alt="Картинка 3"></b-img>
        <h3 class="centered-text">По учителям</h3>
      </b-col>
    </b-row>


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
.navigate-image:hover .centered-text {
  opacity: 0;
  visibility: hidden;
}

.centered-text {
  position: absolute;
  top: 40%;
  left: 10%;
  color: white;
}

.navigate-image {
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

.nav-img:hover  {
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
  height: 100%; /* Высота равна высоте родительского элемента */
  background-image: url('@/assets/images/university.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0 25px 50px 0 rgba(0, 0, 0, 0.5);
}

.text-content {
  font-weight: 700;
  color: black;
  margin-top: 2rem;
}

@media (max-width: 599px) {
  .text-content {
    font-size: 25px;
  }
}


@media (min-width: 600px) and (max-width: 899px) {
  .text-content {
    font-size: 30px;
  }
}

@media (min-width: 900px) {
  .text-content {
    font-size: 40px;
  }
}
</style>