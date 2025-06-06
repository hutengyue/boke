<template>
  <div class="footer">
    <p>本网站由CAVALRY支持 
      <a href="https://beian.miit.gov.cn/#/Integrated/index"
        style="text-decoration:none;color: #f4e1c0;margin-left: 10px;" target="_blank">
        浙ICP备2024071693号
      </a>
    </p>
    <p>本站一切资源不代表本站立场，如有侵权/违规/不妥请通过联系电子邮件(1125469202@qq.com)删除，敬请谅解。</p>
    <p>本站一些文章来自互联网收集，仅供用于学习和交流，请遵循相关法律法规。</p>
  </div>
</template>

<script>
export default {
  name: "footer"
}
</script>

<style scoped>
@keyframes change {
  0%{
    background-position: 0 50%;
  }
  50%{
    background-position: 100% 50%;
  }
  100%{
    background-position: 0 50%;
  }
}
.footer{
  width: 100%;
  margin-top: -20px;
  padding: 15px;
  background: linear-gradient(-90deg,#ee7752,#e73c7e,#23a6d5,#23d5ab);
  border-radius: 1.5rem 1.5rem 0 0;
  background-size: 300% 300%;
  animation: change 10s ease infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  z-index: 100;
  position: relative;
  color: white;
}
.footer p{
  margin: 3px;
}
</style>