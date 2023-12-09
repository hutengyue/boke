<template>
  <div>
    <div class="myFooter">

    </div>
  </div>
</template>

<script>
export default {
  name: "footer"
}
</script>

<style scoped>
@keyframes change {
  0%{
    background-position: 0 50%;
  }
  50%{
    background-position: 100% 50%;
  }
  100%{
    background-position: 0 50%;
  }
}
.myFooter{
  width: 100%;
  height: 60px;
  background: linear-gradient(-90deg,#ee7752,#e73c7e,#23a6d5,#23d5ab);
  border-radius: 1.5rem 1.5rem 0 0;
  background-size: 300% 300%;
  animation: change 10s ease infinite;
}
</style>