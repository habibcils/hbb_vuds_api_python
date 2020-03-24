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
