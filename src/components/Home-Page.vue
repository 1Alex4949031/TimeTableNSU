<script setup>
</script>


<template>
  <b-container fluid="true" class="px-0 d-flex flex-column vh-100">
    <b-row class="flex-grow-1">
      <b-col cols="12" class="p-0">
        <div class="background-image"></div>
      </b-col>
    </b-row>

    <b-row class="d-flex align-items-start justify-content-center">
      <b-col cols="12" class="text-center">
        <div class="text-content">Удобное расписание для вашего образовательного учреждения!</div>
      </b-col>
    </b-row>
  </b-container>
</template>

<style>
.background-image {
  height: 100%; /* Высота равна высоте родительского элемента */
  background-image: url('@/assets/images/university.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0 25px 50px 0 rgba(0, 0, 0, 0.5);
}

.text-content {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  color: black;
  margin-top: 1rem;
}

@media (max-width: 599px) {
  .text-content {
    font-size: 20px;
  }
}


@media (min-width: 600px) and (max-width: 899px) {
  .text-content {
    font-size: 30px;
  }
}

@media (min-width: 900px) {
  .text-content {
    font-size: 40px;
  }
}
</style>