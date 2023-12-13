<script setup>
import {onMounted, ref} from "vue";
import {getGroups, getRoom, getSubject, removeGroup, removeRoom, removeSubject} from "@/js/add-get-request";
import Multiselect from '@vueform/multiselect'
import "@vueform/multiselect/themes/default.css"
import imageModal from "@/assets/images/imageModal1.png";

const removeType = ["Групп", "Комнат", "Предметов"]
const selectedRemoveType = ref()

const allGroup = ref([])
const group = ref()

const allSubject = ref([])
const subject = ref()

const allRoom = ref([])
const room = ref()

async function remove() {
  switch (selectedRemoveType.value) {
    case 'Групп' : {
      for (let x in group.value) {
        console.log(x, allGroup.value[x].value)
        await removeGroup(allGroup.value[x].value)
      }
      const rawGroup = await getGroups()
      allGroup.value = processGroup(rawGroup)
      group.value = []
      break;
    }
    case 'Комнат': {
      for (let x in room.value) {
        removeRoom(allRoom.value[x].value)
      }
      const rawRoom = await getRoom()
      allRoom.value = processRoom(rawRoom)
      room.value = []
      break;
    }
    case 'Предметов': {
      for (let x in subject.value) {
        removeSubject(allSubject.value[x].value)
      }
      const rawSubject = await getSubject()
      allSubject.value = processSubject(rawSubject)
      subject.value = []
      break;
    }
  }
}

function processGroup(rawGroup) {
  return rawGroup.map(group => {
    return {value: group.groupNumber, label: group.groupNumber + " " + group.faculty};
  });
}

function processSubject(rawSubject) {
  return rawSubject.map(subject => {
    return {value: subject, label: subject};
  });
}

function processRoom(rawRoom) {
  return rawRoom.map(room => {
    return {value: room.name, label: room.name + " " + room.type + " Вместимость: " + room.capacity};
  });
}

onMounted(async () => {
  const rawGroup = await getGroups()
  allGroup.value = processGroup(rawGroup)

  const rawSubject = await getSubject()
  allSubject.value = processSubject(rawSubject)

  const rawRoom = await getRoom()
  allRoom.value = processRoom(rawRoom)
})
</script>

<template>

  <div>
    <b-row>
      <b-col md="6">
        <b-col class="mt-4 ms-4 me-4">
          <h2 class="modal-title mb-4">Удаление основных значений</h2>
          <h6 class="modal-title mb-4">Удаление не приведёт к удалению из действующего расписания!</h6>
          <b-form>
            <b-form-group class="form-group" label="Удаление" label-for="input-group-type">
              <b-form-select v-model="selectedRemoveType" :options="removeType" label="Выберите опцию"
                             id="input-group-type"/>
            </b-form-group>
            <div v-if="selectedRemoveType === 'Групп'">
              <b-form-group class="form-group" label="Список групп">
                <Multiselect
                    v-model="group"
                    mode="tags"
                    :close-on-select="false"
                    :searchable="true"
                    :create-option="true"
                    :options="allGroup"
                />
              </b-form-group>
            </div>

            <div v-if="selectedRemoveType === 'Комнат'">
              <b-form-group class="form-group" label="Список комнат">
                <Multiselect
                    v-model="room"
                    mode="tags"
                    :close-on-select="false"
                    :searchable="true"
                    :create-option="true"
                    :options="allRoom"
                />
              </b-form-group>
            </div>

            <div v-if="selectedRemoveType === 'Предметов'">
              <b-form-group class="form-group" label="Список предметов">
                <Multiselect
                    v-model="subject"
                    mode="tags"
                    :close-on-select="false"
                    :searchable="true"
                    :create-option="true"
                    :options="allSubject"
                />
              </b-form-group>
            </div>
            <b-button class="custom-btn" @click="remove">
              Удалить
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

</style>