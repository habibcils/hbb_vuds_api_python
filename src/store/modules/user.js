export default {
    namespaced: true,
    state: {
        userData: [],
    },
    getters: {
        username : state => {
            return state.username
        }
    },
    actions: {
        addUserName({commit}, username){
            commit('ADD_USERNAME', username)
        }
    },
    mutations: {
        // ADD_USERNAME(state, name){
        //     state.username = name
        // },
        SET_USER(state, payload){
            state.userData = payload
        } 
    }
}