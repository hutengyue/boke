<template>
  <div>
    <Header style="z-index: 1000"></Header>
    <div class="articleHeader">
      <img class="articleImg" :src="data.article.articleImg"/>
      <a class="articleTitle">{{ data.article.articleTitle }}</a>
      <p>{{data.article.articleLabel}}</p>
      <div class="articleDetail">
        <a>创建时间:{{data.article.dateTime}}</a>
        <a>{{data.article.articleLabel}}</a>
        <a>创建时间:2023-05-21</a>
      </div>
    </div>
    <div class="articleBody">
      <div class="entryContent">
        <div v-html="data.article.articleMessage"></div>
      </div>
    </div>
    <div class="comment">
      <div class="commentHeader">
        <svg t="1686537420803" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3631" width="30" height="30"><path d="M257.706667 752a40.490667 40.490667 0 0 0 5.973333-0.512l168.234667-29.482667a9.813333 9.813333 0 0 0 5.290666-2.816l423.893334-423.893333a9.941333 9.941333 0 0 0 0-14.08l-166.186667-166.314667a9.898667 9.898667 0 0 0-7.125333-2.901333 9.898667 9.898667 0 0 0-7.082667 2.901333l-423.893333 423.893334a10.154667 10.154667 0 0 0-2.816 5.290666l-29.482667 168.234667a33.877333 33.877333 0 0 0 33.194667 39.68z m67.413333-174.421333l362.666667-362.581334 73.301333 73.301334-362.666667 362.581333-88.917333 15.701333 15.616-88.96z m554.88 258.432H144a32 32 0 0 0-32 32v35.968c0 4.437333 3.584 8.021333 8.021333 8.021333h784a8.021333 8.021333 0 0 0 7.978667-8.021333v-35.968a32 32 0 0 0-32-32z" fill="#865B93" p-id="3632"></path></svg>
        <a>留言</a>
      </div>
      <textarea class="commentTextarea" v-model="data.message" maxlength="100" placeholder="写下点什么吧"></textarea>
      <button class="commentButton" @click="submit()">提交</button>
      <div class="commentsHeader">
        <p>评论 | {{data.comments.length}}条评论</p>
      </div>
      <div class="comments" v-for="(item,index) in data.comments" :key="index">
        <img :src="item.headImg" class="commentsImg">
        <div class="commentsBody">
          <div class="commentsTop">
            <a>{{ item.username }}</a>
            <a>{{ item.dateTime }}</a>
          </div>
          <div class="commentsMessage">
            <p>{{ item.message }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'highlight.js/styles/atom-one-dark.css'
import Header from "../components/header.vue";
import {getCurrentInstance,reactive,onMounted } from "vue";
import useStore from "../store/index.js";
import {useRoute} from "vue-router";
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
export default {
  name: "Article",
  setup(){
    const {proxy} = getCurrentInstance()
    const store = useStore()
    const route = useRoute()
    const data = reactive({
      article:{
        articleId:'',
        articleMessage:'',
        articleTitle:'',
        articleImg:'',
        dateTime:'',
        heat:'',
        articleLabel:''
      },
      message:'',
      comments:[]
    })

    function init(){
      proxy.$http({
        url:'/article/require',
        method:"POST",
        data:{articleId:route.query.articleId}
      }).then(res=>{
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
        data.article = res.data.article
        data.article.articleMessage = md.render(`${data.article.articleMessage}`)
        data.article.articleImg = 'data:image/png;base64,' + data.article.articleImg

        initComment()
      })

    }
    function initComment(){
      proxy.$http({
        url:'/comment',
        method:"GET",
        data:{
          message:data.message,
          articleId:data.article.articleId,
          dateTime:new Date().toLocaleString()
        }
      }).then(res=>{
        let a = res.data.filter(item=>item.articleId == data.article.articleId.toString());
        for(let i = 0;i < a.length;i++){
          a[i].headImg = 'data:image/png;base64,' + a[i].headImg
        }
        a.forEach((item)=>{
          item.dueTime = Date.parse(item.dateTime)
          item.dateTime = proxy.$utils.convertTimeToHumanReadable(item.dateTime)
        })
        a.sort(function (a,b){
          return b.dueTime - a.dueTime
        })
        data.comments = a
      })
    }
    function submit(){
      proxy.$http({
        url:'/comment/submit',
        method:"POST",
        data:{
          message:data.message,
          articleId:data.article.articleId,
          dateTime:new Date().toLocaleString()
        }
      }).then(res=>{
        data.message = ''
        var comment = res.data.comment
        comment.headImg = 'data:image/png;base64,' + comment.headImg
        comment.dateTime = proxy.$utils.convertTimeToHumanReadable(comment.dateTime)
        data.comments.unshift(comment)
        return ElMessage({
          message: res.data.msg,
          type: res.data.type
        })
      })
    }

    onMounted(()=>{
      init()
    })
    return{
      data,
      submit
    }
  },
  components:{
    Header,
  }
}
</script>

<style scoped>
@keyframes zhuye {
  from{
    opacity: 0;
    transform: translate(0px,-100px);
  }
  to{
    opacity: 1;
    transform: translate(0px,0px);
  }
}
@keyframes bottom {
  from{
    opacity: 0;
    transform: translate(0px,100px);
  }
  to{
    opacity: 1;
    transform: translate(0px,0px);
  }
}
.articleHeader{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  position: relative;
  height: 350px;
  width: 100%;
  animation: zhuye 1.5s ease 0s 1 normal none running;
}
.articleImg{
  z-index: -10;
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  object-fit: cover;
}
.articleTitle{
  font-size: 60px;
  color: white;
  text-align: center;
  font-family: normal;
}
.articleHeader p{
  color: rgb(171,164,136);
}
.articleDetail a{

}
.articleBody{
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: bottom 1.5s ease 0s 1 normal none running;
}
.entryContent{
  width: 80%;
  max-width: 800px;
}
.comment{
  width: 80%;
  max-width: 800px;
  padding: 20px 0 50px 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: bottom 1.5s ease 0s 1 normal none running;
}
.commentHeader{
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
  width:100%;
  justify-content: flex-start;
}
.commentHeader a{
  font-size: 25px;
  color: #865B93;
  font-weight: 700;
}
.commentTextarea{
  width: 100%;
  height: 150px;
  padding: 10px;
  resize: none;
  font-size: 15px;
  border-radius: 5px;
  outline: none;
  border: #ddd solid 2px;
  margin-bottom: 10px;
  font-family: normal;
}
.commentTextarea:focus{
  border: #865B93 solid 2px;
}
.commentButton{
  background: rgb(131, 123, 199);
  padding: 10px;
  font-size: 20px;
  border: none;
  border-radius: 10px;
  color: white;
  margin-bottom: 10px;
}
.commentsHeader{
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.commentsHeader p{
  color: #797979;
  font-size: 18px;
}
.comments{
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}
.commentsImg{
  width: 35px;
  height: 35px;
  border-radius: 10px;
}
.commentsBody{
  width: 100%;
  margin-left: 12px;
}
.commentsTop{
  width: 100%;
  margin-bottom: 10px;
  font-size: 18px;
  color: #797979;
  display: flex;
  flex-direction: row;
}
.commentsTop a:nth-child(1){
  font-weight: 700;
  margin-right: 10px;
}
.commentsMessage{
  width: 100%;
  padding: 20px;
  background-color: #f7f9fe;
  border-radius: 10px;
  font-size: 18px;
}
</style>