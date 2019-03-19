import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./actions";
import * as getters from "./getters";
import mutations from "./mutations";
import state from "./state";
import createLog from 'vuex/dist/logger'
Vue.use(Vuex);
const store = new Vuex.Store({
  actions,
  state,
  getters,
  mutations,
  plugins:[createLog()]
});

export default store;
