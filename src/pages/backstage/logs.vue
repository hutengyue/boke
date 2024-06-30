<template>
  <div class="body">
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <el-button type="success" @click="data.dialog = true;data.type = 1;">新增</el-button>
          <el-button type="danger" :disabled="data.selectLogs==0" @click="del()">删除</el-button>
        </div>
      </template>
      <el-table :data="data.list" style="width: 100%" :border="true"
                @selection-change="select">
        <el-table-column width="80" type="selection" />
        <el-table-column fixed prop="logId" label="编号" min-width="10%" />
        <el-table-column prop="content" label="内容" min-width="40%" />
        <el-table-column prop="time" label="时间" min-width="10%" />
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
            :total="data.logs.length"
            @current-change="handleCurrentChange"
        />
      </template>
    </el-card>


    <el-dialog v-model="data.dialog" title="日志" width="500" align-center>
      <el-form :model="data.target">
        <el-form-item label="标题" :label-width="'120px'">
          <el-input v-model="data.target.title" />
        </el-form-item>=
        <el-form-item label="内容" :label-width="'120px'">
          <el-input
              type="textarea"
              maxlength="30"
              show-word-limit
              placeholder="请输入内容"
              v-model="data.target.content">
          </el-input>
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
import {getCurrentInstance, onMounted, reactive} from "vue";
const {proxy} = getCurrentInstance()
const pageSize = 12
var data = reactive({
  logs:[],
  target:{},
  selectLogs:[],
  list:[],
  type:1,
  dialog:false,
  currentPage:1,
})
function edit(){}
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
  data.selectUsers = val
}
function handleCurrentChange(){}
function add(){}
onMounted(()=>{
  proxy.$http.get('/log').then(res=>{
    data.logs = res.data
    data.list = data.logs.slice((data.currentPage-1)*pageSize,data.currentPage * pageSize)
  })
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
.box-card{
  margin-top: 20px;
  width: 95%;
}
</style>