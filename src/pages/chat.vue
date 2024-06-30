<template>
  <div>
    <Header style="z-index: 1000"></Header>
    <div class="all" ref="all">
      <div class="chatBox">
        <div class="friend-aside">
          <img class="user-img" :src="data.user.headImg">
          <p>{{data.user.username}}</p>
          <div class="friend-menu">
            <div @click="inChat()" :class="['friend-item',data.contentIndex == 0?'active':'']">
              <svg t="1682733497615" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="939" width="200" height="200"><path d="M288.937507 904.227247c-24.410828 0-63.650663-0.342208-98.327726-13.916453-45.969923-18.022948-70.266682-54.52512-70.266682-105.514091V512.627381H72.319929c-7.186365 0-13.574245-4.448702-16.08377-11.17879-2.509524-6.730088-0.456277-14.258661 5.019049-18.935502l433.007018-367.531247c6.501949-5.475326 15.9697-5.361257 22.35758 0.228139l418.976496 367.531247c5.361257 4.676841 7.186365 12.205414 4.67684 18.935501-2.509524 6.616019-8.897404 11.064721-15.9697 11.064721h-50.190487c1.825109 75.399799 4.448702 220.039657-1.4829 279.355687-2.965801 30.228361-8.783335 61.483346-43.460399 82.814303-33.194163 20.418403-89.430322 29.543946-182.168653 29.543946h-82.472096c-9.467751 0-17.110393-7.642642-17.110393-17.110393V732.667038h-98.213657v154.449816c0 4.562772-1.825109 8.897404-5.019049 12.091345-3.19394 3.19394-7.528573 5.019049-12.091344 5.019048H288.937507z m-169.963239-425.820652h18.479224c9.467751 0 17.110393 7.642642 17.110393 17.110393v289.393784c0 37.186588 15.399354 60.570792 48.479448 73.574691 29.543946 11.635067 66.046118 11.635067 87.719283 11.520998h124.107385V728.104266c0-16.311908 13.232037-29.543946 29.543946-29.543945H552.095355c16.311908 0 29.543946 13.232037 29.543945 29.543945v142.016264h65.361703c83.726858 0 137.453492-7.98485 164.259775-24.410827 19.733987-12.091345 24.524897-28.061045 27.376629-57.034645 6.159742-62.395901 2.623594-225.400913 0.798485-292.587724-0.114069-4.562772 1.59697-9.125543 4.79091-12.433552s7.642642-5.133118 12.205414-5.133118h22.35758L505.212877 150.57146 118.974268 478.406595z" p-id="940" fill="#515151"></path></svg>
              <a>聊天</a>
            </div>
            <div @click="inFriend()" :class="['friend-item',data.contentIndex == 1?'active':'']">
              <svg t="1682733677437" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1979" width="200" height="200"><path d="M856.839408 904.567263H156.189971c-9.387232 0-16.964877-7.577645-16.964877-16.964877 0-238.865474 90.253148-349.589574 172.589353-400.823504-25.899713-38.67992-40.037111-84.598189-40.037111-131.42125 0-130.06406 105.747736-235.811796 235.811796-235.811796s235.811796 105.747736 235.811796 235.811796c0 47.04926-14.250497 93.080627-40.376408 131.873647 43.769384 24.88182 79.961122 59.377071 107.670421 102.580959 24.88182 38.79302 42.977689 84.711288 53.722112 136.397614 18.208968 87.312569 9.387232 160.374641 9.047935 163.428319-0.904793 8.482439-8.143141 14.929092-16.62558 14.929092z m-683.57146-33.929755h667.850674c1.583389-24.994919 2.601281-78.717031-9.952728-138.433399-22.732936-107.557323-76.794345-182.994478-160.827038-223.936382-4.637066-2.261984-8.030042-6.559753-9.161034-11.536117-1.130992-5.089463 0.113099-10.292026 3.392975-14.363596 28.953391-35.739342 45.013475-80.865916 45.013475-127.010382 0-111.289596-90.592445-201.882041-201.882041-201.882041s-201.882041 90.592445-201.882041 201.882041c0 46.370665 15.26839 89.91385 44.22178 125.992489 3.166777 3.958471 4.410868 9.047935 3.392976 14.024299-1.017893 4.976364-4.18467 9.161034-8.595538 11.536117-76.455047 40.941904-167.160592 137.302408-171.57146 363.726971z" p-id="1980" fill="#515151"></path><path d="M690.244312 783.551138h-42.638392c-16.851778 0-30.536779-13.685001-30.536779-30.53678v-86.068478c0-16.851778 13.685001-30.536779 30.536779-30.536779h42.638392c16.851778 0 30.536779 13.685001 30.536779 30.536779v86.068478c0 16.851778-13.685001 30.536779-30.536779 30.53678z m-39.245416-33.929755h35.85244v-79.282527h-35.85244v79.282527z" p-id="1981" fill="#515151"></path></svg>
              <a>好友</a>
            </div>
          </div>
          <div @click="search()" class="addFriend">
            <svg t="1701419774583" class="icon" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2078" width="200" height="200"><path d="M759.296 691.797333c7.424-9.173333 5.994667-22.613333-3.157333-29.994667-44.266667-35.776-97.088-61.76-154.410667-77.205333 107.072-47.530667 182.037333-154.666667 182.037333-279.146667C783.744 137.002667 646.72 0 478.314667 0 309.909333 0 172.885333 137.002667 172.885333 305.429333c0 125.525333 76.16 233.514667 184.661333 280.426667C180.672 638.122667 51.114667 801.792 51.114667 995.392c0 11.797333 9.557333 21.333333 21.333333 21.333333s21.333333-9.536 21.333333-21.333333c0-212.032 172.501333-384.533333 384.533333-384.533333 94.741333 0 183.893333 29.866667 250.965333 84.096C738.474667 702.421333 751.914667 700.928 759.296 691.797333zM215.552 305.429333C215.552 160.533333 333.418667 42.666667 478.314667 42.666667c144.896 0 262.762667 117.866667 262.762667 262.762667s-117.866667 262.762667-262.762667 262.762667C333.418667 568.192 215.552 450.304 215.552 305.429333z" p-id="2079" fill="#8a8a8a"></path><path d="M1004.181333 795.712l-161.322667 0 0-161.322667c0-11.797333-9.536-21.333333-21.333333-21.333333s-21.333333 9.536-21.333333 21.333333l0 161.322667-161.322667 0c-11.797333 0-21.333333 9.536-21.333333 21.333333s9.536 21.333333 21.333333 21.333333l161.322667 0 0 161.322667c0 11.797333 9.536 21.333333 21.333333 21.333333s21.333333-9.536 21.333333-21.333333l0-161.322667 161.322667 0c11.797333 0 21.333333-9.536 21.333333-21.333333S1015.978667 795.712 1004.181333 795.712z" p-id="2080" fill="#8a8a8a"></path></svg>
            <a>搜索好友</a>
          </div>
          <input v-model="data.searchText" type="text">
        </div>
        <div class="friend-body">


          <!--        聊天菜单-->
          <div class="friend-list-box" :style="[data.contentIndex == 1?'display:none':'']">
            <div class="search">
              <div class="search-box">
                <svg t="1682735903805" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2308" width="200" height="200"><path d="M467.92892 935.905986a467.92892 467.92892 0 1 1 331.010811-136.918108 466.424325 466.424325 0 0 1-331.010811 136.918108zM467.92892 150.507607a317.46946 317.46946 0 1 0 225.689189 93.284865 315.964865 315.964865 0 0 0-225.689189-93.284865zM771.556109 922.515094l151.587906-151.587905 101.033527 101.108757-151.587905 151.587905z" fill="#8a8a8a" p-id="2309"></path></svg>
                <input type="text" placeholder="搜索..."/>
              </div>
            </div>


            <!--          测试群-->
            <div style="width: 100%" @click="data.itemIndex = -1" :class="['friend-list-item',data.itemIndex == -1?'active':'']">
              <img src="../assets/image/qun.jpg" alt="">
              <div>
                <p>测试群</p>
                <p>理性发言</p>
              </div>
            </div>


            <!--          聊天列表-->
            <!--          <div class="friend-list">-->
            <!--            <div @click="change(index)" :class="['friend-list-item',index == data.itemIndex?'active':'']"-->
            <!--                 v-for="(item,index) in data.friendList" :key="index">-->
            <!--              <img :src="item.headImg" alt="">-->
            <!--              <div>-->
            <!--                <p>{{ item.name }}</p>-->
            <!--                <p>{{ item.text }}</p>-->
            <!--              </div>-->
            <!--            </div>-->
            <!--          </div>-->
          </div>


          <!--        聊天-->
          <div class="friend-message" :style="[data.contentIndex == 1?'display:none':'']">
            <div class="friend-message-header">
              <img src="../assets/image/qun.jpg">
              <div style="margin-left: 10px">
                <p>测试群</p>
                <p>理性发言</p>
              </div>
              <p>在线人数:{{data.number}}</p>
            </div>
            <div class="friend-message-body" ref="messageBody">
              <div v-for="(item,index) in data.groupMessage" :key="index" :class="[item.userId == data.user.userId ? 'friend-message-left-box':'friend-message-right-box','line']">
                <img @click="search(item.username)" v-lazy="item.headImg" alt="">
                <div class="message">
                  {{ item.message }}
                </div>
                <div class="messageDetail">
                  <a>{{ item.dateTime }}</a>
                  <p>{{ item.username }}</p>
                </div>
              </div>
            </div>
            <div class="send-box">
              <div class="send-message">
                <svg style="margin-right: 3px" t="1682758599412" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8933" width="200" height="200"><path d="M896 626.592a16 16 0 0 0-7.68-13.664l-172.448-105.088a16 16 0 0 0-20.704 3.52l-76 92.608-1.024 1.152a16 16 0 0 1-22.624 0.032l-252.832-252.064a16.032 16.032 0 0 0-22.08-0.512l-187.36 170.656a15.936 15.936 0 0 0-5.248 11.84V800h768v-173.408z" p-id="8934" fill="#707070"></path><path d="M800 320m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="8935" fill="#707070"></path><path d="M32 128v768h960V128H32z m896 704H96V192h832v640z" p-id="8936" fill="#707070"></path></svg>
                <svg style="margin-right: 3px" t="1682758750380" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10093" width="200" height="200"><path d="M563.2 463.3L677 540c1.7 1.2 3.7 1.8 5.8 1.8 0.7 0 1.4-0.1 2-0.2 2.7-0.5 5.1-2.1 6.6-4.4l25.3-37.8c1.5-2.3 2.1-5.1 1.6-7.8s-2.1-5.1-4.4-6.6l-73.6-49.1 73.6-49.1c2.3-1.5 3.9-3.9 4.4-6.6 0.5-2.7 0-5.5-1.6-7.8l-25.3-37.8a10.1 10.1 0 0 0-6.6-4.4c-0.7-0.1-1.3-0.2-2-0.2-2.1 0-4.1 0.6-5.8 1.8l-113.8 76.6c-9.2 6.2-14.7 16.4-14.7 27.5 0.1 11 5.5 21.3 14.7 27.4zM387 348.8h-45.5c-5.7 0-10.4 4.7-10.4 10.4v153.3c0 5.7 4.7 10.4 10.4 10.4H387c5.7 0 10.4-4.7 10.4-10.4V359.2c0-5.7-4.7-10.4-10.4-10.4z m333.8 241.3l-41-20a10.3 10.3 0 0 0-8.1-0.5c-2.6 0.9-4.8 2.9-5.9 5.4-30.1 64.9-93.1 109.1-164.4 115.2-5.7 0.5-9.9 5.5-9.5 11.2l3.9 45.5c0.5 5.3 5 9.5 10.3 9.5h0.9c94.8-8 178.5-66.5 218.6-152.7 2.4-5 0.3-11.2-4.8-13.6z m186-186.1c-11.9-42-30.5-81.4-55.2-117.1-24.1-34.9-53.5-65.6-87.5-91.2-33.9-25.6-71.5-45.5-111.6-59.2-41.2-14-84.1-21.1-127.8-21.1h-1.2c-75.4 0-148.8 21.4-212.5 61.7-63.7 40.3-114.3 97.6-146.5 165.8-32.2 68.1-44.3 143.6-35.1 218.4 9.3 74.8 39.4 145 87.3 203.3 0.1 0.2 0.3 0.3 0.4 0.5l36.2 38.4c1.1 1.2 2.5 2.1 3.9 2.6 73.3 66.7 168.2 103.5 267.5 103.5 73.3 0 145.2-20.3 207.7-58.7 37.3-22.9 70.3-51.5 98.1-85 27.1-32.7 48.7-69.5 64.2-109.1 15.5-39.7 24.4-81.3 26.6-123.8 2.4-43.6-2.5-87-14.5-129z m-60.5 181.1c-8.3 37-22.8 72-43 104-19.7 31.1-44.3 58.6-73.1 81.7-28.8 23.1-61 41-95.7 53.4-35.6 12.7-72.9 19.1-110.9 19.1-82.6 0-161.7-30.6-222.8-86.2l-34.1-35.8c-23.9-29.3-42.4-62.2-55.1-97.7-12.4-34.7-18.8-71-19.2-107.9-0.4-36.9 5.4-73.3 17.1-108.2 12-35.8 30-69.2 53.4-99.1 31.7-40.4 71.1-72 117.2-94.1 44.5-21.3 94-32.6 143.4-32.6 49.3 0 97 10.8 141.8 32 34.3 16.3 65.3 38.1 92 64.8 26.1 26 47.5 56 63.6 89.2 16.2 33.2 26.6 68.5 31 105.1 4.6 37.5 2.7 75.3-5.6 112.3z" p-id="10094" fill="#707070"></path></svg>
                <input @keyup.enter="send" v-model="data.message" type="text" placeholder="发送消息...">
              </div>
              <svg @click="send" t="1682757625808" class="icon1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7179" width="200" height="200"><path d="M211.649242 813.217191a425.984 425.984 0 1 0 602.421836-602.442865 425.984 425.984 0 1 0-602.421836 602.442865Z" fill="#00A0E9" p-id="7180"></path><path d="M266.3936 427.7248l422.5024-103.5776c20.4288-5.0176 37.5296 15.9744 28.4672 34.9696l-188.2112 395.1616c-9.728 20.3776-39.3728 18.432-46.2848-3.072l-48.0256-149.4016a25.06752 25.06752 0 0 1 5.2224-24.3712L522.1888 486.4c5.0176-5.5808-1.6896-13.9264-8.192-10.0864l-108.9024 63.5392a24.9856 24.9856 0 0 1-24.6272 0.3072L260.2496 473.8048c-19.8656-10.9568-15.9232-40.6528 6.144-46.08z" fill="#FFFFFF" p-id="7181"></path></svg>
            </div>
          </div>


          <!--        好友菜单-->

          <!--        申请-->
          <div class="friend-list-box" :style="[data.contentIndex == 0?'display:none':'']">
            <div @click="data.itemIndex = -1" :class="['addFriendList',data.itemIndex == -1?'active':'']">
              <svg t="1701502149777" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3276" width="200" height="200"><path d="M0 0m256 0l512 0q256 0 256 256l0 512q0 256-256 256l-512 0q-256 0-256-256l0-512q0-256 256-256Z" fill="#FFA75D" p-id="3277"></path><path d="M515.925333 515.882667c92.074667 0 166.741333 78.677333 166.741334 175.701333v34.56c0 38.826667-29.866667 70.314667-66.688 70.314667H265.813333c-36.821333 0-66.688-31.445333-66.688-70.272v-34.602667c0-97.024 74.666667-175.701333 166.741334-175.701333h150.058666z m195.2-203.008c15.701333 0 28.416 12.757333 28.416 28.458666v56.832l56.917334 0.042667a28.458667 28.458667 0 0 1 0 56.917333h-56.917334V512A28.458667 28.458667 0 1 1 682.666667 512v-56.917333h-56.874667a28.458667 28.458667 0 0 1 0-56.874667H682.666667V341.333333c0-15.701333 12.714667-28.458667 28.458666-28.458666z m-270.208-85.333334a128 128 0 1 1 0 256 128 128 0 0 1 0-256z" fill="#FFFFFF" p-id="3278"></path></svg>
              <a>好友申请</a>
            </div>

            <!--          好友-->
            <p style="margin-bottom: 15px">共{{data.friendList.length}}位好友</p>
            <div class="friend-list">
              <div @click="change(index,item)" :class="['friend-list-item',index == data.itemIndex?'active':'']"
                   v-for="(item,index) in data.friendList" :key="index">
                <img v-lazy="item.headImg" alt="">
                <div>
                  <p>{{ item.username }}</p>
                  <p>{{ item.introduction }}</p>
                </div>
              </div>
            </div>
          </div>

          <!--        申请列表-->
          <div class="addFriend-message" :style="[data.contentIndex == 1 && data.itemIndex == -1?'':'display:none']">
            <div class="addFriendItem" v-for="(item,index) in data.addFriendList" :key="index">
              <p class="addFriendTime">{{item.dateTime}}</p>
              <img v-lazy="item.headImg" alt="">
              <div class="addFriendText">
                <p>你好我是<span>{{item.username}}</span>,想认识一下你</p>
                <p>{{ item.introduction }}</p>
              </div>
              <div v-show="item.status == 'wait'" class="addFriendButton">
                <div @click="handleAddFriend(item.applyId,data.yes,item.fromId,item.username)">
                  <svg t="1701591133903" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2052" width="200" height="200"><path d="M512 102.4c225.28 0 409.6 184.32 409.6 409.6s-184.32 409.6-409.6 409.6-409.6-184.32-409.6-409.6 184.32-409.6 409.6-409.6m0-102.4C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z" fill="#03f814" p-id="2053"></path><path d="M768 373.76L476.16 665.6c-20.48 20.48-51.2 20.48-71.68 0l-143.36-143.36c-20.48-20.48-20.48-51.2 0-71.68 20.48-20.48 51.2-20.48 71.68 0l107.52 107.52 256-250.88c20.48-20.48 51.2-20.48 71.68 0 15.36 15.36 15.36 46.08 0 66.56z" fill="#03f814" p-id="2054"></path></svg>              </div>
                <div @click="handleAddFriend(item.applyId,data.no,item.fromId,item.username)">
                  <svg t="1701590778968" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1705" data-spm-anchor-id="a313x.collections_detail.0.i3.40bd3a81ZZK4xb" width="200" height="200"><path d="M512 102.4c225.28 0 409.6 184.32 409.6 409.6s-184.32 409.6-409.6 409.6-409.6-184.32-409.6-409.6 184.32-409.6 409.6-409.6m0-102.4C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z" fill="#fc0505" p-id="1706"></path><path d="M583.68 512l107.52-107.52c20.48-20.48 20.48-51.2 0-71.68s-51.2-20.48-71.68 0L512 440.32 404.48 332.8c-20.48-20.48-51.2-20.48-71.68 0-20.48 20.48-20.48 51.2 0 71.68L440.32 512l-107.52 107.52c-20.48 20.48-20.48 51.2 0 71.68 20.48 20.48 51.2 20.48 71.68 0l107.52-107.52 107.52 107.52c20.48 20.48 51.2 20.48 71.68 0s20.48-51.2 0-71.68L583.68 512z" fill="#fc0505" p-id="1707"></path></svg>              </div>
              </div>
              <div class="addFriendStatus" v-show="item.status == 'yes'">
                <p style="color: green">已通过</p>
              </div>
              <div class="addFriendStatus" v-show="item.status == 'no'">
                <p style="color: red">已取消</p>
              </div>
            </div>
          </div>
          <!--        好友聊天-->


          <div class="friend-message" :style="[data.contentIndex != 1 || data.itemIndex == -1?'display:none':'']">
            <div class="friend-message-header">
              <img v-lazy="data.target.headImg">
              <div style="margin-left: 10px">
                <p>{{ data.target.username }}</p>
                <p>{{ data.target.introduction }}</p>
              </div>
            </div>
            <div class="friend-message-body" ref="messageBody1">
              <div v-for="(item,index) in data.messageList" :key="index" :class="[item.fromId == data.user.userId ? 'friend-message-left-box':'friend-message-right-box','line']">
                <img @click="search(item.username)" v-lazy="item.headImg" alt="">
                <div class="message">
                  {{ item.message }}
                </div>
                <div class="messageDetail">
                  <a>{{ item.dateTime }}</a>
                  <p>{{ item.username }}</p>
                </div>
              </div>
            </div>
            <div class="send-box">
              <div class="send-message">
                <svg style="margin-right: 3px" t="1682758599412" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8933" width="200" height="200"><path d="M896 626.592a16 16 0 0 0-7.68-13.664l-172.448-105.088a16 16 0 0 0-20.704 3.52l-76 92.608-1.024 1.152a16 16 0 0 1-22.624 0.032l-252.832-252.064a16.032 16.032 0 0 0-22.08-0.512l-187.36 170.656a15.936 15.936 0 0 0-5.248 11.84V800h768v-173.408z" p-id="8934" fill="#707070"></path><path d="M800 320m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="8935" fill="#707070"></path><path d="M32 128v768h960V128H32z m896 704H96V192h832v640z" p-id="8936" fill="#707070"></path></svg>
                <svg style="margin-right: 3px" t="1682758750380" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10093" width="200" height="200"><path d="M563.2 463.3L677 540c1.7 1.2 3.7 1.8 5.8 1.8 0.7 0 1.4-0.1 2-0.2 2.7-0.5 5.1-2.1 6.6-4.4l25.3-37.8c1.5-2.3 2.1-5.1 1.6-7.8s-2.1-5.1-4.4-6.6l-73.6-49.1 73.6-49.1c2.3-1.5 3.9-3.9 4.4-6.6 0.5-2.7 0-5.5-1.6-7.8l-25.3-37.8a10.1 10.1 0 0 0-6.6-4.4c-0.7-0.1-1.3-0.2-2-0.2-2.1 0-4.1 0.6-5.8 1.8l-113.8 76.6c-9.2 6.2-14.7 16.4-14.7 27.5 0.1 11 5.5 21.3 14.7 27.4zM387 348.8h-45.5c-5.7 0-10.4 4.7-10.4 10.4v153.3c0 5.7 4.7 10.4 10.4 10.4H387c5.7 0 10.4-4.7 10.4-10.4V359.2c0-5.7-4.7-10.4-10.4-10.4z m333.8 241.3l-41-20a10.3 10.3 0 0 0-8.1-0.5c-2.6 0.9-4.8 2.9-5.9 5.4-30.1 64.9-93.1 109.1-164.4 115.2-5.7 0.5-9.9 5.5-9.5 11.2l3.9 45.5c0.5 5.3 5 9.5 10.3 9.5h0.9c94.8-8 178.5-66.5 218.6-152.7 2.4-5 0.3-11.2-4.8-13.6z m186-186.1c-11.9-42-30.5-81.4-55.2-117.1-24.1-34.9-53.5-65.6-87.5-91.2-33.9-25.6-71.5-45.5-111.6-59.2-41.2-14-84.1-21.1-127.8-21.1h-1.2c-75.4 0-148.8 21.4-212.5 61.7-63.7 40.3-114.3 97.6-146.5 165.8-32.2 68.1-44.3 143.6-35.1 218.4 9.3 74.8 39.4 145 87.3 203.3 0.1 0.2 0.3 0.3 0.4 0.5l36.2 38.4c1.1 1.2 2.5 2.1 3.9 2.6 73.3 66.7 168.2 103.5 267.5 103.5 73.3 0 145.2-20.3 207.7-58.7 37.3-22.9 70.3-51.5 98.1-85 27.1-32.7 48.7-69.5 64.2-109.1 15.5-39.7 24.4-81.3 26.6-123.8 2.4-43.6-2.5-87-14.5-129z m-60.5 181.1c-8.3 37-22.8 72-43 104-19.7 31.1-44.3 58.6-73.1 81.7-28.8 23.1-61 41-95.7 53.4-35.6 12.7-72.9 19.1-110.9 19.1-82.6 0-161.7-30.6-222.8-86.2l-34.1-35.8c-23.9-29.3-42.4-62.2-55.1-97.7-12.4-34.7-18.8-71-19.2-107.9-0.4-36.9 5.4-73.3 17.1-108.2 12-35.8 30-69.2 53.4-99.1 31.7-40.4 71.1-72 117.2-94.1 44.5-21.3 94-32.6 143.4-32.6 49.3 0 97 10.8 141.8 32 34.3 16.3 65.3 38.1 92 64.8 26.1 26 47.5 56 63.6 89.2 16.2 33.2 26.6 68.5 31 105.1 4.6 37.5 2.7 75.3-5.6 112.3z" p-id="10094" fill="#707070"></path></svg>
                <input @keyup.enter="send" v-model="data.message" type="text" placeholder="发送消息...">
              </div>
              <svg @click="send" t="1682757625808" class="icon1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7179" width="200" height="200"><path d="M211.649242 813.217191a425.984 425.984 0 1 0 602.421836-602.442865 425.984 425.984 0 1 0-602.421836 602.442865Z" fill="#00A0E9" p-id="7180"></path><path d="M266.3936 427.7248l422.5024-103.5776c20.4288-5.0176 37.5296 15.9744 28.4672 34.9696l-188.2112 395.1616c-9.728 20.3776-39.3728 18.432-46.2848-3.072l-48.0256-149.4016a25.06752 25.06752 0 0 1 5.2224-24.3712L522.1888 486.4c5.0176-5.5808-1.6896-13.9264-8.192-10.0864l-108.9024 63.5392a24.9856 24.9856 0 0 1-24.6272 0.3072L260.2496 473.8048c-19.8656-10.9568-15.9232-40.6528 6.144-46.08z" fill="#FFFFFF" p-id="7181"></path></svg>
            </div>
          </div>


        </div>
      </div>
      <!--    详细-->
      <div>
        <el-dialog v-model="data.friendDialog" :align-center="true"
                   title="竟然是个人" width="300" center>
          <div class="friendBox">
            <img v-lazy="data.friend.headImg" alt="">
            <p>{{ data.friend.username}}</p>
            <p>{{ data.friend.sex == 1?'男':'女' }}</p>
            <p>{{ data.friend.introduction }}</p>
            <p>{{ data.friend.email }}</p>
          </div>
          <template #footer>
          <span class="dialog-footer">
            <el-button @click="data.friendDialog = false">关闭</el-button>
            <el-button v-show="!data.isFriend" type="primary" @click="addFriend()">
              加好友
            </el-button>
          </span>
          </template>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script setup>
import Header from "../components/header.vue";
import * as THREE from 'three'
import CLOUDS from 'vanta/src/vanta.clouds'
import {ref, onMounted, reactive, getCurrentInstance,nextTick,onBeforeUnmount} from "vue";
import {ElMessage} from "element-plus";
import useStore from "../store/index.js";
import {useRouter} from "vue-router";
import global from "../util/global";
const {proxy} = getCurrentInstance()
const all = ref(null)
const messageBody = ref(null)
const messageBody1 = ref(null)
let vantaEffect = null
const store = useStore()
const router = useRouter()
const data = reactive({
  //主菜单位置
  contentIndex:0,
  //次选项
  itemIndex:-1,
  // 聊天列表
  chatList:[],
  // 好友列表
  friendList:[],
  // 好友申请列表
  addFriendList:[],
  // 群消息列表
  groupMessage:[],
  // 对象消息列表
  messageList:[],
  // 要发送得消息
  message:'',
  //自己
  user:{
    userId:'',
    username:'',
    headImg:''
  },
  //人数
  number:'',
  //websocket
  ws:null,
  //搜索
  searchText:'',
  //正在聊天的对象
  target:{},
  //好友详细对话框
  friendDialog:false,
  //是否为好友,
  isFriend:false,
  //搜索到的朋友
  friend:{},
  yes:'yes',
  no:'no',
  //当前消息为好友还是群聊
  isGroup:true
})

//切换对象
function change(index,friend){
  data.message = ""
  data.itemIndex = index
  data.target = friend
  proxy.$http({
    url:'/friend/message',
    method:'post',
    data:{
      fromId:data.user.userId,
      toId:friend.userId
    }
  }).then(res => {
    data.messageList = res.data.messageList
    data.messageList.forEach((item,index)=>{
      if(item.fromId == data.user.userId){
        item.headImg = data.user.headImg
        item.username = data.user.username
      }else{
        item.headImg = data.target.headImg
        item.username = data.target.username
      }
      item.dateTime = proxy.$utils.convertTimeToHumanReadable(item.dateTime)
    })
    data.isGroup = false
    nextTick(()=>{
      messageBody1.value.scrollTo({
        top: messageBody1.value.scrollHeight,
        behavior: 'auto'
      });
    })
  })
}

//添加好友
function addFriend(){
  data.friendDialog = false
  proxy.$http({
    url:'/friend/add',
    method:'post',
    data:{
      fromId:data.user.userId,
      toId:data.friend.userId
    }
  }).then(res => {
    data.ws.send(JSON.stringify({
      type:"add",
      username:data.friend.username
    }))
    return ElMessage({
      message: res.data.msg,
      type: res.data.type
    });
  })
}

//好友列表及申请列表
function showAddFriendList(){
  proxy.$http({
    url:'/friend/addList',
    method:'get',
  }).then(res => {
    res.data.addList.forEach((item,index)=>{
      item.headImg = item.headImg
      item.dateTime = proxy.$utils.convertTimeToHumanReadable(item.dateTime)
    })
    data.addFriendList = res.data.addList
  })

  proxy.$http({
    url:'/friend',
    method:'get',
  }).then(res => {
    res.data.friends.forEach((item,index)=>{
      item.headImg = item.headImg
    })
    data.friendList = res.data.friends
  })
}
//处理申请
function handleAddFriend(applyId,status,fromId,username){
  proxy.$http({
    url:'/friend/handle',
    method:'post',
    data:{applyId:applyId,status:status,fromId:fromId}
  }).then(res => {
    data.addFriendList.forEach((item,index)=>{
      if(item.applyId == applyId) {
        item.status = status
      }
    })
    data.ws.send(JSON.stringify({
      type:"handle",
      username:username
    }))
    showAddFriendList()
    return ElMessage({
      message: res.data.msg,
      type: res.data.type
    });
  })
}

//搜索
function search(username){
  if(data.searchText == '' && username == ''){
    ElMessage.warning('不能为空')
    return
  }
  username = data.searchText || username
  proxy.$http({
    url:'/user/search',
    method:'post',
    data:{username:username}
  }).then(res => {
    if(res.data.type == "success"){
      res.data.user.headImg = res.data.user.headImg
      data.friend = res.data.user
      data.isFriend = data.friendList.some((item,index)=>{
        return (item.username == username)
      })
      data.isFriend = data.isFriend || data.friend.userId == data.user.userId
      data.friendDialog = true
    }else{
      return ElMessage({
        message: res.data.msg,
        type: res.data.type
      });
    }
  })
  data.searchText = ''
}

function inChat(){
  data.message = ''
  data.contentIndex = 0
  data.itemIndex = -1
  data.isGroup = true
}

function inFriend(){
  data.itemIndex = -1
  data.contentIndex = 1
}
//发送
function send(){
  if(data.message == ""){
    ElMessage.warning('发言为空')
  }else {
    proxy.$http({
      url:'/user',
      method:'get',
    }).then(res => {
      if(data.isGroup == true){
        data.ws.send(JSON.stringify({
          type:"qunliao",
          userId:data.user.userId,
          username:data.user.username,
          dateTime:new Date().toLocaleString(),
          headImg:data.user.headImg,
          message:data.message
        }))
      }else{
        data.ws.send(JSON.stringify({
          type:"haoyou",
          fromId:data.user.userId,
          toName:data.target.username,
          fromName:data.user.username,
          toId:data.target.userId,
          dateTime:new Date().toLocaleString(),
          message:data.message
        }))
      }
    })
  }
}

function scrollToBottom(){
  nextTick(() => {
    messageBody.value.scrollTo({
      top: messageBody.value.scrollHeight,
      behavior: 'smooth'
    });
    messageBody1.value.scrollTo({
      top: messageBody1.value.scrollHeight,
      behavior: 'smooth'
    });
  });
}

function init(){
  if(window.WebSocket){
    data.ws = new WebSocket(`ws://${global.websocketUrl}`)
    data.ws.onopen = function (){
      console.log("成功建立连接")
      data.ws.send(JSON.stringify({
        type:"dengji",
        username:data.user.username
      }))
    }
    data.ws.onmessage = (message)=>{
      let dt = JSON.parse(message.data)
      switch (dt.type){
        case "ceshi":
          break;
        case "lianjie":
          data.number = dt.number
          dt.result.forEach((item)=>{
            item.dateTime = proxy.$utils.convertTimeToHumanReadable(item.dateTime)
            item.headImg = item.headImg
          })
          data.groupMessage = dt.result
          nextTick(() => {
            messageBody.value.scrollTo({
              top: messageBody.value.scrollHeight,
              behavior: 'auto'
            });
          });
          break;
        case "qunliao":
          dt.dateTime = proxy.$utils.convertTimeToHumanReadable(dt.dateTime)
          data.groupMessage.push(dt)
          data.message = ''
          scrollToBottom()
          break;
        case "haoyou":
          if(dt.fromId == data.user.userId){
            dt.headImg = data.user.headImg
            dt.username = data.user.username
          }else{
            dt.headImg = data.target.headImg
            dt.username = data.target.username
          }
          dt.dateTime = proxy.$utils.convertTimeToHumanReadable(dt.dateTime)
          data.messageList.push(dt)
          data.message = ''
          scrollToBottom()
          break;
        case "add":
          showAddFriendList()
          break;
        case "handle":
          showAddFriendList()
          break;
        case "tuichu":
          data.number = dt.number
          break;
        default:
          break;
      }
    }
    data.ws.onclose = function (){
      console.log('onclose')
    }
    data.ws.onerror = function (e){
      console.log('error');
    }
  }
}

onMounted(()=>{
  vantaEffect = CLOUDS({
    el:all.value,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    speed:1.5,
    THREE:THREE
  })
  proxy.$http({
    url:'/user',
    method:'get',
  }).then(res => {
    data.user.userId = res.data.user[0].userId.toString()
    data.user.username = res.data.user[0].username
    data.user.headImg = res.data.headImg
    showAddFriendList()
    init()
  })
})

onBeforeUnmount(()=>{
  if (vantaEffect) {
    vantaEffect.destroy()
  }
  if(data.ws){
    data.ws.close()
  }
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
    transform: translate(0px,-50px);
  }
  to{
    opacity: 1;
    transform: translate(0px,0px);
  }
}
.icon{
  width: 30px;
  height: 30px;
  margin-right: 5px;
}
.icon1{
  width: 50px;
  height: 50px;
}
.all{
  position: relative;
  align-items: center;
  background-size: cover;
  display: flex;
  height: 100vh;
  justify-content: center;
  animation: zhuye 1s ease 0s 1 normal none running;
}
.chatBox{
  height: 80%;
  max-height: 700px;
  width: 80%;
  background-color: white;
  opacity: 1;
  border-radius: 10px;
  max-width: 1000px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  overflow: hidden;
}
.friend-aside{
  width: 16%;
  height: 100%;
  background-color: rgb(243,246,240);
  display: flex;
  flex-direction: column;
  align-items: center;
  position:relative;
}
.user-img{
  border-radius: 100%;
  object-fit: cover;
  border: 5px solid white;
  margin-top: 15%;
  height: 120px;
  width: 120px;
}
.friend-aside p{
  font-size: 20px;
}
.friend-menu{
  margin-top: 13%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 50%;
  width: 80%;
}
.friend-item{
  width: 100%;
  justify-content: flex-start;
  display: flex;
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  border-radius: 400px;
  transition: all .3s;
}
.friend-item.active{
  background-color: orange;
  color: white;
}
.friend-item.active svg{
  transform: translateX(100%);
}
.friend-item.active a{
  transform: translateX(100%);
}
.friend-item svg,a{
  transition: all .5s;
}
.friend-item:hover{
  background-color: orange;
}
.friend-item:hover svg{
  color: white;
  transform: translateX(100%);
}
.friend-item:hover a{
  color: white;
  transform: translateX(100%);
}
.addFriend{
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.icon1{
  width: 40px;
  height: 40px;
}
.friend-aside input{
  border: none;
  margin-top: 5px;
  border-radius: 10px;
  width: 90%;
  height: 35px;
  font-size: 19px;
  padding: 5px;
}


.friend-body{
  width: 84%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.friend-list-box{
  height: 100%;
  width: 22%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.search{
  border-bottom: 2px solid #8a8a8a;
  padding: 7px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 76px;
}
.search-box{
  width: 95%;
  height: 40px;
  display: flex;
  align-items: center;
  background-color: rgb(235,239,243);
  border-radius: 15px;
}
.search-box svg{
  margin-left: 8px;
  width: 20px;
  height: 20px;
}
.search-box input{
  font-size: 18px;
  height: 80%;
  width: 73%;
  border: none;
  outline: none;
  background-color: rgb(235,239,243);
}
.addFriendList{
  height: 80px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}
.addFriendList.active{
  background-color: rgb(235,239,243);
}
.friend-list{
  height: 81%;
  width: 100%;
  overflow: auto;
}
.friend-list-item{
  width: 100%;
  height: 50px;
  margin-top: 5px;
  display: flex;
  align-items: center;
  background-color: white;
  overflow: hidden;
}
.friend-list-item.active{
  background-color: rgb(235,239,243);
}

.friend-list-item img{
  border-radius: 100%;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  margin-left: 10px;
}
.friend-list-item p:nth-child(1){
  margin-left: 5px;
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 5px;
}
.friend-list-item p:nth-child(2){
  width: 99%;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.friend-message{
  width: 78%;
  height: 100%;
  padding: 15px 5px 5px 5px;
  display: flex;
  flex-direction: column;
}
.friend-message-header{
  height: 60px;
  width: 93%;
  border-bottom: 2px solid #8a8a8a;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.friend-message-header img{
  border-radius: 100%;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  margin-left: 10px;
}
.friend-message-header p:nth-child(1){
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 5px;
}
.friend-message-header p:nth-child(2){
  width: 99%;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.friend-message-header p:nth-child(3){
  margin-left: 20px;
}
.friend-message-body{
  margin-top: 0px;
  height: 75%;
  width: 95%;
  padding: 10px;
  overflow: auto;
}
.friend-message-body::-webkit-scrollbar{
  width: 8px;
  height: 8px;
}
.friend-message-body::-webkit-scrollbar-thumb{
  border-radius: 5px;
  background-color: rgb(202,202,202);
}
.friend-message-right-box{
  display: flex;
  margin: 15px 0px;
  align-items: flex-start;
}
.friend-message-left-box{
  display: flex;
  flex-direction: row-reverse;
  margin: 15px 0px;
  align-items: flex-start;
}
.line img{
  width: 47px;
  height: 47px;
  object-fit: cover;
  border-radius: 10px;
}
.message{
  line-height: 20px;
  font-size: 16px;
  border-radius: 4px;
  max-width: 60%;
  padding: 7px;
  word-break: break-word;
  margin: 3px 12px 0 12px;
  position: relative;
  background-color: #cfe7ff;
}
.messageDetail a{
  text-align: center;
  font-size: 13px;
  color: rgba(169,183,198,1);
}
.messageDetail p{
  margin: 5px auto;
  font-size: 15px;
  text-align: center;
}
.friend-message-left-box .message:before{
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border: 5px solid;
  border-color: #cfe7ff transparent transparent #cfe7ff;
  right: -6px;
}
.friend-message-right-box .message:before{
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border: 5px solid;
  border-color: transparent #cfe7ff #cfe7ff transparent;
  left: -6px;
}
.send-box{
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.send-message{
  width: 80%;
  border: 3px solid #8a8a8a;
  height: 50px;
  border-radius: 15px;
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.send-message input{
  height: 100%;
  width: 80%;
  border: none;
  font-size: 20px;
  outline: none;
}
.addFriend-message{
  width: 78%;
  height: 100%;
  overflow: auto;
}
.addFriendItem{
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
}
.addFriendItem:hover{
  background-color: rgb(235,239,243);
}
.addFriendTime{
  position: absolute;
  right: 1%;
  top: 6%;
}
.addFriendItem img{
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-left: 30px;
}
.addFriendText{
  margin-left: 20px;
  max-width: 400px;
  width: 60%;
}
.addFriendText p{
  width: 100%;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.addFriendButton{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 20%;
}
.addFriendStatus{
  width: 30%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
}







:deep(.el-dialog){
  border-radius: 20px;
}
:deep(.el-dialog__header){
  margin-right: 0;
}
.friendBox{
  display: flex;
  flex-direction: column;
  align-items: center;

}
.friendBox img{
  border-radius: 50%;
  width: 150px;
  height: 150px;
}
.friendBox p:nth-child(2){
  font-size: 30px;
}
.friendBox p{
  margin-top: 10px;
  font-size: 15px;
}




::-webkit-scrollbar{
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-thumb{
  border-radius: 5px;
  background-color: rgb(202,202,202);
}
</style>