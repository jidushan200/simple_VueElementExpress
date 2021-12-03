import Cookies from 'vue-cookie'

const Rolekey = 'role'

export function getRole() {
  return Cookies.get(Rolekey)
}

export function setRole(value) {
  return Cookies.set(Rolekey, value)
}

export function removeRole() {
  return Cookies.delete(Rolekey)
}
