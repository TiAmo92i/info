<template>
  <div class="blog">
    <div class="closeBlog" @click="clickAuthor">
      <i class="iconfont icon-guanbi"></i>
    </div>
    <h1 class="title">{{ blog && blog.title }}</h1>
    <h5 class="authorAndDate">
      <span @click="clickAuthor">{{ blog && blog.author }}</span>
      {{ blog && blog.date }}
    </h5>
    <div class="content">
      <li v-for="(con, index) in blog && blog.content" :key="index">{{ con }}</li>
    </div>
    <div class="img">
      <img :src="img" alt="" v-for="(img, index) in blog && blog.img" :key="index" />
    </div>
  </div>
</template>
<script>
import pubsub from 'pubsub-js'
import { reqGetBlog } from '@/api/index'

export default {
  name: 'Blog',
  props: ['id'],
  data() {
    return {
      blogArray: [],
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const blog = await reqGetBlog(this.id)
      this.blogArray = blog
    },
    clickAuthor() {
      pubsub.publish('clickAuthor')
    },
  },
  computed: {
    blog() {
      return this.blogArray[0]
    },
  },
}
</script>

<style scoped lang="less">
.blog {
  .closeBlog {
    float: right;
    margin: 30px;
    cursor: pointer;
    .icon-guanbi {
      font-size: 30px;
    }
  }
  .title {
    color: #313131;
    padding-top: 50px;
  }
  .authorAndDate {
    color: #999;
    font-size: 14px;
    span {
      padding-right: 20px;
      cursor: pointer;
    }
  }
  li {
    padding-bottom: 10px;
    color: #666;
    list-style: none;
  }
  .img {
    width: 100%;
    img {
      padding: 20px;
      height: 80%;
      width: 80%;
    }
  }
}
</style>
