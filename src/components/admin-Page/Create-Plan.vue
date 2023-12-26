<script setup>

import {addPlan, getGroups, getSubject, getTeachers} from "@/js/add-get-request";
import imageModal from "@/assets/images/imageModal2.png"; //на рандом 2 дописал
import {onMounted, ref} from "vue";
import {roomTypes} from "@/js/data-for-show";
import Multiselect from "@vueform/multiselect";

const teachers = ref([])
const teacher = ref("")
const allGroups = ref([])
const groups = ref()
const allSubject = ref([])
const subject = ref("")

const subjectRequirement = ref("")//Есть вероятность что это можно привязать к предметам, но пока так
const timeAWeek = ref(1)

function addPlansLocal() {
  if (subjectRequirement.value !== roomTypes[0].value) {
    groups.value.forEach(x => {
      addPlan(
          teacher.value,
          subject.value,
          timeAWeek.value,
          subjectRequirement.value,
          x)
    })
  } else {
    addPlan(
        teacher.value,
        subject.value,
        timeAWeek.value,
        subjectRequirement.value,
        groups.value.join(",")
    )
  }
}

onMounted(async () => {
  getTeachers(teachers)
  allSubject.value = await getSubject()
  const rawGroup = await getGroups()
  for (let x of rawGroup) {
    allGroups.value.push(x.groupNumber)
  }
})
</script>

<template>
  <div>
    <b-row data-aos="fade-in" data-aos-duration="1000" data-aos-once="true">
      <b-col md="6">
        <b-col class="mt-4 ms-4 me-4">
          <h2 class="modal-title mb-4">Добавление Учебного плана</h2>
          <b-form>
            <b-form-group class="form-group" label="Преподователь" label-for="input-subject-teacher">
              <b-form-select v-model="teacher" :options="teachers" label="ФИО"
                             id="input-subject-teacher"></b-form-select>
            </b-form-group>
            <b-form-group class="form-group" label="Группы" label-for="input-subject-groups">
              <Multiselect
                  v-model="groups"
                  mode="tags"
                  :close-on-select="false"
                  :searchable="true"
                  :create-option="true"
                  :options="allGroups"
              />
            </b-form-group>
            <b-form-group class="form-group" label="Предмет" label-for="input-subject-groups">
              <b-form-select v-model="subject" :options="allSubject" id="input-subject-groups"></b-form-select>
            </b-form-group>
            <b-form-group class="form-group" label="Тип комнаты" label-for="input-room-type">
              <b-form-select v-model="subjectRequirement" :options="roomTypes" label="Выберите опцию"></b-form-select>
            </b-form-group>
            <b-form-group class="form-group" label="Раз в неделю" label-for="input-subject-times">
              <b-form-input class="custom-input" v-model="timeAWeek" id="input-subject-times"
                            placeholder="" type="number">
              </b-form-input>
            </b-form-group>


            <b-button class="custom-btn mt-4"
                      @click="addPlansLocal()">
              Добавить учебный план
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