<script setup>
import router from "@/router/router";
import {faculties} from "@/js/data-for-show";

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
             md="4" v-for="(faculty, index) in Object.entries(faculties)" :key="index" cols="12"
             class="navigate-image mb-3"
             @click="goToFaculty(faculty[0])">
        <b-img class="nav-img image-example" :src="faculty[1].imageSrc" alt="Faculty"></b-img>
        <h3 class="centered-text">{{ faculty[1].name }}</h3>
      </b-col>
    </b-row>
  </b-container>
</template>

<style scoped>
.centered-text {
  font-weight: bold;
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

.text-faculties {
  text-align: center;
  font-weight: 700;
}
</style>