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
      <el-table :data="data.list" style="width: 100%"
                @selection-change="select">
        <el-table-column width="80" type="selection" />
        <el-table-column align="center" fixed prop="userId" label="编号" width="70" />
        <el-table-column align="center" prop="title" label="标题" width="130" />
        <el-table-column align="center" prop="identity" label="身份" width="150">
          <template v-slot="scope">
            <el-button link type="primary" size="small" @click="edit(scope.row)">修改</el-button>
            <el-button link type="primary" size="small" @click="del(scope.row)">删除</el-button>
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


    <el-dialog v-model="data.dialog" title="用户" width="500" align-center>
      <el-form :model="data.target">
        <el-form-item label="标题" :label-width="'120px'">
          <el-input v-model="data.target.title" />
        </el-form-item>=
        <el-form-item label="内容" :label-width="'120px'">
          <el-input v-model="data.target.content" />
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
  logs:[],
  target:{

  },
  type:1,
  dialog:false
})
function search(){}
function edit(){}
function del(){}
function refresh(){}
function select(){}
function handleCurrentChange(){}
function add(){}
onMounted(()=>{
  proxy.$http.get('/log').then(res=>{
    console.log(res.data)
  })
})
</script>

<style scoped>

</style>