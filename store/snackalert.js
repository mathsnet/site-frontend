export const state = () => ({
  show: false,
  msg: 'Message for snackbar',
  color: 'info',
})

export const mutations = {
  SET_STATE(state, payload) {
    state.show = payload.show
    state.msg = payload.msg
    state.color = payload.color
  },
  SET_ERROR_STATE(state, message) {
    state.show = true
    state.msg = message
    state.color = 'error'
  },
  SET_SUCC_STATE(state, message) {
    state.show = true
    state.msg = message
    state.color = 'success'
  },
}

export const getters = {
  getSnackbarState(state) {
    return state.show
  },
  getSnackbarText(state) {
    return state.msg
  },
  getSnackbarColor(state) {
    return state.color
  },
}

export const actions = {
  updateSnackbar({ commit }, payload) {
    commit('SET_STATE', payload)
  },
  showErrorSnackbar({ commit }, message) {
    commit('SET_ERROR_STATE', message)
  },
  showSuccessSnackbar({ commit }, message) {
    commit('SET_SUCC_STATE', message)
  },
}
