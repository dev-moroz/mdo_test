import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import { alert } from "./modules/alert.module";
import { request } from './modules/request.module'

export default new Vuex.Store({
    modules: {
        alert,
        request
    }
})
