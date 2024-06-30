<template>
  <div class="body">
    <div class="search-container">
      <div style="display: flex;align-items: center;">
        <a>关键字</a>
        <el-input size="small" v-model="data.search" style="width: 200px;margin-left: 20px;" placeholder="文章名" clearable />
      </div>
      <div style="margin-left: 40px">
        <el-button :icon="Search" type="primary" @click="search()">搜索</el-button>
        <el-button :icon="Refresh" @click="refresh()">重置</el-button>
      </div>
    </div>
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <el-button type="success" @click="add()">新增</el-button>
          <el-button type="danger" :disabled="data.select.length==0" @click="del()">删除</el-button>
        </div>
      </template>
      <el-table :data="data.list" style="width: 100%"
                @selection-change="select" :border="true">
        <el-table-column width="80" type="selection" />
        <el-table-column fixed prop="articleId" label="编号" min-width="10%" />
        <el-table-column prop="articleTitle" label="标题" min-width="15%" />
        <el-table-column label="封面" min-width="10%">
          <template v-slot="scope">
            <img style="width: 150px;height: 100px" :src="scope.row.articleImg" alt="">
          </template>
        </el-table-column>
        <el-table-column  prop="articleLabel" label="简介" min-width="20%" />
        <el-table-column prop="dateTime" label="创建时间" min-width="20%" />
        <el-table-column fixed="right" align="center" label="操作" width="150">
          <template v-slot="scope">
            <el-button type="primary" size="small" @click="edit(scope.row)">修改</el-button>
            <el-button type="danger" size="small" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <el-pagination
            :background="true"
            v-model:current-page="data.currentPage"
            :page-size="pageSize"
            :small="false"
            layout="total,prev, pager, next, jumper"
            :total="data.articles.length"
            @current-change="handleCurrentChange"
        />
      </template>
    </el-card>


    <el-dialog v-model="data.dialog" title="内容" width="40%" align-center>
      <div style="height: 600px;width: 100%">
        <textarea v-model="data.message" style="height: 100%;width: 100%;padding:30px;"></textarea>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="data.dialog = false">取消</el-button>
          <el-button type="primary" @click="add()">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ElMessageBox,ElMessage } from 'element-plus'
import {getCurrentInstance, onMounted, reactive} from "vue";
import {Search,Refresh} from '@element-plus/icons-vue'
const {proxy} = getCurrentInstance()
import {useRouter} from 'vue-router';
const router = useRouter()
const pageSize = 12
var data = reactive({
  articles:[],
  target:{},
  select:[],
  list:[],
  type:1,
  dialog:false,
  currentPage:1,
  search:'',
  message:''
})
function search(){
  proxy.$http({
    url:'/article/search',
    method:'post',
    data:{title:data.search}
  }).then(res => {
    if(res.data.article){
      data.list = res.data.article
    }
    return ElMessage({
      message: res.data.msg,
      type: res.data.type
    })
  })
}
function refresh(){
  data.search = ''
  init()
}
function edit(val){
  proxy.$http.post('/article/require',{articleId:val.articleId}).then(res => {
    data.dialog = true
    data.message = res.data.article.articleMessage
  })
}
function del(){
  ElMessageBox.confirm('是否确认此操作?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(()=>{
    var list
    if(val == undefined){
      list = data.selectUsers.map((item)=>{
        return item.userId
      })
    }else{
      list = val.userId
    }
    proxy.$http({
      url:'/user/delete',
      method:'post',
      data:{userId:list}
    }).then(res => {
      init()
      return ElMessage({
        message: res.data.msg,
        type: res.data.type
      })
    })
  })
}
function select(val){
  data.select = val
}
function handleCurrentChange(){}
function add(){
  router.push('/admin/public')
}
function init(){
  proxy.$http.get('/article').then(res => {
    console.log(res.data)
    data.articles = res.data
    data.list = data.articles.slice((data.currentPage - 1) * pageSize, data.currentPage * pageSize)
  })
}
onMounted(()=>{
  init()
})
</script>

<style scoped>
.search-container{
  padding: 18px;
  background-color: white;
  width: 93%;
  margin-top: 20px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
  border-radius: 4px;
  display: flex;
}
.body{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.box-card{
  margin-top: 20px;
  width: 95%;
}
</style>