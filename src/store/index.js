import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import formatDate from "@/helpers/formatDate";

import {getData, testSearch, create} from '../service'

export default new Vuex.Store({
    state: {
        requests: [],
        // filteredRequests: [],
    },
    mutations: {
        setRequests(state, requests){
            state.requests = requests;
        },
        // setFilteredRequests(state, requests){
        //     state.filteredRequests = requests;
        // }
        increment(state){
            console.log('increment', state)
        }
    },
    actions: {
        increment({ commit }) {
            commit('increment');
        },
        async setRequests({ commit, getters }){
            // is easy check to exist requests
            if(getters.getRequests.length) return

            const res = await getData()

            res.map(item => {
                item.created_at = formatDate(item.created_at)
                item.due_date = formatDate(item.due_date)
                return item
            })
            commit('setRequests', res);
        },
        async createRequest({ commit }, requestData){
            await create({
                premise_id: '060fd1ae-d76e-4f68-a563-a7848e64188c',
                apartment_id: 10101,
                applicant: {
                    first_name: "Иванов_test",
                    last_name: "Иван_test",
                    patronymic_name: "Иванович_test",
                    username: "79123123123",
                },
                description: "Какое-то описание",
                status_id: 1
        })
            // await getHomes()
            commit('increment');
            console.log('filters', requestData)
            // res.map(item => {
            //     item.created_at = formatDate(item.created_at)
            //     item.due_date = formatDate(item.due_date)
            //     return item
            // })
            // commit('setFilteredRequests', res);
        },
        async setFilteredRequests({ commit }, filters){
            await testSearch([{key: 'premise_id', value: '33796'}])
            commit('increment');
            console.log('filters', filters)
            // res.map(item => {
            //     item.created_at = formatDate(item.created_at)
            //     item.due_date = formatDate(item.due_date)
            //     return item
            // })
            // commit('setFilteredRequests', res);
        }
    },
    getters: {
        getRequests: state => state.requests,
        // getFilteredRequests: state => state.filteredRequests,
    }
});
