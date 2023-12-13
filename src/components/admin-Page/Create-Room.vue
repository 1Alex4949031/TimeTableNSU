<script setup>
import imageModal from "@/assets/images/imageModal2.png";
import {ref} from "vue";
import {addRoom} from "@/js/add-get-request";
import {roomTypes} from "@/js/data-for-show";

const name = ref("")
const type = ref("")
const cap = ref("")

function addRooms(){
  for (let x of name.value.split(";")) {
    addRoom(x, type.value, cap.value)
  }
}
</script>

<template>
  <div>
    <b-row>
      <b-col md="6">
        <b-col class="mt-4 ms-4 me-4">
          <h2 class="modal-title mb-4">Управление комнатами</h2>
          <b-form>
            <b-form-group class="form-group" label="Номер комнаты" label-for="input-room-name">
              <b-form-input class="custom-input" v-model="name" id="input-room-name"
                            placeholder="Введите номер, или несколько через ; ~ xxx;xxx;xxx;xxx" type="text">
              </b-form-input>
            </b-form-group>
            <b-form-group class="form-group" label="Тип комнаты" label-for="input-room-type">
              <b-form-select v-model="type" :options="roomTypes" label="Выберите опцию"></b-form-select>
            </b-form-group>
            <b-form-group class="form-group" label="Вместимость" label-for="input-room-cap">
              <b-form-input class="custom-input" v-model="cap" id="input-room-name"
                            placeholder="Аудитория на N студентов" type="number">
              </b-form-input>
            </b-form-group>
            <b-button class="custom-btn mt-4" @click="addRooms">Создать
              аудиторию
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
.rounded-custom {
  border-radius: 130px;
}
</style>