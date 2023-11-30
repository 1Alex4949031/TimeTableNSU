<script setup>
import {useRoute} from 'vue-router';
import timetableExample from "@/assets/images/timetableExample.png";

const route = useRoute();
const groupNumber = route.params.group;

</script>

<template>
  <b-row>
    <b-col md="6">
      <b-col class="mt-4 ms-4 me-4">
        <h1>Расписание группы {{ groupNumber }}</h1>
      </b-col>
    </b-col>
    <b-col md="6">
      <b-col class="mt-3 me-5 ms-5">
        <b-img :src=timetableExample alt="Faculty image" fluid class="rounded-custom"></b-img>
      </b-col>
    </b-col>
  </b-row>
</template>

<style scoped>
.rounded-custom {
  border-radius: 130px;
}
</style>