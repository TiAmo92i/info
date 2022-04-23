<template>
  <div masonry-gird class="grid">
    <div
      class="grid-item"
      :class="`grid-item${listOne.img.length > 2 ? listOne.img.length - 2 : listOne.img.length + 1}`"
      v-for="(listOne, index) in list"
      :key="index"
    >
      <div class="label">
        <span class="kind" :class="`kind${listOne.num}`">{{ listOne.kind }}</span>
        <span class="date">{{ listOne.date }}</span>
      </div>
      <h3 @click="intoBlog(listOne)">{{ listOne.title }}</h3>
      <div :class="`img${listOne.img.length}`">
        <img :src="imgOne" alt="" v-for="(imgOne, index) in listOne.img" :key="index" />
      </div>
    </div>
    <div class="cover" v-if="block">
      <div class="blog">
        <div class="closeBlog" @click="block = !block">
          <i class="iconfont icon-guanbi"></i>
        </div>
        <Blog :id="key" />
      </div>
    </div>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
import Masonry from 'masonry-layout'
import { reqGetInfo } from '@/api/index'
import Blog from '@/components/Blog.vue'

export default {
  name: 'Home',
  components: {
    Blog,
  },
  data() {
    return {
      list: [],
      id: 0,
      block: false,
      key: 0,
    }
  },
  mounted() {
    this.category = pubsub.subscribe('category', (name, id) => {
      this.id = id
    })
    this.clickAuthor = pubsub.subscribe('clickAuthor', () => {
      this.block = false
    })
    this.getData()
  },
  updated() {
    new Masonry(document.querySelector('.grid'), {
      itemSelector: '.grid-item',
    })
  },
  methods: {
    async getData() {
      const list = await reqGetInfo(this.id)
      this.list = list
    },
    intoBlog(listOne) {
      this.key = listOne.key
      this.block = true
    },
  },
  watch: {
    id() {
      this.getData()
    },
    block() {
      if (this.block) {
        document.querySelector('html')?.classList.add('modal-page')
      } else {
        document.querySelector('html')?.classList.remove('modal-page')
      }
    },
  },
  beforeDestroy() {
    pubsub.unsubscribe(this.category)
  },
}
</script>

<style lang="less" scoped>
.grid {
  margin: 20px 80px;
  height: 1500px;
}
img {
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.03);
  }
}

.cover {
  position: fixed;
  z-index: 9999;
  background-color: #3a3a3a38;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .blog {
    background-color: white;
    margin: 105px;
    width: 80%;
    height: 100%;
    border-radius: 8px;
    .closeBlog {
      float: right;
      margin: 30px;
      cursor: pointer;
      .icon-guanbi {
        font-size: 30px;
      }
    }
  }
}
h3 {
  cursor: pointer;
}
.grid-item {
  background-color: white;
  float: left;
  width: 310px;
  height: 450px;
  color: #666;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  padding: 15px;
  margin: 15px;
  .label {
    height: 20px;
    line-height: 1.5;
    .kind {
      display: inline-block;
      border-radius: 3px;
      vertical-align: middle;
      padding: 0 10px;
      margin-right: 20px;
      color: white;
      font-size: 0.8em;
    }
    .date {
      font-size: 0.8em;
      color: #666;
    }
  }
}
.grid-item1 {
  // height: 500px;
  .img3 {
    img:nth-child(1) {
      width: 100%;
      height: 200px;
      padding-bottom: 5px;
    }
    img:nth-child(2) {
      float: left;
      width: 48.5%;
      height: 170px;
      // padding-right: 10px;
    }
    img:nth-last-child(1) {
      float: right;
      width: 48.5%;
      height: 170px;
    }
  }
}
.grid-item2 {
  height: 500px;
  .img4 {
    img {
      &:nth-child(1) {
        margin-bottom: 8px;
        height: 180px;
        width: 100%;
      }
      &:nth-child(2) {
        float: left;
        width: 48.5%;
        height: 220px;
      }
      &:nth-child(3) {
        float: right;
        width: 48.5%;
        height: 105px;
        margin-bottom: 8px;
      }
      &:nth-child(4) {
        float: right;
        width: 48.5%;
        height: 107px;
      }
    }
  }
}
.grid-item3 {
  .img2 img {
    width: 100%;
    height: 180px;
    padding-bottom: 5px;
  }
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
</style>
