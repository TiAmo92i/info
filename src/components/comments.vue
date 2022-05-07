<template>
  <div class="commentBox">
    <h1>参与评论</h1>
    <div class="commentWrap">
      <img class="info" src="../assets/info.jpg" alt="" />
      <el-input placeholder="请发表有价值的评论，博客评论不欢迎灌水，良好的社区氛围需大家一起维护。" class="elInput" v-model="input">
        <i slot="suffix" class="iconfont icon-biaoqing" @click="emjioBlock"><span class="biaoqing">插入表情</span></i>
        <i slot="suffix" class="iconfont icon-zitidaima"><span class="daima">代码片</span></i>
        <el-button slot="suffix" type="success" size="mini" class="commit" icon="el-icon-check" round plain @click="sendComment">发评论</el-button>
      </el-input>
    </div>
    <div class="emjio" v-show="isEmjio">
      <!-- <img data-emoticon="[face]emoji:001.png[/face]" src="https://g.csdnimg.cn/static/face/emoji/001.png" alt="" /> -->
      <img
        :src="`https://g.csdnimg.cn/static/face/emoji/00${count}.png`"
        alt=""
        v-for="count in 9"
        :key="count"
        :emoticon="`[face]emoji:00${count}.png[/face]`"
        @click="addEmjio($event)"
      />
      <template v-for="count in 72">
        <img :src="`https://g.csdnimg.cn/static/face/emoji/0${count}.png`" alt="" v-if="count >= 10" :key="count" />
      </template>
    </div>
    <div v-for="(comment, index) in comments" :key="index">
      <hr />
      <div class="one">
        <img :src="`${img[index % 5]}`" alt="" />
        <div>
          <li>{{ Math.floor(Math.random() * 60) }}min前</li>
          <li>{{ comment.comment }}</li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqGetComment } from '@/api/index'

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
        'https://s3.bmp.ovh/imgs/2022/05/07/1bed2f148b8249b0.jpg',
        'https://s3.bmp.ovh/imgs/2022/05/07/e18b8909314bd9bf.jpg',
      ],
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const result = await reqGetComment(this.id)
      this.comments = result
    },
    emjioBlock() {
      this.isEmjio = !this.isEmjio
    },
    addEmjio(e) {
      console.log(e.target.attributes.emoticon.nodeValue)
      this.input += e.target.attributes.emoticon.nodeValue
    },
    sendComment() {
      this.$store.dispatch('sendComment', { input: this.input, seq: this.id })
    },
  },
}
</script>

<style scoped lang="less">
.commentBox {
  height: 1000px;
  background-color: aliceblue;
  overflow: auto;
  border-radius: 10px;
  padding: 10px 0 50px 0;
  // text-align: center;
  h1 {
    margin-left: 20px;
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
    position: relative;
    margin-left: 450px;
    width: 328px;
    padding: 8px 0;
    // z-index: 2000;
    background: #fff;
    -webkit-box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding-bottom: 16px;
    padding-left: value;
    overflow: auto;
    height: 228px;
    scrollbar-width: thin;
    &::before {
      content: '';
      width: 8px;
      height: 8px;
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      position: absolute;
      top: -4px;
      right: 164px;
      background: #22222636;
    }
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
    li {
      list-style: none;
      padding-top: 5px;
    }
  }
  .info,
  .one > img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin: 0 20px;
  }
}
</style>
