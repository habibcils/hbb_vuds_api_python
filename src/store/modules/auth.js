import {encrypted, decrypted, apiBase} from "@/helpers"
import axios from 'axios'
import qs from 'qs'

export default {
    namespaced: true,
    state: {
        statusLog : 0,
        token : '',
        username : '',
        id_usergroup : 0,
        fullname : '',
        email : '',
        groups : '',     
    },
    getters: {
        // getStatus: state => {
        //     return state.statusLog
        // },
        // gToken: state => {
        //     return state.token
        // }
    },
    actions: {
        async menubar(){
            apiBase
                .get('user/username=admin&is_exact=false&limit=10&offset=0')
                .then(res => {
                    // console.log(res.data)                           
                    // return true
                }).catch(err => {
                    console.log(err)
                    if(err.response){                   
                        // return false
                    }else{
                        // return true
                    }
                })
        },
        async login({commit,payload}, data ){
            let dat = qs.stringify({
                username: data.username,
                password: data.password
            })

            return apiBase
                .post('user/login', dat)
                .then(res => {
                    console.log('success')
                    console.log(res.data)
                    commit('LOGGED', res.data)
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('username', res.data.username)

                    let data = [
                        {"act_create":"1","act_read":"1","act_update":"1","act_delete":"1","target":"dashboard"},{"act_create":"1","act_read":"1","act_update":"1","act_delete":"1","target":"gis"},{"act_create":"1","act_read":"1","act_update":"1","act_delete":"1","target":"addloc"},{"act_create":"1","act_read":"1","act_update":"1","act_delete":"1","target":"menu"},{"act_create":"1","act_read":"1","act_update":"1","act_delete":"1","target":"/"},{"act_create":"1","act_read":"1","act_update":"1","act_delete":"1","target":"menu_order"},{"act_create":"1","act_read":"1","act_update":"1","act_delete":"1","target":"useraccess"},{"act_create":"1","act_read":"1","act_update":"1","act_delete":"1","target":"admin_site_content"},{"act_create":"1","act_read":"1","act_update":"1","act_delete":"1","target":"province"},{"act_create":"1","act_read":"1","act_update":"1","act_delete":"1","target":"/"},{"act_create":"1","act_read":"1","act_update":"1","act_delete":"1","target":"/"},{"act_create":"1","act_read":"1","act_update":"1","act_delete":"1","target":"users"},{"act_create":"1","act_read":"1","act_update":"1","act_delete":"1","target":"usergroup"},{"act_create":"1","act_read":"1","act_update":"1","act_delete":"1","target":"profile"}                       
                    ]
                    let payload = encrypted(data)
                    localStorage.setItem('permission', payload)

                    // getPermission(res.data.data.id_usergroup).then( (res) => {
                    //     // this.$router.push({name: 'home', query : data });
                    //     return true
                    // })
                    // apiBase
                    // .get('usergroup/permission?id='+res.data.data[0].id_usergroup)
                    // .then(res => {
                    //     // console.log(res)                        
                    //     let data = res.data.data

                    //     // console.log(payload)
                    //     // let dek = decrypted(payload)
                    //     // console.log(dek)
                    //     return true
                    // }).catch(err => {
                    //     if(err.response){                   
                    //         return false
                    //     }else{
                    //         return true
                    //     }
                    // })                    
                    return true
                }).catch(err => {
                    console.log(err)
                    if(err.response){                   
                        return false
                    }else{
                        return true
                    }
                })
        },
        async checkLogin({commit,payload}){
            let token = localStorage.getItem('token')
            let headers = {
                'Authorization': 'Bearer '+token
            }            
            let username = localStorage.getItem('username')
            if(token && username){
                console.log('cekk')
                return apiBase
                .get('user?username='+username+'&order_by=user_id&order_type=asc&limit=10&offset=0', {headers: headers})
                .then(res => {
                    console.log(res.data.result[0])
                    let data = res.data.result[0]
                    commit('LOGGED', data)

                    let permission = localStorage.getItem('permission')

                    if(!permission){
                        let data = [
                            {"act_create":"1","act_read":"1","act_update":"1","act_delete":"1","target":"dashboard"},{"act_create":"1","act_read":"1","act_update":"1","act_delete":"1","target":"gis"},{"act_create":"1","act_read":"1","act_update":"1","act_delete":"1","target":"addloc"},{"act_create":"1","act_read":"1","act_update":"1","act_delete":"1","target":"menu"},{"act_create":"1","act_read":"1","act_update":"1","act_delete":"1","target":"/"},{"act_create":"1","act_read":"1","act_update":"1","act_delete":"1","target":"menu_order"},{"act_create":"1","act_read":"1","act_update":"1","act_delete":"1","target":"useraccess"},{"act_create":"1","act_read":"1","act_update":"1","act_delete":"1","target":"admin_site_content"},{"act_create":"1","act_read":"1","act_update":"1","act_delete":"1","target":"province"},{"act_create":"1","act_read":"1","act_update":"1","act_delete":"1","target":"/"},{"act_create":"1","act_read":"1","act_update":"1","act_delete":"1","target":"/"},{"act_create":"1","act_read":"1","act_update":"1","act_delete":"1","target":"users"},{"act_create":"1","act_read":"1","act_update":"1","act_delete":"1","target":"usergroup"},{"act_create":"1","act_read":"1","act_update":"1","act_delete":"1","target":"profile"}                       
                        ]
                        let payload = encrypted(data)
                        localStorage.setItem('permission', payload)                    
                    }

                }).catch(err => {
                    if(err.response){                   
                        return false
                    }else{
                        return true
                    }
                })


                    // localStorage.setItem('auth', 1)
                    // localStorage.setItem('permission', true)
                    // commit('LOGGED', res.data.data[0])
                    // commit('LOGGED', data.data.token)
                    // localStorage.setItem('token',data.data.token)
                    return true
                // })
            }

        },
        async logout({commit}){
            localStorage.removeItem('token')
            // localStorage.removeItem('auth')
            localStorage.removeItem('permission')
            commit('LOGOUT')
            return 'true'
        }
    },
    mutations: {
        LOGGED(state, payload){
            state.token = payload.token
            state.username = payload.username
            state.fullname = payload.fullname
            state.email = payload.fullname
            state.groups = payload.groups[0]
            // state.id_usergroup = payload.id_usergroup
            state.statusLog = 1
        },    
        LOGOUT(state, payload){
            state.token = ''
            state.username = ''
            state.fullname = ''
            state.email = ''
            state.groups = ''
            // state.id_usergroup = 0
            state.statusLog = 0            
        }    
    }
}