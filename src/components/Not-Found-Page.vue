<script setup>
import pageNotFound from '@/assets/images/pageNotFound.png'
</script>

<template>
  <b-col class="d-flex flex-column justify-content-center align-items-center mt-3 mb-3 me-3 ms-3">
    <b-col class="mt-3 text-center">
      <h1>Ошибка 404</h1>
    </b-col>
    <b-col class="mb-2 text-center">
      <h2 class="">К сожалению, страница не найдена!</h2>
    </b-col>
    <b-col md="4">
      <b-img :src="pageNotFound" alt="Page Not Found Image" fluid class="not-found-img rounded-custom"></b-img>
    </b-col>
  </b-col>
</template>

<style scoped>
.rounded-custom {
  border-radius: 130px;
}
</style>