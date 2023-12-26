<script setup>

import imageModal from "@/assets/images/imageModal3.png";
import {
  activateNewTimetable,
  checkNewTimetableStatus,
  startCreatingNewTimetable
} from "@/js/timetable-setting-request";
import {onMounted, ref} from "vue";
import closeSvg from "@/assets/images/close.svg";

const currentStatus = ref("")
const buttonDisable = ref(false)
const errorInfo = ref()

const isVisibleInfoErrorModal = ref(false)

async function checkStatus() {
  currentStatus.value = "Upload"
  currentStatus.value = await checkNewTimetableStatus()
  switch (currentStatus.value) {
    case "Ошибка!" : {
      buttonDisable.value = true
      break;
    }
    case "Расписание всё еще составляется" : {
      buttonDisable.value = true
      break;
    }
    case "Расписание успешно составлено и есть в потенциальном": {
      buttonDisable.value = false
      break;
    }
    default: {
      buttonDisable.value = true
      errorInfo.value = currentStatus.value[1]
      currentStatus.value = currentStatus.value[0]
      //Массив ошибок
    }
  }
}

async function startCreatingNew(useTestingParam = false) {
  currentStatus.value = "Upload"
  buttonDisable.value = true
  await startCreatingNewTimetable(useTestingParam)
  await checkStatus()
}

onMounted(() => {
  checkStatus()
})
</script>

<template>
  <div>
    <b-row data-aos="fade-in" data-aos-duration="1000" data-aos-once="true">
      <b-col md="6">
        <b-col class="mt-4 ms-4 me-4">
          <h2 class="mb-4">Управление расписанием</h2>
          <b-button @click="checkStatus" class="custom-btn-blue mt-2 mb-2">Проверить состояние</b-button>
          <h4 class="status-text mt-2 mb-2"> Текущий статус: {{ currentStatus }}</h4>
          <b-col>
            <b-button v-if="buttonDisable" @click="buttonDisable = false" class="custom-btn-blue mt-2 mb-2">Игнорировать</b-button>
            <b-button v-if="buttonDisable && currentStatus === 'Ошибка при составлении расписания'"
                      @click="isVisibleInfoErrorModal = true" class="custom-btn-blue mt-2 mb-2">Подробнее
            </b-button>
          </b-col>
          <b-button @click="startCreatingNew()" :disabled="buttonDisable" class="custom-btn-blue mt-2 mb-2">
            Запустить создание нового расписания
          </b-button>
          <b-button @click="startCreatingNew(true)" :disabled="buttonDisable" class="custom-btn-blue mt-2 mb-2">
            Запустить создание расписания по тестовым данным
          </b-button>
          <b-button @click="activateNewTimetable()" :disabled="buttonDisable" class="custom-btn-blue mt-2 mb-2">Активировать новое
            расписание
          </b-button>
        </b-col>
      </b-col>
      <b-col md="6">
        <b-col class="mt-3 me-5 ms-5 mb-1">
          <b-img :src=imageModal alt="Modal image" fluid class="rounded-custom"></b-img>
        </b-col>
      </b-col>
    </b-row>
  </div>


  <transition enter-active-class="modal-enter-active"
              leave-active-class="modal-leave-active">
    <div class="screen-modal" v-if="isVisibleInfoErrorModal">
      <div class="screen-content-modal">
        <b-button @click="isVisibleInfoErrorModal = false" class="close-button">
          <b-img :src="closeSvg"></b-img>
        </b-button>
        <h2 class="title">Информация о генерации расписания</h2>
        <div class="scrolling-list">
          <div class="justify-content-center" v-for="(item, index) in errorInfo" :key="index">
            <div class="list-item">
              {{
                Object.entries(item)
                    .filter(([key, value]) => value !== null && value !== undefined)
                    .map(([key, value]) => `${key} - ${value}`).join(', ')
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>

<style scoped>
.status-text{
  text-align: center;
}

.custom-btn-blue {
  background-color: #fff;
  color: black;
  border: 1px solid #ced4da;
  border-radius: 20px;
  font-size: 1.5rem;
  width: 100%;
  transition: background-color 0.5s ease;
}

.custom-btn-blue:hover {
  background-color: #6398FF;
  cursor: pointer;
  border: 1px solid #fff;
}

.custom-btn-blue:disabled {
  background-color: #f5f5f5;
  color: #ccc;
  border: 1px solid #ccc;
  cursor: default;
}

@keyframes slide-fade-in {
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}


@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}


.rounded-custom {
  border-radius: 130px;
}

.close-button {
  position: absolute;
  border: 1px solid #ced4da;
  border-radius: 45%;
  color: #ced4da;
  background-color: #fff;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.close-button:hover {
  background-color: #ced4da;
  color: white;
  border: 1px solid #fff;
}

.screen-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3000;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
}

.screen-content-modal {
  border-radius: 10px;
  position: relative;
  animation: slideDown 0.3s ease;
  width: 100%; /* Установите желаемую ширину */
  max-width: 700px; /* Максимальная ширина, если нужна */
  height: 95%;
  background-color: rgba(255, 255, 255, 1);
}

.scrolling-list {
  overflow-y: auto;
  height: 85%;
  max-width: 650px;
  margin: 20px;
}
.list-item{
  border-bottom: 1px solid #425e2b; /* цвет и стиль линии можно изменить */
  margin-bottom: 10px; /* добавляет небольшой отступ после каждого элемента */
  padding-bottom: 10px; /* добавляет небольшой отступ перед линией */
}
.title{
  margin: 20px;
}
</style>