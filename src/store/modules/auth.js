/* eslint-disable promise/param-names */
import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/auth'
import { USER_REQUEST } from '../actions/user'
import apiCall from '@/utils/myapi'
//import axios from 'axios'

const state = { token: localStorage.getItem('user-token') || '', status: '', hasLoadedOnce: false }

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
}

const actions = {
  [AUTH_REQUEST]: ({commit, dispatch}, user) => {
    /*
    var usercontent = {};
    if (user) {
        usercontent = { email: user.email, password: user.pass };
    }*/
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      apiCall({url: 'https://redovisa.guni.me/login', data: user, method: 'POST'})
      //axios({url: 'https://redovisa.guni.me/login', data: usercontent, method: 'POST' })
      //axios({method: 'post',url: '/user/12345',data: {email: user.email, password: user.pass}}),
      .then(resp => {
        // eslint-disable-next-line
        console.log(resp)
        //const token = resp.data.token
        const token = resp.token
        // eslint-disable-next-line
        console.log(token)
        localStorage.setItem('user-token', token)
        // Here set the header of your ajax library to the token value.
        // example with axios
        //axios.defaults.headers.common['Authorization'] = token
        commit(AUTH_SUCCESS, resp)
        dispatch(USER_REQUEST)
        resolve(resp)
      })
      .catch(err => {
        commit(AUTH_ERROR, err)
        localStorage.removeItem('user-token')
        reject(err)
      })
    })
  },
  [AUTH_LOGOUT]: ({commit}) => {
    return new Promise((resolve) => {
      commit(AUTH_LOGOUT)
      localStorage.removeItem('user-token')
      // remove the axios default header
      //delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  }
}

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = 'success'
    state.token = resp.token
    state.hasLoadedOnce = true
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error'
    state.hasLoadedOnce = true
  },
  [AUTH_LOGOUT]: (state) => {
    state.token = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
