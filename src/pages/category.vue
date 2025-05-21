<template>
  <div class="all">
    <Header style="z-index: 1000"></Header>
    <div class="category-container">
      <div class="category-header">
        <h1 class="category-title">{{ data.categoryName }}</h1>
        <p class="category-meta">
          <i class="far fa-clock"></i> 创建于 {{ data.createAt }}
        </p>
      </div>
      
      <div class="articles-grid">
        
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from '../components/header.vue'
import { onMounted, reactive,getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'


const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()

const data = reactive({
  categoryId: null,
  categoryName: '',
  createAt: '',
  articles: []
})

function goToArticle(articleId) {
  router.push(`/article/${articleId}`)
}

onMounted(async () => {
  const categoryId = route.query.id
  proxy.$http.get(`/category/${categoryId}`).then((res) => {
    data.categoryId = res.data.categoryId
    data.categoryName = res.data.categoryName
    data.articles = res.data.articles
  })
})
</script>

<style scoped>
.all {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.category-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.category-header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.category-title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.category-meta {
  color: #666;
  font-size: 1rem;
}

.articles-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
}

.article-container {
  width: 100%;
  height: 300px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.article-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.article-bkg {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 20px;
  opacity: 0.15;
}

.article-bkg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(10px);
}

.article-img-left, .article-img-right {
  width: 45%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}

.article-img-left img, .article-img-right img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  transition: transform 0.3s ease;
}

.article-container:hover .article-img-left img,
.article-container:hover .article-img-right img {
  transform: scale(1.05);
}

.article-message-left {
  width: 55%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.article-message-header {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.article-message-time,
.article-message-heat,
.article-message-comment {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 20px;
  color: #666;
  font-size: 14px;
}

.icon {
  width: 23px;
  height: 23px;
  margin-right: 3px;
}

.article-message-title {
  font-size: 24px;
  font-weight: bold;
  margin: 15px 0;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-label {
  font-size: 16px;
  color: #666;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-category {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.article-category > div {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.article-category > div p {
  margin-right: 10px;
  color: #666;
  font-size: 14px;
}

@media (max-width: 768px) {
  .category-container {
    padding: 1rem;
  }
  
  .category-header {
    padding: 1.5rem;
  }
  
  .category-title {
    font-size: 2rem;
  }
  
  .article-container {
    height: auto;
    flex-direction: column;
  }
  
  .article-img-left,
  .article-img-right {
    width: 100%;
    height: 200px;
  }
  
  .article-message-left {
    width: 100%;
  }
}
</style>