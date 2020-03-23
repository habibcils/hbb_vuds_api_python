import {apiBase} from "@/helpers"

export default {
    namespaced: true,
    state: {
        menuList : [],
        permission: []
    },
    getters: {
        // getList : state => {
        //     return state.menuList 
        // },
        // getName : state => {
        //     return state.name 
        // },
    },
    actions: {
        async getMenu({commit}, id){
            // console.log(id)
            return apiBase.get('/menu?id_usergroup='+id)
            .then(function (response) {
                let data = response.data.data
                // console.log(data)
                commit('ADD_MENU', response.data.data)
                return response.data
            })
            .catch(function (error) {
                console.log(error);
                return error
            })
        }
    },
    mutations: {
        ADD_MENU(state, menu){
            state.menuList = menu
        }
    }
}