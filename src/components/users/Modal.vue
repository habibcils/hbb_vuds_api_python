<template>
    <transition name="modal">
    <div v-show="modal" class="modal fade show" role="dialog" aria-labelledby="exampleModalCenterLabel" style="display: block;padding-right: 17px;">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div  class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterLabel">{{title}} Data</h5>
                    <button type="button" @click="closeModal" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <form @submit.prevent="$emit('save', 'save aja')">
                <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label for="exampleInputUsername1">Username</label>
                                    <input v-model="data.username" type="text" class="form-control" placeholder="Username">
                                </div>
                                <div v-if="modeModal != 'edit'" class="form-group">
                                    <label for="exampleInputUsername1">Password</label>
                                    <input v-model="data.password" type="text" class="form-control" placeholder="Password">
                                </div>                                
                                <div class="form-group">
                                    <label for="exampleInputUsername1">Name</label>
                                    <input v-model="data.fullname" type="text" class="form-control" placeholder="Name">
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputUsername1">Email</label>
                                    <input v-model="data.email" type="text" class="form-control" placeholder="Email">
                                </div>
                                <div v-if="modeModal == 'edit' && data.groups[0]" class="form-group">
                                    <label for="exampleInputUsername1">Group</label>
                                    <input v-model="data.groups[0]" type="text" class="form-control" placeholder="Group">
                                </div>                            
                                <div v-else class="form-group">
                                    <label for="exampleInputUsername1">Group</label>
                                    <input v-model="data.groups" type="text" class="form-control" placeholder="Group">
                                </div>                                                
                                <!-- <div class="form-group">
                                    <label for="exampleInputUsername1">Group</label>
                                    <select class="form-control" v-model="data.groups" @change="$emit('ch_ug', UG_id)">
                                        <option value="admin">Admin</option>
                                        <option disabled value="">Please select one</option>
                                    </select>
                                </div>                                 -->
                                <!-- <div v-if="modeModal == 'add'" class="form-group">
                                    <label for="exampleInputUsername1">Group</label>
                                    <select class="form-control" v-model="UG_id" @change="$emit('ch_ug', UG_id)">
                                        <option disabled value="">Please select one</option>
                                        <option v-for="(item, index) in userGroup" :key="index" :value="item">{{item.usergroup_name}}</option>
                                    </select>
                                </div>
                                <div v-else class="form-group">
                                    <label for="exampleInputUsername1">Group</label>
                                    <select class="form-control" v-model="data.UG_id">
                                        <option disabled value="">Please select one</option>
                                        <option v-for="(item, index) in userGroup" :key="index" :value="item.id">{{item.usergroup_name}}</option>
                                    </select>
                                </div>                                 -->
                            </div>
                        </div>
                </div>
                <div class="modal-footer">
                    <button type="button" @click="closeModal" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button v-ripple type="submit" class="btn btn-primary mr-2"><i class="ik ik-save"></i> Save changes</button>
                </div>
                </form>
            </div>
        </div>
    </div>       
    </transition>
</template>
<script>
// import {FadeTransition} from 'vue2-transitions'

    export default {
        components: {
            // FadeTransition
        },
        data(){
            return{
                UG_id: [],
                chosedUserGroup: ''
            }
        },
        props: ['modal', 'closeModal', 'saveModal', 'data', 'modeModal', 'userGroup', 'title']
    }
</script>

<style scoped>

</style>