import {getData, getHomes, getFlats, createRequest, saveRequest} from '../../service'
import store from '../index'
import {getDate, setDate} from "@/helpers/formatDate";

export const request = {
    namespaced: true,
    state: {
        requests: [],
        homes: [],
        flats: []
    },
    mutations: {
        setRequests(state, requests){
            state.requests = requests;
        },
        setHomes(state, homes){
            state.homes = homes;
        },
        setFlats(state, flats){
            state.flats = flats;
        },
        addRequest(state, data){
            state.requests.unshift(data)
        },
        updateRequest(state, data){
            state.requests = state.requests.filter(request => request.id !== data.id)
            state.requests.unshift(data)
        },
    },
    actions: {
        async setRequests({ commit, getters }){
            if(getters.getRequests.length) return

            const res = await getData()
            res.map(item => {
                item.created_at = getDate(item.created_at)
                item.due_date = getDate(item.due_date)
                return item
            })
            commit('setRequests', res);
        },
        async setHomes({ commit }){
            const res = await getHomes()
            commit('setHomes', res)
        },
        async setFlat({ commit }, {homeId}){
            if(!homeId) return store.dispatch('alert/error', 'Дом не указан')

            const res = await getFlats(homeId)
            commit('setFlats', res)
        },
        async createRequest({commit}, data){
            const res = await createRequest({
                    ...data,
                    due_date: setDate(data.due_date),
                    status_id: 1 // set status - new
            })

            if(res?.status === 201) {
                store.dispatch('alert/success', 'Заявка успешно создана')
                const request = res.data

                request.created_at = getDate(request.created_at)
                request.due_date = getDate(request.due_date)
                commit('addRequest', request)
            }
            else {
                for(let i=0; i<Object.keys(res).length; i++){
                    res[Object.keys(res)[i]]
                        .map(error => store.dispatch('alert/error', 'Не удалось создать: ' + error))
                }
            }
        },
        async saveRequest({commit}, data){
            const res = await saveRequest({
                ...data,
                due_date: setDate(data.due_date)
            })

            if(res?.status === 200) {
                store.dispatch('alert/success', 'Заявка успешно отредактирована')
                const request = res.data

                request.created_at = getDate(request.created_at)
                request.due_date = getDate(request.due_date)
                commit('updateRequest', request)
            }
            else {
                for(let i=0; i<Object.keys(res).length; i++){
                    res[Object.keys(res)[i]]
                        .map(error => store.dispatch('alert/error', 'Не удалось обновить: ' + error))
                }
            }
        },
    },
    getters: {
        getRequests: state => state.requests,
        getHomes: state => state.homes,
        getFlats: state => state.flats,
    }
};
