<script setup>

import ggfFaculty from "@/assets/images/ggf-faculty.png";
import fitFaculty from "@/assets/images/fit-faculty.png";
</script>

<template>
  <b-container>
    <b-row >
      <b-col cols="12" md="4">
        <b-img class="faculty-image" :src=ggfFaculty alt="Faculty">
        </b-img>
        <b-col>
          <p>Геолого-геофизический факультет</p>
        </b-col>
      </b-col>
      <b-col md="4">
        <b-img class="faculty-image" :src=ggfFaculty alt="Faculty">
        </b-img>
        <b-col>
          <p>Геолого-геофизический факультет</p>
        </b-col>
      </b-col>
      <b-col md="4">
        <b-img class="faculty-image" :src=ggfFaculty alt="Faculty">
        </b-img>
        <b-col>
          <p>Геолого-геофизический факультет</p>
        </b-col>
      </b-col>

      <b-col cols="12" md="4">
        <b-img class="faculty-image" :src=fitFaculty alt="Faculty">
        </b-img>
        <b-col>
          <p>Факультет информационных технологий</p>
        </b-col>
      </b-col>
      <b-col md="4">
        <b-img class="faculty-image" :src=fitFaculty alt="Faculty">
        </b-img>
        <b-col>
          <p>Факультет информационных технологий</p>
        </b-col>
      </b-col>
      <b-col md="4">
        <b-img class="faculty-image" :src=fitFaculty alt="Faculty">
        </b-img>
        <b-col>
          <p>Факультет информационных технологий</p>
        </b-col>
      </b-col>
    </b-row>
  </b-container>
</template>

<style scoped>
.faculty-image{
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 40px;
}
</style>