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
             v-for="(faculty, index) in Object.entries(faculties)" :key="index" cols="12" md="4"
             class="faculty mb-2 mt-2"
             @click="goToFaculty(faculty[0])">
        <b-img class="faculty-image" :src="faculty[1].imageSrc" alt="Faculty"></b-img>
        <b-col class="mt-1">
          <p class="faculty-name">{{ faculty[1].name }}</p>
        </b-col>
      </b-col>
    </b-row>
  </b-container>
</template>

<style scoped>
.text-faculties {
  text-align: center;
  font-weight: 700;
}

.faculty-name {
  text-align: center;
  font-weight: 600;
  font-size: large;
}

.faculty-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 40px;
  transition: transform 0.3s ease;
}

.faculty-image:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}
</style>