<template>
  <div class="father">
    <div class="form">
      <h2>添加文章</h2>
      <div class="kind1">
        <span>种类：</span>
        <label v-for="(item, index) in radiolist" :key="index"
          ><input type="radio" name="leixing" :value="item.value" :checked="item.isCheck" @change="changeInput(index)" />{{ item.text }}</label
        >
      </div>
      <label class="title">
        <span>标题</span>
        <input class="input" type="text" ref="title" />
      </label>
      <div class="upload">
        <form enctype="multipart/form-data" method="post" action="" id="upform" onsubmit="return false">
          <input type="file" id="file" @change="showFile" class="input-file" />
          <label class="labelBtn" for="file">选择文件</label>
          <span v-if="!file">未选中文件</span>
          <span v-if="file">已选中图片{{ file.name }}</span>
          <el-button type="success" @click="send" plain>开始上传</el-button>
        </form>
        <div slot="tip" class="form-tips" style="margin-top: 10px">
          <div>
            <el-tag type="warning"
              >最多上传4张，确定上传图片请点击开始上传按钮，请注意上传图片大小，不宜过大！点击上传之后请耐心等待，提示上传成功即可。</el-tag
            >
          </div>
        </div>
      </div>
      <div class="content">
        <li>内容</li>
        <textarea cols="50" rows="5" ref="content" class="input1"> </textarea>
      </div>
      <div class="btn">
        <el-button type="success" @click="commitly" plain>提交留言</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue2-toast/lib/toast.css'
import { reqAddLiuYan } from '@/api'
import axios from 'axios'

export default {
  name: 'addliuyan',
  data() {
    return {
      uerName: '',
      token: '',
      radiolist: [
        { value: 1, isCheck: true, text: '心情随笔' },
        { value: 2, isCheck: false, text: '美食分享' },
        { value: 3, isCheck: false, text: '旅游日记' },
      ],
      dialogImageUrl: '',
      fileList: [],
      imgUrls: [],
      limit: 4,
      url: {},
      file: null,
    }
  },
  mounted() {
    this.userName = window.sessionStorage.getItem('USERNAME')
    this.token = window.sessionStorage.getItem('TOKEN')
  },
  methods: {
    showFile($event) {
      // eslint-disable-next-line prefer-destructuring
      this.file = $event.target.files[0]
      console.log($event.target.files[0])
    },
    getimgUrl() {
      const param = new FormData()
      param.append('file', this.file)
      param.append('uid', 'f0fe821661c93329cae6ee8fd8b14f6e')
      param.append('token', '2d0f555fe172bf42f2092f33f0987c84')
      return axios.post('https://www.imgurl.org/api/v2/upload', param, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    },
    async send() {
      try {
        const { data } = await this.getimgUrl()
        console.log('成功', data.data.url)
        this.imgUrls.push(data.data.url)
        this.$toast.top('上传成功')
      } catch (e) {
        console.log('出错', e)
        this.$toast.top('上传失败，请检查图片大小！')
      }
    },
    async commitly() {
      let num = null
      const title = this.$refs.title.value
      const content = this.$refs.content.value
      this.radiolist.forEach((item) => {
        if (item.isCheck === true) {
          num = item.value
        }
      })
      const result = await reqAddLiuYan(num, title, this.imgUrls, content, this.userName)
      if (result.code === 200) {
        this.$toast.top('添加成功')
        this.$router.push('/home')
      } else {
        this.$toast.top(result.message)
        this.$router.push('/home')
      }
    },
    changeInput(index) {
      this.radiolist.map((v, i) => {
        if (i === index) {
          v.isCheck = true
        } else {
          v.isCheck = false
        }
        return undefined
      })
    },
  },
}
</script>

<style scoped lang="less">
.father {
  width: 80%;
  background-color: #ffffff;
  border-radius: 12px;
  margin-left: 10%;
}
.form {
  .title > span {
    font-size: 14px;
    color: #606266;
    margin: 0 20px 0 40px;
  }
  .input {
    -webkit-appearance: none;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 40%;
  }
  .content {
    margin-bottom: 40px;
    .input1 {
      margin-top: 20px;
      width: 40%;
      padding: 5px 15px;
      line-height: 1.5;
      color: #606266;
      background-color: #fff;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      outline: none;
      margin: 0 20px 0 40px;
    }
    li {
      font-size: 14px;
      color: #606266;
      margin: 0 20px 20px 40px;
    }
  }

  h2 {
    margin: 20px;
    color: #666;
    text-align: center;
  }
  .btn {
    margin-left: 40%;
  }
}

.kind1 {
  margin: 30px 40px;
  font-size: 14px;
  color: #606266;
  span {
    text-align: right;
  }
}
.upload {
  margin: 20px 90px;
  span {
    margin-right: 20px;
  }
}
.input-file {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.labelBtn {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin-right: 20px;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  border-color: #c2e7b0;
  color: #67c23a;
  background-color: #eef9ec;
}
.labelBtn:hover,
.labelBtn:active,
.labelBtn:focus {
  color: #fff;
  background-color: #5daf34;
}
</style>
