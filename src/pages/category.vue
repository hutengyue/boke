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
        <div class="article" >
            <div @click="gotoArticle(item.articleId)" v-for="(item,index) in data.articles" :key="index" v-slide-in class="article-container">
            <div class="article-bkg">
                <img :src="item.articleImg">
            </div>
            <div :class="[index%2==0?'article-img-right':'article-img-left']">
                <img :src="item.articleImg">
            </div>
            <div class="article-message-left">
                <div class="article-message-header">
                <div class="article-message-time">
                    <svg t="1682521849531" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21260" width="200" height="200"><path d="M512 514m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#69B452" p-id="21261"></path><path d="M512 512m-253.15 0a253.15 253.15 0 1 0 506.3 0 253.15 253.15 0 1 0-506.3 0Z" fill="#FFFFFF" p-id="21262"></path><path d="M512 512m-203.07 0a203.07 203.07 0 1 0 406.14 0 203.07 203.07 0 1 0-406.14 0Z" fill="#D1F0C7" p-id="21263"></path><path d="M622.12 497h-91.31a24.09 24.09 0 0 0-11.46-7.92V360.22a6 6 0 0 0-6-6h-2.81a6 6 0 0 0-6 6v128.93a24.06 24.06 0 1 0 26.19 38.08h91.49a6 6 0 0 0 6-6V503a6 6 0 0 0-6.1-6z" fill="#69B452" p-id="21264"></path></svg>
                    <p>发布于{{item.createAt}}</p>
                </div>
                <div class="article-message-heat">
                    <svg t="1682522592284" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="22872" width="200" height="200"><path d="M360.725 33c3.526 1.457 7.052 2.909 10.575 4.374 24.202 10.07 48.704 19.484 72.535 30.362 36.75 16.774 71.604 37.031 104.774 60.142 26.75 18.64 51.616 39.576 75.127 62.087 8.946 8.564 17.269 17.852 25.224 27.354 11.313 13.515 22.512 27.179 32.88 41.417 16.44 22.572 30.486 46.615 41.868 72.193 9.157 20.583 17.27 41.491 22.289 63.505 1.506 6.607 2.988 13.217 4.803 21.235 22.57-30.853 27.756-66.112 34.339-102.473 12.856 20.155 25.33 38.876 36.948 58.113 19.011 31.48 37.17 63.487 51.968 97.194 10.17 23.167 20.189 46.494 28.429 70.384 7.825 22.688 14.158 45.995 19.464 69.411 4.837 21.353 8.16 43.128 8.012 65.212-0.008 1.095 0.677 2.192 1.04 3.287v28.275c-0.367 5.083-0.316 10.237-1.177 15.235-3.069 17.82-5.747 35.75-9.874 53.332-6.161 26.25-17.03 50.81-31.715 73.345-9.397 14.419-20.491 27.767-31.257 41.251-12.39 15.518-27.201 28.644-43.358 40.07-14.476 10.239-29.266 20.104-44.455 29.242-21.161 12.732-43.663 22.72-68 30.057 0.362-1.721 0.494-3.108 0.943-4.385 0.256-0.727-0.038-1.391-0.884-1.995 3.78-2.514 7.52-5.092 11.223-7.714 9.023-6.387 17.294-13.725 24.214-22.4 6.013-7.538 12.209-15.001 17.456-23.061 8.202-12.599 14.272-26.329 17.712-41.003 2.305-9.83 3.801-19.853 5.514-29.815 0.482-2.794 0.453-5.675 0.658-8.517v-15.806c-0.203-0.613-0.585-1.226-0.58-1.838 0.082-12.346-1.774-24.519-4.475-36.456-2.963-13.09-6.5-26.12-10.87-38.804-4.602-13.355-10.197-26.396-15.877-39.347-8.265-18.843-18.406-36.737-29.023-54.335-6.488-10.754-13.455-21.22-20.634-32.488-3.677 20.327-6.573 40.039-19.178 57.287-1.013-4.483-1.841-8.178-2.682-11.872-2.804-12.306-7.334-23.994-12.448-35.501-6.357-14.3-14.2-27.74-23.381-40.359-5.791-7.96-12.046-15.598-18.364-23.153-4.442-5.313-9.09-10.505-14.086-15.293-13.13-12.584-27.017-24.288-41.957-34.708-18.524-12.92-37.99-24.245-58.513-33.622-13.31-6.081-26.993-11.345-40.51-16.974-1.966-0.819-3.936-1.63-5.905-2.445h-1.823c2.422 5.634 5.001 11.206 7.237 16.915 5.352 13.666 9.691 27.673 12.132 42.149 1.853 10.98 3.211 22.066 4.24 33.156 0.716 7.715 1.045 15.546 0.599 23.27-1.31 22.64-5.744 44.64-14.715 65.61-7.112 16.63-16.064 32.158-27.791 45.931-7.035 8.261-14.661 16.02-22.068 23.96-0.871 0.934-2.038 1.592-3.418 2.645-9.25-20.868-19.72-40.931-33.244-60.231-0.746 3.928-1.463 7.05-1.916 10.21-1.707 11.923-5.19 23.362-9.133 34.7-5.79 16.647-13.894 32.063-24.987 45.738-4.47 5.51-10.332 9.877-14.917 15.309-3.614 4.28-6.848 9.116-9.181 14.197-4.825 10.504-7.04 21.814-8.917 33.158l-0.338 2.063c-0.528 3.25-0.448 6.599-0.698 9.898-0.033 0.422-0.378 0.821-0.579 1.231v24.319c0.404 2.901 0.709 5.82 1.23 8.7 1.621 8.97 2.588 18.146 5.19 26.827 2.969 9.909 6.878 19.636 11.374 28.962 5.008 10.388 11.799 19.73 19.437 28.488 12.581 14.425 27.58 25.594 44.386 34.512a198.767 198.767 0 0 0 6.817 3.451c-9.097 0.587-18.404 1.198-27.916 1.832-0.197-0.284-0.353-0.777-0.596-0.823-11.847-2.27-23.729-4.365-35.549-6.763-33.377-6.77-65.133-18.109-95.23-34.062-30.092-15.952-56.95-35.931-79.477-61.735-13.677-15.665-25.836-32.376-34.804-50.96-8.05-16.682-15.05-34.08-20.366-51.805-4.659-15.53-6.391-31.942-9.295-47.987-0.932-5.152-1.478-10.374-2.201-15.564v-43.5c0.36-0.734 0.978-1.448 1.036-2.204 0.449-5.901 0.305-11.89 1.25-17.705 3.502-21.524 7.41-43.074 16.572-63.002 4.178-9.089 9.969-17.74 16.44-25.396 8.21-9.716 18.708-17.527 26.71-27.384 19.863-24.463 34.374-52.038 44.742-81.817 7.06-20.28 13.297-40.742 16.354-62.07 0.81-5.652 2.095-11.237 3.43-18.264 24.216 34.524 42.964 70.413 59.527 107.742 2.47-1.884 4.56-3.06 6.12-4.732 13.263-14.204 26.918-28.082 39.515-42.86 20.998-24.637 37.028-52.413 49.763-82.159 16.064-37.512 24.004-76.865 26.348-117.362 0.8-13.818 0.21-27.827-1.07-41.626-1.844-19.838-4.276-39.669-7.593-59.31-4.371-25.893-12.142-50.95-21.725-75.394-4.003-10.213-8.62-20.18-12.959-30.258h3.265z" fill="#E50404" p-id="22873"></path></svg>
                    <p>{{item.heat}}热度</p>
                </div>
                <div class="article-message-comment">
                    <svg t="1682522863789" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="28299" width="200" height="200"><path d="M514.6112 515.84m-450.816 0a450.816 450.816 0 1 0 901.632 0 450.816 450.816 0 1 0-901.632 0Z" fill="#3CD38E" p-id="28300"></path><path d="M735.9488 252.3136H300.6464c-37.0688 0-67.1232 30.0544-67.1232 67.1232v324.9152c0 37.0688 30.0544 67.1232 67.1232 67.1232h27.4944c14.2336 0 25.8048 11.5712 25.8048 25.8048v59.0848c0 21.0944 23.9104 33.28 40.96 20.8896l139.264-100.9152c4.4032-3.1744 9.728-4.9152 15.1552-4.9152h186.624c37.0688 0 67.1232-30.0544 67.1232-67.1232V319.4368c0-37.0688-30.0544-67.1232-67.1232-67.1232z m-67.328 257.0752c-44.8512 47.0528-94.6176 70.8608-147.968 70.8608h-1.792c-88.2176-0.8704-151.2448-68.4544-153.856-71.3216-12.8512-13.9776-11.8784-35.7376 2.0992-48.5888a34.4064 34.4064 0 0 1 48.4864 1.9968c0.9216 0.9728 46.4896 48.8448 104.448 49.152 33.9968 0.1536 67.2768-16.4864 98.816-49.5616a34.38592 34.38592 0 0 1 48.64-1.1264c13.7216 13.1072 14.2848 34.8672 1.1264 48.5888z" fill="#FFFFFF" p-id="28301"></path></svg>
                    <p>{{item.commentsCount}}评论</p>
                </div>
                </div>
                <p class="article-message-title">{{item.articleTitle}}</p>
                <p class="article-label">{{item.articleLabel}}</p>
                <div class="article-category">
                <div>
                    <svg t="1718202362866" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18205" width="200" height="200"><path d="M531.071917 56.831751l402.814237-20.671909c37.055838 0 67.199706 30.079868 67.199706 67.071706l-18.047921 404.478231c0 31.807861-15.807931 47.039794-37.759835 68.351701l-10.047956 9.855957-398.718255 397.822259A136.959401 136.959401 0 0 1 439.040319 1023.99552a137.0874 137.0874 0 0 1-97.279574-40.127824L56.193994 698.876942a135.935405 135.935405 0 0 1-40.319823-97.151575c0-36.735839 14.207938-71.295688 40.319823-97.151575l398.718256-397.886259c5.439976-5.759975 10.239955-11.007952 14.399937-15.743931 20.799909-22.719901 31.167864-34.17585 61.69573-34.17585z m162.687288 425.598138c35.327845 0 70.527691-13.439941 97.343574-40.191824a136.319404 136.319404 0 0 0 40.447823-97.279574c0-36.67184-14.335937-71.231688-40.447823-97.087575A137.791397 137.791397 0 0 0 556.159807 344.958491c0 36.735839 14.271938 71.295688 40.319823 97.151575 26.879882 26.879882 62.079728 40.191824 97.343575 40.191824z m-41.599818-178.879217a58.751743 58.751743 0 0 1 41.599818-17.087925 58.751743 58.751743 0 0 1 58.751743 58.623743 58.879742 58.879742 0 0 1-117.503486 0c0-15.615932 6.143973-30.399867 17.215925-41.535818zM258.561109 504.765792a47.167794 47.167794 0 0 0-66.879708-0.064 47.487792 47.487792 0 0 0-0.127999 67.071706l273.470804 275.198796 0.063999 0.192a47.167794 47.167794 0 0 0 66.751708 0c18.559919-18.559919 18.559919-48.511788 0.128-67.135707l-273.406804-275.198796z" fill="#51A9FF" p-id="18206"></path></svg>
                    <p v-for="(tag,index) in item.tags" :key="index">{{ tag.tagName }}</p>
                </div>
                </div>
            </div>
        </div>
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
    data.createAt = res.data.createAt
    data.articles = res.data.articles
  })
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

@media screen and (max-width: 768px) {
  .category-header {
    padding: 2rem 1rem;
    margin: 1rem;
    width: calc(100% - 2rem);
  }

  .category-title {
    font-size: 2rem;
  }

  .category-meta {
    font-size: 0.9rem;
  }
}
.articles-grid {
  display: flex;
  flex-direction: column;
  width:60%;
  max-witdh:900px;
}

.article{
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
}
.article-container{
  width: 100%;
  height: 190px;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.article-container:hover{
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}
.article-bkg{
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.article-bkg img{
  height: 100%;
  width: 100%;
  filter: blur(15px) brightness(.7);
  transform: scale(1.4);
  object-fit: cover;
}
.article-message-header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.article-message-left{
  width: 55%;
  z-index: 1;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  float: left;
}
.article-message-time,.article-message-heat,.article-message-comment{
  color: white;
  display: flex;
  align-items: center;
  font-size: 15px;
}
.article-message-time{
  flex: 50%;
}
.article-message-heat,.article-message-comment{
  flex: 20%;
}
.article-message-title{
  color: white;
  font-size: 30px;
  text-align: center;
  text-shadow: 2px 2px 10px #000;
}
.article-label{
  color: white;
  font-size: 17px;
  text-align: center;
}
.article-category{
  display: flex;
  align-items: center;
  font-size: 15px;
  text-align: center;
  color: white;
}
.article-category .icon{
  width: 14px;
  height: 14px;
}
.article-category div{
  display: flex;
  align-items: center;
}
.article-category div:nth-child(2){
  margin-left: 20px;
}
.article-category div:nth-child(2) p{
  margin-right: 10px;
}
.article-img-right{
  float: right;
  height: 100%;
  width: 45%;
  z-index: 1;
  position: relative;
  clip-path: polygon(10% 0,100% 0,100% 100%,0 100%);
}
.article-img-left{
  float: left;
  height: 100%;
  width: 45%;
  z-index: 1;
  position: relative;
  clip-path: polygon(0 0,90% 0,100% 100%,0 100%);
}
.article-img-right img,.article-img-left img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all .5s;
}
.article-img-right img:hover{
  transform: scale(1.2);
}
.article-img-left img:hover{
  transform: scale(1.2);
}


@media screen and (max-width: 768px) {
  .container {
    flex-direction: column;
    padding: 15px;
  }

  .aside {
    width: 100%;
    max-width: none;
    margin-right: 0;
    margin-bottom: 20px;
  }

  .container-article {
    width: 100%;
  }

  .article-container {
    height: auto;
    min-height: 190px;
    flex-direction: column;
  }

  .article-message-left {
    width: 100%;
    padding: 10px;
  }

  .article-img-right,
  .article-img-left {
    clip-path: none;
    width: 100%;
    height: 150px;
  }

  .article-message-header {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 10px;
  }

  .article-message-time,
  .article-message-heat,
  .article-message-comment {
    font-size: 12px;
  }

  .article-message-title {
    font-size: 20px;
    margin-bottom: 5px;
  }

  .article-category {
    flex-direction: row;
    gap: 10px;
    font-size:12px;
    justify-content:space-between;
  }

  .article-category div:nth-child(2) {
    margin-left: 0;
  }

  .user-card {
    width: 100%;
  }

  .user-pyq {
    width: 80%;
  }

  .search-box {
    margin-top: 15px;
  }

  .category {
    font-size: 18px;
  }
}

/* 小屏幕手机适配 */
@media screen and (max-width: 480px) {
  .container {
    padding: 10px;
  }

  .article-message-header {
    flex-direction: row;
    align-items: flex-start;
  }

  .article-message-time,
  .article-message-heat,
  .article-message-comment {
    font-size: 10px;
  }
  .article-label{
    font-size: 12px;
  }

  .user-name {
    font-size: 20px;
  }

  .user-description {
    font-size: 14px;
  }

  .aside-notice p {
    font-size: 20px;
  }
}
</style>