<script setup>

import {onMounted, ref} from "vue";
import {getConstraint, removeConstraint} from "@/js/constraint-requests";
import Multiselect from "@vueform/multiselect";
import imageModal from "@/assets/images/imageModal2.png";

const allConstraints = ref([])
const constraint = ref()

function remove() {
  for (const x of constraint.value) {
    removeConstraint(x)
  }
}

function processConstraint(rawConstraint) {
  return rawConstraint.map(constraint => {
    // Фильтрация и объединение всех непустых значений, кроме id
    let textValues = Object.entries(constraint)
        .filter(([key, value]) => value != null && key !== 'constraintNameEng')
        .map(([key, value]) => {
          if (key !== "dd")
            return `${value}`;
        })
        .join(","); // КОСТЫЛЬ незнаю как разбить на несколько строк...

    // Возвращаем объект для options с id и текстом
    switch (constraint.constraintNameRu) {
      case 'Запрещенный день для преподавания для преподавателя' : {
        return {
          value: constraint.id,
          label: constraint.constraintNameRu + " " + constraint.teacher + " день - " + constraint.day
        };
      }
      case 'Запрещенный день для преподавания для группы' : {
        return {
          value: constraint.id,
          label: constraint.constraintNameRu + " " + constraint.group + " день - " + constraint.day
        };
      }
      case 'Максимальное кол-во рабочих дней' : {
        return {
          value: constraint.id,
          label: constraint.constraintNameRu + " для " + constraint.teacher + " - " + constraint.number
        };
      }
      case 'Запрещенный порядковый номер пары для преподавателя в определённый день' : {
        return {
          value: constraint.id,
          label: constraint.constraintNameRu + " учитель - " + constraint.teacher + " день - " + constraint.day + " пара - " + constraint.period
        };
      }
      case 'Запрещенные порядковый номер пары для групп в определённый день' : {
        return {
          value: constraint.id,
          label: constraint.constraintNameRu + " группа - " + constraint.group + " день - " + constraint.day + " пара - " + constraint.period
        };
      }
    }
    return {value: constraint.id, label: textValues};
  });
}

onMounted(async () => {
  const rawConstraint = await getConstraint()
  allConstraints.value = processConstraint(rawConstraint)
})
</script>

<template>
  <b-row data-aos="fade-in" data-aos-duration="1000" data-aos-once="true">
    <b-col md="6">
      <b-col class="mt-4 ms-4 me-4 mb-4">
        <h2 class="modal-title mb-4">Удаление Ограничений</h2>
        <b-form>
          <b-form-group class="form-group" label="Все ограничения" label-for="input-subject-groups">
            <Multiselect
                v-model="constraint"
                mode="tags"
                :close-on-select="false"
                :searchable="true"
                :create-option="true"
                :options="allConstraints"/>
          </b-form-group>
          <b-button class="custom-btn mt-4" @click="remove">
            Удалить выбранные ограничения
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
</template>

<style scoped>
.rounded-custom{
  border-radius: 130px;
}
.custom-btn {
  background-color: #fff;
  color: black;
  border: 1px solid #ced4da;
  border-radius: 20px;
  font-size: 1.5rem;
  width: 100%;
  transition: background-color 0.5s ease;
}
</style>