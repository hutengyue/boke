<template>
  <div class="all">
    <Header style="z-index: 1000"></Header>
    <div class="category-header">
        <div class="category-header-overlay"></div>
        <img src="../assets/image/bkg.jpg" style="left:0;top:0;position:absolute;height:100%;width:100%;object-fit:cover;z-index:0;" alt="">
        <div class="category-header-content">
            <h1 class="category-title">{{ data.categoryName }}</h1>
            <p class="category-meta">
                <svg class="icon" viewBox="0 0 24 24" fill="white" stroke="none">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                创建于 {{ data.createAt }}
            </p>
        </div>
    </div>
      
    <div class="articles-grid">
      <ArticleItem v-for="(item,index) in data.articles" :key="index" :article="item" :index="index"></ArticleItem>
    </div>
  </div>
</template>

<script setup>
import Header from '../components/header.vue'
import { onMounted, reactive, getCurrentInstance, watch } from 'vue'
import { useRoute } from 'vue-router'
import ArticleItem from '../components/articleItem.vue'


const route = useRoute()
const { proxy } = getCurrentInstance()

const data = reactive({
  categoryId: null,
  categoryName: '',
  createAt: '',
  articles: []
})

function fetchCategoryData(categoryId) {
  proxy.$http.post(`/category`,{categoryId}).then((res) => {
    data.categoryId = res.data.categoryId
    data.categoryName = res.data.categoryName
    data.createAt = res.data.createAt
    data.articles = res.data.articles
  })
}

watch(
  () => route.query.id,
  (newId) => {
    if (newId) {
      fetchCategoryData(newId)
    }
  },
  { immediate: true, deep: true }
)

onMounted(async () => {
  const categoryId = route.query.id
  if (categoryId) {
    fetchCategoryData(categoryId)
  }
})
</script>

<style scoped>
.icon{
  width: 20px;
  height: 20px;
  margin-right: 3px;
}
.all {
  min-height: 100vh;
  background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.category-header {
  position: relative;
  text-align: center;
  margin-bottom: 2rem;
  width: 100%;
  overflow: hidden;
  height: 200px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding-top:60px;
}

.category-header-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
}

.category-header-content {
  position: relative;
  z-index: 1;
}

.category-title {
  font-size: 2.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #1E88E5, #1565C0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: white;
  margin-bottom: 1rem;
  letter-spacing: -0.5px;
  transform: translateY(0);
  transition: transform 0.3s ease;
}

.category-title:hover {
  transform: translateY(-2px);
}

.category-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
}

.category-meta .icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  stroke: #666;
}

.articles-grid {
  display: flex;
  flex-direction: column;
  width:90%;
  max-width:850px;
}


@media screen and (max-width: 768px) {
  .category-title {
    font-size: 2rem;
  }

  .category-meta {
    font-size: 0.9rem;
  }
}

</style>