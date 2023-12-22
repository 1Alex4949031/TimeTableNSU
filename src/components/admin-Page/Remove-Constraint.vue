<script setup>

import {onMounted, ref} from "vue";
import {getConstraint, removeConstraint} from "@/js/constraint-requests";
import Multiselect from "@vueform/multiselect";
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
        .filter(([key, value]) => value != null  && key !== 'constraintNameEng')
        .map(([key, value]) => {
          if(key !== "dd")
           return  `${value}`;
        })
        .join(","); // КОСТЫЛЬ незнаю как разбить на несколько строк...

    // Возвращаем объект для options с id и текстом
    return { value: constraint.id, text: constraint.id + textValues };
  });
}
onMounted(async () => {
  const rawConstraint = await getConstraint()
  allConstraints.value = processConstraint(rawConstraint)
})
</script>

<template>
  <div>
        <h2 class="modal-title mb-4">Управление учебным планом</h2>
        <b-form>
          <b-form-group class="form-group" label="Все ограничения" label-for="input-subject-groups">
            <Multiselect
                v-model="constraint"
                mode="tags"
                :close-on-select="false"
                :searchable="true"
                :create-option="true"
                :options="allConstraints"
            />
          </b-form-group>

          <b-button class="custom-btn mt-4" @click="remove">
            Удалить выбранные ограничения
          </b-button>
        </b-form>
  </div>
</template>

<style scoped>


</style>