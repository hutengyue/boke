<template>
  <div class="container">
    <div class="aside">
      <div class="aside-user">
        <div class="user-img"></div>
        <p class="user-name">『Cavalry』</p>
        <p class="user-description">穷其道者 归处亦同</p>
        <div class="user-card">
          <div class="user-card-item">
            <p>文章</p>
            <p>{{data.number[0]}}</p>
          </div>
          <div class="user-card-item">
            <p>标签</p>
            <p>{{data.number[1]}}</p>
          </div>
          <div class="user-card-item">
            <p>访问</p>
            <p>{{data.number[2]}}</p>
          </div>
        </div>
        <button class="user-pyq">朋友圈</button>
        <div class="user-link">
          <a href="http://wpa.qq.com/msgrd?v=3&amp;uin=1125469202&amp;site=qq&amp;menu=yes"></a>
          <a href="https://space.bilibili.com/33230767?spm_id_from=333.1007.0.0"></a>
        </div>
      </div>
      <div class="aside-notice">
        <p>
          <svg style="width: 35px;height: 35px" t="1686830114898" class="icon" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3355" width="200" height="200"><path d="M115.479782 1024A115.536809 115.536809 0 0 1 0 908.520218V335.284284a115.479782 115.479782 0 0 1 115.536809-115.479782H280.5731L489.805356 10.686299a34.216232 34.216232 0 0 1 7.014328-5.702705 35.470827 35.470827 0 0 1 32.790555-1.710811l1.596758 0.741351 2.566217 1.482704 0.627297 0.399189a38.436234 38.436234 0 0 1 3.991894 3.079461l1.425676 1.311622 209.17523 209.118203h161.899803A115.479782 115.479782 0 0 1 1026.48695 335.284284v573.12188a115.479782 115.479782 0 0 1-115.479782 115.479782z m-41.059478-681.758416v555.899711a50.297861 50.297861 0 0 0 50.354887 50.29786H902.738245a50.297861 50.297861 0 0 0 50.297861-50.29786V342.241584a50.297861 50.297861 0 0 0-50.297861-50.29786H821.18956l50.012725 50.012725a35.470827 35.470827 0 0 1-50.126779 50.126779l-100.139505-100.139504H308.687437L208.547932 392.083228a35.470827 35.470827 0 0 1-50.126779-50.126779l50.012725-50.012725H124.832219a50.297861 50.297861 0 0 0-50.411915 50.29786z m306.349327-122.380055h268.027148L514.783205 85.904982zM263.636065 797.716655a29.254878 29.254878 0 1 1 0-57.027053h499.499955a29.254878 29.254878 0 1 1 0 57.027053z m0-228.108211a29.254878 29.254878 0 1 1 0-57.027053h499.499955a29.254878 29.254878 0 1 1 0 57.027053z" fill="#ffffff" p-id="3356"></path></svg>
          公告
        </p>
        <div class="notice-message">
          <a>欢迎来自{{city}}的人来到cavalry的小站</a>
        </div>
      </div>
      <div class="search-box">
        <p>搜索</p>
        <div class="search">
          <input v-model="data.search" type="text">
        </div>
      </div>
    </div>
    <div class="container-article">

      <div class="article" v-for="(category,index) in data.category" :key="index">
        <div class="category">
          <div>
            <svg t="1719678096582" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1500" width="200" height="200"><path d="M298.666667 358.4l55.552 93.866667L409.6 358.4V68.266667h452.266667a51.2 51.2 0 0 1 51.2 51.2V896a51.2 51.2 0 0 1-51.2 51.2h-682.666667A51.2 51.2 0 0 1 128 896V119.466667a51.2 51.2 0 0 1 51.2-51.2H298.666667v290.133333z m203.776 392.661333a46.933333 46.933333 0 0 0-1.749334 4.48l-0.725333 2.304-30.293333 109.269334a11.221333 11.221333 0 0 0-0.128 5.589333 10.666667 10.666667 0 0 0 12.373333 8.021333l1.109333-0.256 109.226667-30.421333c2.304-0.64 4.565333-1.493333 6.741333-2.474667a16.298667 16.298667 0 0 1-13.482666-3.370666l-1.109334-1.024-77.568-77.568-1.237333-1.365334a16.341333 16.341333 0 0 1-3.157333-13.226666z m316.8-226.304a72.917333 72.917333 0 0 0-101.418667-1.109333l-1.706667 1.706667-210.688 210.645333a45.568 45.568 0 0 0-1.450666 1.493333l-1.365334 1.578667a16.810667 16.810667 0 0 1 20.778667 0.554667l1.066667 0.981333 78.933333 78.933333 1.024 1.152c4.949333 5.930667 5.12 14.506667 0.512 20.693334l1.536-1.365334 1.493333-1.408 210.730667-210.730666a72.96 72.96 0 0 0 2.218667-101.418667l-1.664-1.706667z m-104.533334 2.005334a16.896 16.896 0 0 1 21.76-0.213334l1.109334 0.981334 78.890666 78.933333 1.066667 1.152a16.896 16.896 0 0 1-0.256 21.589333l-1.152 1.237334-0.981333 0.896a16.896 16.896 0 0 1-21.76 0.213333l-1.066667-0.981333-78.933333-78.933334-1.066667-1.152a16.896 16.896 0 0 1 0.298667-21.589333l1.152-1.237333 0.981333-0.853334z" fill="#00A183" opacity=".85" p-id="1501"></path></svg>
            <p>{{category.categoryName}}</p>
          </div>
          <div>
            <svg t="1719678360700" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12786" id="mx_n_1719678360701" width="200" height="200"><path d="M568 826.5c-13.4 0-26.7-5.9-35.6-17.3-15.5-19.7-12.1-48.1 7.6-63.6l296.8-233.3-296.9-233.4c-19.7-15.5-23.1-43.9-7.6-63.6 15.5-19.7 44-23.1 63.6-7.6L938 476.6c10.9 8.6 17.3 21.7 17.3 35.6 0 13.9-6.4 27-17.3 35.6l-342.1 269c-8.3 6.5-18.1 9.7-27.9 9.7z m-455.3 0c-13.4 0-26.7-5.9-35.6-17.3-15.5-19.7-12.1-48.2 7.6-63.6l296.8-233.3L84.7 278.9C65 263.4 61.6 235 77.1 215.3c15.5-19.7 44-23.1 63.6-7.6l342 268.9c10.9 8.6 17.3 21.7 17.3 35.6 0 13.9-6.4 27-17.3 35.6l-342 268.9c-8.3 6.6-18.2 9.8-28 9.8z" fill="#39c5bb" p-id="12787"></path></svg>
            <p>MORE</p>
          </div>
        </div>
        <div @click="gotoArticle(item.articleId)" v-for="(item,index) in category.articles" :key="index" v-slide-in class="article-container">
          <div class="article-bkg">
            <img :src="item.articleImg">
          </div>
          <div :class="[index%2==0?'article-img-right':'article-img-left']">
            <img :src="item.articleImg">
          </div>
          <div class="article-message-left">
            <div class="article-message-header">
              <div class="article-message-time">
                <svg t="1682521849531" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21260" width="200" height="200"><path d="M512 514m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#69B452" p-id="21261"></path><path d="M512 512m-253.15 0a253.15 253.15 0 1 0 506.3 0 253.15 253.15 0 1 0-506.3 0Z" fill="#FFFFFF" p-id="21262"></path><path d="M512 512m-203.07 0a203.07 203.07 0 1 0 406.14 0 203.07 203.07 0 1 0-406.14 0Z" fill="#D1F0C7" p-id="21263"></path><path d="M622.12 497h-91.31a24.09 24.09 0 0 0-11.46-7.92V360.22a6 6 0 0 0-6-6h-2.81a6 6 0 0 0-6 6v128.93a24.06 24.06 0 1 0 26.19 38.08h91.49a6 6 0 0 0 6-6V503a6 6 0 0 0-6.1-6z" fill="#69B452" p-id="21264"></path></svg>
                <p>发布于{{item.createAt}}</p>
              </div>
              <div class="article-message-heat">
                <svg t="1682522592284" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="22872" width="200" height="200"><path d="M360.725 33c3.526 1.457 7.052 2.909 10.575 4.374 24.202 10.07 48.704 19.484 72.535 30.362 36.75 16.774 71.604 37.031 104.774 60.142 26.75 18.64 51.616 39.576 75.127 62.087 8.946 8.564 17.269 17.852 25.224 27.354 11.313 13.515 22.512 27.179 32.88 41.417 16.44 22.572 30.486 46.615 41.868 72.193 9.157 20.583 17.27 41.491 22.289 63.505 1.506 6.607 2.988 13.217 4.803 21.235 22.57-30.853 27.756-66.112 34.339-102.473 12.856 20.155 25.33 38.876 36.948 58.113 19.011 31.48 37.17 63.487 51.968 97.194 10.17 23.167 20.189 46.494 28.429 70.384 7.825 22.688 14.158 45.995 19.464 69.411 4.837 21.353 8.16 43.128 8.012 65.212-0.008 1.095 0.677 2.192 1.04 3.287v28.275c-0.367 5.083-0.316 10.237-1.177 15.235-3.069 17.82-5.747 35.75-9.874 53.332-6.161 26.25-17.03 50.81-31.715 73.345-9.397 14.419-20.491 27.767-31.257 41.251-12.39 15.518-27.201 28.644-43.358 40.07-14.476 10.239-29.266 20.104-44.455 29.242-21.161 12.732-43.663 22.72-68 30.057 0.362-1.721 0.494-3.108 0.943-4.385 0.256-0.727-0.038-1.391-0.884-1.995 3.78-2.514 7.52-5.092 11.223-7.714 9.023-6.387 17.294-13.725 24.214-22.4 6.013-7.538 12.209-15.001 17.456-23.061 8.202-12.599 14.272-26.329 17.712-41.003 2.305-9.83 3.801-19.853 5.514-29.815 0.482-2.794 0.453-5.675 0.658-8.517v-15.806c-0.203-0.613-0.585-1.226-0.58-1.838 0.082-12.346-1.774-24.519-4.475-36.456-2.963-13.09-6.5-26.12-10.87-38.804-4.602-13.355-10.197-26.396-15.877-39.347-8.265-18.843-18.406-36.737-29.023-54.335-6.488-10.754-13.455-21.22-20.634-32.488-3.677 20.327-6.573 40.039-19.178 57.287-1.013-4.483-1.841-8.178-2.682-11.872-2.804-12.306-7.334-23.994-12.448-35.501-6.357-14.3-14.2-27.74-23.381-40.359-5.791-7.96-12.046-15.598-18.364-23.153-4.442-5.313-9.09-10.505-14.086-15.293-13.13-12.584-27.017-24.288-41.957-34.708-18.524-12.92-37.99-24.245-58.513-33.622-13.31-6.081-26.993-11.345-40.51-16.974-1.966-0.819-3.936-1.63-5.905-2.445h-1.823c2.422 5.634 5.001 11.206 7.237 16.915 5.352 13.666 9.691 27.673 12.132 42.149 1.853 10.98 3.211 22.066 4.24 33.156 0.716 7.715 1.045 15.546 0.599 23.27-1.31 22.64-5.744 44.64-14.715 65.61-7.112 16.63-16.064 32.158-27.791 45.931-7.035 8.261-14.661 16.02-22.068 23.96-0.871 0.934-2.038 1.592-3.418 2.645-9.25-20.868-19.72-40.931-33.244-60.231-0.746 3.928-1.463 7.05-1.916 10.21-1.707 11.923-5.19 23.362-9.133 34.7-5.79 16.647-13.894 32.063-24.987 45.738-4.47 5.51-10.332 9.877-14.917 15.309-3.614 4.28-6.848 9.116-9.181 14.197-4.825 10.504-7.04 21.814-8.917 33.158l-0.338 2.063c-0.528 3.25-0.448 6.599-0.698 9.898-0.033 0.422-0.378 0.821-0.579 1.231v24.319c0.404 2.901 0.709 5.82 1.23 8.7 1.621 8.97 2.588 18.146 5.19 26.827 2.969 9.909 6.878 19.636 11.374 28.962 5.008 10.388 11.799 19.73 19.437 28.488 12.581 14.425 27.58 25.594 44.386 34.512a198.767 198.767 0 0 0 6.817 3.451c-9.097 0.587-18.404 1.198-27.916 1.832-0.197-0.284-0.353-0.777-0.596-0.823-11.847-2.27-23.729-4.365-35.549-6.763-33.377-6.77-65.133-18.109-95.23-34.062-30.092-15.952-56.95-35.931-79.477-61.735-13.677-15.665-25.836-32.376-34.804-50.96-8.05-16.682-15.05-34.08-20.366-51.805-4.659-15.53-6.391-31.942-9.295-47.987-0.932-5.152-1.478-10.374-2.201-15.564v-43.5c0.36-0.734 0.978-1.448 1.036-2.204 0.449-5.901 0.305-11.89 1.25-17.705 3.502-21.524 7.41-43.074 16.572-63.002 4.178-9.089 9.969-17.74 16.44-25.396 8.21-9.716 18.708-17.527 26.71-27.384 19.863-24.463 34.374-52.038 44.742-81.817 7.06-20.28 13.297-40.742 16.354-62.07 0.81-5.652 2.095-11.237 3.43-18.264 24.216 34.524 42.964 70.413 59.527 107.742 2.47-1.884 4.56-3.06 6.12-4.732 13.263-14.204 26.918-28.082 39.515-42.86 20.998-24.637 37.028-52.413 49.763-82.159 16.064-37.512 24.004-76.865 26.348-117.362 0.8-13.818 0.21-27.827-1.07-41.626-1.844-19.838-4.276-39.669-7.593-59.31-4.371-25.893-12.142-50.95-21.725-75.394-4.003-10.213-8.62-20.18-12.959-30.258h3.265z" fill="#E50404" p-id="22873"></path></svg>
                <p>{{item.heat}}热度</p>
              </div>
              <div class="article-message-comment">
                <svg t="1682522863789" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="28299" width="200" height="200"><path d="M514.6112 515.84m-450.816 0a450.816 450.816 0 1 0 901.632 0 450.816 450.816 0 1 0-901.632 0Z" fill="#3CD38E" p-id="28300"></path><path d="M735.9488 252.3136H300.6464c-37.0688 0-67.1232 30.0544-67.1232 67.1232v324.9152c0 37.0688 30.0544 67.1232 67.1232 67.1232h27.4944c14.2336 0 25.8048 11.5712 25.8048 25.8048v59.0848c0 21.0944 23.9104 33.28 40.96 20.8896l139.264-100.9152c4.4032-3.1744 9.728-4.9152 15.1552-4.9152h186.624c37.0688 0 67.1232-30.0544 67.1232-67.1232V319.4368c0-37.0688-30.0544-67.1232-67.1232-67.1232z m-67.328 257.0752c-44.8512 47.0528-94.6176 70.8608-147.968 70.8608h-1.792c-88.2176-0.8704-151.2448-68.4544-153.856-71.3216-12.8512-13.9776-11.8784-35.7376 2.0992-48.5888a34.4064 34.4064 0 0 1 48.4864 1.9968c0.9216 0.9728 46.4896 48.8448 104.448 49.152 33.9968 0.1536 67.2768-16.4864 98.816-49.5616a34.38592 34.38592 0 0 1 48.64-1.1264c13.7216 13.1072 14.2848 34.8672 1.1264 48.5888z" fill="#FFFFFF" p-id="28301"></path></svg>
                <p>{{item.comment}}评论</p>
              </div>
            </div>
            <p class="article-message-title">{{item.articleTitle}}</p>
            <p class="article-label">{{item.articleLabel}}</p>
            <div class="article-category">
              <div>
                <svg t="1718202121987" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11571" width="200" height="200"><path d="M820.839804 0l-617.805512 0c-112.132652 0-203.034315 90.901663-203.034315 203.034315l0 617.805512c0 112.131629 90.901663 203.033292 203.034315 203.033292l617.805512 0c112.133675 0 203.035338-90.901663 203.035338-203.033292l0-617.805512C1023.875143 90.901663 932.97348 0 820.839804 0zM482.643011 817.576749c0 16.567109-13.431934 29.998019-29.999043 29.998019L212.087827 847.574768c-16.567109 0-29.999043-13.430911-29.999043-29.998019L182.088784 568.55543c0-16.569155 13.431934-29.999043 29.999043-29.999043l240.555118 0c16.567109 0 29.999043 13.429887 29.999043 29.999043L482.641987 817.576749zM482.643011 455.319736c0 16.567109-13.431934 29.998019-29.999043 29.998019L212.087827 485.317756c-16.567109 0-29.999043-13.430911-29.999043-29.998019L182.088784 206.298417c0-16.569155 13.431934-29.999043 29.999043-29.999043l240.555118 0c16.567109 0 29.999043 13.429887 29.999043 29.999043L482.641987 455.319736zM841.786336 817.576749c0 16.567109-13.431934 29.998019-29.999043 29.998019L571.232175 847.574768c-16.567109 0-29.999043-13.430911-29.999043-29.998019L541.233132 568.55543c0-16.569155 13.431934-29.999043 29.999043-29.999043l240.555118 0c16.567109 0 29.999043 13.429887 29.999043 29.999043L841.786336 817.576749zM841.786336 455.319736c0 16.567109-13.431934 29.998019-29.999043 29.998019L571.232175 485.317756c-16.567109 0-29.999043-13.430911-29.999043-29.998019L541.233132 206.297394c0-16.568132 13.431934-29.999043 29.999043-29.999043l240.555118 0c16.567109 0 29.999043 13.429887 29.999043 29.999043L841.786336 455.319736z" fill="#F3C151" p-id="11572"></path><path d="M431.735296 203.157103 232.995475 203.157103c-13.686718 0-24.784665 11.095901-24.784665 24.785688l0 205.733595c0 13.687741 11.097947 24.783642 24.784665 24.783642l198.739821 0c13.687741 0 24.784665-11.095901 24.784665-24.783642L456.519961 227.942791C456.518938 214.253003 445.423037 203.157103 431.735296 203.157103z" fill="#F3C151" p-id="11573"></path></svg>
                <p>{{category.categoryName}}</p>
              </div>
              <div>
                <svg t="1718202362866" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18205" width="200" height="200"><path d="M531.071917 56.831751l402.814237-20.671909c37.055838 0 67.199706 30.079868 67.199706 67.071706l-18.047921 404.478231c0 31.807861-15.807931 47.039794-37.759835 68.351701l-10.047956 9.855957-398.718255 397.822259A136.959401 136.959401 0 0 1 439.040319 1023.99552a137.0874 137.0874 0 0 1-97.279574-40.127824L56.193994 698.876942a135.935405 135.935405 0 0 1-40.319823-97.151575c0-36.735839 14.207938-71.295688 40.319823-97.151575l398.718256-397.886259c5.439976-5.759975 10.239955-11.007952 14.399937-15.743931 20.799909-22.719901 31.167864-34.17585 61.69573-34.17585z m162.687288 425.598138c35.327845 0 70.527691-13.439941 97.343574-40.191824a136.319404 136.319404 0 0 0 40.447823-97.279574c0-36.67184-14.335937-71.231688-40.447823-97.087575A137.791397 137.791397 0 0 0 556.159807 344.958491c0 36.735839 14.271938 71.295688 40.319823 97.151575 26.879882 26.879882 62.079728 40.191824 97.343575 40.191824z m-41.599818-178.879217a58.751743 58.751743 0 0 1 41.599818-17.087925 58.751743 58.751743 0 0 1 58.751743 58.623743 58.879742 58.879742 0 0 1-117.503486 0c0-15.615932 6.143973-30.399867 17.215925-41.535818zM258.561109 504.765792a47.167794 47.167794 0 0 0-66.879708-0.064 47.487792 47.487792 0 0 0-0.127999 67.071706l273.470804 275.198796 0.063999 0.192a47.167794 47.167794 0 0 0 66.751708 0c18.559919-18.559919 18.559919-48.511788 0.128-67.135707l-273.406804-275.198796z" fill="#51A9FF" p-id="18206"></path></svg>
                <p v-for="(tag,index) in item.tags" :key="index">{{ tag.tagName }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p>到底啦</p>
    </div>
  </div>
</template>

<script setup>
import {getCurrentInstance, onMounted, reactive,watch} from "vue";
import {useRouter} from "vue-router";
import useStore from "../store/index.js";
import {ElMessage} from "element-plus";


const store = useStore()
const router = useRouter()
const {proxy} = getCurrentInstance()
var data = reactive({
  article:[],
  all:[],
  category:[],
  cateIndex:0,
  number:[],//文章、分类、访问
  search:'',

})
let city = store.getCity
async function gotoArticle(id){
  router.push({name:'article',params:{articleId:id}})
}

function init(){
  proxy.$http.get('/article/count').then(res=>{
    data.number[0] = res.data
  })
  proxy.$http.get('/category').then(res=>{
    res.data.forEach((item)=>{
      proxy.$http.post('/article/searchByCategory',{
        categoryId:item.categoryId,pageNo:1,pageSize:4
      }).then(response=>{
        data.category.push({categoryName:item.categoryName,articles:response.data})
      })
    })
    data.number[1] = res.data.length
  })
  proxy.$http.get('/visit/count').then(res=>{
    data.number[2] = res.data
  })
}
watch(()=>data.search,(nval,oval)=>{
  if(nval == ''){
    data.article = data.all
    return
  }
  proxy.$http({
    url:'/article/search',
    method:'post',
    data:{title:nval}
  }).then(res => {
    if(res.data.article){
      data.article = res.data.article
    }
  })
})
onMounted(()=>{
  init()
})
</script>

<style scoped>
@font-face {
  font-family: rain;
  src: url("../assets/wenzi.ttf");
}
.icon{
  width: 23px;
  height: 23px;
  margin-right: 3px;
}
.container{
  width: 100%;
  background-image: linear-gradient(90deg,rgba(37,82,110,.1) 1px,#fff 0),
  linear-gradient(180deg,rgba(37,82,110,.1) 1px,#fff 0);
  background-size: 3rem 3rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-height: 100vh;
  padding: 30px;
}
.aside{
  width: 23%;
  max-width: 290px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0px 10px 5px;
  margin-right: 50px;
}
.aside-user{
  width: 100%;
  height: 360px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 20px;
  background:linear-gradient(-45deg,#e8d8b9,#eccec5,#a3e9eb,#bdbdf0,#eec1ea);
  background-size: 100% 200%;
  color: black;
  box-shadow: 0 1px 20px -6px rgba(0,0,0,0.5)
}
.user-img{
  width: 90px;
  height: 90px;
  background: url("../assets/image/Tom.jpg") no-repeat;
  background-size: 100% 100%;
  border-radius: 15px;
}
.user-name{
  margin-top: 10px;
  font-size: 24px;
  font-weight: bold;
}
.user-description{
  font-size: 15px;
}
.user-card{
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.user-card-item{
  display: flex;
  flex-direction: column;
  width: 33%;
}
.user-card-item:nth-child(2),.user-card-item:nth-child(1){
  border-right: 1px solid rgba(255,255,255,0.85);
}
.user-card-item p{
  margin-bottom: 2px;
  text-align: center;
}
.user-pyq{
  background-color: #39c5bb;
  width: 70%;
  padding: 10px;
  color:white;
  font-weight: 600;
  text-align: center;
  border-radius: 30px;
  border: none;
  font-size: 17px;
  transition: all .5s;
}
.user-pyq:hover{
  background-color: darkorchid;
  color: white;
}
.user-link{
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.user-link a{
  width: 28px;
  height: 28px;
}
.user-link a:nth-child(1){
  background: url("../assets/image/QQ.png") no-repeat;
  background-size: 100% 100%;
}
.user-link a:nth-child(2){
  background: url("../assets/image/bilibili.png") no-repeat;
  background-size: 100% 100%;
}
.aside-notice{
  margin-top: 20px;
  width: 100%;
  height: 150px;
  border-radius: 20px;
  background: url("../assets/image/notice.jpg") no-repeat;
  background-size: 100% 100%;
  padding: 10px;
  box-shadow: 1px 1px 3px rgb(0,0,0,0.3);
  color: white;
}
.aside-notice p{
  display: flex;
  font-size: 26px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-shadow: 2px 2px 10px #000;
}
.notice-message {
  margin-top: 10px;
  width: 100%;
  height: 85px;
}
.search-box{
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15px;
  background-color: white;
  box-shadow: 0 1px 20px -6px rgba(0,0,0,0.5);
  border-radius: 10px;
  margin-top: 25px;
}
.search-box p{
  color:#39c5bb;
  font-size: 20px;
  margin-bottom: 10px;
}
.search{
  display: flex;
  justify-content: center;
  align-items: center;
}
.search input{
  width: 100%;
  border: 2px solid #39c5bb;
  border-radius: 40px;
  padding: 0 14px;
  height: 30px;
  outline: 0;
  background-color: white;
  color: #595a5a;
}

.container-article{
  width: 60%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.article{
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
}
.category{
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 10px;
  justify-content: space-between;
  font-size: 23px;
  margin-bottom: 18px;
  border-bottom: 3px dashed #ddd;
}
.category div{
  display: flex;
  align-items: center;
}
.article-container{
  width: 100%;
  height: 200px;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 1px 20px -6px;
  transition: all .5s;
}
.article-container:hover{
  box-shadow: 0 1px 20px 0px;
}
.article-bkg{
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.article-bkg img{
  height: 100%;
  width: 100%;
  filter: blur(15px) brightness(.7);
  transform: scale(1.4);
  object-fit: cover;
}
.article-message-header{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.article-message-left{
  width: 55%;
  z-index: 1;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  float: left;
}
.article-message-time,.article-message-heat,.article-message-comment{
  color: white;
  display: flex;
  align-items: center;
}
.article-message-time{
  flex: 50%;
}
.article-message-heat,.article-message-comment{
  flex: 20%;
}
.article-message-title{
  color: white;
  font-size: 33px;
  text-align: center;
  text-shadow: 2px 2px 10px #000;
}
.article-label{
  color: white;
  font-size: 18px;
  text-align: center;
}
.article-category{
  display: flex;
  align-items: center;
  font-size: 18px;
  text-align: center;
  color: white;
}
.article-category .icon{
  width: 17px;
  height: 17px;
}
.article-category div{
  display: flex;
  align-items: center;
}
.article-category div:nth-child(2){
  margin-left: 20px;
}
.article-category div:nth-child(2) p{
  margin-right: 10px;
}
.article-img-right{
  float: right;
  height: 100%;
  width: 45%;
  z-index: 1;
  position: relative;
  clip-path: polygon(10% 0,100% 0,100% 100%,0 100%);
}
.article-img-left{
  float: left;
  height: 100%;
  width: 45%;
  z-index: 1;
  position: relative;
  clip-path: polygon(0 0,90% 0,100% 100%,0 100%);
}
.article-img-right img,.article-img-left img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all .5s;
}
.article-img-right img:hover{
  transform: scale(1.2);
}
.article-img-left img:hover{
  transform: scale(1.2);
}

</style>