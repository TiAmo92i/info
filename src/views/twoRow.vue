<template>
  <div class="twoRow">
    <div class="list" :class="{ fixList: isFix }">
      <h3>近期发布</h3>
      <li v-for="listOne in list" :key="listOne.key" @click="intoBlog(listOne)">{{ listOne.title }}</li>
      <h3>分类目录</h3>
      <div class="category">
        <li @click="goCategory(1)">心情随笔</li>
        <li @click="goCategory(2)">美食分享</li>
        <li @click="goCategory(3)">旅游日记</li>
      </div>
    </div>
    <div class="content">
      <div class="listOne" v-for="(listOne, index) in list" :key="index">
        <div class="label">
          <span class="kind" :class="`kind${listOne.num}`">{{ listOne.kind }}</span>
          <span class="date">{{ listOne.date }}</span>
        </div>
        <h3 @click="intoBlog(listOne)">{{ listOne.title }}</h3>
        <img :src="listOne.img[0]" alt="" />
        <div class="cover" v-if="block">
          <div class="blog">
            <Blog :id="key" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pubsub from 'pubsub-js'
import Blog from '@/components/Blog.vue'

export default {
  name: 'twoRow',
  data() {
    return {
      isFix: false,
      block: false,
      key: 0,
    }
  },
  components: {
    Blog,
  },
  mounted() {
    this.addFix = pubsub.subscribe('addFix', () => {
      this.isFix = true
    })
    this.removeFix = pubsub.subscribe('removeFix', () => {
      this.isFix = false
    })
    this.clickAuthor = pubsub.subscribe('clickAuthor', () => {
      this.block = false
    })
  },
  watch: {
    block(newValue) {
      if (newValue) {
        document.querySelector('html')?.classList.add('modal-page')
      } else {
        document.querySelector('html')?.classList.remove('modal-page')
      }
    },
  },
  methods: {
    category(id) {
      pubsub.publish('category', id)
    },
    goCategory(id) {
      if (this.$route.path !== '/home') {
        this.$router.push('/home')
      }
      this.category(id)
    },
    intoBlog(listOne) {
      this.key = listOne.key
      this.block = true
    },
  },
  computed: {
    ...mapState(['list']),
  },
  beforeDestroy() {
    pubsub.unsubscribe(this.addFix)
    pubsub.unsubscribe(this.removeFix)
  },
}
</script>

<style scoped lang="less">
.twoRow {
  margin: 20px 100px;
  height: 1500px;
  .list {
    width: 350px;
    height: 480px;
    background-color: white;
    border-radius: 8px;
    margin-right: 20px;
    float: left;
    h3 {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 8px;
      text-align: center;
      margin: 20px 10px 10px 50px;
      width: 75%;
    }
    li {
      list-style: none;
      text-align: center;
      padding: 10px 0 10px 20px;
      cursor: pointer;
      color: #666;
      font-weight: bolder;
      font-size: 20px;
    }
  }
  .content {
    width: 730px;
    height: 100%;
    border-radius: 8px;
    float: right;
    .listOne {
      padding: 20px 0 20px 0;
      margin-bottom: 30px;
      background-color: white;
      border-radius: 10px;
      padding-left: 50px;
      h3 {
        color: #666;
        cursor: pointer;
      }
      img {
        width: 80%;
        height: 80%;
      }
    }
  }
}
.fixList {
  position: fixed;
  top: 100px;
  height: 480px !important;
  z-index: 999;
  transition: linear;
}
</style>
