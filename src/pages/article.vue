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
    <div v-html="data.toc"></div>
    <div class="articleBody">
      <div class="entryContent" v-html="data.article.articleMessage">
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
        <p id="commit">评论 | {{data.comments.length}}条评论</p>
      </div>
      <div class="comments" v-for="(item,index) in data.comments" :key="index">
        <img :src="item.headImg" class="commentsImg">
        <div class="commentsBody">
          <div class="commentsTop">
            <div>
              <a>{{ item.username }}</a>
              <a>{{ item.dateTime }}</a>
            </div>
            <p>回复</p>
          </div>
          <div class="commentsMessage">
            <p>{{ item.message }}</p>
          </div>
<!--          <div class="answer" v-for="(item,index) in data.comments" :key="index">-->
<!--            <img :src="item.headImg" class="commentsImg">-->
<!--            <div class="commentsBody">-->
<!--              <div class="commentsTop">-->
<!--                <div>-->
<!--                  <a>{{ item.username }}</a>-->
<!--                  <a>{{ item.dateTime }}</a>-->
<!--                </div>-->
<!--                <p>回复</p>-->
<!--              </div>-->
<!--              <div class="commentsMessage">-->
<!--                <p>{{ item.message }}</p>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import 'highlight.js/styles/atom-one-dark.css'
import MarkdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItTocDoneRight from 'markdown-it-toc-done-right'
import uslug from 'uslug'
import hljs from 'highlight.js'
import Header from "../components/header.vue";
import {getCurrentInstance,reactive,onMounted } from "vue";
import useStore from "../store/index.js";
import {useRoute} from "vue-router";
const {proxy} = getCurrentInstance()
const store = useStore()
const route = useRoute()
const data = reactive({
  article:{},
  toc:'',
  message:'',
  comments:[],
  active:0
})

function init(){
  proxy.$http({
    url:'/article',
    method:"POST",
    data:{articleId:route.params.articleId}
  }).then(res=>{
    const uslugify = s => uslug(`/article?articleId=${route.query.articleId}/#`+s,{
      allowedChars: ['/','#','=','?'],
      lower:false
    })
    var md = new MarkdownIt({
      html: true,
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
    }).use(markdownItAnchor,{
      permalink:true,
      permalinkSymbol:"",
      slugify:uslugify
    }).use(markdownItTocDoneRight,{
      level:1,
      slugify:uslugify,
      containerClass:'toc',
      listClass:'toc-list',
      itemClass:'toc-list-item',
      linkClass:'toc-link',
      callback(){
      }
    })
    data.article = res.data
    data.article.articleMessage = md.render("${toc}\n"+data.article.articleMessage)
    // let tokens = md.parse("${toc}"+data.article.articleMessage, {})
    // console.log(tokens)
    // tokens.forEach(token => {
    //   console.log(token)
    //   if (token.type === 'inline') {
    //     const match = token.content.match(/<nav[\s\S]*?<\/nav>/);
    //     console.log(match)
    //     const extractedString = match ? match[0] : '';
    //     data.toc = extractedString
    //     console.log(extractedString)
    //   }
    // });
    scrollTo()//a标签滑动
    window.addEventListener('scroll',scroll)//监测滑动
    initComment()
  })
}
async function scrollTo() {
  let link = await document.getElementsByClassName('toc-link')
  link[data.active].classList.add('active')//目录突出
  for (let i = 0; i < link.length; i++) {
    link[i].onclick = async function (e) {
      event.preventDefault()
      await document.getElementById(link[i].getAttribute('href').substring(1)).scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      })
    }
  }
}
async function scroll() {
  let link = await document.getElementsByClassName('toc-link')
  for (let i = 0; i < link.length; i++) {
    let id = link[i].getAttribute('href').substring(1)
    let h = document.getElementById(id)
    if (isElementInViewport(h)) {
      link[data.active].classList.remove('active')
      data.active = i
      link[i].classList.add('active')
      if(!isElementInViewport(link[i],'toc')){
        let tocList = document.getElementsByClassName('toc-list')[0]
        tocList.scrollTop = link[i].offsetTop + link[i].offsetHeight - tocList.clientHeight;
      }
    }
  }
}
function isElementInViewport(element,toc) {
  var rect = element.getBoundingClientRect();
  if(toc){
    let tocList = document.getElementsByClassName('toc-list')[0]
    var parentRect = tocList.getBoundingClientRect();
    return (
        rect.top >= parentRect.top &&
        rect.bottom <= parentRect.bottom
    )
  }else{
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)/10*6
    );
  }
}
function initComment(){
  proxy.$http({
    url:'/comment',
    method:"GET",
    data:{
      articleId:data.article.articleId
    }
  }).then(res=>{
    data.comments = res.data
  })
}
function submit(){
  proxy.$http.post('/comment/submit',{
      message:data.message,
      articleId:data.article.articleId,
      dateTime:new Date().toLocaleString()
    }
  ).then(res=>{
    data.message = ''
    data.comments.unshift(res.data.comment)
    return ElMessage({
      message: res.data.msg,
      type: res.data.type
    })
  })
}

onMounted(()=>{
  init()
})
</script>

<style scoped>
@font-face {
  font-family: rain;
  src: url("../assets/wenzi.ttf");
}
*{
  font-family: rain;
}
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
  text-shadow: 2px 2px 10px #000;
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
}
.entryContent{
  width: 100%;
  max-width: 800px;
  /*animation: bottom 1.5s ease 0s 1 normal none running;*/
}
.comment{
  width: 100%;
  max-width: 800px;
  padding: 20px 20px 30px 20px;
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
  z-index:10000;
}
.commentsHeader p{
  color: #797979;
  font-size: 18px;
}
.comments,.answer{
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}
.comments{
  border-bottom: 1px solid rgba(0,0,0,.1);
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
  justify-content: space-between;
  align-items: center;
}
.commentsTop a:nth-child(1){
  font-weight: 700;
  margin-right: 10px;
}
.commentsTop p{
  padding: 5px;
  background-color: rgb(239,122,80);
  color: white;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}
.commentsMessage{
  width: 100%;
  padding: 20px;
  background-color: #f7f9fe;
  border-radius: 10px;
  font-size: 18px;
  margin-bottom: 20px;
}
</style>