<template>
  <div class="all">
    <Header style="z-index: 1000"></Header>
    <div class="articleHeader">
      <div class="header-overlay"></div>
      <img class="articleImg" :src="data.article.articleImg"/>
      <div class="header-content">
        <h1 class="articleTitle">{{ data.article.articleTitle }}</h1>
        <div class="article-meta">
          <div class="meta-tags">
            <span class="label category">{{ data.article.categoryName }}</span>
            <span class="label tag" v-for="tag in data.article.tagNames" :key="tag">
              {{ tag }}
            </span>
          </div>
          <div class="articleDetail">
            <span class="detail-item">
              <i class="far fa-clock"></i>
              {{ data.article.createAt }}
            </span>
            <span class="detail-item">
              <i class="far fa-eye"></i>
              {{ data.article.heat }} 阅读
            </span>
            <span class="detail-item">
              <i class="far fa-folder"></i>
              {{ data.article.articleLabel }}
            </span>
          </div>
        </div>
      </div>
    </div>
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
              <a>{{ item.createAt }}</a>
            </div>
            <p @click="showReplyInput(item)">回复</p>
          </div>
          <div class="commentsMessage">
            <p>{{ item.message }}</p>
          </div>
          <!-- 回复输入框 -->
          <div v-if="item.showReply" class="reply-input">
            <textarea 
              v-model="item.replyMessage" 
              class="commentTextarea"
              placeholder="写下你的回复..."
              maxlength="100"
            ></textarea>
            <div class="reply-actions">
              <button class="cancel-btn" @click="cancelReply(item)">取消</button>
              <button class="reply-btn" @click="submitReply(item)">回复</button>
            </div>
          </div>
          <!-- 回复列表 -->
          <div class="replies" v-if="item.replies && item.replies.length > 0">
            <div class="reply-item" v-for="(reply, replyIndex) in item.replies" :key="reply.commentId">
              <img :src="reply.headImg" class="commentsImg">
              <div class="commentsBody">
                <div class="commentsTop">
                  <div>
                    <a>{{ reply.username }}</a>
                    <span class="reply-to" v-if="reply.toId">
                      <span class="at-symbol">@</span>
                      {{ reply.replyToUsername }}
                    </span>
                    <a>{{ reply.createAt }}</a>
                  </div>
                  <p @click="showReplyInput(reply, item)">回复</p>
                </div>
                <div class="commentsMessage">
                  <p>{{ reply.message }}</p>
                </div>
                <!-- 回复的回复输入框 -->
                <div v-if="reply.showReply" class="reply-input">
                  <textarea 
                    v-model="reply.replyMessage" 
                    class="commentTextarea"
                    placeholder="写下你的回复..."
                    maxlength="100"
                  ></textarea>
                  <div class="reply-actions">
                    <button class="cancel-btn" @click="cancelReply(reply)">取消</button>
                    <button class="reply-btn" @click="submitReply(reply, item)">回复</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
import { ElMessage } from 'element-plus'
const {proxy} = getCurrentInstance()
const store = useStore()
const route = useRoute()
const data = reactive({
  article:{},
  toc:'',
  message:'',
  comments:[],
  active:0,
  commentMeta:{}
})

async function init(){
  await proxy.$http.post(`/article/${route.params.articleId}/heat`)
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
    url: `/comment/list?page=${1}&pageSize=${10}&articleId=${data.article.articleId}`,
    method: "GET",
  }).then(res => {
    console.log(res.data.items)
    data.comments = res.data.items; 
    data.commentMeta = res.data.meta; 
  });
}
function submit(){
  proxy.$http.post('/comment/submit',{
      message:data.message,
      articleId:data.article.articleId,
    }
  ).then(res=>{
    initComment()
  })
}
function showReplyInput(comment, parentComment = null) {
  // 关闭所有其他回复框
  data.comments.forEach(c => {
    c.showReply = false;
    c.replyMessage = '';
    if (c.replies) {
      c.replies.forEach(r => {
        r.showReply = false;
        r.replyMessage = '';
      });
    }
  });
  
  // 显示当前回复框
  comment.showReply = true;
  comment.replyMessage = '';
  // 保存父评论信息（如果是回复的回复）
  if (parentComment) {
    comment.parentComment = parentComment;
  }
}

function cancelReply(comment) {
  comment.showReply = false;
  comment.replyMessage = '';
  comment.parentComment = null;
}

async function submitReply(comment, parentComment = null) {
  if (!comment.replyMessage.trim()) {
    ElMessage.warning('请输入回复内容');
    return;
  }
  
  try {
    const res = await proxy.$http.post('/comment/reply', {
      message: comment.replyMessage,
      articleId: data.article.articleId,
      parentId: parentComment ? parentComment.commentId : comment.commentId,
      toId: comment.userId // 回复目标用户ID
    });
    
    // 刷新评论列表
    initComment();
    // 清空并隐藏回复框
    comment.replyMessage = '';
    comment.showReply = false;
    comment.parentComment = null;
    
  } catch (error) {
    ElMessage.error('回复失败，请重试');
  }
}


onMounted(()=>{
  init()
})
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
.all{
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
}
.articleHeader {
  position: relative;
  height: 350px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #000;
}

.header-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7));
  z-index: 1;
}

.articleImg {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.1);
  filter: blur(5px);
  transition: all 0.3s ease;
}

.header-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  width: 90%;
  text-align: center;
  padding: 0 20px;
}

.articleTitle {
  font-size: 48px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 20px;
  line-height: 1.2;
  letter-spacing: -0.02em;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.article-meta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.meta-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 12px;
}

.label {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  padding: 6px 12px;
  border-radius: 20px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.02em;
  transition: all 0.3s ease;
}

.label.category {
  background: rgba(0, 122, 255, 0.2);
  border: 1px solid rgba(0, 122, 255, 0.3);
}

.label.tag {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.label:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.2);
}

.articleDetail {
  display: flex;
  gap: 20px;
  justify-content: center;
  color: rgba(255,255,255,0.8);
  font-size: 14px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.detail-item i {
  font-size: 16px;
}

@media (max-width: 768px) {

  .articleTitle {
    font-size: 32px;
    margin-bottom: 16px;
  }

  .articleDetail {
    flex-direction: column;
    gap: 8px;
  }

  .meta-tags {
    gap: 6px;
    margin-bottom: 8px;
  }
  
  .label {
    padding: 4px 10px;
    font-size: 12px;
  }

  .articleBody {
    padding: 12px;
  }

  .entryContent {
    font-size: 15px;
    line-height: 1.6;
  }

  .comment {
    padding: 12px;
  }

  .commentHeader a {
    font-size: 20px;
  }

  .commentTextarea {
    height: 120px;
    font-size: 14px;
  }

  .commentButton {
    font-size: 16px;
    padding: 8px 16px;
  }

  .commentsHeader p {
    font-size: 16px;
  }

  .commentsTop {
    font-size: 15px;
  }

  .commentsMessage {
    padding: 15px;
    font-size: 15px;
    margin-bottom: 15px;
  }

  .replies {
    margin-left: 10px;
  }

  .reply-actions button {
    padding: 6px 12px;
    font-size: 14px;
  }
}



.articleBody{
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: bottom 1.5s ease 0s 1 normal none running;
  position: relative;

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
.reply-input {
  margin: 10px 0 20px 0;
  width: 100%;
}

.reply-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 10px;
}

.cancel-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  background: #f5f5f5;
}

.reply-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: rgb(131, 123, 199);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reply-btn:hover {
  background: rgb(121, 113, 189);
}

.commentsTop p {
  padding: 5px 10px;
  background-color: rgb(239,122,80);
  color: white;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.commentsTop p:hover {
  background-color: rgb(229, 112, 70);
  transform: translateY(-1px);
}

.replies {
  margin-left: 20px;
  margin-top: 15px;
}

.reply-item {
  display: flex;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.reply-item:last-child {
  border-bottom: none;
}

.reply-to {
  color: #39c5bb;
  margin: 0 8px;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.at-symbol {
  color: #39c5bb;
  font-weight: bold;
  margin-right: 2px;
}

</style>