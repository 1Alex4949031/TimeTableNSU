<script setup>
import {ref, onMounted} from 'vue';
import {getChanges} from "@/js/add-get-request";
import allGroupsImage from "@/assets/images/all_groups.png";
import {format, parseISO} from 'date-fns';


const changes = ref()
const isLoaded = ref(false);

onMounted(async () => {
      changes.value = await getChanges();
      isLoaded.value = true
    }
)
const formatDate = (dateString) => {
  return format(parseISO(dateString), 'dd.MM.yyyy');
}

</script>

<template>
  <b-row>
    <b-col md="6">
      <b-col class="mt-4 ms-4 me-4">
        <h1 data-aos="fade-in" data-aos-duration="1300" data-aos-once="true">Изменения в расписании</h1>
        <h4 data-aos="fade-in" data-aos-duration="1300" data-aos-once="true" class="mt-1" v-if="!isLoaded">
          Загрузка...</h4>
        <h4 data-aos="fade-in" data-aos-duration="1300" data-aos-once="true" class="mt-2"
            v-else-if="changes.length === 0">Похоже, список пуст!</h4>
        <ul class="list-group list-group-flush" data-aos="fade-in" data-aos-duration="1300" data-aos-once="true">
          <li class="list-group-item" v-for="(change, index) in changes" :key="change.id">
            {{ index + 1 }}) <span class="bold-text">{{ formatDate(change.dateOfCreation) }}</span> <br>
            {{ change.description }}
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
.bold-text {
  font-weight: bold;
}

.list-group-item {
  font-size: 1.2em;
}

.rounded-custom {
  border-radius: 130px;
}
</style>