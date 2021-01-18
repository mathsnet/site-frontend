export const state = () => ({
  show: false,
})

export const mutations = {
  SET_STATE(state, payload) {
    state.show = payload
  },
}

export const getters = {
  getShow(state) {
    return state.show
  },
}

export const actions = {
  updateOverlayAction({ commit }, payload) {
    commit('SET_STATE', payload)
  },
}
