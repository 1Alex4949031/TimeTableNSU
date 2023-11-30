<script setup>

import {getGroups, getTeachers} from "@/js/axios-request";
import imageModal from "@/assets/images/imageModal.png";
import {onMounted, ref} from "vue";

const teachers = ref([])
const teacher = ref("")
const allGroups = ref([])
const groups = ref("")
const name = ref("")
const timeAWeek = ref(1)

onMounted(() => {
  getTeachers(teachers)
  getGroups(allGroups)
})
</script>

<template>
  <div>
    <b-row>
      <b-col md="6" class="d-flex flex-column">
        <h2 class="modal-title mb-4">Управление предметами</h2>
        <b-form>
          <b-form-group class="form-group" label="Название предмета" label-for="input-subject-name">
            <b-form-input class="custom-input" v-model="name" id="input-subject-name"
                          placeholder="Проектирование ПО">
            </b-form-input>
          </b-form-group>

          <b-form-group class="form-group" label="Преподователь" label-for="input-subject-teacher">
            <b-form-select v-model="teacher" :options="teachers" label="ФИО" id="input-subject-teacher"></b-form-select>
          </b-form-group>
          <b-form-group class="form-group" label="Группы" label-for="input-subject-groups">
            <b-form-select v-model="groups" :options="allGroups" multiple id="input-subject-groups"></b-form-select>
          </b-form-group>
          <b-form-group class="form-group" label="Пар в неделю" label-for="input-subject-count">
            <b-form-input class="custom-input" v-model="timeAWeek" id="input-subject-count"
                          placeholder="" type="number">
            </b-form-input>
          </b-form-group>

          <b-button class="custom-btn mt-4">
            Добавить предмет
          </b-button>
        </b-form>
      </b-col>
      <b-col md="6" class="mt-3">
        <b-img :src=imageModal alt="Modal image" fluid class="rounded-custom"></b-img>
      </b-col>
    </b-row>

  </div>
</template>

<style scoped>

</style>