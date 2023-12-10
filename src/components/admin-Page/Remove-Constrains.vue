<script setup>

import {onMounted, ref} from "vue";
import {getConstrains, removeConstrains} from "@/js/constraint-requests";
const allConstrains = ref([])
const constrains = ref()

function remove() {
  for (const x of constrains.value) {
    removeConstrains(x)
  }
}
function processConstrains(rawConstrains) {
  return rawConstrains.map(constrain => {
    // Фильтрация и объединение всех непустых значений, кроме id
    let textValues = Object.entries(constrain)
        .filter(([key, value]) => value != null  && key !== 'constraintNameEng')
        .map(([key, value]) => {
          if(key !== "dd")
           return  `${value}`;
        })
        .join(","); // КОСТЫЛЬ незнаю как разбить на несколько строк...

    // Возвращаем объект для options с id и текстом
    return { value: constrain.id, text: constrain.id + textValues };
  });
}
onMounted(async () => {
  const rawConstrains = await getConstrains()
  allConstrains.value = processConstrains(rawConstrains)
})
</script>

<template>
  <div>
        <h2 class="modal-title mb-4">Управление учебным планом</h2>
        <b-form>
          <b-form-group class="form-group" label="Все ограничения" label-for="input-subject-groups">
            <b-form-select v-model="constrains" :options="allConstrains" multiple="true" id="input-subject-groups"/>
          </b-form-group>

          <b-button class="custom-btn mt-4" @click="remove">
            Удалить выбранные ограничения
          </b-button>
        </b-form>
  </div>
</template>

<style scoped>


</style>