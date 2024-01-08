<template>
  <Header style="z-index: 1000"></Header>
  <img class="bkg" src="../assets/image/nv.jpg" alt="">
  <div class="body">
    <div class="page">
      <div class="container"></div>
      <hr>
    </div>
  </div>
</template>

<script>
import Header from "../components/header.vue";
export default {
  name: "count",
  components:{
    Header
  },
}
</script>

<style scoped>
.bkg{
  position: fixed;
  height: 100vh;
  width: 100%;
  object-fit: cover;
  z-index: -1000;
}
.body{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 15px;
}
.page{
  width: 90%;
  max-width: 1400px;
  background: rgba(28, 28, 28, 98%) !important;
  border-radius: 20px;
  padding: 50px 40px;
}
hr{
  position: relative;
  margin: 40px auto;
  border: 2px dashed rgba(255,255,255,0.4);
  width: calc(100% - 4px);
  box-sizing: content-box;
  height: 0;
  overflow: visible;
}
hr:before{
  position: absolute;
  top: -10px;
  left: 5%;
  z-index: 1;
  color: rgba(255,255,255,0.7);
  content: '\f0c4';
  font-size: 20px;
  line-height: 1;
  transition: all 1s ease-in-out;
  display: inline-block;
  font-weight: 600;
  text-rendering: auto;
}
</style>