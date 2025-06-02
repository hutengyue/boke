<template>
  <div class="box">
    <div class="header">
      <div class="header-content">
        <div class="header-left">
          <el-upload
              class="avatar-uploader"
              :show-file-list="false" drag name="img"
              :before-upload="beforeAvatarUpload">
            <img v-if="data.imageUrl" :src="data.imageUrl" class="avatar">
            <div v-else class="upload-placeholder">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </div>
          </el-upload>
        </div>
        <div class="header-right">
          <div class="input-group">
            <input class="title" v-model="data.title" type="text" placeholder="请输入标题">
            <div class="meta-group">
              <input class="label" v-model="data.label" type="text" placeholder="请输入简介">
              <div class="select-group">
                <el-select v-model="data.category" placeholder="请选择类别" class="category-select">
                  <el-option
                      v-for="item in data.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="data.tags" multiple placeholder="请选择标签" class="tags-select">
                  <el-option
                      v-for="item in data.tagOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
              </div>
            </div>
          </div>
          <el-button @click="submit()" type="success" class="submit-btn">发布文章</el-button>
        </div>
      </div>
    </div>
    <div class="message">
      <div class="write">
        <p>写文章</p>
        <textarea v-model="data.message" class="writeText"></textarea>
      </div>
      <div class="read">
        <p>预览</p>
        <div class="entryContent readText" v-html="data.text" id="content"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {watch,reactive,getCurrentInstance,onMounted} from "vue";
import {ElMessage} from "element-plus";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import 'highlight.js/styles/atom-one-dark.css'
import {uploadToOSS} from '../../util/api.js'

const {proxy} = getCurrentInstance()
const data = reactive({
  options: [],
  category: null,
  message:'',
  title: '',
  label: '',
  text:'',
  fileInfo:'',
  imageUrl:'',
  tags:[],
  tagOptions:[]
})

async function beforeAvatarUpload(file) {
  const isJPG = file.type === 'image/jpeg' || 'image/png';
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG) {
    ElMessage.error('上传头像图片只能是 JPG或PNG 格式!')
    return false;
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!');
    return false;
  }

  try {
    const url = await uploadToOSS(file);
    data.fileInfo = url;
    data.imageUrl = URL.createObjectURL(file);
    ElMessage.success('上传成功');
    return false; // 返回false阻止Element默认上传
  } catch (error) {
    ElMessage.error('上传失败');
    console.error(error);
    return false;
  }
}

function write(message){
  var md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang,options) {
      // 此处判断是否有添加代码语言
      if (lang && hljs.getLanguage(lang)) {
        try {
          // 得到经过highlight.js之后的html代码
          const preCode = hljs.highlight(lang, str, true).value
          // 以换行进行分割
          const lines = preCode.split(/\n/).slice(0, -1)
          // 添加自定义行号
          let html = lines.map((item, index) => {
            return '<li><span class="line-num" data-line="' + (index + 1) + '">' + (index + 1) + '</span>'+'<div class="item">' + item + '</div>'+'</li>'
          }).join('')
          html = '<ol>' + html + '</ol>'
          // 添加代码语言
          if (lines.length) {
            html += '<b class="name">' + lang + '</b>'
          }
          return '<pre class="hljs"><code>' +
              html +
              '</code></pre>'
        } catch (__) {
        }
      }
      // 未添加代码语言，此处与上面同理
      const preCode = md.utils.escapeHtml(str)
      const lines = preCode.split(/\n/).slice(0, -1)
      let html = lines.map((item, index) => {
        return '<li><span class="line-num" data-line="' + (index + 1) + '">' + (index + 1) + '</span>'+'<div class="item">' + item + '</div>'+'</li>'
      }).join('')
      html = '<ol>' + html + '</ol>'
      return '<pre class="hljs"><code>' +
          html +
          '</code></pre>'
    }
  })
  data.text = md.render(`${message}`)
}

async function uploadMarkdownToOSS() {
  if (!data.message.trim()) {
    ElMessage.warning('文章内容不能为空');
    return null;
  }
  const blob = new Blob([data.message], { type: 'text/markdown' });
  const file = new File([blob], `${Date.now()}.md`, { type: 'text/markdown' });
  
  const url = await uploadToOSS(file);
  return url;
}

async function submit() {
  const markdownUrl = await uploadMarkdownToOSS();
  if (!markdownUrl) return;
  let article = {
    articleTitle: data.title,
    articleLabel: data.label,
    articleImg: data.fileInfo,
    articleMessage: markdownUrl,
    categoryId: data.category,
    tags: data.tags
  };
  
  proxy.$http.post('/article/create', article).then(res => {
  });
}

watch(()=>data.message,(newVal)=>{
  write(newVal)
})

onMounted(()=>{
  proxy.$http({
    url:'/category',
    method:"GET"
  }).then(res=>{
    res.data.forEach((item)=>{
      data.options.push({value:item.categoryId,label:item.categoryName})
    })
  })
  proxy.$http({
    url:'/tag',
    method:"GET"
  }).then(res=>{
    res.data.forEach((item)=>{
      data.tagOptions.push({value:item.tagId,label:item.tagName})
    })
  })
})
</script>

<style scoped>
.box {
  box-sizing: border-box;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  width: 100%;
  margin-bottom: 12px;
  box-sizing: border-box;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.header-content {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.header-left {
  flex: 0 0 180px;
}

.header-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.meta-group {
  display: flex;
  gap: 16px;
}

.label {
  flex: 1;
}

.select-group {
  display: flex;
  gap: 12px;
  flex: 2;
}

.category-select,
.tags-select {
  flex: 1;
}

.header input {
  width: 100%;
  padding: 10px 14px;
  font-size: 14px;
  color: #1d1d1f;
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.header input.title {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.3px;
  padding: 12px 16px;
}

.header input:focus {
  border-color: #0071e3;
  box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.08);
  background: #fff;
}

.message {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  width: 100%;
  max-width: 1600px;
  flex: 1;
  margin-top: 0;
  min-height: calc(100vh - 200px);
}

.write, .read {
  background: rgba(255, 255, 255, 0.8);
  padding: 6px;
  border-radius: 16px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.write p, .read p {
  font-size: 20px;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 8px;
}

.writeText, .readText {
  flex: 1;
  padding: 6px;
  font-size: 16px;
  line-height: 1.8;
  color: #1d1d1f;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  min-height: calc(100vh - 300px);
  overflow-y: auto;
}

.writeText:focus {
  border-color: #0071e3;
  box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.1);
}

:deep(.avatar-uploader) {
  width: 160px;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease;
}

:deep(.el-upload-dragger) {
  width: 100%;
  height: 100%;
  border: 2px dashed rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.98);
  transition: all 0.2s ease;
}

:deep(.el-upload-dragger:hover) {
  border-color: #0071e3;
  background: rgba(0, 113, 227, 0.04);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 113, 227, 0.08);
}

.upload-placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #666;
  font-size: 12px;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.submit-btn {
  align-self: flex-end;
  padding: 16px 36px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 14px;
  background: #0071e3;
  border-color: #0071e3;
  transition: all 0.3s ease;
  letter-spacing: 0.3px;
}

.submit-btn:hover {
  background: #0077ed;
  border-color: #0077ed;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 113, 227, 0.2);
}

:deep(.el-select) {
  width: 100%;
}

:deep(.el-select .el-input__wrapper) {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  box-shadow: none;
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 2px 10px;
}

:deep(.el-select .el-input__wrapper.is-focus) {
  border-color: #0071e3;
  box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.1);
}
</style>