<template>
<!--  <div onmousemove="onMousemove(event)" onmouseup="onMouseup(event)" class="bkg">-->
<!--    <div onmousedown="onMousedown(event)"-->
<!--         ref="floatButton" class="music-box" :style="{-->
<!--    transform: `translate(${elementPosition.x}px, ${elementPosition.y}px)`-->
<!--    }">-->
  <div class="bkg">
    <div ref="floatButton" class="music-box">
      <div class="music-icon">
        <svg t="1718017331412" class="musicIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6128" width="200" height="200"><path d="M982.408306 18.466839c-3.577415-16.618263-33.607551-23.264652-66.743305-14.767718l-298.185137 76.444925a9874.756874 9874.756874 0 0 1-120.706853 29.970589l-112.613009 27.061934c-33.264009 7.988492-68.51598 23.718127-78.355018 34.945074-9.839038 11.231527-17.882497 48.402752-17.882496 82.605775V708.413324l-62.162747-1.873448s-74.333288-2.258215-131.283361 57.353162c-68.996939 72.221651-79.390224 174.290216-23.214266 227.937706 56.171378 53.674974 157.64447 38.627842 226.65057-33.59839 37.125419-38.866031 44.614631-69.867245 44.614631-69.867245 8.029717-33.250267 14.644043-60.449618 14.694428-60.449618 0.054967 0 0.096192-27.982626 0.096192-62.19023V409.417428c0-34.203023 27.098579-69.175581 60.220591-77.704579l440.292355-113.410025c33.122012-8.528998 60.220591 12.472858 60.220591 46.675882v204.187515c0 34.207604-27.982626 62.199391-62.18565 62.208553 0 0-63.110922 0.022903-115.136895 54.476571-65.140109 68.204502-74.956244 164.593176-21.93171 215.267884 53.056598 50.674709 148.895605 36.452077 214.044875-31.743264 35.132877-36.795619 41.394499-62.895636 41.394499-62.895636 7.979331-33.259429 14.547851-60.467941 14.593657-60.467941 0.050386 0 0.08245-27.982626 0.08245-62.185649V110.856685c0.004581-34.203023-2.922396-75.776164-6.504392-92.389846zM321.136111 730.271745l-1.749773-1.676484c-2.001704-1.731451-1.868867-2.070412 0.288575-0.746631 2.157443 1.323781 3.920957 2.972782 3.920957 3.673607 0 0.700825-0.723728 0.503861-1.612356-0.430572 0.004581-0.009161 0.004581-0.009161-0.847403-0.81992z" fill="#00CCC6" p-id="6129"></path></svg>
      </div>
      <div class="music-list-all">
        <div class="music-list-header">
          <img src="../../assets/image/bkg.jpg">
          <svg t="1681049804811" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6661" width="200" height="200"><path d="M364.302083 465.602819L687.954365 218.588294c38.416414-29.327534 93.791393-1.929039 93.791392 46.396277v494.029051c0 48.325316-55.374979 75.725617-93.791392 46.398084L364.302083 558.397181c-30.600916-23.357989-30.600916-69.436372 0-92.794362zM238.945254 780.798397V451.684117v-164.562559c0-19.628152-5.904521-60.475733 17.057907-75.841215 25.523642-17.068744 59.747828 1.210165 59.747828 31.919454v493.676839c0 19.628152 5.915358 60.473927-17.047069 75.841215-25.53448 17.068744-59.758666-1.211971-59.758666-31.919454z" fill="#515151" p-id="6662"></path></svg>
          <svg v-show="data.isPlay == true" @click="stopSong()" t="1681054075008" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9024" width="200" height="200"><path d="M259.774512 0h-63.761861c-21.849302 0-39.566884 26.457302-39.566884 59.082419v905.823255c0 32.625116 17.717581 59.082419 39.566884 59.082419h63.761861c21.849302 0 39.566884-26.457302 39.566883-59.082419V59.082419C299.341395 26.457302 281.623814 0 259.774512 0z m568.20093 0h-63.761861c-21.849302 0-39.566884 26.457302-39.566883 59.082419v905.823255c0 32.625116 17.717581 59.082419 39.566883 59.082419h63.761861c21.849302 0 39.566884-26.457302 39.566884-59.082419V59.082419C867.542326 26.457302 849.824744 0 827.975442 0z m15.741023 0" p-id="9025" fill="#515151"></path></svg>
          <svg v-show="data.isPlay == false" @click="playSong()" t="1681049674348" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5128" width="200" height="200"><path d="M128 138.666667c0-47.232 33.322667-66.666667 74.176-43.562667l663.146667 374.954667c40.96 23.168 40.853333 60.8 0 83.882666L202.176 928.896C161.216 952.064 128 932.565333 128 885.333333v-746.666666z" fill="#515151" p-id="5129"></path></svg>
          <svg t="1681049848932" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7648" width="200" height="200"><path d="M655.706179 465.602819L332.053897 218.588294c-38.414608-29.327534-93.791393-1.929039-93.791392 46.396277v494.029051c0 48.325316 55.376785 75.725617 93.791392 46.398084l323.652282-247.014525c30.602722-23.357989 30.602722-69.436372 0-92.794362zM781.064814 780.798397V451.684117v-164.562559c0-19.628152 5.904521-60.475733-17.057907-75.841215-25.523642-17.068744-59.747828 1.210165-59.747828 31.919454v493.676839c0 19.628152-5.915358 60.473927 17.047069 75.841215 25.532673 17.068744 59.758666-1.211971 59.758666-31.919454z" fill="#515151" p-id="7649"></path></svg>
        </div>
        <!--      <div class="progrss">-->
        <!--        <van-slider-->
        <!--            v-model="current"-->
        <!--            bar-height="10px"-->
        <!--            max="100"-->
        <!--            min="0"-->
        <!--            step="1"-->
        <!--        />-->
        <!--      </div>-->
        <audio
            ref="song"
            :src="data.musicPath"
        ></audio>
        <div class="music-list-box">
          <ul class="music-list">
            <li @click="active(index)" :class="[{active:index == data.ins},{noactive:index != data.ins}]" v-for="(item,index) in data.song" :key="index">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {reactive, nextTick, ref, watch,onMounted,onUnmounted} from "vue";
const song = ref(null)
const floatButton = ref(null)
const data = reactive({
  music:['../assets/song/su.mp3'],
  musicPath:'https://wen0224.oss-cn-beijing.aliyuncs.com/music/5a6318390152fd9f55987f355ecd2277.mp3',
  isPlay:false,
  song:['我们两','枫','晴天','衝撃'],
  ins:0
})
function active(index){
  data.ins = index;
  switch (index){
    case 0:
      data.musicPath='https://wen0224.oss-cn-beijing.aliyuncs.com/music/5a6318390152fd9f55987f355ecd2277.mp3'
      break;
    case 1:
      data.musicPath='https://wen0224.oss-cn-beijing.aliyuncs.com/music/5a6318390152fd9f55987f355ecd2277.mp3'
      break;
    case 2:
      data.musicPath='https://wen0224.oss-cn-beijing.aliyuncs.com/music/5a6318390152fd9f55987f355ecd2277.mp3'
      break;
    case 3:
      data.musicPath='https://wen0224.oss-cn-beijing.aliyuncs.com/music/5a6318390152fd9f55987f355ecd2277.mp3'
      break;
    default: break;
  }
  data.isPlay = true
  nextTick(()=>{
    song.value.play()
  })
}
function playSong(){
  data.isPlay = true
}
function stopSong(){
  data.isPlay = false
}
watch(()=>data.isPlay,(newVal)=>{
  if(newVal == false){
    song.value.pause()
  }else song.value.play()
})

// const originalPosition = reactive({
//   x: 10,
//   y: 10,
//   flag: false
// })
// const mousedownOffset = reactive({
//   x: 0,
//   y: 0,
// })
// const elementPosition = reactive({
//   x: 0,
//   y: 0,
// })
// const restore = () => {
//   elementPosition.x = originalPosition.x;
//   elementPosition.y = originalPosition.y;
// }
//
// onMounted(() => {
//   restore();
//   floatButton.value.addEventListener('mousedown', onMousedown, true);
// })
//
// onUnmounted(() => {
//   floatButton.value.removeEventListener('mousedown', onMousedown, true);
// })
// const onMousemove = (event) => {
//   event.stopPropagation();
//   elementPosition.x = event.clientX - mousedownOffset.x;
//   elementPosition.y = event.clientY - mousedownOffset.y;
// }
// const onMousedown = (event) => {
//   event.stopPropagation();
//   if(originalPosition.flag == false){
//     mousedownOffset.x = event.clientX - originalPosition.x;
//     mousedownOffset.y = event.clientY - originalPosition.y;
//     originalPosition.x = event.clientX
//     originalPosition.y = event.clientY
//   }else{
//     mousedownOffset.x = originalPosition.x;
//     mousedownOffset.y = originalPosition.y;
//   }
//
//   document.addEventListener('mousemove', onMousemove, true);
//   document.addEventListener('mouseup', onMouseup, true);
// }
// const onMouseup = (event) => {
//   event.stopPropagation();
//   document.removeEventListener('mousemove', onMousemove, true);
//   document.removeEventListener('mouseup', onMouseup, true);
//   originalPosition.flag = true
// }
</script>

<style scoped>
/*.bkg{*/
/*  position: fixed;*/
/*  background-color: transparent;*/
/*  user-select: none;*/
/*  top:0;*/
/*  bottom: 0;*/
/*  height: 100vh;*/
/*  width: 100%;*/
/*  pointer-events: none;*/
/*}*/
.music-box{
  /*position: fixed;*/
  /*right: 2%;*/
  /*bottom: 4%;*/
  pointer-events: all;
  position: relative;
}
.musicIcon{
  width: 60px;
  height: 60px;
}
.music-list-all{
  height: 180px;
  width: 200px;
  transform-origin: right;
  background-color: white;
  visibility: hidden;
  opacity: 0;
  transform: scaleX(0);
  transition: all .25s;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: -112%;
  left: -360%;
  padding: 10px;
  border-radius: 10px;
  user-select: none;
}
.music-list-all::before{
  content: "";
  left: 100%;
  top: 50%;
  position: absolute;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid #fff;
}
.music-list-all a{
  z-index: 10000;
  font-size: 18px;
  opacity: 1;
}
.music-box:hover .music-list-all{
  visibility: visible;
  opacity: 1;
  transform: scaleX(1);
}
.music-list-header{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 10px;
}
.music-list-header img{
  width: 50px;
  height: 50px;
  border-radius: 100%;
}
.icon{
  height: 50px;
  width: 30px;
  margin-left: 10px;
}
music-list-box{
}
.music-list{
  height: 100px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: left;
}
.music-list::-webkit-scrollbar{
  width: 6px;
  height: 8px;
}
.music-list::-webkit-scrollbar-thumb{
  border-radius: 100px;
  background:#c6eada;
}
.music-list::-webkit-scrollbar-track{
  border-radius: 0;
  background: transparent;
}
.music-list li{
  font-size: 21px;
  list-style: none;
  width: 160px;
  transition: all .1s;
  text-overflow: ellipsis;
  border-radius: 3px;
}
.noactive:hover{
  background-color: #c6eada;
}
.active{
  color: white;
  background-color: #42b983;
}
.progrss {
  height: 20px;
  width: 90%;
  margin: 20px 0;
}
</style>