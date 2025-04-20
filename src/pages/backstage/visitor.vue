<template>
  <div class="all">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="title">访客记录</span>
          <el-tag type="info" effect="plain" class="visitor-count">
            总访问量：{{ data.total }}
          </el-tag>
        </div>
      </template>

      <el-table 
        :data="data.visits" 
        style="width: 100%" 
        :border="false"
        :stripe="true"
      >
        <!-- 表格列保持不变 -->
        <el-table-column align="center" prop="clientIp" label="IP 地址" width="300">
          <template v-slot="scope">
            <span class="ip-text">{{address(scope.row.clientIp)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="location" label="位置" min-width="10%" />
        <el-table-column prop="browser" label="访问工具" min-width="10%" />
        <el-table-column prop="device" label="设备" min-width="10%" />
        <el-table-column prop="createAt" label="时间" min-width="10%" />
      </el-table>

      <div class="pagination-container">
        <el-pagination
          class="pagination"
          :background="true"
          v-model:current-page="data.currentPage"
          :page-size="pageSize"
          :small="false"
          layout="total, prev, pager, next, jumper"
          :total="data.total"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import {onMounted,getCurrentInstance,reactive} from "vue";
const {proxy} = getCurrentInstance()
const pageSize = 8  // 修改为与后端一致的页面大小
const data = reactive({
  visits: [],        // 当前页的访问记录
  total: 0,         // 总记录数
  currentPage: 1,    // 当前页码
})

function handleCurrentChange(val) {
  // 页码改变时请求新数据
  fetchVisitData(val)
}

function fetchVisitData(page) {
  proxy.$http.get(`/visit?page=${page}&limit=${pageSize}`).then(res => {
    data.visits = res.data.items
    data.total = res.data.meta.total
  })
}
function address(ip){
  const parts = ip.toString().split('.');
  parts[parts.length - 1] = '*';
  return parts.join('.');
}
onMounted(()=>{
  fetchVisitData(1)

})
</script>

<style scoped>
.all {
  padding: 12px;
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  background-color: #f5f5f7;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.box-card {
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.title {
  font-size: 18px;
  font-weight: 500;
  color: #1d1d1f;
  letter-spacing: -0.022em;
}

.visitor-count {
  font-size: 13px;
  border-radius: 6px;
}

:deep(.el-card__body) {
  padding: 0;
}

:deep(.el-table) {
  font-size: 14px;
}

:deep(.el-table th) {
  background-color: #f8f8fa !important;
  font-weight: 500;
  color: #1d1d1f;
  padding: 16px;
  border: none;
}

:deep(.el-table td) {
  padding: 16px;
  color: #424245;
  border-bottom: 1px solid #f0f0f2;
}

:deep(.el-table--striped .el-table__body tr.el-table__row--striped td) {
  background: #fafafa;
}

:deep(.el-table__body tr:hover > td) {
  background-color: #f5f5f7 !important;
}

.ip-text {
  color: #0066cc;
  font-family: "SF Mono", Monaco, Menlo, Consolas, monospace;
}

.pagination-container {
  padding: 24px;
  display: flex;
  justify-content: flex-end;
  background: #fff;
  border-top: 1px solid #f0f0f2;
}

:deep(.el-pagination.is-background .el-pager li:not(.disabled).active) {
  background-color: #0066cc;
}

:deep(.el-pagination.is-background .el-pager li:not(.disabled):hover) {
  color: #0066cc;
}

:deep(.el-pagination button:hover) {
  color: #0066cc;
}

:deep(.el-pagination .el-input__inner) {
  border-radius: 6px;
}
</style>