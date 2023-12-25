<script setup>

import {regTeacher} from "@/js/add-get-request";
import imageModal from "@/assets/images/imageModal4.png";
import {ref} from "vue";

const name = ref("")
const email = ref("")
const phone = ref("")
</script>

<template>
  <div>
    <b-row>
      <b-col md="6">
        <b-col class="mt-4 ms-4 me-4">
          <h2 class="modal-title mb-4">Добавление учителя</h2>
          <b-form>
            <b-form-group class="form-group" label="Email" label-for="input-teacher-email">
              <b-form-input class="custom-input" v-model="email" id="input-teacher-email"
                            placeholder="XXX@g.nsu.ru" type="email">
              </b-form-input>
            </b-form-group>
            <b-form-group class="form-group" label="ФИО" label-for="input-teacher-name">
              <b-form-input class="custom-input" v-model="name" id="input-teacher-name"
                            placeholder="Иванов И. И." type="text">
              </b-form-input>
            </b-form-group>

            <b-form-group class="form-group" label="Телефон" label-for="input-teacher-phone">
              <b-form-input class="custom-input" v-model="phone" id="input-teacher-phone"
                            placeholder="+7(999)999 99 99" type="number">
              </b-form-input>
            </b-form-group>
            <b-button class="custom-btn mt-4" @click="regTeacher(email.valueOf(), name.valueOf(), phone.valueOf())">
              Зарегистрировать учителя
            </b-button>
          </b-form>
        </b-col>
      </b-col>
      <b-col md="6">
        <b-col class="mt-3 me-5 ms-5">
          <b-img :src=imageModal alt="Modal image" fluid class="rounded-custom"></b-img>
        </b-col>
      </b-col>
    </b-row>

  </div>
</template>

<style scoped>
.custom-btn {
  background-color: #fff;
  color: black;
  border: 1px solid #ced4da;
  border-radius: 20px;
  font-size: 1.5rem;
  width: 100%;
  transition: background-color 0.5s ease;
}

.rounded-custom {
  border-radius: 130px;
}
</style>