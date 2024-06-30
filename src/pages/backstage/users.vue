<template>
  <div class="body">
    <div class="search-container">
      <div style="display: flex;align-items: center;">
        <a>关键字</a>
        <el-input size="small" v-model="data.search" style="width: 200px;margin-left: 20px;" placeholder="用户名" clearable />
      </div>
      <div style="margin-left: 40px">
        <el-button :icon="Search" type="primary" @click="search()">搜索</el-button>
        <el-button :icon="Refresh" @click="refresh()">重置</el-button>
      </div>
    </div>
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <el-button type="success" @click="data.dialog = true;data.type = 1;">新增</el-button>
          <el-button type="danger" :disabled="data.selectUsers==0" @click="del()">删除</el-button>
        </div>
      </template>
      <el-table :border="true" :data="data.list" style="width: 100%"
                @selection-change="select">
        <el-table-column width="80" type="selection"/>
        <el-table-column fixed prop="userId" label="编号" width="100" />
        <el-table-column label="头像" width="130" >
          <template v-slot="scope">
            <img style="width: 60px;height: 60px" :src="scope.row.headImg" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="username" label="名称" width="130" />
        <el-table-column label="性别" width="120" >
          <template v-slot="scope">
            <a>{{scope.row.sex == 1?'男':'女'}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="identity" label="身份" width="150"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="200" />
        <el-table-column prop="introduction" label="介绍" width="250" />
        <el-table-column prop="createTime" label="创建时间" width="250" />
        <el-table-column fixed="right" label="操作" width="200">
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
            :total="data.users.length"
            @current-change="handleCurrentChange"
        />
      </template>
    </el-card>


    <el-dialog v-model="data.dialog" title="用户" width="500" align-center>
      <el-form :model="data.target">
        <el-form-item label="用户名" :label-width="'120px'">
          <el-input v-model="data.target.username" />
        </el-form-item>
        <el-form-item label="性别" :label-width="'140px'">
          <el-select v-model="data.target.sex" placeholder="性别">
            <el-option label="男" value="1" />
            <el-option label="女" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="身份" :label-width="'140px'">
          <el-select v-model="data.target.identity" placeholder="身份">
            <el-option label="admin" value="admin" />
            <el-option label="user" value="user" />
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="'120px'">
          <el-input v-model="data.target.email" />
        </el-form-item>
        <el-form-item label="介绍" :label-width="'120px'">
          <el-input v-model="data.target.introduction" />
        </el-form-item>
      </el-form>
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
import {Search,Refresh} from '@element-plus/icons-vue'
import {getCurrentInstance, onMounted, reactive} from "vue";
const {proxy} = getCurrentInstance()
const pageSize = 12
var data = reactive({
  search:'',
  users:[],
  selectUsers:[],
  list:[],
  currentPage:1,
  dialog:false,
  target:{},
  type:1 //1新增2修改
})
function search(){
  proxy.$http({
    url:'/user/search',
    method:'post',
    data:{username:data.search}
  }).then(res => {
    data.list.length = 0
    data.list.push(res.data.user)
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

function add(){
  if(data.type == 1){
    data.target.createTime = new Date().toLocaleString()
    proxy.$http({
      url:'/user/add',
      method:'post',
      data:{user:data.target}
    }).then(res => {
      data.dialog = false
      init()
      return ElMessage({
        message: res.data.msg,
        type: res.data.type
      })
    })
  }else{
    proxy.$http({
      url:'/user/update',
      method:'post',
      data:{user:data.target}
    }).then(res => {
      data.dialog = false
      init()
      return ElMessage({
        message: res.data.msg,
        type: res.data.type
      })
    })
  }
}
function edit(val){
  data.target = {...val}
  data.dialog = true
  data.type = 2
}
function del(val){
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
  data.selectUsers = val
}
function handleCurrentChange(val){
  data.list = data.users.slice((val-1)*pageSize,val * pageSize)
}
function init(){
  proxy.$http({
    url:'/users',
    method:'get'
  }).then(res => {
    data.users = res.data
    data.list = data.users.slice((data.currentPage-1)*pageSize,data.currentPage * pageSize)
  })
}
onMounted(()=>{
  init()
})
</script>

<style scoped>
.body{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.search-container{
  padding: 18px;
  background-color: white;
  width: 93%;
  margin-top: 20px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
  border-radius: 4px;
  display: flex;
}
.box-card{
  margin-top: 20px;
  width: 93%;
}
</style>