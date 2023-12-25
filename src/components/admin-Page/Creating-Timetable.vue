<script setup>

import imageModal from "@/assets/images/imageModal1.png";
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
    case "Ошибка!" || "Расписание всё еще составляется" : {
      buttonDisable.value = true
      break;
    }
    case "Потенциальное расписание успешно создано": {
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
          <h2 class="modal-title mb-4">Управление Расписанием</h2>
          <b-form>

            <div>
              <button @click="checkStatus">Проверить состояние</button>
            </div>
            <b-row>
              <b-col>Текущий статус: {{ currentStatus }}</b-col>
              <b-col>
                <button v-if="buttonDisable" @click="buttonDisable = false">
                  Игнорировать
                </button>
                <button v-if="buttonDisable && currentStatus === 'Ошибка при составлении расписания'"
                        @click="isVisibleInfoErrorModal = true">
                  Подробнее
                </button>
              </b-col>
            </b-row>
            <div>
              <button @click="startCreatingNew()" :disabled="buttonDisable">
                Запустить создание нового расписания
              </button>
            </div>
            <div>
              <button @click="startCreatingNew(true)" :disabled="buttonDisable">
                Запустить создание расписания по тестовым данным
              </button>
            </div>

            <div>
              <button @click="activateNewTimetable()" :disabled="buttonDisable">Активировать новое расписание</button>
            </div>

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


  <transition enter-active-class="modal-enter-active"
              leave-active-class="modal-leave-active">
    <div class="screen-modal" v-if="isVisibleInfoErrorModal">
      <div class="screen-content-modal">
        <b-button @click="isVisibleInfoErrorModal = false" class="close-button">
          <b-img :src="closeSvg"></b-img>
        </b-button>
        <b-container fluid="sm" class="my-4">
          <b-row>
            <b-col md="6" class="d-flex flex-column justify-content-center">
              <h2 class="modal-title mb-4">Информация о генерации расписания</h2>
            </b-col>
            <b-col v-for="(item, index) in errorInfo.value" :key="index">
              {{item}}
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.form-group {
  letter-spacing: 3px;
  font-weight: 500;
}

.custom-btn {
  background-color: #fff;
  color: black;
  border: 1px solid #ced4da;
  border-radius: 20px;
  width: 100%;
  font-size: 1.5rem;
  transition: background-color 0.5s ease;
}

.custom-input {
  border: 1px solid #ced4da;
  border-radius: 20px;
  font-size: 1.5rem;
  line-height: 2;
  color: #495057;
  background-color: #fff;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.modal-title {
  font-size: 50px;
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

.modal-enter-active {
  animation: slide-fade-in 0.5s ease;
}

.modal-leave-active {
  animation: fade-out 0.3s ease;
}

.rounded-custom {
  border-radius: 130px;
}

.close-button {
  border: 1px solid #ced4da;
  border-radius: 45%;
  color: #ced4da;
  background-color: #fff;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  position: absolute;
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
  background: rgba(0, 0, 0, 0.25);
  z-index: 1000;
  display: flex;
  overflow-y: auto;
  align-items: center; /* Выравнивание по вертикали */
  justify-content: center; /* Выравнивание по горизонтали */
}

.screen-content-modal {
  max-width: 600px;
  max-height: 600px;
  background: rgba(255, 255, 255, 1);
  z-index: 1100;
  display: flex;
  overflow-y: auto;
  align-items: center; /* Выравнивание по вертикали */
  justify-content: center; /* Выравнивание по горизонтали */
  transform: translate(-50%, -50%)
}
</style>