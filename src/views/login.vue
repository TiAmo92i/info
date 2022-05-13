<template>
  <div class="wrap">
    <h1 v-show="isLogin">Login</h1>
    <h1 v-show="!isLogin">Register</h1>
    <div class="userName">
      <span style="color: red; margin: 0 5px 0 20px">*</span><span>userName</span>
      <el-input placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="userName" :style="{ width: 230 + 'px', marginLeft: 30 + 'px' }"> </el-input>
    </div>
    <div class="passWord">
      <span style="color: red; margin: 0 5px 0 20px">*</span><span>passWord</span>
      <el-input type="password" placeholder="请输入密码" v-model="password" :style="{ width: 230 + 'px', marginLeft: 31 + 'px' }">
        <i slot="prefix" class="iconfont icon-mima"></i
      ></el-input>
    </div>
    <div class="confirm" v-show="!isLogin">
      <span style="color: red; margin: 0 5px 0 20px">*</span><span>Confirm</span>
      <el-input type="password" placeholder="请输入确认密码" v-model="confirm" :style="{ width: 230 + 'px', marginLeft: 46 + 'px' }"
        ><i slot="prefix" class="iconfont icon-querenmima"></i
      ></el-input>
    </div>

    <el-button round plain :style="{ width: 100 + 'px', marginLeft: 150 + 'px', marginRight: 100 + 'px' }" type="success" v-show="isLogin" @click="Login"
      >Login</el-button
    >
    <el-button round plain :style="{ width: 100 + 'px', marginLeft: 150 + 'px', marginRight: 100 + 'px' }" type="success" v-show="!isLogin" @click="Register"
      >Register</el-button
    >
    <el-link type="success" :underline="false" v-show="isLogin" @click="isLogin = !isLogin">Register</el-link>
    <el-link type="success" :underline="false" v-show="!isLogin" @click="isLogin = !isLogin">Login</el-link>
  </div>
</template>

<script>
import 'vue2-toast/lib/toast.css'
import pubsub from 'pubsub-js'
import { reqLogin, reqRegister } from '@/api/index'

export default {
  name: 'login',
  data() {
    return {
      userName: '',
      password: '',
      confirm: '',
      isLogin: true,
    }
  },
  methods: {
    async Login() {
      const result = await reqLogin(this.userName, this.password)
      if (result.code === 200) {
        this.$toast.top(result.message)
        sessionStorage.setItem('TOKEN', result.token)
        sessionStorage.setItem('USERNAME', this.userName)
        pubsub.publish('login')
        this.$router.push('/home')
      } else {
        this.$toast.top(result.message)
      }
      this.userName = ''
      this.password = ''
    },
    async Register() {
      if (this.password === this.confirm) {
        const result = await reqRegister(this.userName, this.password)
        if (result.code === 200) {
          this.$toast.top(result.message)
          sessionStorage.setItem('TOKEN', result.token)
          sessionStorage.setItem('USERNAME', this.userName)
          this.$router.push('/home')
        } else {
          this.$toast.top(result.message)
        }
        this.userName = ''
        this.password = ''
        this.confirm = ''
      } else {
        this.$toast.top('两次密码不一致')
      }
    },
  },
}
</script>

<style scoped lang="less">
.wrap {
  margin-left: 450px;
  width: 410px;
  padding: 15px;
  border-radius: 15px;
  background-color: #fff;
  h1 {
    text-align: center;
  }
  span {
    margin-top: 7px;
    font-size: 18px;
  }
  .userName,
  .passWord,
  .confirm {
    margin-bottom: 15px;
  }
  .iconfont {
    position: relative;
    font-size: 20px;
    opacity: 70%;
    cursor: pointer;
    top: 10px;
    margin-right: 5px;
  }
}
</style>
