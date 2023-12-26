<script setup>

import {addGroup} from "@/js/add-get-request";
import imageModal from "@/assets/images/imageModal1.png";
import {ref} from "vue";
import {facultiesName} from "@/js/data-for-show";

const name = ref("")
const facul = ref("")
const studentCount = ref(15)
const course = ref(1)

function addGroups() {
  for (let x of name.value.split(";")) {
    addGroup(x, facul.value, studentCount.value, course.value)
  }
}

</script>

<template>
  <div>
    <b-row data-aos="fade-in" data-aos-duration="1000" data-aos-once="true">
      <b-col md="6">
        <b-col class="mt-4 ms-4 me-4">
          <h2 class="modal-title mb-4">Добавление Группы</h2>
          <b-form>
            <b-form-group class="form-group" label="Номер группы" label-for="input-group-name">
              <b-form-input class="custom-input" v-model="name" id="input-group-name"
                            placeholder="Введите номер, или несколько через ; ~ xxx;xxx;xxx;xxx" type="text">
              </b-form-input>
            </b-form-group>
            <b-form-group class="form-group" label="Факультет" label-for="input-group-type">
              <b-form-select v-model="facul" :options="facultiesName" label="Выберите опцию"
                             id="input-group-type"></b-form-select>
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
            <b-button class="custom-btn mt-4"
                      @click="addGroups">
              Создать группу
            </b-button>
          </b-form>
        </b-col>
      </b-col>
      <b-col md="6">
        <b-col class="mt-3 me-5 ms-5 mb-1">
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