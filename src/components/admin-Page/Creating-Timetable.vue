<script setup>

import imageModal from "@/assets/images/imageModal1.png";
import {
  activateNewTimetable,
  checkNewTimetableStatus,
  createNewTimetable,
  startCreatingNewTimetable
} from "@/js/timetable-setting-request";
import {onMounted, ref} from "vue";

const currentStatus = ref("")
const buttonDisable = ref(false)

async function checkStatus() {
  currentStatus.value = "Upload"
  currentStatus.value = await checkNewTimetableStatus()
  if (currentStatus.value === "Ошибка" || currentStatus.value === "Расписание всё еще составляется") {
    buttonDisable.value = true
  } else {
    buttonDisable.value = false
  }
}

onMounted(async () => {
  checkStatus()
})
</script>

<template>
  <div>
    <b-row>
      <b-col md="6">
        <b-col class="mt-4 ms-4 me-4">
          <h2 class="modal-title mb-4">Управление Расписанием</h2>
          <b-form>

            <div>
              <button @click="checkStatus">Проверить состояние</button>
            </div>
            <div>Текущий статус: {{currentStatus}}</div>

            <div>
              <button @click="startCreatingNewTimetable()" :disabled="buttonDisable">
                Запустить создание нового расписания</button>
            </div>
            <div>
              <button @click="startCreatingNewTimetable(true)" :disabled="buttonDisable">
                Запустить создание расписания по тестовым данным
              </button>
            </div>

            <div>
              <button @click="activateNewTimetable()" :disabled="buttonDisable">Активировать новое расписание</button>
            </div>

            <div>Старые кнопки</div>
            <b-row>
              <b-col>
                <button @click="createNewTimetable()" :disabled="buttonDisable">
                  Создать расписание
                </button>
              </b-col>
              <b-col>
                <button @click="createNewTimetable(true)" :disabled="buttonDisable">
                  по тестовым данным
                </button>
              </b-col>
            </b-row>
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