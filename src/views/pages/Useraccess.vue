<template>
    <div>

        <div class="page-header">
            <div class="row align-items-end">
                <div class="col-lg-8">
                    <div class="page-header-title">
                        <i class="ik ik-users bg-blue"></i>
                        <div class="d-inline">
                            <h5>Data Users Access</h5>
                            <span>List all users on this application</span>
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
                            <li class="breadcrumb-item active" aria-current="page">Data Users Access</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="card">

                    <div class="card-header"><h3>Data User Access</h3></div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="d-flex">
                                    <button v-ripple class="btn btn-success mrg-btm-10" @click="showModal('', 'add', 'add')"><i class="ik ik-plus"></i> Add Useraccess</button>
                                </div>
                            </div>
                        </div>
                        <div class="tableFilters">
                            <div class="col-sm-3" style="padding-right:0">
                            <input class="form-control" type="text" v-model="tableData.search" placeholder="Search Table"
                                @input="getDatatable()">
                            </div>
                            <div class="control">
                                <div class="select">
                                    <select class="form-control" v-model="tableData.length" @change="getDatatable(),changeRecord()">
                                        <option v-for="(records, index) in perPage" :key="index" :value="records">{{records}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>                        
                        <datatable :columns="columns" :sortKey="sortKey" :sortOrders="sortOrders" @sort="sortBy">
                            <tbody>
                                <tr v-for="project in projects" :key="project.id">
                                    <td>{{project.id}}</td>
                                    <td>{{project.grup_name}}</td>
                                    <td> 
                                        <span class="cursor mrg-r-10" @click="showModal(project.id_usergroup, project.grup_name, 'edit')"> <i  class="ik ik-edit f-16 text-green"></i></span>
                                        <span class="cursor" @click="confirmDel(project.id)"> <i  class="ik ik-trash f-16 text-green"></i></span> 
                                    </td>
                                </tr>
                            </tbody>
                        </datatable>
                        <pagination :pagination="pagination"
                                    @prev="prevPage()"
                                    @next="nextPage()">
                        </pagination>                                                
                    </div>
                </div>
            </div>
        </div>
        <Modal :data="[getDataEdited]" :dataGroupFree="dataGroupFree" @getGroup="getGroup($event)" @updateData="updateData($event)" @changeRead="changeRead($event)" :modal="modal" :closeModal="closeModal" :dataModalRow1="dataModalRow1" :dataModalRow2="dataModalRow2" @save="saveModal($event)" :modeModal="modeModal" :userGroup="userGroup" :headTitle="headTitle" :titleContent="titleContent"/>
        <!-- <button @click="test()">klik</button> -->
    </div>
</template>

<script>
import Datatable from '@/components/datatable/Datatable.vue'
import Pagination from '@/components/datatable/Pagination.vue'
import Modal from '@/components/useraccess/Modal.vue'
import {FadeTransition} from 'vue2-transitions'
import {apiBase} from "@/helpers"
export default {
    components: { Datatable, Pagination, Modal, FadeTransition },
    created() {
        this.getDatatable()
        this.getUserGroup()
    },
    data() {
        let sortOrders = {};

        let columns = [
            {width: '5%', label: 'Id', name: 'id' },
            {width: '80%', label: 'Usergroup Name', name: 'name'},
            {width: '12%', label: 'Action', name: 'action'}
        ];

        columns.forEach((column) => {
           sortOrders[column.name] = -1;
        });
        return {
            selectDataGroup: null,
            prefixApi: '/useraccess',
            dataModalRow1: [],
            dataModalRow2: [],
            getData: [],
            getDataEdited: [],
            dataGroupFree: [],
            read : false,
            create : false,
            update : false,
            delete : false,
            userGroup: [],
            idUserGroup: 0,
            titleContent: '',
            headTitle: '',
            modeModal: null,       
            modal : false,
            addModal: false,
            projects: [],
            columns: columns,
            sortKey: 'id',
            sortOrders: sortOrders,
            perPage: [10, 15, 20],
            tableData: {
                draw: 0,
                length: 10,
                search: '',
                column: 0,
                dir: 'desc',
                offset: 0
            },
            pagination: {
                lastPage: '',
                currentPage: '',
                total: '',
                lastPageUrl: '',
                nextPageUrl: '',
                prevPageUrl: '',
                from: '',
                to: ''
            },
        }
    },
    methods: {
        getGroup(val){
            this.selectDataGroup = val
        },
        changeRead(mode){
            console.log(mode)
            if(mode == 'read'){
                if(this.read == false){
                    this.read = true
                    let add = this.dataModalRow2.filter(function(el) { return el.type == mode; })
                    // console.log(add)
                    let without = this.getDataEdited.filter(function(el) { return el.type != mode; })
                    this.getDataEdited = without
                    this.getDataEdited.push(...add)
                }else{
                    this.read = false
                    this.getDataEdited = this.getDataEdited.filter(function(el) { return el.type != mode; }); 
                }
            }else if(mode == 'create'){
                if(this.create == false){
                    this.create = true
                    let add = this.dataModalRow2.filter(function(el) { return el.type == mode; })
                    // console.log(add)
                    let without = this.getDataEdited.filter(function(el) { return el.type != mode; })
                    this.getDataEdited = without
                    this.getDataEdited.push(...add)
                }else{
                    this.create = false
                    this.getDataEdited = this.getDataEdited.filter(function(el) { return el.type != mode; }); 
                }
            }else if(mode == 'update'){
                if(this.update == false){
                    this.update = true
                    let add = this.dataModalRow2.filter(function(el) { return el.type == mode; })
                    // console.log(add)
                    let without = this.getDataEdited.filter(function(el) { return el.type != mode; })
                    this.getDataEdited = without
                    this.getDataEdited.push(...add)
                }else{
                    this.update = false
                    this.getDataEdited = this.getDataEdited.filter(function(el) { return el.type != mode; }); 
                }
            }else if(mode == 'delete'){
                if(this.delete == false){
                    this.delete = true
                    let add = this.dataModalRow2.filter(function(el) { return el.type == mode; })
                    // console.log(add)
                    let without = this.getDataEdited.filter(function(el) { return el.type != mode; })
                    this.getDataEdited = without
                    this.getDataEdited.push(...add)
                }else{
                    this.delete = false
                    this.getDataEdited = this.getDataEdited.filter(function(el) { return el.type != mode; }); 
                }
            }              
        },        
        updateData(val){
            console.log('updateData')
            this.getDataEdited = val
        },
        async showModal(key, title, mode){
            if(mode == 'add'){
                this.dataModal = []
                this.modal = true
                this.headTitle = 'Add'
                this.modeModal = 'add'
                apiBase.get(this.prefixApi, {params: {"id":key}})
                    .then(response => {
                        let data = response.data;
                        this.modal = true
                        console.log(data)
                        this.idUserGroup = key
                        // this.read = false
                        // this.create = false
                        // this.update = false
                        // this.delete = false
                        this.getData = []
                        this.getDataEdited = []
                        this.dataModalRow1 = data.row1
                        this.dataModalRow2 = data.row2
                    })
                    .catch(errors => {
                        // console.log(errors);
                    });  
                    
                apiBase.get(this.prefixApi+'/grup')
                    .then(response => {
                        let data = response.data;
                        this.dataGroupFree = data.data
                        console.log(data)
                    })
                    .catch(errors => {
                        // console.log(errors);
                    });                      
                    
            }else{
                this.modeModal = 'edit'
                this.headTitle = 'Edit'
                this.titleContent = title
                apiBase.get(this.prefixApi, {params: {"id":key}})
                    .then(response => {
                        let data = response.data;
                        this.modal = true
                        console.log(data)
                        this.idUserGroup = key
                        this.getData = data.data
                        this.getDataEdited = data.data
                        this.dataModalRow1 = data.row1
                        this.dataModalRow2 = data.row2
                    })
                    .catch(errors => {
                        // console.log(errors);
                    });
            }
        },
        async confirmDel(key){
            let conf = await this.$dialog.confirm('Delete Data ?').then(function(dialog) {
                    return true;
                }).catch(function(e) {
                    
                });
            if (conf)
                this.deleteUser(key)
        },
        deleteUser(key){
            apiBase.post(this.prefixApi+'/delete', { 'id': key }   )
                .then(response => {
                    this.$toasted.success('Successfully Deleted').goAway(2000)
                    this.getDatatable()
                })
                .catch(errors => {
                    // console.log(errors);
                });
        },
        saveModal(data){
            console.log('saveee')
            console.log(data)
            let plus = data.filter(d => !this.getData.includes(d))
            console.log(plus)
            console.log('-----------------------------')

            let min = this.getData.filter(d => !data.includes(d))
            console.log(min)
            console.log('++++++++++++++++++++++++++++++++++')

            if(this.modeModal == 'add'){
                if(plus.length > 0 && this.selectDataGroup){
                    apiBase.post(this.prefixApi, { payload : {'plus': plus, 'min' :min }, id_group: this.selectDataGroup })
                    .then(response => {
                        console.log(response)
                        this.modal = false
                        this.getDatatable()
                        this.$toasted.success('Successfully Added').goAway(2000)
                    })
                    .catch(errors => {
                        this.$toasted.info('Please fill form data before save').goAway(2000)
                        // console.log('errror '+errors);
                    })
                }else{
                    this.$toasted.info('Please fill form data before save').goAway(2000)
                }
            }else{
                
                apiBase.put(this.prefixApi, { payload : {'plus': plus, 'min' :min }, id_group: this.idUserGroup })
                .then(response => {
                    console.log(response)
                    this.modal = false
                    // this.getDatatable()
                    this.$toasted.success('Successfully Updated').goAway(2000)         
                })
                .catch(errors => {
                    this.$toasted.info('Please edit data before save').goAway(2000)
                    // console.log('errror '+errors);
                });
            }
        },
        closeModal(key){
            this.modal = false
        },
        changeRecord(){
            this.tableData.offset = 0
        },
        nextPage(){
            if( (this.tableData.offset + this.tableData.length) >= this.pagination.total){

            }else{
                this.tableData.offset = this.tableData.offset + this.tableData.length
                this.getDatatable()
            }

        },
        prevPage(){
            if(this.tableData.offset <= 0){
                this.tableData.offset == 0;
            }else{
                this.tableData.offset = (this.tableData.offset - this.tableData.length)
            }
            this.getDatatable()
        },
        getUserGroup(){
            apiBase.get(this.prefixApi)
                .then(response => {
                    this.userGroup = response.data.data;
                })
                .catch(errors => {
                    // console.log(errors);
                });
        },    
        getDatatable() {
            this.tableData.draw++;
            apiBase.get(this.prefixApi+'/datatable', {params: this.tableData})
                .then(response => {
                    if(this.tableData.length < 0 ){
                        this.tableData.length = 0;
                    }
                    let data = response.data;
                    if (this.tableData.draw == data.draw) {
                        this.configPagination(data);
                        this.projects = data.data;
                    }
                })
                .catch(errors => {
                    // console.log(errors);
                });
        },
        configPagination(data) {
            this.pagination.lastPage = data.last_page;
            this.pagination.currentPage = data.current_page;
            this.pagination.total = data.total;
            this.pagination.lastPageUrl = data.last_page_url;
            this.pagination.nextPageUrl = data.next_page_url;
            this.pagination.prevPageUrl = data.prev_page_url;
            this.pagination.from = data.count_data;
            this.pagination.to = data.count_data;
        },
        sortBy(key) {
            this.sortKey = key;
            this.sortOrders[key] = this.sortOrders[key] * -1;
            this.tableData.column = this.getIndex(this.columns, 'name', key);
            this.tableData.dir = this.sortOrders[key] === 1 ? 'asc' : 'desc';
            this.getDatatable();
            this.tableData.offset = 0
        },
        getIndex(array, key, value) {
            return array.findIndex(i => i[key] == value)
        },
    }
};
</script>
