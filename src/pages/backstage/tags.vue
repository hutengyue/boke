<template>
  <div class="body">
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <el-button type="success" @click="data.dialog = true;data.type = 1;">新增</el-button>
          <el-button type="danger" :disabled="data.selectTags==0" @click="del()">删除</el-button>
        </div>
      </template>
      <el-table :border="true" :data="data.list" style="width: 100%"
                @selection-change="select">
        <el-table-column width="80" type="selection"/>
        <el-table-column prop="tagId" label="编号" min-width="10%" />
        <el-table-column prop="tagName" label="标签名" min-width="10%" />
        <el-table-column prop="number" label="数量" min-width="10%" />
        <el-table-column prop="createTime" label="创建时间" min-width="20%" />
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
            :total="data.tags.length"
            @current-change="handleCurrentChange"
        />
      </template>
    </el-card>
    <el-dialog v-model="data.dialog" title="标签" width="500" align-center>
      <el-form-item label="标签名" :label-width="'120px'">
        <el-input v-model="data.tagName" />
      </el-form-item>
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
  tags:[],
  tagName:'',
  selectTags:[],
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
  })
}
function select(val){
  data.selectTags = val
}
function handleCurrentChange(val){
  data.list = data.tags.slice((val-1)*pageSize,val * pageSize)
}
function add(){
  proxy.$http.post('/tag',{
    tagName:data.tagName,
    createTime:new Date().toLocaleString(),
  }).then((res)=>{
    data.dialog = false
    return ElMessage({
      message: res.data.msg,
      type: res.data.type
    })
  })
}
onMounted(()=>{
  proxy.$http.get('/tag').then(res=>{
    data.tags = res.data
    data.list = data.tags.slice((data.currentPage-1)*pageSize,data.currentPage * pageSize)
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
  width: 93%;
}
</style>