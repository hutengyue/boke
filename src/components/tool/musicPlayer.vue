<template>
<!--  <div onmousemove="onMousemove(event)" onmouseup="onMouseup(event)" class="bkg">-->
<!--    <div onmousedown="onMousedown(event)"-->
<!--         ref="floatButton" class="music-box" :style="{-->
<!--    transform: `translate(${elementPosition.x}px, ${elementPosition.y}px)`-->
<!--    }">-->
  <div class="bkg">
    <div ref="floatButton" class="music-box">
      <div class="music-icon" @click="toggleMusicList">
        <svg class="musicIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path d="M512 0C229.76 0 0 229.76 0 512s229.76 512 512 512 512-229.76 512-512S794.24 0 512 0z m128 704c0 70.656-57.344 128-128 128s-128-57.344-128-128 57.344-128 128-128c25.856 0 49.856 7.744 70.144 20.864V320l192-64v320c0 70.656-57.344 128-128 128z" fill="#00CCC6"/>
        </svg>
      </div>
      <div class="music-list-all" :class="{ 'show-music-list': isShowMusicList }">
        <div class="music-list-header">
          <div class="now-playing">
            <span class="song-title">{{ data.song[data.ins] }}</span>
          </div>
          <div class="player-controls">
            <svg @click="prevSong" class="control-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <path d="M364.302083 465.602819L687.954365 218.588294c38.416414-29.327534 93.791393-1.929039 93.791392 46.396277v494.029051c0 48.325316-55.374979 75.725617-93.791392 46.398084L364.302083 558.397181c-30.600916-23.357989-30.600916-69.436372 0-92.794362z" fill="currentColor"/>
            </svg>
            <svg v-if="!data.isPlay" @click="playSong" class="control-icon play" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <path d="M128 138.666667c0-47.232 33.322667-66.666667 74.176-43.562667l663.146667 374.954667c40.96 23.168 40.853333 60.8 0 83.882666L202.176 928.896C161.216 952.064 128 932.565333 128 885.333333v-746.666666z" fill="currentColor"/>
            </svg>
            <svg v-else @click="stopSong" class="control-icon pause" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <path d="M259.774512 0h-63.761861c-21.849302 0-39.566884 26.457302-39.566884 59.082419v905.823255c0 32.625116 17.717581 59.082419 39.566884 59.082419h63.761861c21.849302 0 39.566884-26.457302 39.566883-59.082419V59.082419C299.341395 26.457302 281.623814 0 259.774512 0z m568.20093 0h-63.761861c-21.849302 0-39.566884 26.457302-39.566883 59.082419v905.823255c0 32.625116 17.717581 59.082419 39.566883 59.082419h63.761861c21.849302 0 39.566884-26.457302 39.566884-59.082419V59.082419C867.542326 26.457302 849.824744 0 827.975442 0z" fill="currentColor"/>
            </svg>
            <svg @click="nextSong" class="control-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <path d="M655.706179 465.602819L332.053897 218.588294c-38.414608-29.327534-93.791393-1.929039-93.791392 46.396277v494.029051c0 48.325316 55.376785 75.725617 93.791392 46.398084l323.652282-247.014525c30.602722-23.357989 30.602722-69.436372 0-92.794362z" fill="currentColor"/>
            </svg>
          </div>
        </div>
        <audio ref="song" :src="data.musicPath"></audio>
        <div class="music-list-box">
          <ul class="music-list">
            <li 
              v-for="(item, index) in data.song" 
              :key="index"
              @click="active(index)"
              :class="['music-item', { active: index === data.ins }]"
            >
              <span class="song-name">{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, nextTick, ref, watch } from "vue";

const song = ref(null);
const floatButton = ref(null);
const isShowMusicList = ref(false);

const data = reactive({
  musicPath: 'https://wen0224.oss-cn-beijing.aliyuncs.com/music/5a6318390152fd9f55987f355ecd2277.mp3',
  isPlay: false,
  song: ['我们两', '枫', '晴天', '冲击'],
  ins: 0
});

function active(index) {
  data.ins = index;
  data.musicPath = 'https://wen0224.oss-cn-beijing.aliyuncs.com/music/5a6318390152fd9f55987f355ecd2277.mp3';
  data.isPlay = true;
  nextTick(() => {
    song.value.play();
  });
}

function playSong() {
  data.isPlay = true;
}

function stopSong() {
  data.isPlay = false;
}

function prevSong() {
  data.ins = (data.ins - 1 + data.song.length) % data.song.length;
  active(data.ins);
}

function nextSong() {
  data.ins = (data.ins + 1) % data.song.length;
  active(data.ins);
}

function toggleMusicList() {
  isShowMusicList.value = !isShowMusicList.value;
}

watch(() => data.isPlay, (newVal) => {
  if (newVal === false) {
    song.value.pause();
  } else {
    song.value.play();
  }
});
</script>

<style scoped>
.music-box {
  pointer-events: all;
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  display: flex;
  align-items: center;
}

.music-icon {
  position: relative;
  z-index: 2;
  width: 44px; /* 固定宽度 */
  height: 44px; /* 固定高度 */
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px 0 0 8px;
  box-shadow: -2px 0 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.musicIcon {
  width: 32px;
  height: 32px;
  transition: all 0.3s ease;
}

.music-icon:hover .musicIcon {
  transform: scale(1.1);
}

.music-list-all {
  position: absolute;
  right: 0;
  width: 240px;
  height: 280px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px 0 0 12px;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
  transform: translateX(calc(100% + 44px));
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.show-music-list {
  transform: translateX(44px); /* 修改这里，让列表显示时与按钮对齐 */
}

.musicIcon:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 1);
}

.music-list-header {
  padding: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.now-playing {
  margin-bottom: 8px;
}

.song-title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.player-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.control-icon {
  width: 20px;
  height: 20px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
}

.control-icon:hover {
  transform: scale(1.1);
  color: #00CCC6;
}

.control-icon.play,
.control-icon.pause {
  width: 24px;
  height: 24px;
}

.music-list-box {
  height: calc(100% - 80px);
  overflow: hidden;
}

.music-list {
  height: 100%;
  overflow-y: auto;
  padding: 8px;
  margin: 0;
  list-style: none;
}

.music-list::-webkit-scrollbar {
  width: 3px;
}

.music-list::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}

.music-item {
  padding: 8px 12px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 6px;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.music-item:hover {
  background: rgba(0, 204, 198, 0.1);
}

.music-item.active {
  color: #00CCC6;
  background: rgba(0, 204, 198, 0.1);
  font-weight: 500;
}
</style>