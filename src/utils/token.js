import Cookies from 'vue-cookie'

const TokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(value) {
  return Cookies.set(TokenKey, value)
}

export function removeToken() {
  return Cookies.delete(TokenKey)
}
