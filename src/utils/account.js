import Cookies from 'vue-cookie'

const AccountKey = 'account'

export function getAccount() {
  return Cookies.get(AccountKey)
}

export function setAccount(value) {
  return Cookies.set(AccountKey, value)
}

export function removeAccount() {
  return Cookies.delete(AccountKey)
}
