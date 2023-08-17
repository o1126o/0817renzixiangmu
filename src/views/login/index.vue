<template>
  <div class="login-container">
    <div class="img">
      <img src="../../assets/login-image.png" alt="">
    </div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
      label-position="left">
      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>
      <el-form-item prop="mobile">
        <el-input ref="mobile" v-model="loginForm.mobile" placeholder="请输入手机号" name="mobile" type="text" />
      </el-form-item>

      <el-form-item prop="password">
        <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="请输入密码"
          name="password" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="isAgree" class="isAgrees">
        <el-checkbox v-model="loginForm.isAgree" ref="isAgree">
          平台使用协议
        </el-checkbox>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
        @click="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from "vuex"
export default {
  name: 'Login',
  data() {
    const isAgreeFn = (rule, value, callback) => {
      // rule规则 value数据 true/false  callback 回调函数 执行函数
      // 成功执行callback 失败也执行callback(new Error("请勾选"))
      value ? callback() : callback(new Error("请勾选"))
    }
    return {
      loginForm: {
        isAgree: true,
        mobile: '',
        password: 'hm#qd@23!'
      },
      loginRules: {
        mobile: [
          // required 必填  message提示信息  trigger 触发什么事件 验证
          { required: true, trigger: 'blur', message: "请输入手机号" },
          // pattern 正则校验
          { pattern: /^1[3-9]\d{9}/, message: "手机号格式错误", trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur', message: "请输入密码" },
          { min: 6, max: 16, message: "密码长度在6-16位", trigger: 'blur' }
        ],
        isAgree: [
          {
            validator: isAgreeFn
          }
        ],
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }

}

</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      // color: $light_gray;
      color: #283443;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #f4f5fb inset !important;
        -webkit-text-fill-color: $bg !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #f4f5fb;
    border-radius: 5px;
    color: #454545;
  }

  .isAgrees {
    background: #fff;
  }

  .el-button {
    background-color: #2752fb;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  overflow: hidden;
  display: flex;
  justify-content: space-between;

  .img {
    width: 58%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .login-form {
    position: relative;
    width: 420px;
    max-width: 100%;
    padding: 180px 35px 0;
    margin: 0 20px;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  // .svg-container {
  //   padding: 6px 5px 6px 15px;
  //   color: $dark_gray;
  //   vertical-align: middle;
  //   width: 30px;
  //   display: inline-block;
  // }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $bg;
      margin: 0px auto 40px auto;
      // text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
