<template>
  <div class="tool">
    <!-- <music-player></music-player> -->
    <!-- <scroll-top></scroll-top> -->
  </div>
</template>

<script setup>
</script>

<style scoped>
.tool{
  display: flex;
  position: fixed;
  align-items: center;
  right: 0%;
  top: 10%;
  height: 160px;
  justify-content: space-around;
  flex-direction: column;
  z-index: 10000;
  filter: drop-shadow(4px 4px 2px rgba(0, 0, 0, 0.2));
}
</style>