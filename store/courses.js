export const state = () => ({
  subscriptions: [
    { state: '10,000', val: 10000 },
    { state: '20,000', val: 20000 },
    { state: '30,000', val: 30000 },
  ],
  levels: [
    { state: 'Primary', val: 1 },
    { state: 'Secondary', val: 2 },
    { state: 'Tertiary', val: 3 },
  ],
})

export const mutations = {
  SET_SUBSCRIPTIONS(state, data) {
    state.subscriptions = data
  },
  SET_LEVELS(state, data) {
    state.levels = data
  },
}
export const getters = {
  getSubscriptions(state) {
    return state.subscriptions
  },
  getLevels(state) {
    return state.levels
  },
}

export const actions = {
  setSubscriptions({ commit }, data) {
    commit('SET_SUBSCRIPTION', data)
  },
  setLevels({ commit }, data) {
    commit('SET_LEVELS', data)
  },
}
