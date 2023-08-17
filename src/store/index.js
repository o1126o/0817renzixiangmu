import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import table from './modules/table'
import settings from './modules/settings'
import user from './modules/user'
import Myrouters from "./modules/Myrouters"
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    table,
    Myrouters
  },
  getters
})

export default store
