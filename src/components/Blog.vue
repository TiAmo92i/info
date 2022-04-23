<template>
  <div class="blog">
    <h1 class="title">{{ blog && blog.title }}</h1>
    <h5 class="authorAndDate">
      <span @click="clickAuthor">TiAmo</span>
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
      this.$router.push('/home')
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
  height: 1500px;
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
}
</style>
