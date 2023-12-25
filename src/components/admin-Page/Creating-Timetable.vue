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
        <div>Информация о генерации расписания</div>
        <b-col md="6" class="justify-content-center" v-for="(item, index) in errorInfo" :key="index">
          <b-row>
            {{ Object.entries(item).map(([key, value]) => `${key} - ${value}`).join(', ') }}
          </b-row>
        </b-col>
      </div>
    </div>
  </transition>
</template>

<style scoped>

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


.rounded-custom {
  border-radius: 130px;
}

.close-button {
  border: 1px solid #ced4da;
  border-radius: 45%;
  color: #ced4da;
  background-color: #fff;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  position: fixed;
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
  position: fixed;
  animation: slideDown 0.3s ease;
  width: 100%; /* Установите желаемую ширину */
  max-width: 700px; /* Максимальная ширина, если нужна */
  height: 95%;
  background-color: rgba(255, 255, 255, 1);
}

</style>