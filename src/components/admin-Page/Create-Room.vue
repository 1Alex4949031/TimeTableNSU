<script setup>
import imageModal from "@/assets/images/imageModal.png";
import {ref} from "vue";
import {addRoom} from "@/js/axios-request";
import {roomTypes} from "@/js/data-for-show";


const name = ref("")
const type = ref("")
const cap = ref("")

</script>

<template>
<div>
    <b-row>
      <b-col md="6" class="d-flex flex-column">
        <h2 class="modal-title mb-4">Управление комнатами</h2>
        <b-form>
          <b-form-group class="form-group" label="Номер комнаты" label-for="input-room-name">
            <b-form-input class="custom-input" v-model="name" id="input-room-name"
                          placeholder="Введите номер" type="number">
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
          <b-button class="custom-btn mt-4" @click="addRoom(name.valueOf(), type.valueOf(), cap.valueOf())">Создать аудиторию</b-button>
        </b-form>
      </b-col>
      <b-col md="6" class="mt-3">
        <b-img :src=imageModal alt="Modal image" fluid class="rounded-custom"></b-img>
      </b-col>
    </b-row>

</div>
</template>

<style scoped>

</style>