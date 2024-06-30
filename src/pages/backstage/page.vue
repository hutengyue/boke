<template>
  <div class="all">
    <div class="header">
      <div style="background: linear-gradient(to right, rgb(53, 139, 255), rgb(21, 198, 255));"
           class="item">
        <div class="title">
          <img src="../../assets/image/backstage/user.png" alt="">
          <p>用户量</p>
        </div>
        <h1>31</h1>
      </div>
      <div style="background: linear-gradient(to right, rgb(24, 231, 174), rgb(30, 235, 235));"
           class="item">
        <div class="title">
          <img src="../../assets/image/backstage/article.png" alt="">
          <p>文章量</p>
        </div>
        <h1>4</h1>
      </div>
      <div style="background: linear-gradient(to right, rgb(255, 102, 85), rgb(255, 191, 55));"
           class="item">
        <div class="title">
          <img src="../../assets/image/backstage/chat.png" alt="">
          <p>聊天量</p>
        </div>
        <h1>32</h1>
      </div>
      <div style="background: linear-gradient(120deg, rgb(255, 39, 232) 0%, rgb(255, 128, 0) 100%);"
           class="item">
        <div class="title">
          <img src="../../assets/image/backstage/message.png" alt="">
          <p>留言量</p>
        </div>
        <h1>13</h1>
      </div>
    </div>
    <el-card class="box-card" shadow="never">
      <template #header>
      </template>
      <el-table :data="data.list" style="width: 100%" :border="true">
        <el-table-column align="center" prop="username" label="ip地址" width="300" >
          <template v-slot="scope">
            <p>{{address(scope.row.clientIp)}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="location" label="位置" min-width="10%" />
        <el-table-column prop="browser" label=访问工具 min-width="10%" />
        <el-table-column prop="device" label=设备 min-width="10%" />
        <el-table-column prop="time" label="时间" min-width="10%" />
      </el-table>
      <template #footer>
        <el-pagination
            :background="true"
            v-model:current-page="data.currentPage"
            :page-size="pageSize"
            :small="false"
            layout="total,prev, pager, next, jumper"
            :total="data.visits.length"
            @current-change="handleCurrentChange"
        />
      </template>
    </el-card>
  </div>
</template>

<script setup>
import {onMounted,getCurrentInstance,reactive} from "vue";
const {proxy} = getCurrentInstance()
const pageSize = 9
const data = reactive({
  visits:[],
  target:{},
  select:[],
  list:[],
  type:1,
  dialog:false,
  currentPage:1,
})
function address(ip){
  const parts = ip.toString().split('.');
  parts[parts.length - 1] = '*';
  return parts.join('.');
}
function handleCurrentChange(val){
  data.list = data.visits.slice((val-1)*pageSize,val * pageSize)
}
onMounted(()=>{
  proxy.$http.get('/visit/detail').then(res=>{
    data.visits = res.data[1]
    data.list = data.visits.slice((data.currentPage-1)*pageSize,data.currentPage * pageSize)
  })

})
</script>

<style scoped>
.all{
  width: 100%;
  height: 100%;
  background-color: rgb(245,247,249);
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: auto;
}
.header{
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.item{
  padding: 30px;
  height: 170px;
  width: 20%;
  background-color: white;
  border: 1px solid #e4e7ed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  border-radius: 10px;
}
.title{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title img{
  width: 100px;
  height: 100px;
}
.box-card{
  margin-top: 20px;
  width: 93%;
}
</style>