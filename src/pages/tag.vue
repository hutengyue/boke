<template>
  <div class="all">
    <Header style="z-index: 1000"></Header>
    <div class="tags">
      <a @click="select(item.tagName)" v-for="(item,index) in tags" :key="index">
        <span>
          {{item.tagName}}
        </span>
        <span>{{ item.number }}</span>
      </a>
    </div>
    <div v-if="!tag" class="tagcloud"></div>

  </div>
</template>

<script setup>
import {onMounted,getCurrentInstance,ref} from 'vue'
const {proxy} = getCurrentInstance()
import TagCloud from 'TagCloud'
import {useRouter} from 'vue-router';
const router = useRouter()

let tags = ref([])
let tag = ref(0)
let article = ref([])

function select(name){
  proxy.$http.post('/tag/articles',{tagName:name}).then((res)=> {
    article.value = res.data
    tag.value = name
  })
}
function gotoArticle(id){
  router.push({path:'/article',query:{articleId:id}})
}
onMounted(()=>{
  proxy.$http.get('/tag').then((res)=>{
    tags.value = res.data
    let a = tags.value.map((item)=>{
      return item.tagName
    },[])
    TagCloud('.tagcloud',a,{
      radius:320,
      maxSpeed:'fast',
      initSpeed:'fast',
      direction:135,
      keep:true,
      reverseDirection:true,
      itemClass:'tag',
      containerClass:'tagcloud',
      useItemInlineStyles:true
    })
    let rootEl = document.querySelector('.tagcloud');
    rootEl.addEventListener('click', function clickEventHandler(e) {
      if (e.target.className === 'tag') {
        select(e.target.innerText)
      }
    });
  })
})
</script>

<style scoped>
@font-face {
  font-family: rain;
  src: url("../assets/wenzi.ttf");
}
@keyframes slide-in {
  0%{
    transform: translateY(20px);
    opacity: 0;
  }
  100%{
    transform: translateY(0);
    opacity: 1;
  }
}
.icon{
  width: 23px;
  height: 23px;
  margin-right: 3px;
}
.all{
  background-image: linear-gradient(90deg,rgba(37,82,110,.1) 1px,#fff 0),
  linear-gradient(180deg,rgba(37,82,110,.1) 1px,#fff 0);
  background-size: 3rem 3rem;
  /*background-color: rgb(247,249,254);*/
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 90px;
  min-height: 100vh;

  overflow: hidden;
}

.tagcloud .tag:hover{
  transform: scale(1.4,1.4);
}
:deep(.tag){
  cursor: pointer;
  display: block;
  padding: 11px 30px;
  color: rgb(57,197,187);
  font-size: 25px;
  border: 1px solid #e6e7e8;
  border-radius: 18px;
  background-color: #f2f4f8;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: 6px 4px 8px 0 rgba(151, 142, 136, .34);
}

.tags{
  width: 90%;
  max-width: 1300px;
  text-align: center;
  animation:slide-in 0.6s 0.1s backwards;
}
.tags a{
  color:#363636;
  font-size: 22px;
  padding: 12px;
  margin: 20px;
  border-radius: 12px;
  border: 1px solid #e3e8f7;
  box-shadow: 0 8px 16px -4px #2c2d300c;
  display: inline-block;
  transition: all 0.3s ease 0s;
  text-decoration: none;
  overflow-wrap: break-word;
  background: #fff;
}
.tags a:hover{
  transform: scale(1.1,1.1);
}
.tags a span:nth-child(1){
  margin-right: 2px;
}
.tags a span:nth-child(1)::before{
  font-size: 25px;
  content:"#";
  opacity: 0.4;
  margin-right: 2px;
  font-weight: bold;
}
.tags a span:nth-child(2){
  background: #f7f7f9;
  padding: 4px;
  border-radius: 8px;
  color: rgba(60,60,67,0.8);
  line-height: 1;
  text-align: center;
  min-width: 35px;
  display: inline-block;
  font-size: 22px;
  margin-left: 8px;
}
</style>