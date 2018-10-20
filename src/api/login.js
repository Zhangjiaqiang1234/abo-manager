import axios from 'axios'

export function loginByUsername(phoneNumber, encryptedPassword) {
  const data = {
    phoneNumber,
    encryptedPassword
  }
  return axios({
    url: '/api/users/admin/login',
    method: 'post',
    data
  })
}

export function logout() {
  return axios({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return axios({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

