<template>
  <div ref="slider"
       @mouseup="onMosueUp"
       @mousedown="onMouseDown"
       @mousemove="onMouseMove" class="music-box">
    <div class="music-icon">
      <svg t="1681026689893" class="musicIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7806" width="200" height="200"><path d="M216.726588 771.252706c72.101647 0 133.029647 39.062588 133.029647 85.323294 0 46.260706-60.928 85.353412-133.029647 85.353412-72.101647 0-133.029647-39.092706-133.029647-85.353412s60.928-85.323294 133.029647-85.323294z m595.245177 88.064c-72.101647 0-133.029647-39.062588-133.029647-85.323294 0-46.260706 60.928-85.323294 133.029647-85.323294 72.101647 0 132.999529 39.062588 132.999529 85.323294 0 46.260706-60.897882 85.323294-132.999529 85.323294zM409.991529 306.808471V151.341176l534.979765-76.709647V230.098824l-534.979765 76.709647zM216.726588 1002.164706c108.363294 0 193.264941-63.969882 193.264941-145.588706V367.646118L944.971294 290.936471v376.771764c-34.424471-24.395294-80.926118-39.273412-132.999529-39.273411-108.363294 0-193.264941 63.939765-193.264941 145.558588s84.901647 145.558588 193.264941 145.558588 193.234824-63.939765 193.234823-145.558588V42.646588h-0.030117c0-0.421647 0.210824-0.783059 0.180705-1.204706A30.268235 30.268235 0 0 0 973.914353 12.348235c-0.963765 0.030118-1.746824 0.512-2.710588 0.632471l-0.39153-2.861177L378.88 94.930824h-0.240941c-0.240941 0-0.451765 0.120471-0.722824 0.150588l-2.409411 0.331294 0.090352 0.210823a29.906824 29.906824 0 0 0-25.840941 29.605647h-0.030117v0.210824c0 0.331294-0.180706 0.632471-0.180706 0.963765 0 0.240941 0.150588 0.421647 0.180706 0.63247v623.254589c-34.424471-24.395294-80.956235-39.273412-133.029647-39.273412-108.363294 0-193.264941 63.939765-193.264942 145.558588s84.901647 145.588706 193.264942 145.588706z" fill="#ffffff" p-id="7807"></path></svg>
    </div>
    <div class="music-list-all">
      <div class="music-list-header">
        <img src="../assets/image/bkg.jpg">
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
</template>
<script setup>
import {reactive, nextTick, ref, watch} from "vue";
const song = ref(null)
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


const slider = ref();

const startPoint = ref(0);
const isDown = ref(false);

const premitiveX = ref(0);

function onMouseDown(e) {
  isDown.value = true;
  const style = window.getComputedStyle(slider.value);
  const { transform } = style;
  if (transform !== "none") {
    const matrixArr = transform.replace(/[^0-9\-,]/g, "").split(",");
    console.log("matrixArr", matrixArr);
    premitiveX.value = parseInt(matrixArr[4]);
  } else {
    premitiveX.value = 0;
  }
  const { clientX } = e;
  startPoint.value = clientX;
}

function onMosueUp(e) {
  isDown.value = false;
}

function onMouseMove(e) {
  if (!isDown.value) return;
  const { clientX } = e;
  const moveDistance = clientX - startPoint.value;
  const offset = premitiveX.value + moveDistance;
  console.log("offset", offset);
  slider.value.style.transform = `translateX(${offset}px)`;
}


</script>

<style scoped>
.music-box{
  position: fixed;
  right: 2%;
  bottom: 4%;
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
  top: -140%;
  left: -350%;
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
  margin-bottom: -4px;
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
  height: 70px;
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