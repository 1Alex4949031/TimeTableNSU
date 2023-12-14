<script setup>
import {ref, onMounted} from 'vue';
import {getGroups} from "@/js/add-get-request";
import router from "@/router/router";
import allGroupsImage from '@/assets/images/all_groups.png'

const groups = ref([]);

onMounted(async () => {
  groups.value = await getGroups();
})

const goToGroupTimetable = (groupNumber) => {
  router.push({path: `/all_groups/${groupNumber}/table`});
};
</script>

<template>
  <b-row>
    <b-col md="6">
      <b-col class="mt-4 ms-4 me-4">
        <h1 data-aos="fade-in" data-aos-duration="1300" data-aos-once="true">
          Все группы
        </h1>
        <ul class="list-group list-group-flush" data-aos="fade-in" data-aos-duration="1300" data-aos-once="true">
          <li class="list-group-item" v-for="group in groups" :key="group.id"
              @click="goToGroupTimetable(group.groupNumber)">
            {{ group.groupNumber }}
          </li>
        </ul>
      </b-col>
    </b-col>
    <b-col md="6" data-aos="fade-in" data-aos-duration="1300" data-aos-once="true">
      <b-col class="mt-3 me-5 ms-5">
        <b-img :src=allGroupsImage alt="Faculty image" fluid class="rounded-custom"/>
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