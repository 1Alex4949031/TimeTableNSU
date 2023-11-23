<script setup>

</script>

<template>
  <footer class="footer">
    <div class="container">
      <p class="footer-text">2023. Не пропускайте важные пары.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer-text{
  margin-top: 10px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
}
.footer {
  border: 1px solid #eaeaea;
  background-color: #fff;
  color: black;
  text-align: center;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

@media (max-width: 599px) {
  .footer-text {
    font-size: 8px;
  }
}


@media (min-width: 600px) and (max-width: 899px) {
  .footer-text {
    font-size: 10px;
  }
}

@media (min-width: 900px) {
  .footer-text {
    font-size: 15px;
  }
}
</style>