<template>
  <div masonry-gird class="grid">
    <div
      class="grid-item"
      :class="`grid-item${index > 2 ? ((index + 1) % 3 !== 0 ? (index + 1) % 3 : 3) : index + 1}`"
      v-for="(listOne, index) in myList"
      :key="index"
      @click="intoBlog(listOne)"
    >
      <div class="menu">
        <el-dropdown :hide-on-click="false" size="small" type="primary" @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="icon iconfont icon-checkmore"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="beforeHandleCommand(listOne, 'delete')">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="label">
        <span class="kind" :class="`kind${listOne.num}`">{{ listOne.kind }}</span>
        <span class="date">{{ listOne.date }}</span>
      </div>

      <h3>{{ listOne.title }}</h3>
      <div :class="`img${listOne.img.length}`">
        <img :src="imgOne" alt="" v-for="(imgOne, index) in listOne.img" :key="index" />
      </div>
    </div>
    <div class="cover" v-if="block">
      <div class="blog">
        <Blog :id="key" />
      </div>
    </div>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
import Masonry from 'masonry-layout'
import { mapState } from 'vuex'
import Blog from '@/components/Blog.vue'
import { reqDeleteBlog } from '@/api/index'

export default {
  name: 'mine',
  components: {
    Blog,
  },
  data() {
    return {
      userName: '',
      block: false,
      key: 0,
    }
  },
  mounted() {
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
    getData() {
      this.userName = sessionStorage.getItem('USERNAME')
      this.$store.dispatch('getMyList', this.userName)
    },
    intoBlog(listOne) {
      this.key = listOne.key
      this.block = true
    },
    editBlog(listOne) {
      pubsub.publish('editBlog', listOne.key)
      this.$router.push('/editLiuYan')
    },
    deleteBlog(listOne) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          const result = await reqDeleteBlog(listOne.key)
          if (result.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
          }
          this.getData()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
      this.getData()
    },
    handleCommand(command) {
      if (command.command === 'delete') {
        this.deleteBlog(command.listOne)
      } else if (command.command === 'edit') {
        this.editBlog(command.listOne)
      }
    },
    beforeHandleCommand(listOne, command) {
      return {
        listOne,
        command,
      }
    },
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
  computed: {
    ...mapState(['myList']),
  },
  beforeDestroy() {
    pubsub.unsubscribe(this.clickAuthor)
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
  }
  .menu {
    float: right;
    .icon {
      font-size: 30px;
      // font-weight: lighter;
    }
  }
}
.grid-item2 {
  height: 470px;
}
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
.img2 img {
  width: 100%;
  height: 180px;
  padding-bottom: 5px;
}
.img1 {
  img {
    height: 400px;
    width: 90%;
  }
}
</style>
