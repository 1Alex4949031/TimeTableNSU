<script setup>

import {addSubject} from "@/js/add-get-request";
import imageModal from "@/assets/images/imageModal3.png";
import {ref} from "vue";

const name = ref("")

function addSubjects(){
  for (let x of name.value.split(";")) {
    addSubject(x,0)
  }
}

</script>

<template>
  <div>
    <b-row>
      <b-col md="6" class="d-flex flex-column">
        <h2 class="modal-title mb-4">Управление Группами</h2>
        <b-form>
          <b-form-group class="form-group" label="Название" label-for="input-subject-name">
            <b-form-input class="custom-input" v-model="name" id="input-subject-name"
                          placeholder="Введите название предмета, или несколько через ; ~ xxx;xxx;xxx;xxx">
            </b-form-input>
          </b-form-group>

          <b-button class="custom-btn mt-4" @click="addSubjects">
            Создать предмет</b-button>
        </b-form>
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
.rounded-custom {
  border-radius: 130px;
}
</style>