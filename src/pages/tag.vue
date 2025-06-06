<template>
  <div class="all">
    <Header style="z-index: 1000"></Header>
    <div class="tags">
      <a @click="select(item.tagId)" v-for="(item,index) in tags" :key="index">
        <span>{{item.tagName}}</span>
        <span>{{ item.number }}</span>
      </a>
    </div>
    <div v-if="!tagId" class="tagcloud"></div>
    
    <!-- 添加文章列表展示区域 -->
    <div v-if="tagId" class="articles-container">
      <div class="articles-list">
        <div v-for="article in currentArticles" 
             :key="article.articleId" 
             class="article-card"
             @click="gotoArticle(article.articleId)">
          <div class="article-image" :style="{backgroundImage: `url(${article.articleImg})`}"></div>
          <div class="article-content">
            <h3>{{ article.articleTitle }}</h3>
            <p class="article-desc">{{ article.articleLabel }}</p>
            <div class="article-meta">
              <span class="create-time">{{ article.createAt }}</span>
              <span class="heat">热度 {{ article.heat }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted,getCurrentInstance,ref,computed} from 'vue'
const {proxy} = getCurrentInstance()
import TagCloud from 'TagCloud'
import {useRouter} from 'vue-router';
const router = useRouter()

let tags = ref([])
let tagId = ref(0)
let articles = ref([])

const currentArticles = computed(() => {
  const tag = articles.value.find(t => t.tagId === tagId.value);
  return tag ? tag.articles : [];
});

function select(id){
  proxy.$http.post('/tag/articles',{tagId:id}).then((res)=> {
    articles.value = res.data
    tagId.value = id
  })
}

function gotoArticle(id){
  router.push({name:'article',params:{articleId:id}})

}
onMounted(()=>{
  proxy.$http.get('/tag').then((res)=>{
    tags.value = res.data
    let a = tags.value.map((item)=>{
      return {
        name: item.tagName,
        id: item.tagId
      }
    })
    TagCloud('.tagcloud', a.map(item => item.name), {
      radius: 200,
      maxSpeed: 'fast',
      initSpeed: 'fast',
      direction: 135,
      keep: true,
      reverseDirection: true,
      itemClass: 'tag',
      containerClass: 'tagcloud',
      useItemInlineStyles: true
    })
    
    let rootEl = document.querySelector('.tagcloud');
    rootEl.addEventListener('click', function clickEventHandler(e) {
      if (e.target.className === 'tag') {
        const clickedTag = a.find(item => item.name === e.target.innerText);
        if (clickedTag) {
          select(clickedTag.id);
        }
      }
    });
  })
})
</script>

<style scoped>
.all {
  background: linear-gradient(145deg, #f5f5f7 0%, #fff 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 90px 20px 40px;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
}

.tags {
  width: 90%;
  max-width: 1300px;
  text-align: center;
  animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  margin-bottom: 0px;
}

.tags a {
  color: #1d1d1f;
  font-size: 15px;
  padding: 10px 18px;
  margin: 8px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 
    0 2px 10px rgba(0, 0, 0, 0.04),
    0 0 1px rgba(0, 0, 0, 0.08);
  display: inline-flex;
  align-items: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tags a:hover {
  transform: translateY(-2px) scale(1.02);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 
    0 8px 20px rgba(71, 163, 255, 0.12),
    0 2px 6px rgba(71, 163, 255, 0.08);
}

.tags a span:nth-child(1)::before {
  content: "#";
  font-size: 16px;
  color: #47a3ff;
  margin-right: 4px;
  font-weight: 500;
}

.tags a span:nth-child(2) {
  background: rgba(71, 163, 255, 0.1);
  padding: 3px 8px;
  border-radius: 12px;
  color: #47a3ff;
  font-size: 13px;
  font-weight: 500;
  margin-left: 8px;
}

.articles-container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.articles-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  padding: 20px;
}

.article-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(20px) saturate(180%);
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.05),
    0 1px 3px rgba(0, 0, 0, 0.02);
}

.article-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 
    0 20px 30px rgba(0, 0, 0, 0.08),
    0 4px 8px rgba(0, 0, 0, 0.04);
}

.article-image {
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

.article-image::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(to top, rgba(255,255,255,0.9), transparent);
}

.article-content {
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
}

.article-content h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0 0 10px;
  line-height: 1.4;
  letter-spacing: -0.022em;
}

.article-desc {
  font-size: 14px;
  color: #86868b;
  margin: 0 0 15px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.create-time {
  font-family: "SF Mono", monospace;
  font-size: 12px;
  color: #86868b;
}

.heat {
  display: flex;
  align-items: center;
  color: #47a3ff;
  font-size: 13px;
  font-weight: 500;
}

.heat::before {
  content: '🔥';
  margin-right: 4px;
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

:deep(.tag) {
  cursor: pointer;
  padding: 12px 24px;
  color: #47a3ff;
  font-size: 18px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(71, 163, 255, 0.1);
  border-radius: 20px;
  box-shadow: 
    0 4px 16px rgba(71, 163, 255, 0.08),
    0 1px 4px rgba(71, 163, 255, 0.04);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.tagcloud {
  margin: 20px 0;
  min-height: 400px;
  animation: fade-in 1s ease-out;
}

.tagcloud .tag:hover {
  transform: scale(1.1) translateY(-4px);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 
    0 20px 40px rgba(71, 163, 255, 0.15),
    0 8px 16px rgba(71, 163, 255, 0.1);
}
</style>