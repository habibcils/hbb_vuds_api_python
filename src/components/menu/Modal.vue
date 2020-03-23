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
                                    <label for="exampleInputUsername1">Name</label>
                                    <input v-model="data.name" type="text" class="form-control" placeholder="Menu Name">
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputUsername1">Target</label>
                                    <input v-model="data.target" type="text" class="form-control" placeholder="Url">
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputUsername1">Parent</label>
                                    <select class="form-control" v-model="data.id_parent">
                                        <!-- <option value="">Please select one</option> -->
                                        <option value="0">Being Parent Menu</option>
                                        <option v-for="(item, index) in dataParent" :key="index" :value="item.id">{{item.name}}</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputUsername1">Icon</label>
                                    <span class="ik icon-example" :class="data.icon"></span>
                                    <select class="form-control" v-model="data.icon">
                                        <option disabled value="">Please select one</option>
                                        <option v-for="(item, index) in dataIcon" :key="index" :value="item.content">{{item.content}}</option>
                                    </select>
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
// import {FadeTransition} from 'vue2-transitions'

    export default {
        components: {
            // FadeTransition
        },
        data(){
            return{
                chosedUserGroup: ''
            }
        },
        props: ['modal', 'dataIcon', 'closeModal',  'dataParent', 'saveModal', 'data', 'modeModal', 'userGroup', 'title']
    }
</script>

<style scoped>

</style>