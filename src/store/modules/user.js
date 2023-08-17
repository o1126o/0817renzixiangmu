import { login, logout, getInfo, getUserInfo } from '@/api/user'

///vuexde token存储的持久化
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo: {}
  }
}

const state = getDefaultState()

const mutations = {
  // 存token
  setToken(state, token) {
    state.token = token
    // 本地存储
    setToken(token)
  },
  // 删token
  removeToken(state) {
    state.token = null
    // 删除本地
    removeToken()
  },
  // 存储用户数据
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}

const actions = {

  // 登录请求
  async login({ commit }, data) {
    let res = await login(data)
    //  提交commit 存储token
    commit('setToken', res)
  },

  // 异步获取用户信息
  async getUserInfo({ commit }) {
    const result = await getUserInfo()
    commit('setUserInfo', result)
    return result;
  },

  // 退出登录
  loginout({ commit }) {
    //  删除token
    commit('removeToken')
    // 删除用户资料
    commit('setUserInfo', {})
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

