<template>
  <div class="box">
    <div class="header">
      <el-upload
          class="avatar-uploader"
          :action="data.httpUrl" :show-file-list="false" drag name="img"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
        <img v-if="data.imageUrl" :src="data.imageUrl" class="avatar">
        <div v-else>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </div>
      </el-upload>
      <input class="title" v-model="data.title" type="text" placeholder="请输入标题">
      <input class="label" v-model="data.label" type="text" placeholder="请输入简介">

      <el-select v-model="data.category" placeholder="请选择类别">
        <el-option
            v-for="item in data.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="data.tags" multiple placeholder="请选择标签" >
        <el-option
            v-for="item in data.tagOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <el-button @click="submit()" type="success" round>提交</el-button>
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
import global from "../../util/global.js";

const {proxy} = getCurrentInstance()
const data = reactive({
  options: [],
  category: null,
  message:'',
  title: '',
  label: '',
  text:'',
  httpUrl:`http://${global.httpUrl}/imgUpload`,
  fileInfo:'',
  imageUrl:'',
  tags:[],
  tagOptions:[]
})
function handleAvatarSuccess(res, file) {
  data.imageUrl = URL.createObjectURL(file.raw);
  data.fileInfo = res.fileInfo
  console.log(data.fileInfo,data.imageUrl)
}
function beforeAvatarUpload(file) {
  const isJPG = file.type === 'image/jpeg' || 'image/png';
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG) {
    ElMessage.error('上传头像图片只能是 JPG或PNG 格式!')
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!');
  }
  return isJPG && isLt2M;
}
function write(message){
  console.log(message)
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

function submit(){
  let article = {articleTitle:data.title,articleLabel:data.label,articleImg:data.fileInfo.path,
    html:data.message,dateTime:new Date().toLocaleString(),categoryId:data.category,
  tags:data.tags}
  console.log(article)
  proxy.$http({
    url:'/article/submit',
    method:"POST",
    data:{article:article}
  }).then(res=>{
    data.message = ''
    return ElMessage({
      showClose: true,
      message: res.data.msg,
      type: res.data.type
    })
  })
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
.box{
  box-sizing: border-box;
  padding: 10px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(242,242,242);
}
.header{
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
  border: none;
  outline: none;
  justify-content: space-around;
}
.header input{
  padding: 10px;
  border: none;
  outline: none;
}
.message{
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 90%;
  width: 100%;
  margin-top: 5px;
  justify-content: space-around;
  padding: 10px;
}
.write,.read{
  width: 49%;
  height: 90%;
  background-color: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.writeText,.readText{
  width: 90%;
  margin-top: 10px;
  height: 93%;
  overflow: auto;
  outline: none;
  border: none;
}


:deep(.avatar-uploader){
  width: 200px;
  height: 100px;
}
:deep(.el-upload-dragger){
  width: 200px;
  height: 100px;
}
:deep(.dialog-footer){
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.avatar{
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>