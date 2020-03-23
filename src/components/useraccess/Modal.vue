<template>
    <transition name="modal">
    <div v-show="modal" class="modal fade show" role="dialog" aria-labelledby="exampleModalCenterLabel" style="display: block;padding-right: 17px;">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div  class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterLabel">{{headTitle}} Data</h5>
                    <button type="button" @click="closeModal" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>
                <form @submit.prevent="$emit('save', data[0])">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="row mrg-b-10">
                                <label class="col-md-3 control-label text-primary" for=""><strong>Group Name</strong></label>
                                <select v-if="modeModal == 'add'" @change="$emit('getGroup', selectData)" v-model="selectData" class="col-md-8 form-control">
                                    <!-- <option value="0">select Group</option> -->
                                    <option v-for="data in dataGroupFree" :key="data.id" :value="data.id">{{data.usergroup_name}}</option>
                                </select>
                                <label v-else class="col-md-9 control-label text-primary" for=""><strong>: {{titleContent}}</strong></label>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <hr class="mrg-t-0">
                                </div>
                            </div>
                            <div class="form-group row" id="px-system-useraccess-form-useraccess-grant">
                                <label class="col-md-3 col-xs-3 control-label text-success"><strong>Grant</strong></label>
                                <div class="col-md-9 col-xs-9">
                                    <div class="row">
                                        <div class="col-md-3 col-xs-3">                                                                                                                                       
                                            <label class="check"><input type="checkbox" @click="$emit('changeRead', 'read')" class="px-system-useraccess-form-useraccess-grant-check" data-grant="read"/> Read</label>
                                        </div>
                                        <div class="col-md-3 col-xs-3">                                                                                                                                      
                                            <label class="check"><input type="checkbox" @click="$emit('changeRead', 'create')" class="px-system-useraccess-form-useraccess-grant-check" data-grant="create"/> Create</label>
                                        </div>
                                        <div class="col-md-3 col-xs-3">                                                                                                                                     
                                            <label class="check"><input type="checkbox" @click="$emit('changeRead', 'update')" class="px-system-useraccess-form-useraccess-grant-check" data-grant="update"/> Update</label>
                                        </div>
                                        <div class="col-md-3 col-xs-3">                                                                                                                                     
                                            <label class="check"><input type="checkbox" @click="$emit('changeRead', 'delete')" class="px-system-useraccess-form-useraccess-grant-check" data-grant="delete"/> Delete</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="row">
                                        <label class="col-md-12 col-xs-12 control-label" v-for="(dat,key) in dataModalRow1" :key="key">
                                            <strong v-if="dat.id_parent == 0">{{dat.name}}</strong>
                                            <span v-else>{{dat.name}}</span>
                                        </label>
                                    </div>
                                </div>
                                <span class="col-md-9">
                                    <div class="row">
                                        <div  v-for="(dat,key) in dataModalRow2" :key="key" class="col-md-3 col-xs-3">
                                            <label class="check tt-cap"><input type="checkbox" @change="$emit('updateData', data[0])" v-model="data[0]" :value="dat" class="act_create" /> {{dat.type}}</label>
                                        </div>
                                    </div>
                                </span>
                            </div>
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
    export default {
        data(){
            return{
                // cata : [],
                selectData: null,
                read: false
            }
        },
        // methods: {
        //     previousList:function(item, key){
        //         if(key > 0){
        //             key = key - 1;
        //         }
        //         console.log(item[key].id)
        //         return item[key].id
        //     }            
        // },
        props: ['data', 'dataGroupFree', 'modal', 'closeModal', 'saveModal', 'dataModalRow1', 'dataModalRow2', 'modeModal', 'userGroup', 'headTitle', 'titleContent']
    }
</script>

<style scoped>

</style>