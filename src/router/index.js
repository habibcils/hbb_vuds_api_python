import Vue from 'vue'
import VueRouter from 'vue-router'
// import Users from '@/views/pages/Users.vue'
import {decrypted} from "@/helpers"

const Null404 = r => require.ensure([], () => r(require('@/components/_code//404.vue')), 'big-pages')
const Null503 = r => require.ensure([], () => r(require('@/components/_code//503.vue')), 'big-pages')
const Login = r => require.ensure([], () => r(require('../views/Login.vue')), 'big-pages')
const Home = r => require.ensure([], () => r(require('../views/pages/Home.vue')), 'big-pages')
const Users = r => require.ensure([], () => r(require('../views/pages/Users.vue')), 'big-pages')
const Profile = r => require.ensure([], () => r(require('../views/pages/Profile.vue')), 'big-pages')
const DocumentIn = r => require.ensure([], () => r(require('../views/pages/Document_in.vue')), 'big-pages')
const DocumentAdd = r => require.ensure([], () => r(require('../views/pages/Document_add.vue')), 'big-pages')
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            auth: true,
            permission: 'dashboard',
        },
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {
            auth: true,
            permission: 'profile',
        },
    },    
    {
        path: '/document_In',
        name: 'DocumentIn',
        component: DocumentIn,
        meta: {
            auth: true,
            permission: 'gis',
        },        
    },
    {
        path: '/404',
        name: '404',
        component: Null404,
    },
    {
        path: '/503',
        name: '503',
        component: Null503,
    },
    {
        path: '/document_add',
        name: 'DocumentAdd',
        component: DocumentAdd,
        meta: {
            auth: true,
            permission: 'addloc',
        },        
    },
    {
        path: '/users',
        name: 'Users',
        component: Users,
        meta: {
            auth: true,
            permission: 'users',
        },
    },

    { path: "*", component: Null404 }    

]

const router = new VueRouter({
    routes,
    mode: 'history',
    // linkActiveClass: "active", for non exact
    linkExactActiveClass: "is-active"
})

router.beforeEach((to, from, next) => {
    // mengecek ada tidak meta auth di dalam meta
    if (to.matched.some(record => record.meta.auth)) {
        // cek di localstorage auth, jika false maka diarahkan ke halaman login
        if (!localStorage.getItem('token')) {
            next('/login');
        } else {
            let permission = localStorage.getItem('permission')

            // if(permission){
                permission = decrypted(localStorage.getItem('permission'));
            // }else{
            //     permission = ''
            // }
            // console.log(permission)
            
            if (to.matched.some(record => record.meta.permission)) {
                // console.log(to.meta.permission)
                let sum = permission.find(x => x.target == to.meta.permission)
                // console.log(sum)
                if(sum){
                    if(sum.act_read == '1') {
                        next();
                    }
                }
            } else {
                next('/503');
            }
        }
    } else {
        next();
    }
});


export default router