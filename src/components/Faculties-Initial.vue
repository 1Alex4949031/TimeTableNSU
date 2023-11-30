<script setup>

import {reactive} from "vue";
import router from "@/router/router";

const faculties = reactive([
  {
    id: "ГГФ",
    name: "Геолого-геофизический факультет",
    imageSrc: require("@/assets/images/faculties/ggf.png"),
  },
  {
    id: "ФИТ",
    name: "Факультет информационных технологий",
    imageSrc: require("@/assets/images/faculties/fit.png"),
  },
  {
    id: "ГИ",
    name: "Гуманитарный институт",
    imageSrc: require("@/assets/images/faculties/hf.png"),
  },
  {
    id: "ИИР",
    name: "Институт интеллектуальной робототехники",
    imageSrc: require("@/assets/images/faculties/irf.png"),
  },
  {
    id: "ИМПЗ",
    name: "Институт медицины и психологии В. Зельмана",
    imageSrc: require("@/assets/images/faculties/medz.png"),
  },
  {
    id: "ИФП",
    name: "Институт философии и права",
    imageSrc: require("@/assets/images/faculties/flf.png"),
  },
  {
    id: "ММФ",
    name: "Механико-математический факультет",
    imageSrc: require("@/assets/images/faculties/mmf.png"),
  },
  {
    id: "ФЕН",
    name: "Факультет естественных наук",
    imageSrc: require("@/assets/images/faculties/nsf.png"),
  },
  {
    id: "ФФ",
    name: "Физический факультет",
    imageSrc: require("@/assets/images/faculties/fizf.png"),
  },
  {
    id: "ЭФ",
    name: "Экономический факультет",
    imageSrc: require("@/assets/images/faculties/ef.png"),
  },
])

const goToFaculty = (facultyId) => {
  router.push({path: `/faculties/${facultyId}/groups`});
};

</script>

<template>
  <b-container>
    <b-col data-aos="fade-in" data-aos-duration="1300" data-aos-once="true" class="mb-4 mt-4">
      <h1 class="text-faculties">Расписание по факультетам</h1>
    </b-col>
    <b-row>
      <b-col data-aos="fade-in" data-aos-duration="2000" data-aos-once="true"
             v-for="(faculty, index) in faculties" :key="index" cols="12" md="4" class="mb-2 mt-2"
             @click="goToFaculty(faculty.id)">
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

.faculty-name {
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