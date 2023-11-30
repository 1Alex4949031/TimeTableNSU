<script setup>
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import {getFacultyGroups} from "@/js/axios-request";

const route = useRoute();
const facultyName = route.params.facultyId;
const groups = ref([]);

onMounted(() => getFacultyGroups(facultyName, groups))

</script>

<template>
  <div>
    <h1>Группы факультета</h1>
    <ul>
      <li v-for="group in groups" :key="group.id">
        {{ group.groupNumber }}
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>