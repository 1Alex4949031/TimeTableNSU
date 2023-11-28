<script setup>

import {addGroup} from "@/js/axios-request";
import imageModal from "@/assets/images/imageModal.png";
import {ref} from "vue";

const facultets = ["ФИТ", "ММ", "ФФ", "ФИЯ", "ФЕН"]
const name = ref("")
const facul = ref("")
const studentCount = ref(15)
const course = ref(1)

</script>

<template>
  <div>
    <b-row>
      <b-col md="6" class="d-flex flex-column">
        <h2 class="modal-title mb-4">Управление Группами</h2>
        <b-form>
          <b-form-group class="form-group" label="Номер группы" label-for="input-group-name">
            <b-form-input class="custom-input" v-model="name" id="input-group-name"
                          placeholder="Введите номер" type="number">
            </b-form-input>
          </b-form-group>
          <b-form-group class="form-group" label="Факультет" label-for="input-group-type">
            <b-form-select v-model="facul" :options="facultets" label="Выберите опцию" id="input-group-type"></b-form-select>
          </b-form-group>
          <b-form-group class="form-group" label="Количество студентов" label-for="input-group-cap">
            <b-form-input class="custom-input" v-model="studentCount" id="input-group-cap"
                          placeholder="0" type="number">
            </b-form-input>
          </b-form-group>
          <b-form-group class="form-group" label="Курс" label-for="input-group-course">
            <b-form-input class="custom-input" v-model="course" id="input-group-course"
                          placeholder="" type="number">
            </b-form-input>
          </b-form-group>
          <b-button class="custom-btn mt-4" @click="addGroup(name.valueOf(), facul.valueOf(), studentCount.valueOf(), course.valueOf())">
            Создать аудиторию</b-button>
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