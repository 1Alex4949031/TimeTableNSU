<script setup>
import {onMounted, ref} from "vue";
import {
  getGroups,
  getPlan,
  getRoom,
  getSubject,
  removeGroup,
  removePlan,
  removeRoom,
  removeSubject
} from "@/js/add-get-request";
import Multiselect from '@vueform/multiselect'
import "@vueform/multiselect/themes/default.css"
import imageModal from "@/assets/images/imageModal4.png";
import {processGroup, processPlan, processRoom, processSubject} from "@/js/process-select";

const removeType = ["Групп", "Комнат", "Предметов", "Учебного плана"]
const selectedRemoveType = ref()

const allGroup = ref([])
const group = ref()

const allSubject = ref([])
const subject = ref()

const allPlan = ref([])
const plan = ref()

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
    case 'Учебного плана': {
      for (let x of plan.value) {
        removePlan(x)
      }
      const rawPlan = await getPlan()
      allPlan.value = processPlan(rawPlan)
      plan.value = []
      break;
    }
  }
}

onMounted(async () => {
  const rawGroup = await getGroups()
  allGroup.value = processGroup(rawGroup)

  const rawSubject = await getSubject()
  allSubject.value = processSubject(rawSubject)

  const rawRoom = await getRoom()
  allRoom.value = processRoom(rawRoom)

  const rawPlan = await getPlan()
  allPlan.value = processPlan(rawPlan)
})
</script>
<template>
  <div>
    <b-row data-aos="fade-in" data-aos-duration="1000" data-aos-once="true">
      <b-col md="6">
        <b-col class="mt-4 ms-4 me-4">
          <h2 class="modal-title mb-4">Удаление основных параметров расписания</h2>
          <h6 class="modal-title mb-4">Чтобы внести изменения в составленное расписание, удалите необходимые параметры и
            обратитесь к администратору!</h6>
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
            <div v-if="selectedRemoveType === 'Учебного плана'">
              <b-form-group class="form-group" label="Список предметов">
                <Multiselect
                    v-model="plan"
                    mode="tags"
                    :close-on-select="false"
                    :searchable="true"
                    :create-option="true"
                    :options="allPlan"
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
        <b-col class="mt-3 me-5 ms-5 mb-1">
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