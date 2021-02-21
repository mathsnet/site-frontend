export const state = () => ({
  show: false,
  opacity: 0.96,
})

export const mutations = {
  SET_STATE(state, showState, opacity) {
    state.show = showState
    state.opacity = opacity
  },
}

export const getters = {
  getShow(state) {
    return state.show
  },
  getOpacity(state) {
    return state.opacity
  },
}

export const actions = {
  updateOverlayAction({ commit }, showState, opacity = 0.95) {
    commit('SET_STATE', showState, opacity)
  },
}
