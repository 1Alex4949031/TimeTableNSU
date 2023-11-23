<script setup>
import LogInModal from "@/components/LogIn-Modal.vue";
import {openModalAuth} from "@/JS/ModalLogic";
</script>

<template>

  <b-navbar sticky="true" toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">NavBar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item @click="openModalAuth()">Login</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

  <!--
  <nav>
    <div class="header-nav-bar">
        <div class="cell" >
          Тест1
        </div>
        <div class="cell" >
          Тест2
        </div>
        <div class="cell" >
          Тест3
        </div>
        <button class="cell" @click="openModalAuth();console.log('Clicked!')" >
          Войти
        </button>
      <a class="cell" @click="openModalAuth();console.log('Clicked!')">Вход</a>
    </div>
  </nav>-->

  <div class="modals">
    <LogInModal/>
  </div>
</template>

<style scoped>

.header-nav-bar {
  animation: slideDown 0.3s ease;
  position: fixed; /* Фиксированное позиционирование относительно окна браузера */
  top: 0;
  left: 0;
  width: 100%; /* Ширина на весь экран */
  height: 10%; /* Высота на весь экран */
  background: rgba(150, 150, 0, 0.4); /* Полупрозрачный фон */
  z-index: 100; /* Z-индекс для позиционирования поверх других элементов */
  display: flex; /* Используйте Flexbox для выравнивания содержимого */
  align-items: center; /* Вертикальное выравнивание содержимого */
  justify-content: normal;
}


.cell {
  padding: 10px; /* Отступы для каждой ячейки */
  border: 1px solid black; /* Границы для наглядности */
}

</style>