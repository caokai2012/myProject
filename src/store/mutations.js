import * as types from './mutation-types'

const mutations = {
  [types.SET_PRO_CENTER](state, data) {
    state.productCenter = data
  },
  [types.SET_PROJECTS](state, data) {
    state.projects = data
  },
  [types.SET_CURRENT_PRODUCT](state, data) {
    state.currentProduct = data
  },
  [types.SET_CURRENT_PROJECT](state, data) {
    state.currentProject = data
  },
  [types.SET_CURRENT_KNOWLEDGE](state, data) {
    state.currentKnowledge = data
  },
  [types.SET_KNOWLEDGES](state, data) {
    state.knowledges = data
  },
}
export default mutations;