import request from '@/utils/request'
import {setRole} from '@/utils/roles'
import {setAccount} from '@/utils/account'
import {setToken} from '@/utils/token'
const state = {
  role: '',
  userName:'',
  account:'',
  token:''
}

const mutations = {
  SET_ROLE: (state, role) => {
    state.role = role
    setRole(role)
  },
  SET_USER_NAME: (state, userName) => {
    state.userName = userName
  },
  SET_ACCOUNT: (state, account) => {
    state.account = account
    setAccount(account)
  },
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  }
}

const actions = {
  login({ commit }, data) {
    return new Promise((resolve, reject) => {
      request({
        method:'post',
        url:`/api/login`,
        data
      }).then((res) => {
        commit('SET_ROLE', res.data.role)
        commit('SET_USER_NAME', res.data.userName)
        commit('SET_ACCOUNT', res.data.account)
        commit('SET_TOKEN', res.data.token)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfo({ commit }, username) {
    return new Promise((resolve, reject) => {
      request({
        url:`/api/userinfo/${username}`
      }).then((res) => {
        setRole(res.data.role)
        commit('SET_ROLE', res.data.role)
        commit('SET_USER_NAME', res.data.userName)
        commit('SET_ACCOUNT', res.data.account)
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
