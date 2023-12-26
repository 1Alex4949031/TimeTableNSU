<script setup>
import {ref, onMounted} from 'vue';
import {getTeachers} from "@/js/add-get-request";
import router from "@/router/router";
import teacherImg from "@/assets/images/teachers.png"

const teachers = ref([]);

onMounted(() =>
    getTeachers(teachers))

const goToTeacherTimetable = (teacher) => {
  router.push({path: `/teachers/${teacher}/table`});
};


</script>

<template>
  <b-row>
    <b-col md="6">
      <b-col class="mt-4 ms-4 me-4" data-aos="fade-in" data-aos-duration="1300" data-aos-once="true">
        <h1>Список учителей</h1>
        <h4 class="mt-4" v-if="teachers.length === 0">Похоже, список пуст!</h4>
        <ul v-else class="list-group list-group-flush" data-aos="fade-in" data-aos-duration="1300" data-aos-once="true">
          <li class="list-group-item" v-for="teacher in teachers" :key="teacher"
              @click="goToTeacherTimetable(teacher)">
            {{ teacher }}
          </li>
        </ul>
      </b-col>
    </b-col>
    <b-col md="6" data-aos="fade-in" data-aos-duration="1300" data-aos-once="true">
      <b-col class="mt-3 me-5 ms-5">
        <b-img :src=teacherImg alt="Faculty image" fluid class="rounded-custom"/>
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