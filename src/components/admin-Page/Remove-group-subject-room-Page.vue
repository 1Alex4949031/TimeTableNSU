<script setup>
import {onMounted, ref} from "vue";
import {getGroups} from "@/js/add-get-request";


const allGroup = ref([])
const group = ref()

function remove() {
  // for (const x of constraint.value) {
  // }
}
function processGroup(rawGroup) {
  return rawGroup.map(group => {
    return { value: group.groupNumber, text: group.groupNumber + " " + group.faculty };
  });
}
onMounted(async () => {
  const rawGroup = await getGroups()
  allGroup.value = processGroup(rawGroup)
})
</script>

<template>
  <div>
    <h2 class="modal-title mb-4">Управление учебным планом</h2>
    <b-form>
      <b-form-group class="form-group" label="Все ограничения" label-for="input-subject-groups">
        <b-form-select v-model="group" :options="allGroup" multiple="true" id="input-subject-groups"/>
      </b-form-group>

      <b-button class="custom-btn mt-4" @click="remove">
        Удалить выбранные ограничения
      </b-button>
    </b-form>
  </div>

  <div>
    <label v-for="(group, index) in allGroup" :key="index">
      <input type="checkbox" v-model="allGroup" :value="group">
      {{ group }}
    </label>
  </div>

</template>

<style scoped>

</style>