<template>
  <div class="container">
    <!-- 搜索栏 -->
    <div class="search-bar">
      <el-input
        v-model="searchQuery"
        placeholder="搜索用户名"
        class="search-input"
        :prefix-icon="Search"
        clearable
        @clear="handleSearch"
        @keyup.enter="handleSearch"
      />
      <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
      <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
    </div>

    <!-- 用户列表卡片 -->
    <el-card class="user-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span class="title">用户列表</span>
          <div class="actions">
            <el-button type="primary" :icon="Plus" @click="handleAdd">新增用户</el-button>
            <el-button 
              type="danger" 
              :icon="Delete" 
              :disabled="!selectedUsers.length"
              @click="handleBatchDelete"
            >
              批量删除
            </el-button>
          </div>
        </div>
      </template>

      <!-- 用户表格 -->
      <el-table
        :data="userList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :border="false"
        :stripe="true"
      >
        <el-table-column type="selection" width="50" />
        <el-table-column label="用户信息" width="150">
          <template #default="{ row }">
            <div class="user-info">
              <el-avatar :size="40" :src="row.headImg" />
              <div class="user-detail">
                <span class="username">{{ row.username }}</span>
                <span class="identity" :class="row.identity">
                  {{ row.identity === 'admin' ? '管理员' : '用户' }}
                </span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" />
        <el-table-column label="性别" width="80">
          <template #default="{ row }">
            <el-tag :type="row.sex === 1 ? 'info' : 'danger'" effect="plain">
              {{ row.sex === 1 ? '男' : '女' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="introduction" label="介绍" show-overflow-tooltip />
        <el-table-column prop="createAt" label="创建时间" width="180" />
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <div class="action-buttons">
              <el-button 
                class="edit-button" 
                type="primary" 
                link 
                @click="handleEdit(row)"
              >
                <el-icon class="icon"><Edit /></el-icon>
                编辑
              </el-button>
              <el-button 
                class="delete-button" 
                type="danger" 
                link 
                @click="handleDelete(row)"
              >
                <el-icon class="icon"><Delete /></el-icon>
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 50]"
          :total="total"
          layout="total, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 用户表单对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'add' ? '新增用户' : '编辑用户'"
      width="500px"
      destroy-on-close
    >
      <el-form
        ref="formRef"
        :model="userForm"
        :rules="formRules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="userForm.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="身份" prop="identity">
          <el-select v-model="userForm.identity" placeholder="请选择身份">
            <el-option label="管理员" value="admin" />
            <el-option label="用户" value="user" />
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" />
        </el-form-item>
        <el-form-item label="介绍" prop="introduction">
          <el-input
            v-model="userForm.introduction"
            type="textarea"
            :rows="3"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Refresh, Plus, Delete, Edit } from '@element-plus/icons-vue'
import { getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()

// 状态定义
const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(7)
const total = ref(0)
const userList = ref([])
const selectedUsers = ref([])
const dialogVisible = ref(false)
const dialogType = ref('add')
const formRef = ref(null)

// 表单数据与规则
const userForm = reactive({
  username: '',
  sex: 1,
  email: '',
  identity: '',
  introduction: ''
})

const formRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
  identity: [{ required: true, message: '请选择身份', trigger: 'change' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ]
}

// 获取用户列表
const fetchUsers = async () => {
  try {
    const res = await proxy.$http.get(`/user/list?page=${currentPage.value}&limit=${pageSize.value}${searchQuery.value ? `&username=${searchQuery.value}` : ''}`)
    userList.value = res.data.items
    total.value = res.data.meta.total
  } catch (error) {
    ElMessage.error('获取用户列表失败')
  }
}

// 搜索相关
const handleSearch = () => {
  currentPage.value = 1
  fetchUsers()
}

const resetSearch = () => {
  searchQuery.value = ''
  currentPage.value = 1
  fetchUsers()
}

// 分页相关
const handleSizeChange = (val) => {
  pageSize.value = val
  fetchUsers()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchUsers()
}

// 选择相关
const handleSelectionChange = (val) => {
  selectedUsers.value = val
}

// 表单相关
const handleAdd = () => {
  dialogType.value = 'add'
  dialogVisible.value = true
  Object.assign(userForm, {
    username: '',
    sex: 1,
    email: '',
    identity: '',
    introduction: ''
  })
}

const handleEdit = (row) => {
  dialogType.value = 'edit'
  dialogVisible.value = true
  Object.assign(userForm, row)
}

const handleSubmit = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        const url = dialogType.value === 'add' ? '/user/add' : '/user/update'
        await proxy.$http.post(url, { user: userForm })
        ElMessage.success(dialogType.value === 'add' ? '添加成功' : '更新成功')
        dialogVisible.value = false
        fetchUsers()
      } catch (error) {
        ElMessage.error(dialogType.value === 'add' ? '添加失败' : '更新失败')
      }
    }
  })
}

// 删除相关
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确认删除该用户?', '警告', {
      type: 'warning'
    })
    await proxy.$http.post('/user/delete', { userId: row.userId })
    ElMessage.success('删除成功')
    fetchUsers()
  } catch (error) {
    if (error !== 'cancel') ElMessage.error('删除失败')
  }
}

const handleBatchDelete = async () => {
  try {
    await ElMessageBox.confirm(`确认删除选中的 ${selectedUsers.value.length} 个用户?`, '警告', {
      type: 'warning'
    })
    const userIds = selectedUsers.value.map(user => user.userId)
    await proxy.$http.post('/user/delete', { userId: userIds })
    ElMessage.success('批量删除成功')
    fetchUsers()
  } catch (error) {
    if (error !== 'cancel') ElMessage.error('批量删除失败')
  }
}

// 初始化
fetchUsers()
</script>

<style scoped>
.container {
  padding: 12px;
  background-color: #f5f5f7;
  min-height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen;
}

.search-bar {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.search-bar:hover {
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.search-input {
  width: 300px;
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

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-detail {
  display: flex;
  flex-direction: column;
}

.username {
  font-weight: 500;
  color: #1d1d1f;
}

.identity {
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #f5f5f7;
}

.identity.admin {
  color: #0066cc;
  background: #e8f2ff;
}

.identity.user {
  color: #666;
  background: #f5f5f7;
}

.pagination {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
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
</style>