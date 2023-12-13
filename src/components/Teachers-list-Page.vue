<script setup>
import {ref, onMounted, computed} from 'vue';
import {getTeachers} from "@/js/add-get-request";
import router from "@/router/router";
import {faculties} from "@/js/data-for-show";

const teachers = ref([]);

onMounted(() => getTeachers(teachers))

const goToGroupTimetable = (teacher) => {
  router.push({path: `/teachers/${teacher}/table`});
};

const imageSrc = computed(() => {
  return faculties["ФФ"]?.imageSrc;
});


</script>

<template>
  <b-row>
    <b-col md="6">
      <b-col class="mt-4 ms-4 me-4">
        <h1 data-aos="fade-in" data-aos-duration="1300" data-aos-once="true">
          Список учителей
        </h1>
        <ul class="list-group list-group-flush" data-aos="fade-in" data-aos-duration="1300" data-aos-once="true">
          <li class="list-group-item" v-for="teacher in teachers" :key="teacher"
              @click="goToGroupTimetable(teacher)">
            {{ teacher }}
          </li>
        </ul>
      </b-col>
    </b-col>
    <b-col md="6" data-aos="fade-in" data-aos-duration="1300" data-aos-once="true">
      <b-col class="mt-3 me-5 ms-5">
        <b-img :src=imageSrc alt="Faculty image" fluid class="rounded-custom"/>
      </b-col>
    </b-col>
  </b-row>
</template>

<style scoped>
.list-group-item {
  font-size: 1.2em;
  cursor: pointer;
}

.rounded-custom {
  border-radius: 130px;
}
</style>