<style scoped>

</style>
<template>
    <header class="header-top" header-theme="light">
        <div class="container-fluid">
            <div class="d-flex justify-content-between">
                <div class="top-menu d-flex align-items-center">
                    <button type="button" class="btn-icon mobile-nav-toggle d-lg-none"><span></span></button>
                    <div  class="header-search" :class="{'open' : dropSearch}">
                        <div class="input-group">
                            <span @click="hideSearch" class="input-group-addon search-close"><i class="ik ik-x"></i></span>
                            <input type="text" class="form-control" placeholder="Search documents">
                            <span @click="showSearch" class="input-group-addon search-btn"><i class="ik ik-search"></i></span>
                        </div>
                    </div>
                    <button type="button" id="navbar-fullscreen" class="nav-link"><i class="ik ik-maximize"></i></button>
                </div>
                <div class="top-menu d-flex align-items-center">
                    <div class="dropdown" >
                        <a class="nav-link dropdown-toggle" @click="showNotif" ref="showNotif" id="notiDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="ik ik-bell"></i><span class="badge bg-danger">3</span></a>
                        <div class="dropdown-menu-notif dropdown-menu dropdown-menu-right notification-dropdown" :class="{'show': dropNotif}" aria-labelledby="notiDropdown">
                            <h4 class="header">Notifications</h4>
                            <div class="notifications-wrap">
                                <a v-ripple href="#" class="media">
                                    <span class="d-flex">
                                        <i class="ik ik-check"></i> 
                                    </span>
                                    <span class="media-body">
                                        <span class="heading-font-family media-heading">Invitation accepted</span> 
                                        <span class="media-content">Your have been Invited ...</span>
                                    </span>
                                </a>
                                <a v-ripple href="#" class="media">
                                    <span class="d-flex">
                                        <img src="img/users/1.jpg" class="rounded-circle" alt="">
                                    </span>
                                    <span class="media-body">
                                        <span class="heading-font-family media-heading">Steve Smith</span> 
                                        <span class="media-content">I slowly updated projects</span>
                                    </span>
                                </a>
                                <a v-ripple href="#" class="media">
                                    <span class="d-flex">
                                        <i class="ik ik-calendar"></i> 
                                    </span>
                                    <span class="media-body">
                                        <span class="heading-font-family media-heading">To Do</span> 
                                        <span class="media-content">Meeting with Nathan on Friday 8 AM ...</span>
                                    </span>
                                </a>
                            </div>
                            <div class="footer"><a href="javascript:void(0);">See all activity</a></div>
                        </div>
                    </div>
                    <button type="button" class="nav-link ml-10 right-sidebar-toggle"><i class="ik ik-message-square"></i><span class="badge bg-success">3</span></button>
                    <div class="dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="menuDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="ik ik-plus"></i></a>
                        <div class="dropdown-menu dropdown-menu-right menu-grid" aria-labelledby="menuDropdown">
                            <a class="dropdown-item" href="#" data-toggle="tooltip" data-placement="top" title="Dashboard"><i class="ik ik-bar-chart-2"></i></a>
                            <a class="dropdown-item" href="#" data-toggle="tooltip" data-placement="top" title="Message"><i class="ik ik-mail"></i></a>
                            <a class="dropdown-item" href="#" data-toggle="tooltip" data-placement="top" title="Accounts"><i class="ik ik-users"></i></a>
                            <a class="dropdown-item" href="#" data-toggle="tooltip" data-placement="top" title="Sales"><i class="ik ik-shopping-cart"></i></a>
                            <a class="dropdown-item" href="#" data-toggle="tooltip" data-placement="top" title="Purchase"><i class="ik ik-briefcase"></i></a>
                            <a class="dropdown-item" href="#" data-toggle="tooltip" data-placement="top" title="Pages"><i class="ik ik-clipboard"></i></a>
                            <a class="dropdown-item" href="#" data-toggle="tooltip" data-placement="top" title="Chats"><i class="ik ik-message-square"></i></a>
                            <a class="dropdown-item" href="#" data-toggle="tooltip" data-placement="top" title="Contacts"><i class="ik ik-map-pin"></i></a>
                            <a class="dropdown-item" href="#" data-toggle="tooltip" data-placement="top" title="Blocks"><i class="ik ik-inbox"></i></a>
                            <a class="dropdown-item" href="#" data-toggle="tooltip" data-placement="top" title="Events"><i class="ik ik-calendar"></i></a>
                            <a class="dropdown-item" href="#" data-toggle="tooltip" data-placement="top" title="Notifications"><i class="ik ik-bell"></i></a>
                            <a class="dropdown-item" href="#" data-toggle="tooltip" data-placement="top" title="More"><i class="ik ik-more-horizontal"></i></a>
                        </div>
                    </div>
                    <button type="button" class="nav-link ml-10" id="apps_modal_btn" data-toggle="modal" data-target="#appsModal"><i class="ik ik-grid"></i></button>
                    <div class="dropdown" :class="{'show': dropProfile}">
                        <a class="dropdown-toggle" @click="showDropOut" ref="myBtn" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img class="avatar" :src="profile" alt=""></a>
                        <div class="dropdown-menu dropdown-menu-right" :class="{'show': dropProfile}" aria-labelledby="userDropdown">
                            <router-link :to="{path:'/profile'}" v-slot="{ href, route, navigate }" >
                                <a :href="href" @click="navigate" class="dropdown-item"><i class="ik ik-user  dropdown-icon"></i><span>Profile </span></a>
                            </router-link>
                            <a class="dropdown-item" href="#"><i class="ik ik-settings dropdown-icon"></i> Settings</a>
                            <a class="dropdown-item" href="#"><span class="float-right"><span class="badge badge-primary">6</span></span><i class="ik ik-mail dropdown-icon"></i> Inbox</a>
                            <a class="dropdown-item" href="#"><i class="ik ik-navigation dropdown-icon"></i> Message</a>
                            <a class="dropdown-item" href="#" @click.prevent.stop="logout()" ><i class="ik ik-power dropdown-icon"></i> Logout</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </header >
</template>

<script>
const profile = require('@/assets/svg-loaders/profile.svg')
export default {
    data() {
        return{
            dropProfile : false,
            dropMessage : false,
            dropNotif : false,
            dropSearch : false,
            sLogout : false,
            profile: profile
        }
    },
    methods: {
        async logout(){
            let self = this        
            await this.$vueConfirm.confirm({
                auth: false,
                message: `Are you sure?`,
                button: {
                    no: 'No',
                    yes: 'Yes'
                }},
                function(confirm, doLogout) {
                    if (confirm == true) {
                        self.sLogout = true
                        self.$vueConfirm.close()
                        return true
                    }
                }
            )
            if(this.sLogout == true){
                this.doLogout()
            }
        },
        doLogout(){
            this.$store.dispatch('auth/logout').then(res => {
                // console.log(res)
            })               
        },        
        showDropOut(e){
            this.dropProfile = (this.dropProfile) ? false : true;
        },
        showSearch(e){
            this.dropSearch = true;
        },     
        hideSearch(){
            this.dropSearch = false;
        },
        showNotif(e){
                console.log('tiff')

            this.dropNotif = (this.dropNotif) ? false : true;
        },
        close(e){
            if (!this.$refs.myBtn.contains(e.target)){
                // console.log(e.target)
                this.dropProfile = false
                // this.dropNotif = false
            }
            if (!this.$refs.showNotif.contains(e.target)){
                this.dropNotif = false
            }            
        }
  },
  created() {
    window.addEventListener('click', this.close)
  },

  beforeDestroy() {
    window.removeEventListener('click', this.close)
  },  
}
</script>

