<template>
    <div>
        <div class="page-header">
            <div class="row align-items-end">
                <div class="col-lg-8">
                    <div class="page-header-title">
                        <i class="ik ik-users bg-blue"></i>
                        <div class="d-inline">
                            <h5>Profile</h5>
                            <span>Your profile</span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <nav class="breadcrumb-container" aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="/"><i class="ik ik-home"></i></a>
                            </li>
                            <li class="breadcrumb-item">
                                <a href="#">System</a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Profile</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>


        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header"><h3>Profile </h3></div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-2">
                                <img :src="profile" alt="" width="100%">
                            </div>
                            <div class="col-sm-6">
                                <div class="row">
                                    <label for="" class="form-group col-md-2">Username</label>
                                    <label for="" class="form-group col-md-3">: {{ username }}</label>
                                </div>
                                <div class="row">
                                    <label for="" class="form-group col-md-2">Fullname</label>
                                    <label for="" class="form-group col-md-3">: {{ fullname }}</label>
                                </div>
                                <div class="row">
                                    <label for="" class="form-group col-md-2">Email</label>
                                    <label for="" class="form-group col-md-3">: {{ email }}</label>
                                </div>
                                <div class="row">
                                    <label for="" class="form-group col-md-2">Groups</label>
                                    <label for="" class="form-group col-md-3">: {{ groups }}</label>
                                </div>
                            </div>
                        </div>                                            
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
const profile = require('@/assets/svg-loaders/profile.svg')

import { createNamespacedHelpers, mapState, mapGetters } from 'vuex'

export default {
    name: 'Profile',
	components:{
		// Layout
    },
    mounted(){

    },
    computed: {
        ...mapState('auth', {
            username : 'username',
            fullname : 'fullname',
            email : 'email',
            groups : 'groups',
            // name : 'name',
            }),
    },
	// name: "Index",
	data() {
		return {
            profile: profile
		};
	}
};
</script>