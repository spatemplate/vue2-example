/* globals localStorage */
import axios from 'axios'

export default {
  login (email, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    pretendRequest(email, pass, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  },

  getToken () {
    return localStorage.token
  },

  logout (cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn () {
    return !!localStorage.token
  },

  onChange () {}
}

function pretendRequest (email, pass, cb) {
  setTimeout(() => {

      axios.post('http://api.extended.yii/v1/auth', {email: email, pass: pass})
          .then(response => {
              cb({
                  authenticated: true,
                  token: response.data.token
              })
          })
          .catch(error => {
              cb({ authenticated: false })
          })

  }, 0)
}
