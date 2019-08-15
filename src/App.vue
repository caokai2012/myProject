<template>
  <div id="app">
    <Layout>
      <Header>
        <nav1 class="nav1Hide"></nav1>
      </Header>
      <transition name="fade">
        <Content class="content">
          <router-view></router-view>
        </Content>
      </transition>
      <Footer class="layout-footer-center" breakpoint='md'>
        <tail></tail>
      </Footer>
    </Layout>
  </div>
</template>

<script>
import Nav1 from 'components/home/nav'
import Tail from 'base/tail'
export default {
  name: 'App',
  components: {
    Nav1,
    Tail
  }
}
</script>

<style lang='less'>
@import "./assets/css/mixin.less";
@media screen and (max-width:767px) {
  .layout-footer-center {
    display: none;
  }
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif, Impact;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
  background: #fff;
  font-size: 30px; // background: linear-gradient(-120deg, rgba(169, 70, 253, .4), rgba(8, 43, 174, .6), rgba(0, 240, 255, .6));
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  .ivu-layout {
    background: transparent;
    height: 100%;
    .ivu-layout-header {
      background: transparent;
      width: 100%;
      padding: 0;
    }
  }
  .layout-footer-center {
    width: 100%;
    text-align: center;
    background: transparent;
    padding: 0;
  }
  .ivu-layout-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
  }
  .content {
    margin-top: 60px;
    background: url(../static/img/img-01.png);
  }
}

::-webkit-scrollbar {
  display: none;
}
</style>
