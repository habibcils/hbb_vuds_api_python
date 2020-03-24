<template>
    <div>

        <div class="page-header">
            <div class="row align-items-end">
                <div class="col-lg-8">
                    <div class="page-header-title">
                        <i class="ik ik-users bg-blue"></i>
                        <div class="d-inline">
                            <h5>Data Document In</h5>
                            <span>List all Document on this application</span>
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
                            <li class="breadcrumb-item active" aria-current="page">Data Document In</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="card">

                    <div class="card-header"><h3>Data Document In</h3></div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="d-flex">
                                    <button v-ripple class="btn btn-success mrg-btm-10" @click="showModal('', 'add')"><i class="ik ik-plus"></i> Add Document</button>
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
                                <tr v-for="project in projects" :key="project.user_id">
                                    <td>{{project.user_id}}</td>
                                    <td>{{project.username}}</td>
                                    <td>{{project.fullname}}</td>
                                    <td>{{project.email}}</td>
                                    <td>{{project.groups[0]}}</td>
                                    <td> 
                                        <span class="cursor mrg-r-10" @click="showModal(project.username, 'edit')"> <i  class="ik ik-edit f-16 text-green"></i></span>
                                        <span class="cursor " @click="confirmDel(project.user_id)"> <i  class="ik ik-trash f-16 text-green"></i></span> 
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
        <Modal :modal="modal" :UG_id="UG_id" @ch_ug="ch_ug($event)" :closeModal="closeModal" :data="dataModal" @save="saveModal" :modeModal="modeModal" :userGroup="userGroup" :title="titleModal"/>
    </div>
</template>

<script>
import Datatable from '@/components/datatable/Datatable.vue'
import Pagination from '@/components/datatable/Pagination.vue'
import Modal from '@/components/users/Modal.vue'
import {FadeTransition} from 'vue2-transitions'
import qs from 'qs'
import {apiBase} from "@/helpers"
export default {
    components: { Datatable, Pagination, Modal, FadeTransition },
    created() {
        this.getDatatable()
        // this.getUserGroup()
    },
    data() {
        let sortOrders = {};

        let columns = [
            {width: '5%', label: '#', name: 'user_id' },
            {width: '25%', label: 'Username', name: 'username' },
            {width: '25%', label: 'Name', name: 'fullname'},
            {width: '25%', label: 'Email', name: 'email'},
            {width: '10%', label: 'Group', name: 'groups'},
            {width: '12%', label: 'Action', name: 'action'}
        ];

        columns.forEach((column) => {
           sortOrders[column.name] = -1;
        });
        return {
            prefixApi: '/user',
            dataModal: [],
            UG_id: [],
            titleModal: '',
            userGroup: [],
            modeModal: null,
            modal : false,
            addModal: false,
            projects: [],
            columns: columns,
            sortKey: columns[0].name,
            sortOrders: sortOrders,
            perPage: [5, 10, 15],
            tableData: {
                draw: 0,
                length: 5,
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
        ch_ug(val){
            this.UG_id = val
        },
        showModal(key, mode){
            if(mode == 'add'){
                this.dataModal = []
                this.modal = true
                this.titleModal = 'Add'
                this.modeModal = 'add'
            }else{
                this.modeModal = 'edit'
                this.titleModal = 'Edit'
                let token = localStorage.getItem('token')
                let headers = {
                    'Authorization': 'Bearer '+token
                }
                apiBase
                .get('user?username='+key+'&order_by=user_id&order_type=asc&limit=10&offset='+this.tableData.offset, {headers: headers})
                    .then(response => {
                        let data = response.data.result[0];
                        console.log(data)
                        this.modal = true
                        this.dataModal = data
                    })
                    .catch(errors => {
                        // console.log(errors);
                    });
            }
        },
        async confirmDel(key){
            // console.log('shoow')
            let conf = await this.$dialog.confirm('Delete Data ?').then(function(dialog) {
                    return true;
                }).catch(function(e) {
                    
                });
            if (conf)
                this.deleteUser(key)
        },
        deleteUser(key){
            let token = localStorage.getItem('token')
            let headers = {
                'Authorization': 'Bearer '+token
            }
            apiBase.delete(this.prefixApi+'/'+this.dataModal.user_id, {headers : headers})
                .then(response => {
                    this.$toasted.success('Successfully Deleted').goAway(2000)         
                    this.getDatatable()
                })
                .catch(errors => {
                    // console.log(errors);
                });
        },
        saveModal(){
            let token = localStorage.getItem('token')
            let headers = {
                'Authorization': 'Bearer '+token
            }
            if(this.modeModal == 'add'){
                let dat = qs.stringify({
                    username: this.dataModal.username,
                    password: this.dataModal.password,
                    fullname: this.dataModal.fullname,
                    email: this.dataModal.email,
                    groups: this.dataModal.groups,
                })
                console.log(dat)

                apiBase.post(this.prefixApi, dat, {headers : headers})
                .then(response => {
                    console.log(response)
                    this.modal = false
                    this.getDatatable()
                    this.$toasted.success('Successfully Added').goAway(2000)         
                })
                .catch(errors => {
                    this.$toasted.info('Failed update, please check inputs').goAway(2000)
                    // console.log('errror '+errors);
                });
            }else{
                let dat = qs.stringify({
                    username: this.dataModal.username,
                    password: this.dataModal.password,
                    fullname: this.dataModal.fullname,
                    email: this.dataModal.email,
                    groups: this.dataModal.groups[0],
                })

                apiBase.put(this.prefixApi+'/'+this.dataModal.user_id, dat, {headers : headers})
                .then(response => {
                    this.modal = false
                    this.getDatatable()
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
                console.log('nextt')
            if( (this.tableData.offset + this.tableData.length) >= this.pagination.total){
                console.log('nextt ga ada')

            }else{

                this.tableData.offset = this.tableData.offset + this.tableData.length
                this.getDatatable()
            }
        },
        prevPage(){
            console.log('pre')
            if(this.tableData.offset <= 0){
                this.tableData.offset == 0;
            }else{
                console.log('pre success')
                this.tableData.offset = (this.tableData.offset - this.tableData.length)
            }
            this.getDatatable()
        },
        getUserGroup(){
            apiBase.get('/usergroup')
                .then(response => {
                    this.userGroup = response.data.data;
                    let first = this.userGroup[0]
                    console.log(this.userGroup)
                    this.UG_id.push(first)
                    console.log(this.UG_id)

                })
                .catch(errors => {
                    // console.log(errors);
                });
        },    
        getDatatable() {
            let token = localStorage.getItem('token')
            let headers = {
                'Authorization': 'Bearer '+token
            }
            let key = this.sortKey
            let sort = 'asc'
            if(this.sortOrders[key] == 1){
                sort = 'asc'
            }else if (this.sortOrders[key] == -1){
                sort = 'desc'
            }
            console.log(this.sortOrders[key])


            this.tableData.draw++;
            apiBase.get(this.prefixApi+'?is_active=true&search='+this.tableData.search+'&order_by='+this.sortKey+'&order_type='+sort+'&limit='+this.tableData.length+'&offset='+this.tableData.offset, {headers: headers})
                .then(response => {
                    console.log(response)
                    if(this.tableData.length < 0 ){
                        this.tableData.length = 0;
                    }
                    let data = response.data;
                    // if (this.tableData.draw == data.draw) {
                        this.configPagination(data);
                        this.projects = data.result;
                    // }
                })
                .catch(errors => {
                    // console.log(errors);
                });
        },
        configPagination(data) {
            this.pagination.total = data.total_count;

            if( (this.tableData.offset + this.tableData.length) >= this.pagination.total){
                this.pagination.nextPageUrl = 0;
            }else{
                this.pagination.nextPageUrl = 1;
            }

            if(this.tableData.offset <= 0){
                this.pagination.prevPageUrl = 0;
            }else{
                this.pagination.prevPageUrl = 1;
            }

            if(this.tableData.offset == 0){
                this.pagination.from = 1
            }else{
                this.pagination.from = this.tableData.offset + 1 
            }

            if(this.pagination.from == this.pagination.total){
                this.pagination.to = this.pagination.total;
            }else if(this.pagination.length > this.pagination.total){
                this.pagination.to = this.pagination.total;
            }else{
                this.pagination.to = this.tableData.offset + this.tableData.length;
                if(this.pagination.to > this.pagination.total){
                    this.pagination.to = this.pagination.total;
                }
            }

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
