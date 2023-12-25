<script setup>

import {addSubject} from "@/js/add-get-request";
import imageModal from "@/assets/images/imageModal3.png";
import {ref} from "vue";

const name = ref("")

function addSubjects() {
  for (let x of name.value.split(";")) {
    addSubject(x, 0)
  }
}

</script>

<template>
  <div>
    <b-row>
      <b-col md="6">
        <b-col class="mt-4 ms-4 me-4">
          <h2 class="mb-4">Добавление предмета</h2>
          <b-form>
            <b-form-group class="form-group" label="Название" label-for="input-subject-name">
              <b-form-input class="custom-input" v-model="name" id="input-subject-name"
                            placeholder="Введите название предмета, или несколько через ; ~ xxx;xxx;xxx;xxx">
              </b-form-input>
            </b-form-group>

            <b-button class="custom-btn mt-4" @click="addSubjects">
              Создать предмет
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