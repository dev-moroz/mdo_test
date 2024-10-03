export const alert = {
    namespaced: true,
    state: {
        alerts: [],
    },
    getters: {
        alerts: state => state.alerts,
    },
    mutations: {
        success(state, message) {
            const id = Date.now();
            state.alerts.push({type: 'success', message, id})
        },
        error(state, message) {
            const id = Date.now();
            state.alerts.push({type: 'error', message, id})
        },
        clear(state, id) {
            state.alerts = state.alerts.filter(alert => alert.id !== id);
        },
    },
    actions: {
        success({ commit }, message) {
            commit("success", message);
        },
        error({ commit }, message) {
            commit("error", message);
        },
        clear({ commit }, id) {
            commit("clear", id);
        },
    },
};
