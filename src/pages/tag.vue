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
  </div>
</template>

<script setup>
import {onMounted,getCurrentInstance,ref,computed, onBeforeUnmount} from 'vue'
const {proxy} = getCurrentInstance()
import TagCloud from 'TagCloud'
import {useRouter} from 'vue-router';
const router = useRouter()

let tags = ref([])
let tagId = ref(0)
let tagCloudInstance = null;

function select(id){
  router.push({name:'tagArticles',params:{tagId:id}})
}

const createTagCloud = () => {
  let result = tags.value.map((item)=>{
    return {
      name: item.tagName,
      id: item.tagId
    }
  })
  if (tagCloudInstance) {
    tagCloudInstance.destroy();
  }
  tagCloudInstance = TagCloud('.tagcloud', result.map(item => item.name), {
    radius: Math.min(window.innerWidth * 0.45, 200),
    maxSpeed: 'fast',
    initSpeed: 'fast',
    direction: 135,
    keep: true,
    reverseDirection: true,
    itemClass: 'tag',
    containerClass: 'tagcloud',
    useItemInlineStyles: true
  })
}

onMounted(()=>{
  proxy.$http.get('/tag').then((res)=>{
    tags.value = res.data
    createTagCloud()
    window.addEventListener('resize', createTagCloud)

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

onBeforeUnmount(() => {
  window.removeEventListener('resize', createTagCloud)
  if (tagCloudInstance) {
    tagCloudInstance.destroy()
  }
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