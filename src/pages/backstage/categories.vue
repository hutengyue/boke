<template>
  <div class="body">
    <el-card class="box-card" shadow="never">
      <template #header>
        <div class="card-header">
          <el-button type="success" @click="data.dialog = true;data.type = 1;">新增</el-button>
          <el-button type="danger" :disabled="data.select==0" @click="del()">删除</el-button>
        </div>
      </template>
      <el-table :border="true" :data="data.categories" style="width: 100%"
                @selection-change="select">
        <el-table-column width="80" type="selection"/>
        <el-table-column prop="categoryId" label="编号" min-width="10%" />
        <el-table-column prop="categoryName" label="标签名" min-width="10%" />
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
            :total="data.categories.length"
            @current-change="handleCurrentChange"
        />
      </template>
    </el-card>
  </div>
</template>

<script setup>
import { ElMessageBox,ElMessage } from 'element-plus'
import {getCurrentInstance, onMounted, reactive} from "vue";
const {proxy} = getCurrentInstance()
const pageSize = 12
var data = reactive({
  categories:[],
  target:{},
  select:[],
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
function handleCurrentChange(){}
function add(){}
onMounted(()=>{
  proxy.$http.get('/category').then(res=>{
    data.categories = res.data
    data.list = data.categories.slice((data.currentPage-1)*pageSize,data.currentPage * pageSize)
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