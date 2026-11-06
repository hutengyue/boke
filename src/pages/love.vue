<template>
  <div class="love-body">
    <!-- 背景漂浮的爱心 -->
    <span
      v-for="(h, i) in bgHearts"
      :key="'bg' + i"
      class="bg-heart"
      :style="h"
    >💗</span>

    <div class="card" v-if="!accepted">
      <h1 class="question">池悦你喜欢我吗？</h1>
      <p class="sub" v-if="noCount === 0">请诚实地回答哦</p>

      <transition name="plead" mode="out-in">
        <p class="plead" :key="noCount" v-if="noCount > 0">{{ pleadText }}</p>
      </transition>

      <div class="btns" v-if="noCount < 6">
        <button class="btn like-btn" :style="likeBtnStyle" @click="accept">
          喜欢
        </button>
        <button
          class="btn no-btn"
          :class="{ trembling: noCount >= 3 }"
          @click="refuse"
        >
          {{ noBtnText }}
        </button>
      </div>

      <p class="count" v-if="noCount > 1">你已经拒绝 {{ noCount }} 次了</p>
    </div>

    <!-- 点了喜欢之后 -->
    <div class="card" v-else>
      <h1 class="question">我就知道你也喜欢我 🥰</h1>
      <p class="sub">虚惊一场，什么事都没有~</p>
      <div class="rain">
        <span
          v-for="(r, i) in rainHearts"
          :key="'rain' + i"
          :style="r"
        >❤️</span>
      </div>
      <button class="btn like-btn retry" @click="restart">再来一次</button>
    </div>

    <!-- 全屏最终形态：传送到 body，避免卡片 backdrop-filter 劫持 fixed 定位 -->
    <Teleport to="body">
      <button
        v-if="noCount >= 6 && !accepted"
        class="btn like-btn fullscreen"
        @click="accept"
      >
        喜欢（已经无处可逃啦）
      </button>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const noCount = ref(0);
const accepted = ref(false);

const pleads = [
  "为什么呀？🥺",
  "真的不再考虑一下吗？",
  "再点一下试试，看看会发生什么 👀",
  "你看「喜欢」它好像在长大...",
  "「不喜欢」开始发抖了，它快撑不住了",
  "好了好了，现在整个屏幕都是「喜欢」了",
];

const randomPleads = [
  "求求了 🙏",
  "心都碎了 💔",
  "你逃不掉的～",
  "宇宙的尽头是喜欢 😌",
  "再点按钮就要爆炸啦！💥",
];

const pleadText = computed(() => {
  if (noCount.value <= pleads.length) return pleads[noCount.value - 1];
  return randomPleads[noCount.value % randomPleads.length];
});

// 「喜欢」的成长曲线：渐进变大，最后一次直接铺满全屏
function likeScaleOf(n) {
  return 1 + Math.pow(n, 1.6) * 0.2;
}

// 「喜欢」用真实尺寸（padding/字号）长大，把周围元素顶开而不是盖住
const likeBtnStyle = computed(() => {
  const s = likeScaleOf(noCount.value);
  return {
    padding: `${14 * s}px ${44 * s}px`,
    fontSize: `${18 * s}px`,
  };
});

const noBtnText = computed(() => {
  const texts = ["不喜欢", "不喜欢", "不喜欢？", "不…喜欢？", "有点不敢点了", "我真的不敢点了"];
  return texts[Math.min(noCount.value, texts.length - 1)];
});

function refuse() {
  noCount.value++;
}

function accept() {
  accepted.value = true;
}

function restart() {
  noCount.value = 0;
  accepted.value = false;
}

// 背景漂浮爱心
const bgHearts = Array.from({ length: 14 }, () => ({
  left: Math.random() * 100 + "%",
  top: Math.random() * 100 + "%",
  fontSize: Math.random() * 20 + 14 + "px",
  animationDuration: Math.random() * 4 + 4 + "s",
  animationDelay: Math.random() * 4 + "s",
}));

// 表白成功后下落的爱心雨
const rainHearts = Array.from({ length: 30 }, () => ({
  left: Math.random() * 100 + "%",
  fontSize: Math.random() * 18 + 16 + "px",
  animationDuration: Math.random() * 2 + 2 + "s",
  animationDelay: Math.random() * 2 + "s",
}));
</script>

<style scoped>
.love-body {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffe3ec 0%, #fff5f7 50%, #e3f0ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
}

.bg-heart {
  position: absolute;
  opacity: 0.35;
  animation: float-heart infinite ease-in-out;
  pointer-events: none;
  user-select: none;
}

@keyframes float-heart {
  0%, 100% { transform: translateY(0) rotate(-10deg); }
  50% { transform: translateY(-30px) rotate(10deg); }
}

.card {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 560px;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(25px) saturate(180%);
  border-radius: 28px;
  padding: 60px 40px;
  text-align: center;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.06),
    0 1px 2px rgba(0, 0, 0, 0.04);
  animation: fade-slide-up 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.question {
  font-size: 40px;
  font-weight: 700;
  background: linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
}

.sub {
  color: #6e6e73;
  font-size: 16px;
  margin-bottom: 40px;
}

.plead {
  color: #ff4f8b;
  font-size: 20px;
  font-weight: 600;
  min-height: 30px;
  margin-bottom: 36px;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
}

.plead-enter-active,
.plead-leave-active {
  transition: all 0.3s ease;
}

.plead-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.plead-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.btns {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 32px;
  min-height: 80px;
}

.btn {
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-weight: 700;
  border-radius: 999px;
  transition:
    transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
    padding 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
    font-size 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 0.3s ease;
  white-space: nowrap;
}

.like-btn {
  padding: 14px 44px;
  font-size: 18px;
  color: #fff;
  background: linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%);
  box-shadow: 0 6px 20px rgba(255, 107, 157, 0.4);
}

.like-btn:hover {
  filter: brightness(1.05);
}
.no-btn {
  /* 层级高于「喜欢」，全屏前永远盖不住它 */
  position: relative;
  z-index: 3;
  padding: 14px 36px;
  font-size: 16px;
  color: #6e6e73;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

/* 「不喜欢」开始害怕地发抖 */
.trembling {
  animation: tremble 0.4s infinite;
}

@keyframes tremble {
  0%, 100% { translate: 0 0; rotate: 0deg; }
  25% { translate: -2px 1px; rotate: -2deg; }
  50% { translate: 2px -1px; rotate: 2deg; }
  75% { translate: -1px 2px; rotate: -1deg; }
}

/* 「喜欢」铺满全屏的最终形态 */
.like-btn.fullscreen {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  border-radius: 0;
  padding: 24px;
  font-size: clamp(22px, 6vw, 96px);
  line-height: 1.4;
  white-space: normal;
  z-index: 9999;
  animation:
    fullscreen-grow 0.6s cubic-bezier(0.16, 1, 0.3, 1) both,
    fullscreen-pulse 1.2s 0.6s infinite ease-in-out;
}

@keyframes fullscreen-grow {
  from { transform: scale(0.35); }
  to { transform: scale(1); }
}

@keyframes fullscreen-pulse {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.15); }
}

.count {
  margin-top: 40px;
  color: #aeaeb2;
  font-size: 14px;
}

/* 结果页 */
.rain {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 28px;
  pointer-events: none;
}

.rain span {
  position: absolute;
  top: -40px;
  animation: fall linear infinite;
}

@keyframes fall {
  to { transform: translateY(600px); }
}

.retry {
  margin-top: 32px;
}

@keyframes fade-slide-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .card {
    padding: 40px 24px;
  }

  .question {
    font-size: 30px;
  }

  .btns {
    gap: 20px;
    flex-direction: column;
  }
}
</style>
