<template>
<vueCustomScrollbar class="sidebar-content">
    <div class="nav-container">
        <nav id="main-menu-navigation" class="navigation-main">
            
            <!-- <span v-for="(list,key) in this.menuList " :key="key">
                <div v-if="list.id_parent == 0" class="nav-lavel" >{{list.name}} </div> -->
                
                <!-- <div v-ripple class="nav-item" :class="linkActiveClass"  v-for="(listed,key) in list.submenu " :key="key">
                    <router-link :to="{path:listed.target}"  exact><i :class="'ik '+listed.icon"></i><span>{{listed.name}} </span></router-link>
                </div> -->

                <!-- FOR LOOPING -->
                <!-- <router-link :to="{path:listed.target}" v-slot="{ href, route, navigate, isActive, isExactActive }" v-for="(listed,key) in list.submenu " :key="key">
                    <div v-ripple class="nav-item"  :class="[isActive && 'is-active', isExactActive && 'active']" >
                        <a :href="href" @click="navigate"><i :class="'ik '+listed.icon"></i><span>{{listed.name}} </span></a>
                    </div>
                </router-link> -->

            <div data-v-483b6756="" class="nav-lavel">Home </div>
            <router-link :to="{path:'/'}" v-slot="{ href, route, navigate, isActive, isExactActive }" >
                <div v-ripple class="nav-item"  :class="[isActive && 'is-active', isExactActive && 'active']" >
                    <a :href="href" @click="navigate"><i class="ik ik-bar-chart-2"></i><span>Dashboard </span></a>
                </div>
            </router-link> 
            <div data-v-483b6756="" class="nav-lavel">Documents </div>
            <router-link :to="{path:'/document_in'}" v-slot="{ href, route, navigate, isActive, isExactActive }" >
                <div v-ripple class="nav-item"  :class="[isActive && 'is-active', isExactActive && 'active']" >
                    <a :href="href" @click="navigate"><i class="ik ik-briefcase"></i><span>Document In</span></a>
                </div>
            </router-link>
            <router-link :to="{path:'/document_out'}" v-slot="{ href, route, navigate, isActive, isExactActive }" >
                <div v-ripple class="nav-item"  :class="[isActive && 'is-active', isExactActive && 'active']" >
                    <a :href="href" @click="navigate"><i class="ik ik-briefcase"></i><span>Document Out</span></a>
                </div>
            </router-link>
            <router-link :to="{path:'/document_fav'}" v-slot="{ href, route, navigate, isActive, isExactActive }" >
                <div v-ripple class="nav-item"  :class="[isActive && 'is-active', isExactActive && 'active']" >
                    <a :href="href" @click="navigate"><i class="ik ik-briefcase"></i><span>Document Favorite</span></a>
                </div>
            </router-link> 
            <router-link :to="{path:'/document_add'}" v-slot="{ href, route, navigate, isActive, isExactActive }" >
                <div v-ripple class="nav-item"  :class="[isActive && 'is-active', isExactActive && 'active']" >
                    <a :href="href" @click="navigate"><i class="ik ik-plus-square"></i><span>Document Add</span></a>
                </div>
            </router-link>                       
            <div data-v-483b6756="" class="nav-lavel">System </div> 
            <router-link :to="{path:'/profile'}" v-slot="{ href, route, navigate, isActive, isExactActive }" >
                <div v-ripple class="nav-item"  :class="[isActive && 'is-active', isExactActive && 'active']" >
                    <a :href="href" @click="navigate"><i class="ik ik-user"></i><span>Profile </span></a>
                </div>
            </router-link>        
            <router-link :to="{path:'/users'}" v-slot="{ href, route, navigate, isActive, isExactActive }" >
                <div v-ripple class="nav-item"  :class="[isActive && 'is-active', isExactActive && 'active']" >
                    <a :href="href" @click="navigate"><i class="ik ik-users"></i><span>Users </span></a>
                </div>
            </router-link> 
        </nav>
    </div>
</vueCustomScrollbar>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
// import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import { createNamespacedHelpers, mapState, mapGetters } from 'vuex'
// const { mapGetters } = createNamespacedHelpers('menus')
export default {
    data() {
        return {
            activeClass: 'active',
            // activeUrl: linkActiveClass
        };
    },
    components: {
        vueCustomScrollbar
    },
    computed: {
        linkActiveClass(){
                return ''
        },
        ...mapState('menus', {
            menuList : 'menuList',
            // name : 'name',
            }),
        ...mapState('auth', {
            // gToken : 'statusLog',
            id_usergroup : 'id_usergroup',
            }),
        currentPage() {
            return this.$route.path
        }
    },
    mounted(){
        // GET MENU FROM API
        // this.$store.dispatch('menus/getMenu',this.id_usergroup).then( (res) => {
        //     // console.log(res)
        // })

    }
};
</script>

<style scoped>

.nav-item:has(a:active) {
    background-color: rgba(25, 181, 254, 0.21);
}
.nav-item.active {
    background-color: rgba(25, 181, 254, 0.21);
}

.nav-item {
    transition: all ease 0.5s;
}

.nav-item:hover {
    background-color: rgba(25, 181, 254, 0.21);
}
</style>
