<template>
  <div class="container">
    <el-card class="user-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="title">留言列表</span>
          <div class="actions">
            <el-button type="primary" :icon="Plus" @click="data.dialog = true;data.type = 1;">新增留言</el-button>
            <el-button type="danger" :icon="Delete" :disabled="data.select.length==0" @click="del()">批量删除</el-button>
          </div>
        </div>
      </template>
      <el-table :data="data.list" style="width: 100%" :border="false" :stripe="true"
                @selection-change="select">
        <el-table-column width="50" type="selection" />
        <el-table-column fixed prop="messageId" label="编号" min-width="5%" />
        <el-table-column label="发送者" min-width="13%">
          <template #default="{ row }">
            <div class="commenter-info">
              <el-avatar :size="32" :src="row.headImg" />
              <span class="commenter-name">{{ row.username }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="留言内容" min-width="30%">
          <template #default="{ row }">
            <div class="message-content">
              {{ row.content }}
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" align="center" label="操作" width="200">
          <template #default="{ row }">
            <div class="action-buttons">
              <el-button class="edit-button" type="primary" link @click="edit(row)">
                <el-icon class="icon"><Edit /></el-icon>编辑
              </el-button>
              <el-button class="delete-button" type="danger" link @click="del(row)">
                <el-icon class="icon"><Delete /></el-icon>删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
            v-model:current-page="data.currentPage"
            :page-size="data.meta.pageSize"
            :small="false"
            layout="total,prev, pager, next, jumper"
            :total="data.meta.total"
            @current-change="handleCurrentChange"
        />
      </div>
    </el-card>


    <el-dialog
      v-model="data.dialog"
      :title="data.type === 1 ? '新增留言' : '编辑留言'"
      width="500px"
      align-center
      destroy-on-close
    >
      <el-form
        :model="data.target"
        label-width="80px"
      >
        <el-form-item label="留言内容" prop="message">
          <el-input
            v-model="data.target.message"
            type="textarea"
            :rows="4"
            placeholder="请输入留言内容"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="data.dialog = false">取消</el-button>
          <el-button type="primary" @click="add()">
            {{ data.type === 1 ? '确认添加' : '确认修改' }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ElMessageBox, ElMessage } from 'element-plus'
import { getCurrentInstance, onMounted, reactive } from "vue";
import { Plus, Delete, Edit } from '@element-plus/icons-vue'

const { proxy } = getCurrentInstance()
const pageSize = 12
var data = reactive({
  messages: [],
  target: {},
  select: [],
  list: [],
  type: 1,
  dialog: false,
  currentPage: 1,
  total: 0,
  meta: {
    total: 0,
    page: 1,
    pageSize: pageSize,
    totalPages: 0
  }
})

function edit(row) {
  data.target = { ...row }
  data.type = 2
  data.dialog = true
}

async function del(row) {
  try {
    await ElMessageBox.confirm('确认删除该留言?', '警告', {
      type: 'warning'
    })
    await proxy.$http.post('/message/delete', { messageId: row ? row.messageId : data.select.map(item => item.messageId) })
    ElMessage.success('删除成功')
    fetchMessages()
  } catch (error) {
    if (error !== 'cancel') ElMessage.error('删除失败')
  }
}

function select(val) {
  data.select = val
}

async function handleCurrentChange(val) {
  data.currentPage = val
  fetchMessages()
}

async function add() {
  try {
    const url = data.type === 1 ? '/message/add' : '/message/update'
    await proxy.$http.post(url, { message: data.target })
    ElMessage.success(data.type === 1 ? '添加成功' : '更新成功')
    data.dialog = false
    fetchMessages()
  } catch (error) {
    ElMessage.error(data.type === 1 ? '添加失败' : '更新失败')
  }
}

async function fetchMessages() {
  try {
    const res = await proxy.$http.get('/message/page', {
      params: {
        page: data.currentPage,
        pageSize: pageSize
      }
    })
    data.list = res.data.items
    data.meta = res.data.meta
    data.total = res.data.meta.total
  } catch (error) {
    ElMessage.error('获取留言列表失败')
  }
}

onMounted(() => {
  fetchMessages()
})
</script>

<style scoped>
.container {
  padding: 12px;
  background-color: #f5f5f7;
  min-height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen;
}

.user-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: none;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 18px;
  font-weight: 500;
  color: #1d1d1f;
}

.actions {
  display: flex;
  gap: 12px;
}

:deep(.el-input__wrapper) {
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

:deep(.el-button) {
  border-radius: 12px;
  transition: all 0.3s ease;
}

:deep(.el-button:not(.is-disabled):hover) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

:deep(.el-card__body) {
  padding: 0;
}

:deep(.el-table) {
  border-radius: 0;
  margin: 0;
}

:deep(.el-table th) {
  background-color: #f8f8fa !important;
  font-weight: 500;
  color: #1d1d1f;
}

:deep(.el-table--striped .el-table__body tr.el-table__row--striped td) {
  background: #fafafa;
}

.pagination {
  margin: 24px 20px;
  display: flex;
  justify-content: flex-end;
}

:deep(.el-pagination.is-background .el-pager li:not(.disabled).active) {
  background-color: #0066cc;
}

:deep(.el-button--primary) {
  background-color: #0066cc;
}

:deep(.el-dialog) {
  border-radius: 16px;
  overflow: hidden;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.action-buttons .el-button {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.action-buttons .edit-button {
  color: #0066cc;
  background: rgba(0, 102, 204, 0.05);
}

.action-buttons .edit-button:hover {
  background: rgba(0, 102, 204, 0.1);
}

.action-buttons .delete-button {
  color: #ff3b30;
  background: rgba(255, 59, 48, 0.05);
}

.action-buttons .delete-button:hover {
  background: rgba(255, 59, 48, 0.1);
}

.action-buttons .icon {
  font-size: 14px;
}

.message-content {
  padding: 8px 0;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
}

.commenter-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.commenter-name {
  color: #333;
  font-size: 14px;
}
</style>