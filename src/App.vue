<template>
<div>
    <vue-page-transition name="fade-in-up">
        <Login v-if="showLogin || statusLog == 0" />
    </vue-page-transition>
    <vue-page-transition name="fade-in-down">
        <Index v-if="statusLog == 1" />
    </vue-page-transition>
</div>
</template>

<script>
import Login from './views/Login';
import Index from './views/Index';
import { createNamespacedHelpers, mapState, mapGetters } from 'vuex'
// import axios from 'axios'
import qs from 'qs'
import {encrypted, decrypted, apiBase} from "@/helpers"

export default {
    name: 'App',
    data() {
        return {
            showLogin: false
        }
    },
    components: {
        Login,
        Index
    },
    mounted() {
        // let tokenStr = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODQ3ODAyMDMsIm5iZiI6MTU4NDc4MDIwMywianRpIjoiMjMxZGQ4YjEtN2I5MS00MTEyLTg3NDUtM2Y5YzMzYWIwMjhhIiwiZXhwIjoxNTg0OTUzMDAzLCJpZGVudGl0eSI6ImFkbWluIiwiZnJlc2giOnRydWUsInR5cGUiOiJhY2Nlc3MiLCJ1c2VyX2NsYWltcyI6eyJ1c2VyX2lkIjoxfX0.X29aq-2z6BYuEgI0bE40TTlSB63ScuXqi9rxQBgB-yc'
            // apiBase
            //     .get('user?username=admin&is_exact=false&limit=10&offset=0', { headers : {"Authorization" : `Bearer ${tokenStr}`}})
            //     .then(res => {
            //         console.log('success GET')
            //         console.log(res.data)                           
            //         // return true
            //     }).catch(err => {
            //         console.log(err)
            //         if(err.response){                   
            //         }else{
            //             // return true
            //         }
            //     })

        this.$store.dispatch('auth/checkLogin').then((res)=>{
            if(res == 'success'){
                console.log(res)
                this.$toasted.success('Welcome back').goAway(3000)
            }
        })
    },
    computed: { 
        ...mapState('auth', {
            token : 'token',
            statusLog : 'statusLog',
            }),              
    }
}
</script>
