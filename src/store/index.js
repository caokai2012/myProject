import Vuex from 'vuex'
import defaultState from './state'
import * as getters from './getters'
import mutations from './mutations'

export default () => {
  
    const store = new Vuex.Store({state:defaultState, getters, mutations})
    if (module.hot) {
    module.hot.accept([
      './state', './getters', './mutations'
    ], () => {
      const newState = require('./state').default
      const newMutations = require('./mutations').default
      const newGetters = require('./getters').default

      store.hotUpdate({state: newState, getters: newGetters, mutations: newMutations})
    })
  }
  return store
}
