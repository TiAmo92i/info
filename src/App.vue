<template>
  <div id="app">
    <Header :class="{ fix: noSee == true }" />
    <router-view class="route"></router-view>
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
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true) // 监听（绑定）滚轮滚动事件
  },
  methods: {
    handleScroll() {
      if (window.scrollY > 120) {
        this.noSee = true
        pubsub.publish('beLong')
      } else {
        this.noSee = false
        pubsub.publish('beShort')
      }
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
}
.modal-page {
  overflow: hidden;
}
</style>
