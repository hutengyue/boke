<script setup>
import {getCurrentInstance, onMounted, reactive,watch} from "vue";
import {useRouter} from "vue-router";
import useStore from "../store/index.js";
import {ElMessage} from "element-plus";
import Footer from "./footer.vue";
import ArticleItem from "./articleItem.vue";


const store = useStore()
const router = useRouter()
const {proxy} = getCurrentInstance()
var data = reactive({
  article:[],
  all:[],
  articles:[],
  cateIndex:0,
  number:[],//文章、分类、访问

})
let city = store.getCity
async function gotoArticle(id){
  router.push({name:'article',params:{articleId:id}})
}

function init(){
  proxy.$http.get('/article/count').then(res=>{
    data.number[0] = res.data
  })
  proxy.$http.get('/category').then(res=>{
    data.number[1] = res.data.length
  })
  proxy.$http.get('/visit/count').then(res=>{
    data.number[2] = res.data
  })
  proxy.$http.get('/article/page').then(res=>{
    data.articles = res.data.items
  })
}

onMounted(()=>{
  init()
})
</script>

<template>
  <div class="container">
    <div class="aside">
      <div class="aside-user">
        <div class="user-img"></div>
        <p class="user-name">『Cavalry』</p>
        <p class="user-description">穷其道者 归处亦同</p>
        <div class="user-card">
          <div class="user-card-item">
            <p>文章</p>
            <p>{{data.number[0]}}</p>
          </div>
          <div class="user-card-item">
            <p>分类</p>
            <p>{{data.number[1]}}</p>
          </div>
          <div class="user-card-item">
            <p>访问</p>
            <p>{{data.number[2]}}</p>
          </div>
        </div>
        <button class="user-pyq">朋友圈</button>
        <div class="user-link">
          <a href="http://wpa.qq.com/msgrd?v=3&amp;uin=1125469202&amp;site=qq&amp;menu=yes"></a>
          <a href="https://space.bilibili.com/33230767?spm_id_from=333.1007.0.0"></a>
        </div>
      </div>
      <div class="aside-notice">
        <p>
          <svg style="width: 20px;height: 20px" t="1686830114898" class="icon" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3355" width="200" height="200"><path d="M115.479782 1024A115.536809 115.536809 0 0 1 0 908.520218V335.284284a115.479782 115.479782 0 0 1 115.536809-115.479782H280.5731L489.805356 10.686299a34.216232 34.216232 0 0 1 7.014328-5.702705 35.470827 35.470827 0 0 1 32.790555-1.710811l1.596758 0.741351 2.566217 1.482704 0.627297 0.399189a38.436234 38.436234 0 0 1 3.991894 3.079461l1.425676 1.311622 209.17523 209.118203h161.899803A115.479782 115.479782 0 0 1 1026.48695 335.284284v573.12188a115.479782 115.479782 0 0 1-115.479782 115.479782z m-41.059478-681.758416v555.899711a50.297861 50.297861 0 0 0 50.354887 50.29786H902.738245a50.297861 50.297861 0 0 0 50.297861-50.29786V342.241584a50.297861 50.297861 0 0 0-50.297861-50.29786H821.18956l50.012725 50.012725a35.470827 35.470827 0 0 1-50.126779 50.126779l-100.139505-100.139504H308.687437L208.547932 392.083228a35.470827 35.470827 0 0 1-50.126779-50.126779l50.012725-50.012725H124.832219a50.297861 50.297861 0 0 0-50.411915 50.29786z m306.349327-122.380055h268.027148L514.783205 85.904982zM263.636065 797.716655a29.254878 29.254878 0 1 1 0-57.027053h499.499955a29.254878 29.254878 0 1 1 0 57.027053z m0-228.108211a29.254878 29.254878 0 1 1 0-57.027053h499.499955a29.254878 29.254878 0 1 1 0 57.027053z" fill="#ffffff" p-id="3356"></path></svg>
          公告
        </p>
        <div class="notice-message">
          <a>欢迎来自{{city}}的人来到cavalry的小站</a>
        </div>
      </div>
    </div>
    <div class="articles-grid">
      <ArticleItem v-for="(item,index) in data.articles" :key="index" :article="item" :index="index"></ArticleItem>
      <p>到底啦</p>
    </div>
  </div>
  <Footer></Footer>
</template>

<style scoped>
@font-face {
  font-family: rain;
  src: url("../assets/wenzi.ttf");
}
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.icon{
  width: 20px;
  height: 20px;
  margin-right: 3px;
}
.container{
  width: 100%;
  background-image: 
    radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.8) 0%, transparent 70%),
    linear-gradient(90deg,rgba(37,82,110,.1) 1px,#fff 0),
    linear-gradient(180deg,rgba(37,82,110,.1) 1px,#fff 0);
  background-size: 100% 100%, 3rem 3rem, 3rem 3rem;
  background-position: center top, 0 0, 0 0;
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}
.aside{
  width: 30%;
  max-width: 290px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0px 10px 0;
  margin-right: 50px;
  position: sticky; 
  top: 20px;
  align-self: flex-start; 
  height: fit-content; 
}
.aside-user{
  width: 100%;
  height: 360px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 20px;
  background: linear-gradient(-45deg, #e8d8b9, #eccec5, #a3e9eb, #bdbdf0, #eec1ea);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
.user-img{
  width: 90px;
  height: 90px;
  background: url("../assets/image/Tom.jpg") no-repeat;
  background-size: 100% 100%;
  border-radius: 15px;
}
.user-name{
  margin-top: 10px;
  font-size: 24px;
  font-weight: bold;
}
.user-description{
  font-size: 15px;
}
.user-card{
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  border-radius: 15px;
}
.user-card-item{
  display: flex;
  flex-direction: column;
  width: 33%;
}
.user-card-item:nth-child(2),.user-card-item:nth-child(1){
  border-right: 1px solid rgba(255,255,255,0.85);
}
.user-card-item p{
  margin-bottom: 2px;
  text-align: center;
}
.user-pyq{
  background: linear-gradient(135deg, #39c5bb, #4FA8FF);
  box-shadow: 0 4px 15px rgba(57, 197, 187, 0.3);
  transition: all 0.3s ease;
  width: 70%;
  padding: 10px;
  color:white;
  font-weight: 600;
  text-align: center;
  border-radius: 30px;
  border: none;
  font-size: 17px;
}
.user-pyq:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(57, 197, 187, 0.4);
}
.user-link{
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.user-link a{
  width: 28px;
  height: 28px;
}
.user-link a:nth-child(1){
  background: url("../assets/image/QQ.png") no-repeat;
  background-size: 100% 100%;
}
.user-link a:nth-child(2){
  background: url("../assets/image/bilibili.png") no-repeat;
  background-size: 100% 100%;
}
.aside-notice{
  margin-top: 20px;
  width: 100%;
  height: 130px;
  border-radius: 20px;
  background: url("../assets/image/notice.jpg") no-repeat;
  background-size: 100% 100%;
  padding: 10px;
  box-shadow: 1px 1px 3px rgb(0,0,0,0.3);
  color: white;
}
.aside-notice p{
  display: flex;
  font-size: 18px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-shadow: 2px 2px 10px #000;
}
.notice-message {
  margin-top: 10px;
  width: 100%;
  height: 85px;
  font-size: 15px;
}
.articles-grid{
  width: 70%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
}


@media screen and (max-width: 768px) {
  .container {
    flex-direction: column;
    padding: 20px 20px 30px 20px;
  }

  .aside {
    position: relative;
    width: 100%;
    max-width: none;
    margin-right: 0;
    margin-bottom: 20px;
  }

  .articles-grid {
    width: 100%;
  }

  .user-card {
    width: 100%;
  }

  .user-pyq {
    width: 80%;
  }

  .category {
    font-size: 18px;
  }
}

/* 小屏幕手机适配 */
@media screen and (max-width: 480px) {

  .aside-user{
    height: 250px;
    padding: 10px;
  }
  .user-img{
    width: 50px;
    height: 50px;
    border-radius: 15px;
  }
  .user-name{
    font-size: 18px;
  }
  .user-description{
    font-size: 13px;
  }
  .user-card{
    font-size: 10px;
    width: 50%;
  }
  .user-pyq{
    font-size: 15px;
    padding: 5px;
  }
  .user-link{
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .user-link a{
    width: 25px;
    height: 25px;
  }

  .container {
    padding: 20px 20px 30px 20px;
  }

  .aside-notice p {
    font-size: 20px;
  }
}
</style>