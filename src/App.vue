<template>
  <div id="app">
    <div class="right">
      <li v-show="isLogin">{{ userName }}</li>
      <el-link type="success" :underline="false" v-show="!isLogin" @click="$router.push('/login')">登录</el-link>
      <el-link type="success" :underline="false" v-show="isLogin" @click="loginout">退出登录</el-link>
    </div>
    <Header :class="{ fix: noSee == true }" :userName="userName" />
    <keep-alive>
      <router-view class="route" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view class="route" v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
    </router-view>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header,
  },
  data() {
    return {
      noSee: false,
      isLogin: false,
      userName: '',
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true) // 监听（绑定）滚轮滚动事件
    if (sessionStorage.getItem('USERNAME')) {
      this.isLogin = true
      this.userName = sessionStorage.getItem('USERNAME')
    }
    pubsub.subscribe('login', () => {
      this.isLogin = true
      this.userName = sessionStorage.getItem('USERNAME')
    })
  },
  created() {
    if (this.$router.path !== '/home') {
      this.$router.replace('/home')
    }
  },
  methods: {
    handleScroll() {
      if (window.scrollY > 120) {
        this.noSee = true
        pubsub.publish('addFix')
        pubsub.publish('beLong')
      } else {
        this.noSee = false
        pubsub.publish('removeFix')
        pubsub.publish('beShort')
      }
    },
    loginout() {
      sessionStorage.removeItem('TOKEN')
      sessionStorage.removeItem('USERNAME')
      this.isLogin = false
      this.userName = ''
    },
  },
}
</script>

<style lang="less">
.fix {
  position: fixed;
}
body {
  background-color: #f1f1f1;
  font-family: Calibri;
  font-size: 16px;
  li {
    list-style: none;
  }
}
.modal-page {
  overflow: hidden;
}
.kind {
  display: inline-block;
  border-radius: 3px;
  vertical-align: middle;
  padding: 0 10px;
  margin-right: 20px;
  color: white;
  font-size: 0.8em;
  height: 17px;
  line-height: 17px;
}
.date {
  font-size: 0.8em;
  color: #666;
}
.label {
  .kind {
    background-color: #a9caa8;
  }
  .kind2 {
    background-color: #fbc21f;
  }
  .kind3 {
    background-color: #7063e4;
  }
}
.cover {
  position: fixed;
  overflow-y: auto;
  z-index: 9999;
  background-color: #3a3a3a50;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  .blog {
    // overflow-y: auto;
    background-color: white;
    margin: 55px 0 0 110px;
    width: 80%;
    border-radius: 8px;
  }
}
</style>
<style scoped lang="less">
.right {
  position: fixed;
  top: 0;
  right: 0;
  width: 100px;
  display: flex;
  li {
    list-style: none;
    font-size: 16px;
    color: #666;
  }
}
</style>
