import Vue from 'vue'
import VueRouter from 'vue-router'
import Users from '@/views/pages/Users.vue'
import {decrypted} from "@/helpers"

const Null404 = r => require.ensure([], () => r(require('@/components/_code//404.vue')), 'big-pages')
const Null503 = r => require.ensure([], () => r(require('@/components/_code//503.vue')), 'big-pages')
const Login = r => require.ensure([], () => r(require('../views/Login.vue')), 'big-pages')
const Gis = r => require.ensure([], () => r(require('../views/pages/Gis.vue')), 'big-pages')
const Home = r => require.ensure([], () => r(require('../views/pages/Home.vue')), 'big-pages')
const Usergroup = r => require.ensure([], () => r(require('../views/pages/Usergroup.vue')), 'big-pages')
const Shield = r => require.ensure([], () => r(require('../views/pages/Shield.vue')), 'big-pages')
const Useraccess = r => require.ensure([], () => r(require('../views/pages/Useraccess.vue')), 'big-pages')
const Menusort = r => require.ensure([], () => r(require('../views/pages/Menu_sort.vue')), 'big-pages')
const Menu = r => require.ensure([], () => r(require('../views/pages/Menu.vue')), 'big-pages')
const Profile = r => require.ensure([], () => r(require('../views/pages/Profile.vue')), 'big-pages')
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
        path: '/gis',
        name: 'Gis',
        component: Gis,
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
        path: '/addLoc',
        name: 'AddLoc',
        component: Null404,
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
    {
        path: '/usergroup',
        name: 'Usergroup',
        component: Usergroup,
        meta: {
            auth: true,
            permission: 'usergroup',
        },        
    },
    {
        path: '/useraccess',
        name: 'Useraccess',
        component: Useraccess,
        meta: {
            auth: true,
            permission: 'useraccess',
        },        
    },
    {
        path: '/menu',
        name: 'Menu',
        component: Menu,
        meta: {
            auth: true,
            permission: 'menu',
        },        
    },
    {
        path: '/menu_order',
        name: 'Menu Order',
        component: Menusort,
        meta: {
            auth: true,
            permission: 'menu_order',
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

function addroute() {
    router.addRoutes(
        [
            { path: '/shield', name: 'Shield', component: Shield }
        ]
    )
}
addroute()


export default router