<template>
    <div class="dad-page">
      <div class="dad-header">
        <span class="heart">❤️</span>
        <h1>父亲节快乐</h1>
        <span class="heart">❤️</span>
      </div>
      <div class="dad-timer-card">
        <div class="timer-title">自从 <span class="highlight">2001年8月3日</span> 你成为我的爸爸已经过去</div>
        <div class="timer-numbers">
          <span class="timer-num">{{ time.days }}</span><span class="timer-label">天</span>
          <span class="timer-num">{{ time.hours }}</span><span class="timer-label">小时</span>
          <span class="timer-num">{{ time.minutes }}</span><span class="timer-label">分</span>
          <span class="timer-num">{{ time.seconds }}</span><span class="timer-label">秒</span>
        </div>
        <div class="timer-footer">每一秒都值得珍惜</div>
      </div>
      <div class="dad-timeline">
        <!-- 1-3 段：常规卡片 -->
        <div class="dad-section fancy-card fade-slide">
          <div class="card-keyword kw-blue">少年</div>
          <div class="dad-photo-wrapper" style="transform: rotate(-4deg);">
            <img class="dad-photo" src="../assets/dad/1.jpg" v-slide-in alt="少年时的你" />
          </div>
          <div class="dad-section-content">
            <h2>少年时的你</h2>
            <p>照片里的你，笑容很阳光。那时的你，或许还没想过有一天会成为父亲，但已经在为生活努力奔跑。</p>
          </div>
        </div>
        <div class="dad-section fancy-card fade-slide">
          <div class="card-keyword kw-orange">热血</div>
          <div class="dad-photo-wrapper" style="transform: rotate(3deg);">
            <img class="dad-photo" src="../assets/dad/2.jpg" v-slide-in alt="热血青春" />
          </div>
          <div class="dad-section-content">
            <h2>热血青春</h2>
            <p>年轻的你，敢闯敢拼。也许那时的你还不懂"责任"两个字，但你已经在用行动为家铺路。</p>
          </div>
        </div>
        <div class="dad-section fancy-card fade-slide">
          <div class="card-keyword kw-green">成长</div>
          <div class="dad-photo-wrapper" style="transform: rotate(-2deg);">
            <img class="dad-photo" src="../assets/dad/3.jpg" v-slide-in alt="成长路上的你" />
          </div>
          <div class="dad-section-content">
            <h2>成长路上的你</h2>
            <p>你用自己的方式，教我什么是担当。那些年你带我走过的路，如今都成了我心里的底气。</p>
          </div>
        </div>
        <!-- 4：左右结构+合影标签 -->
        <div class="dad-section dad-section-row fade-slide special-bg">
          <div class="dad-photo-wrapper row-img" style="transform: rotate(2.5deg);">
            <img class="dad-photo" src="../assets/dad/4.jpg" v-slide-in alt="现在的你" />
            <span class="img-label"></span>
          </div>
          <div class="dad-section-content row-content">
            <h2>现在的你</h2>
            <p>你不再年轻，但依然是家里的主心骨。你的陪伴，是我最安心的力量。</p>
          </div>
        </div>
        <!-- 5：大水印关键词+圆形头像 -->
        <div class="dad-section fade-slide card-watermark">
          <span class="watermark">温和</span>
          <div class="dad-photo-wrapper circle-img">
            <img class="dad-photo" src="../assets/dad/5.jpg" alt="生活中的你" />
          </div>
          <div class="dad-section-content">
            <h2>生活中的你</h2>
            <p>你喜欢简单的生活，也总能把日子过得有滋有味。和你在一起，家总是温暖的。</p>
          </div>
        </div>
        <!-- 6：信件风格 -->
        <div class="dad-section fade-slide card-letter">
          <div class="letter-content">
            <div class="letter-quote">"</div>
            <div class="letter-text">
              时光流转，感谢你一直在身边。愿未来的日子里，我们都能平安喜乐。
            </div>
            <div class="letter-quote right">"</div>
          </div>
          <div class="letter-img">
            <img src="../assets/dad/6.jpg" alt="此刻的你" />
          </div>
        </div>
      </div>
      <div class="dad-footer">
        <div class="footer-wave"></div>
        <span>—— 父亲节快乐，愿你健康、自在、常有笑容</span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  function getTimeDiff() {
    const start = new Date('2001-08-03T00:00:00')
    const now = new Date()
    let diff = Math.floor((now - start) / 1000)
    const days = Math.floor(diff / (24 * 3600))
    diff = diff % (24 * 3600)
    const hours = Math.floor(diff / 3600)
    diff = diff % 3600
    const minutes = Math.floor(diff / 60)
    const seconds = diff % 60
    return {
      days,
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
    }
  }
  const time = ref(getTimeDiff())
  let timer = null
  onMounted(() => {
    timer = setInterval(() => {
      time.value = getTimeDiff()
    }, 1000)
  })
  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })
  </script>
  
  <style scoped>
  .dad-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 8px 24px 8px;
    box-sizing: border-box;
  }
  .dad-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }
  .dad-header h1 {
    font-size: 2.2rem;
    font-weight: 700;
    color: #2d3748;
    letter-spacing: 2px;
    margin: 0;
  }
  .heart {
    font-size: 2rem;
    animation: heartBeat 1.5s infinite;
  }
  @keyframes heartBeat {
    0%, 100% { transform: scale(1); }
    20% { transform: scale(1.2); }
    40% { transform: scale(0.95); }
    60% { transform: scale(1.1); }
    80% { transform: scale(0.98); }
  }
  .dad-timeline {
    width: 100%;
    max-width: 430px;
    display: flex;
    flex-direction: column;
    gap: 44px;
  }
  .fancy-card, .dad-section {
    position: relative;
    overflow: visible;
    background: rgba(255,255,255,0.96);
    border-radius: 18px;
    box-shadow: 0 4px 24px 0 rgba(0,0,0,0.10);
    padding: 28px 12px 28px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: box-shadow 0.3s;
    margin-top: 18px;
  }
  .dad-section:hover {
    box-shadow: 0 8px 32px 0 rgba(0,113,227,0.13);
  }
  .card-keyword {
    position: absolute;
    top: -18px;
    left: 18px;
    font-size: 1.1rem;
    font-weight: bold;
    border-radius: 16px;
    padding: 2px 18px;
    box-shadow: 0 2px 8px rgba(33,147,176,0.13);
    letter-spacing: 4px;
    z-index: 2;
    user-select: none;
    opacity: 0.92;
  }
  .kw-blue { background: linear-gradient(90deg, #6dd5ed 0%, #2193b0 100%); color: #fff;}
  .kw-orange { background: linear-gradient(90deg, #f7971e 0%, #ffd200 100%); color: #fff;}
  .kw-green { background: linear-gradient(90deg, #43cea2 0%, #185a9d 100%); color: #fff;}
  /* 4：左右结构 */
  .dad-section-row {
    flex-direction: row;
    align-items: stretch;
    background: linear-gradient(90deg, #f8fafc 60%, #e0e7ef 100%);
    padding: 18px 6px 18px 6px;
  }
  .dad-section-row .dad-photo-wrapper {
    flex: 1.1;
    margin-bottom: 0;
    margin-right: 12px;
    min-width: 0;
    position: relative;
  }
  .dad-section-row .row-content {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    padding-left: 8px;
  }
  .img-label {
    position: absolute;
    bottom: 10px;
    left: 10px;
    background: rgba(33,147,176,0.85);
    color: #fff;
    font-size: 0.85rem;
    border-radius: 10px;
    padding: 2px 10px;
    letter-spacing: 2px;
    z-index: 3;
  }
  .special-bg {
    background: linear-gradient(90deg, #f8fafc 60%, #e0e7ef 100%);
  }
  /* 5：大水印关键词+圆形头像 */
  .card-watermark {
    background: #fffbe6;
    position: relative;
    overflow: visible;
  }
  .watermark {
    position: absolute;
    top: 18px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 3.2rem;
    color: #ffe082;
    font-weight: 900;
    opacity: 0.18;
    pointer-events: none;
    user-select: none;
    z-index: 0;
    letter-spacing: 10px;
  }
  .circle-img {
    border-radius: 50%;
    overflow: hidden;
    width: 120px;
    height: 120px;
    margin: 0 auto 12px auto;
    box-shadow: 0 2px 12px 0 rgba(247,151,30,0.13);
  }
  .circle-img .dad-photo {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .card-watermark .dad-section-content {
    margin-top: 8px;
  }
  .card-watermark h2 {
    color: #b8860b;
  }
  .card-watermark p {
    color: #7c6f57;
  }
  /* 6：信件风格 */
  .card-letter {
    background: #f8fafc;
    border: 1.5px solid #e0e7ef;
    box-shadow: 0 2px 12px 0 rgba(33,147,176,0.08);
    padding: 24px 12px 18px 12px;
    position: relative;
    min-height: 120px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .letter-content {
    width: 100%;
    padding-left: 8px;
    padding-right: 60px;
    position: relative;
  }
  .letter-quote {
    font-size: 2.2rem;
    color: #6dd5ed;
    font-family: serif;
    line-height: 1;
    position: absolute;
    left: -8px;
    top: -10px;
  }
  .letter-quote.right {
    left: auto;
    right: 0;
    top: auto;
    bottom: -10px;
    color: #2193b0;
  }
  .letter-text {
    font-size: 1.08rem;
    color: #444;
    margin: 18px 0 18px 18px;
    line-height: 1.8;
    font-style: italic;
  }
  .letter-img {
    position: absolute;
    right: 10px;
    bottom: 10px;
    width: 60px;
    height: 60px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px #2193b033;
  }
  .letter-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }
  .dad-photo-wrapper {
    width: 100%;
    max-width: 320px;
    aspect-ratio: 4/5;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.10);
    margin-bottom: 16px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.4s cubic-bezier(.77,0,.18,1);
  }
  .dad-section:hover .dad-photo-wrapper {
    filter: brightness(1.04) drop-shadow(0 2px 8px #2193b033);
  }
  .dad-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 12px;
    transition: box-shadow 0.3s;
  }
  .dad-section-content {
    text-align: center;
    z-index: 2;
  }
  .dad-section-content h2 {
    font-size: 1.18rem;
    color: #1a202c;
    margin: 0 0 8px 0;
    font-weight: 600;
    letter-spacing: 1px;
  }
  .dad-section-content p {
    font-size: 1.05rem;
    color: #444;
    margin: 0;
    line-height: 1.7;
  }
  .dad-footer {
    margin-top: 36px;
    color: #888;
    font-size: 1rem;
    text-align: center;
    position: relative;
  }
  .footer-wave {
    width: 100%;
    height: 32px;
    background: url('data:image/svg+xml;utf8,<svg width=\"100%25\" height=\"100%25\" viewBox=\"0 0 1440 320\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"%236dd5ed\" fill-opacity=\"0.18\" d=\"M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z\"></path></svg>');
    background-size: cover;
    margin-bottom: 8px;
  }
  .fade-slide {
    opacity: 0;
    transform: translateY(40px) scale(0.98);
    animation: fadeSlideIn 0.8s cubic-bezier(.77,0,.18,1) forwards;
  }
  @keyframes fadeSlideIn {
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  .dad-timer-card {
    width: 100%;
    max-width: 420px;
    margin: 0 auto 28px auto;
    background: linear-gradient(90deg, #e0e7ef 0%, #f8fafc 100%);
    border-radius: 18px;
    box-shadow: 0 2px 12px 0 rgba(33,147,176,0.08);
    padding: 18px 12px 12px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
  }
  .timer-title {
    font-size: 1.08rem;
    color: #2193b0;
    margin-bottom: 2px;
    font-weight: 500;
  }
  .timer-desc {
    font-size: 0.98rem;
    color: #888;
    margin-bottom: 8px;
  }
  .timer-numbers {
    font-size: 1.35rem;
    font-family: 'Menlo', 'Consolas', monospace;
    color: #185a9d;
    font-weight: bold;
    margin-bottom: 6px;
    letter-spacing: 2px;
  }
  .timer-num {
    font-size: 1.5em;
    color: #43cea2;
    margin: 0 2px;
  }
  .timer-label {
    font-size: 1em;
    color: #888;
    margin-right: 8px;
  }
  .timer-footer {
    font-size: 0.92rem;
    color: #aaa;
    margin-top: 2px;
  }
  .highlight {
    color: #f7971e;
    font-weight: bold;
  }
  @media (max-width: 600px) {
    .dad-header h1 {
      font-size: 1.3rem;
    }
    .dad-timeline {
      max-width: 99vw;
      gap: 18px;
    }
    .dad-section, .fancy-card {
      padding: 10px 2px 14px 2px;
    }
    .dad-photo-wrapper {
      max-width: 94vw;
    }
    .dad-section-content h2 {
      font-size: 1.02rem;
    }
    .dad-section-content p {
      font-size: 0.97rem;
    }
    .card-keyword {
      font-size: 0.98rem;
      left: 10px;
      top: -14px;
      padding: 2px 12px;
    }
    .dad-section-row {
      flex-direction: column;
      align-items: center;
      padding: 10px 2px 14px 2px;
    }
    .dad-section-row .dad-photo-wrapper {
      margin-right: 0;
      margin-bottom: 12px;
    }
    .dad-section-row .row-content {
      padding-left: 0;
      text-align: center;
    }
    .card-watermark .watermark {
      font-size: 2.1rem;
      top: 8px;
    }
    .circle-img {
      width: 80px;
      height: 80px;
    }
    .card-letter {
      padding: 12px 4px 10px 4px;
    }
    .letter-content {
      padding-right: 0;
    }
    .letter-img {
      width: 40px;
      height: 40px;
      right: 4px;
      bottom: 4px;
    }
    .dad-timer-card {
      max-width: 98vw;
      padding: 12px 4px 8px 4px;
    }
    .timer-title {
      font-size: 0.98rem;
    }
    .timer-numbers {
      font-size: 1.1rem;
    }
  }
  </style>