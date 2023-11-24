<script setup>

import {reactive} from "vue";

const faculties = reactive([
  {
    name: "Геолого-геофизический факультет",
    imageSrc: require("@/assets/images/faculties/ggf.png"),
  },
  {
    name: "Факультет информационных технологий",
    imageSrc: require("@/assets/images/faculties/fit.png"),
  },
  {
    name: "Гуманитарный институт",
    imageSrc: require("@/assets/images/faculties/hf.png"),
  },
  {
    name: "Институт интеллектуальной робототехники",
    imageSrc: require("@/assets/images/faculties/irf.png"),
  },
  {
    name: "Институт медицины и психологии В. Зельмана",
    imageSrc: require("@/assets/images/faculties/medz.png"),
  },
  {
    name: "Институт философии и права",
    imageSrc: require("@/assets/images/faculties/flf.png"),
  },
  {
    name: "Механико-математический факультет",
    imageSrc: require("@/assets/images/faculties/mmf.png"),
  },
  {
    name: "Факультет естественных наук",
    imageSrc: require("@/assets/images/faculties/nsf.png"),
  },
  {
    name: "Физический факультет",
    imageSrc: require("@/assets/images/faculties/fizf.png"),
  },
  {
    name: "Экономический факультет",
    imageSrc: require("@/assets/images/faculties/ef.png"),
  },
])


</script>

<template>
  <b-container>
    <b-col class="mb-4 mt-4">
      <h1 class="text-faculties">Расписание по факультетам</h1>
    </b-col>
    <b-row>
      <b-col v-for="(faculty, index) in faculties" :key="index" cols="12" md="4" class="mb-2 mt-2">
        <b-img class="faculty-image" :src="faculty.imageSrc" alt="Faculty"></b-img>
        <b-col>
          <p class="faculty-name">{{ faculty.name }}</p>
        </b-col>
      </b-col>
    </b-row>
  </b-container>
</template>

<style scoped>
.text-faculties {
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  font-weight: 700;
}

.faculty-name{
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  font-weight: 600;
}

.faculty-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 40px;
}
</style>