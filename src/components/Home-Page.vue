<script setup>
const imageUrl = require('@/assets/images/university.png')
</script>


<template>
  <div class="full-screen-container">
    <img :src="imageUrl" alt="Full Screen Background" class="full-screen-image"/>
    <div class="text-container">
      <slot></slot> <!-- Слот для вставки любого текста или HTML -->
    </div>
  </div>
</template>

<style>
.full-screen-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.full-screen-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-container {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 1em;
}
</style>