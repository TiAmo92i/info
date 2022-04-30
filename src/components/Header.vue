<template>
  <div class="header" :class="{ cur: active == true, fix: noMargin == true }">
    <img src="../assets/info.jpg" alt="" @click="goCategory(0)" />
    <div class="text">
      <h2>TiAmo</h2>
      <h4>TiAmo的个人小站</h4>
    </div>
    <transition name="appear">
      <div v-show="active" class="more">
        <p @click="goCategory(0)">首页</p>
        <div class="category" @mouseenter="MouseEnter($event)" @mouseleave="MouseLeave($event)">
          <p>分类</p>
          <div class="categoryList" :class="{ shortTop: noMargin == true }">
            <div @click="goCategory(1)">心情随笔</div>
            <div @click="goCategory(2)">旅游日记</div>
            <div @click="goCategory(3)">美食分享</div>
          </div>
        </div>
        <p @click="goTwoRow">双栏板式</p>
        <p>更多</p>
        <p><i class="iconfont icon-sousuo1"></i></p>
      </div>
    </transition>
    <ul class="icon" @click="active = !active">
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>
<script>
import pubsub from 'pubsub-js'

export default {
  name: 'Header',
  data() {
    return {
      active: false,
      noMargin: false,
      timer: null,
      delayActive: false,
    }
  },
  methods: {
    MouseEnter(e) {
      clearInterval(this.timer)
      if (e.target.childNodes[1]) {
        e.target.childNodes[1].style.display = 'block'
      }
    },
    MouseLeave(e) {
      this.timer = setInterval(() => {
        if (e.target.childNodes[1]) {
          e.target.childNodes[1].style.display = 'none'
        } else {
          console.log('style找不到了')
        }
      }, 2000)
    },
    category(id) {
      pubsub.publish('category', id)
    },
    goCategory(id) {
      if (this.$route.path !== '/home') {
        this.$router.push('/home')
      }
      this.category(id)
    },
    goTwoRow() {
      if (this.$route.path !== '/twoRow') {
        this.$router.push('/twoRow')
      }
    },
  },
  mounted() {
    this.long = pubsub.subscribe('beLong', () => {
      this.active = true
      this.noMargin = true
    })
    this.short = pubsub.subscribe('beShort', () => {
      this.active = false
      this.noMargin = false
    })
  },
  beforeDestroy() {
    pubsub.unscribe(this.long)
    pubsub.unscribe(this.short)
  },
}
</script>
<style scoped lang="less">
img {
  cursor: pointer;
}
.header {
  transition: width 0.3s linear;
  color: #666;
  background-color: #fff;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  margin: 50px 100px;
  height: 80px;
  width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
img {
  padding: 20px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
.text {
  margin: 18px 0 18px 100px;
  position: absolute;
}
.icon {
  width: 20px;
  height: 20px;
  padding: 20px 20px 0px 20px;
  li {
    width: 18px;
    height: 1px;
    position: absolute;
    background-color: black;
    transform-origin: center;
    margin: 5px 0;
    transition: all 0.3s cubic-bezier(0, 0.99, 0.2, 1);
    list-style: none;
  }
  li:nth-child(1) {
    transform: translateY(-500%);
  }
  li:nth-child(3) {
    transform: translateY(500%);
  }
  &:hover {
    cursor: pointer;
    li:nth-child(1) {
      transform: translateY(0) rotate(90deg);
      transition: all 0.3s cubic-bezier(0, 0.99, 0.2, 1);
    }
    li:nth-child(3) {
      transform: translateY(0) rotate(90deg);
      transition: all 0.3s cubic-bezier(0, 0.99, 0.2, 1);
    }
  }
}
.cur {
  width: 800px;
  transition: width 0.3s linear;
  .more {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 100px;
    p,
    .category {
      padding: 0 20px;
      cursor: pointer;
    }
    .category .categoryList {
      display: none;
      position: absolute;
      width: 80px;
      height: 80px;
      color: #666;
      background-color: #fff;
      box-shadow: 0 2px 15px rgba(0, 0, 0, 0.02);
      border-radius: 8px;
      top: 150px;
      margin-left: -20px;
      padding: 10px 20px;
      z-index: 999;
      div {
        padding: 5px;
      }
    }
    .category .shortTop {
      top: 100px;
    }
    .categoryList > div:hover {
      background-color: rgba(102, 102, 102, 0.452);
      color: white;
    }
  }
  li:nth-child(1) {
    transform: rotateZ(42deg);
  }
  li:nth-child(2) {
    opacity: 0;
  }
  li:nth-child(3) {
    transform: rotateZ(-42deg);
  }
  .icon-sousuo1 {
    font-size: 30px;
  }
  .icon:hover {
    li:nth-child(1) {
      opacity: 0;
    }
    li:nth-child(2) {
      opacity: 1;
    }
    li:nth-child(3) {
      opacity: 0;
    }
  }
}
.fix {
  top: 0;
  margin: 0 100px;
  z-index: 999;
  width: 80%;
}
.appear-enter {
  opacity: 0;
}
.appear-leave {
  opacity: 0;
}
.appear-enter-to {
  opacity: 1;
}
.appear-enter-active {
  transition: opacity 0.3s linear;
}
</style>
