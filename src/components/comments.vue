<template>
  <div class="commentBox">
    <h1>参与评论</h1>
    <div class="commentWrap">
      <img class="info" src="../assets/info.jpg" alt="" @click="clickAuthor" />
      <el-input placeholder="请发表有价值的评论，博客评论不欢迎灌水，良好的社区氛围需大家一起维护。" v-model="input">
        <i slot="suffix" class="iconfont icon-biaoqing" @click="emjioBlock"><span class="biaoqing">插入表情</span></i>
        <i slot="suffix" class="iconfont icon-zitidaima"><span class="daima">代码片</span></i>
        <el-button slot="suffix" type="success" size="mini" class="commit" icon="el-icon-check" round plain @click="sendComment">发评论</el-button>
      </el-input>
    </div>
    <div class="emjio" v-show="isEmjio">
      <img
        :src="`https://g.csdnimg.cn/static/face/emoji/00${count}.png`"
        alt=""
        v-for="count in 9"
        :key="count"
        :emoticon="`[face]emoji:00${count}.png[/face]`"
        @click="addEmjio($event)"
      />
      <template v-for="count in 72">
        <img
          :src="`https://g.csdnimg.cn/static/face/emoji/0${count}.png`"
          alt=""
          v-if="count >= 10"
          :key="count"
          :emoticon="`[face]emoji:0${count}.png[/face]`"
          @click="addEmjio($event)"
        />
      </template>
    </div>
    <div v-for="(comment, index) in commentsWithEmjio" :key="index">
      <hr />
      <div class="one">
        <img :src="`${img[index % 5]}`" alt="" v-if="comment.id.length > 10" />
        <img src="../assets/info.jpg" alt="" v-if="comment.id.length < 10" @click="clickAuthor" />
        <div class="commentContent">
          <div class="nameAndDate">
            <li v-show="comment.id.length < 10" class="userName" @click="clickAuthor">{{ comment.id }}</li>
            <li v-show="comment.id.length > 10" class="visitor" @click="clickAuthor">游客{{ comment.id.slice(-4) }}</li>
            <li>{{ comment.date }}</li>
          </div>
          <li v-html="comment.comment"></li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqGetComment, reqSendComment } from '@/api/index'
import pubsub from 'pubsub-js'

export default {
  name: 'comments',
  props: ['id'],
  data() {
    return {
      input: '',
      isEmjio: false,
      comments: [],
      res: 1,
      img: [
        'https://s3.bmp.ovh/imgs/2022/05/07/76eb2d4622bf705b.jpg',
        'https://s3.bmp.ovh/imgs/2022/05/07/a76e5be5be489db2.jpg',
        'https://s3.bmp.ovh/imgs/2022/05/07/47330b129ac3f1f8.jpg',
        'https://s3.bmp.ovh/imgs/2022/05/12/33d83d5b25398c8c.jpg',
        'https://s3.bmp.ovh/imgs/2022/05/12/8fb5952eefc2a87a.jpg',
      ],
      emjios: [],
      flag1: false,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const result = await reqGetComment(this.id)
      if (result.code === 200) this.comments = result.data
      else {
        console.log(Promise.reject(new Error('faile')))
      }
    },
    emjioBlock() {
      this.isEmjio = !this.isEmjio
    },
    addEmjio(e) {
      console.log(e.target.attributes.emoticon.nodeValue)
      this.input += e.target.attributes.emoticon.nodeValue
    },
    async sendComment() {
      const result = await reqSendComment(sessionStorage.getItem('TOKEN'), this.input, this.id)
      if (result.code === 200) {
        console.log('评论成功')
        this.$toast.top('评论成功')
      } else {
        this.$toast.top('评论失败')
      }
      this.input = ''

      this.getData()
    },
    clickAuthor() {
      pubsub.publish('clickAuthor')
    },
  },
  computed: {
    commentsWithEmjio() {
      return this.comments.map((comm) => {
        const emojioStrings = comm.comment.match(/\[(\w+)\][^\[]+\[\/(\1)\]/g)
        const URIs = emojioStrings?.map((str) => {
          const filename = str.replace(/\[(\w+)\]emoji:/, '').replace(/\[\/(\w+)\]/, '')
          return `<img class="emjioImg" src="https://g.csdnimg.cn/static/face/emoji/${filename}" alt="表情包" />`
        })
        emojioStrings?.forEach((emojiStr, index) => {
          if (URIs) {
            comm.comment = comm.comment.replace(emojiStr, URIs[index])
          }
        })
        return comm
      })
    },
  },
}
</script>

<style scoped lang="less">
.commentBox {
  height: 800px;
  background-color: rgba(240, 248, 255, 0.644);
  overflow: auto;
  border-radius: 10px;
  padding: 10px 0 50px 0;
  // text-align: center;
  h1 {
    margin-left: 20px;
  }
  .info {
    cursor: pointer;
  }
  .commentWrap {
    width: 90%;
    display: flex;
    align-items: center;
    .iconfont {
      position: relative;
      font-size: 20px;
      opacity: 70%;
      cursor: pointer;
      top: 10px;
      margin-right: 18px;
    }
    .biaoqing {
      display: none;
      position: absolute;
      right: -18px;
      top: 28px;
      width: 60px;
      text-align: center;
      font-size: 12px;
      line-height: 18px;
      background: #222226;
      border-radius: 4px;
      -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
      color: #fff;
      z-index: 2001;
      &::before {
        content: '';
        width: 6px;
        height: 6px;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        position: absolute;
        top: -3px;
        left: 30px;
        background: #222226;
      }
    }
    .icon-biaoqing:hover .biaoqing {
      display: block;
    }
    .daima {
      display: none;
      position: absolute;
      right: -18px;
      top: 28px;
      width: 60px;
      text-align: center;
      font-size: 12px;
      line-height: 18px;
      background: #222226;
      border-radius: 4px;
      -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
      color: #fff;
      z-index: 2001;
      &::before {
        content: '';
        width: 6px;
        height: 6px;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        position: absolute;
        top: -3px;
        left: 30px;
        background: #222226;
      }
    }
    .icon-zitidaima:hover .daima {
      display: block;
    }
    .commit {
      position: relative;
      top: 5px;
      margin-right: 10px;
    }
  }
  .emjio {
    position: absolute;
    right: 450px;
    width: 328px;
    padding: 8px 0;
    z-index: 2000;
    background: #fff;
    -webkit-box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding-bottom: 16px;
    padding-left: value;
    overflow: auto;
    height: 228px;
    scrollbar-width: thin;
  }
  img {
    width: 32px;
    height: 32px;
    float: left;
    margin-left: 12px;
    margin-top: 12px;
    cursor: pointer;
  }
  hr {
    width: 80%;
    margin: 3% 0 3% 10%;
    opacity: 70%;
  }
  .one {
    display: flex;
    align-items: center;
    .nameAndDate {
      display: flex;
      .userName {
        background-color: rgba(0, 0, 0, 0.2);
        width: 60px;
        border-radius: 8px;
        text-align: center;
        height: 20px;
        line-height: 20px;
        color: #666;
        cursor: pointer;
        margin-right: 8px;
      }
      .visitor {
        // width: 70px;
        border-radius: 8px;
        text-align: center;
        height: 20px;
        line-height: 20px;
        color: #666;
        margin-right: 8px;
      }
    }

    .commentContent {
      li {
        list-style: none;
        margin-top: 7px;
        font-size: 16px;
      }
    }
  }
  .info,
  .one img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin: 0 20px;
  }
}
</style>
<style lang="less">
.emjioImg {
  width: 32px;
  height: 32px;
}
</style>
