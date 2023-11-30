<script setup>
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import {getFacultyGroups} from "@/js/axios-request";
import imageFaculty from "@/assets/images/faculties/fit.png";
import router from "@/router/router";

const route = useRoute();
const facultyName = route.params.facultyId;
const groups = ref([]);

onMounted(() => getFacultyGroups(facultyName, groups))

const goToGroupTimetable = (groupNumber) => {
  router.push({path: `/faculties/${facultyName}/${groupNumber}/table`});
};


</script>

<template>
  <b-row>
    <b-col md="6">
      <b-col class="mt-4 ms-4 me-4">
        <h1>Группы факультета</h1>
        <ul class="list-group list-group-flush">
          <li class="list-group-item" v-for="group in groups" :key="group.id"
              @click="goToGroupTimetable(group.groupNumber)">
            {{ group.groupNumber }}
          </li>
        </ul>
      </b-col>
    </b-col>
    <b-col md="6">
      <b-col class="mt-3 me-5 ms-5">
        <b-img :src=imageFaculty alt="Faculty image" fluid class="rounded-custom"></b-img>
      </b-col>
    </b-col>
  </b-row>
</template>

<style scoped>
.rounded-custom {
  border-radius: 130px;
}
</style>