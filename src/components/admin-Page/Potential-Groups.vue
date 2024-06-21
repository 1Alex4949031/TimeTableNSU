<script setup>
import {ref, onMounted, onUnmounted} from 'vue';
import {getGroups} from "@/js/add-get-request";
import router from "@/router/router";
import allGroupsImage from "@/assets/images/all_groups.png";
import {connect, disconnect} from "@/js/socket";

//const route = useRoute();

const groups = ref([]);

onMounted(async () =>
    groups.value = await getGroups()
)

const goToGroupTimetable = (groupNumber) => {
  router.push({path: `/potential/group/${groupNumber}/table`});
};

const isLoaded = ref(false);

onMounted(async () => {
  groups.value = await getGroups();
  isLoaded.value = true
  connect()
})

onUnmounted(() => {
  disconnect();
})
</script>

<template>
  <b-row>
    <b-col md="6">
      <b-col class="mt-4 ms-4 me-4">
        <h1 data-aos="fade-in" data-aos-duration="1300" data-aos-once="true">Все группы</h1>
        <h4 data-aos="fade-in" data-aos-duration="1300" data-aos-once="true" class="mt-1" v-if="!isLoaded">Загрузка...</h4>
        <h4 data-aos="fade-in" data-aos-duration="1300" data-aos-once="true" class="mt-2" v-else-if="groups.length === 0">Похоже, список пуст!</h4>
        <ul class="list-group list-group-flush" data-aos="fade-in" data-aos-duration="1300" data-aos-once="true">
          <li class="list-group-item" v-for="group in groups" :key="group.id"
              @click="goToGroupTimetable(group.groupNumber)">
            {{ group.groupNumber }}
          </li>
        </ul>
<!--        <b-button class="custom-btn mt-2 mb-2">Выбранно пар: {{ Object.keys(selectedSubjects).length }}</b-button>-->
<!--        <b-button class="custom-btn mt-2 mb-2"  @click=" router.push('/time-table-edit')">Перейти к редактированию</b-button>-->
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