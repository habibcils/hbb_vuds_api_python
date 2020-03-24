<template>
    <div>

        <div class="page-header">
            <div class="row align-items-end">
                <div class="col-lg-8">
                    <div class="page-header-title">
                        <i class="ik ik-plus-square bg-blue"></i>
                        <div class="d-inline">
                            <h5 class="text-blues">Add Document</h5>
                            <span class="text-blues">Create a new Document</span>
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
                                <a href="#">Document</a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Add Document</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header text-blues"><h3>Add Document</h3></div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <form class="row col-md-6">
                                   <div class="group col-md-12 material">
                                        <input type="number" required="required"/><span class="highlight"></span><span class="bar"></span>
                                        <label>Document File Id</label>
                                    </div>
                                    <div class="group col-md-12 material">
                                        <input type="text" required="required"/><span class="highlight"></span><span class="bar"></span>
                                        <label>Document Number</label>
                                    </div>                                                   
                                    <div class="group col-md-12 material">
                                        <input type="text" required="required"/><span class="highlight"></span><span class="bar"></span>
                                        <label>Document Title</label>
                                    </div>
                                    <div class="group col-md-12">
                                        <h4 class="sub-title">Category</h4>
                                        <div class="form-radio">
                                            <div class="radio radio-inline">
                                                <label>
                                                    <input type="radio" name="category" checked>
                                                    <i class="helper"></i>In 
                                                </label>
                                            </div>
                                            <div class="radio radio-inline">
                                                <label>
                                                    <input type="radio" name="category">
                                                    <i class="helper"></i>Out 
                                                </label>
                                            </div>                      
                                        </div>
                                    </div>                                     
                                    <div class="group col-md-12 material">
                                        <textarea type="textarea" rows="5" required="required"></textarea><span class="highlight"></span><span class="bar"></span>
                                        <label>Form 1</label>
                                    </div>                                    
                                    <div class="group col-md-12 material">
                                        <textarea type="textarea" rows="5" required="required"></textarea><span class="highlight"></span><span class="bar"></span>
                                        <label>Form 2</label>
                                    </div> 
                                    <div class="group col-md-12">
                                        <h4 class="sub-title">Classification</h4>
                                        <div class="form-radio">
                                            <div class="radio radio-inline">
                                                <label>
                                                    <input type="radio" name="class" checked="true">
                                                    <i class="helper"></i>Biasa 
                                                </label>
                                            </div>
                                            <div class="radio radio-inline">
                                                <label>
                                                    <input type="radio" name="class">
                                                    <i class="helper"></i>Rahasia 
                                                </label>
                                            </div>                                            
                                            <div class="radio radio-inline">
                                                <label>
                                                    <input type="radio" name="class">
                                                    <i class="helper"></i>Sangat Rahasia
                                                </label>
                                            </div>                          
                                        </div>
                                    </div>
                                   


                                    <div class="group col-md-12">
                                        <h4 class="sub-title">Upload Document</h4>

    <div class="upload">
      <ul>
        <li v-for="(file, index) in files" :key="file.id">
          <span>{{file.name}}</span> -
          <span>{{file.size | formatSize}}</span> -
          <span v-if="file.error">{{file.error}}</span>
          <span v-else-if="file.success">success</span>
          <span v-else-if="file.active">active</span>
          <span v-else-if="file.active">active</span>
          <span v-else></span>
        </li>
      </ul>
      <div class="example-btn">                                              
        <file-upload
          class="btn btn-primary"
          post-action="/upload/post"
          extensions="gif,jpg,jpeg,png,webp"
          accept="image/png,image/gif,image/jpeg,image/webp"
          :multiple="true"
          :size="1024 * 1024 * 10"
          v-model="files"
          @input-filter="inputFilter"
          @input-file="inputFile"
          ref="upload">
          <i class="ik ik-upload-cloud"></i>
          Select files
        </file-upload>
      </div>        
      </div>        
                                        
                                    </div>
                                    <div class="group col-md-12 material">
                                        <textarea type="textarea" rows="5" required="required"></textarea><span class="highlight"></span><span class="bar"></span>
                                        <label>Deksripsi</label>
                                    </div>
                                                                            
                                    <div class="form-group col-md-12">
                                        <button v-ripple type="submit" class="btn btn-primary mr-2"><i class="ik ik-save"></i> Save data</button>
                                    </div>

                                </form>
                            </div>
                        </div>                                              
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FileUpload from 'vue-upload-component'
import {FadeTransition} from 'vue2-transitions'
import qs from 'qs'
import {apiBase} from "@/helpers"
export default {
    created() {
        // this.getDatatable()
        // this.getUserGroup()
    },
    components:{
        FileUpload,            

    },
    data() {
        return {
            prefixApi: '/user',
            files: [],
        }
    },
    methods: {
        inputFilter(newFile, oldFile, prevent) {
        if (newFile && !oldFile) {
            // Before adding a file
            // 添加文件前
            // Filter system files or hide files
            // 过滤系统文件 和隐藏文件
            if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
            return prevent()
            }
            // Filter php html js file
            // 过滤 php html js 文件
            if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
            return prevent()
            }
        }
        },
        inputFile(newFile, oldFile) {
        if (newFile && !oldFile) {
            // add
            console.log('add', newFile)
        }
        if (newFile && oldFile) {
            // update
            console.log('update', newFile)
        }
        if (!newFile && oldFile) {
            // remove
            console.log('remove', oldFile)
        }
        }        
    }
};
</script>

<style scoped>
.group {
  position: relative;
  margin: 10px 0 25px 0;
}

.material > textarea {
  resize: none;
  /* height: 90px; */
}

.material > input,
.material > textarea {
  background: none;
  color: #212121;
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #5da1e2;
}
.material > input:focus,
.material > textarea:focus {
  outline: none;
}
.material > input:focus ~ label, .material > input:valid ~ label,
.material > textarea:focus ~ label,
.material > textarea:valid ~ label {
  top: -14px;
  font-size: 12px;
  color: #2196F3;
}
.material > input:focus ~ .bar:before,
.material > textarea:focus ~ .bar:before {
  width: 100%;
}

.material > input[type="password"] {
  letter-spacing: 0.3em;
}

.material > label {
  color: #678fc7;
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  padding-left: 15px;
  pointer-events: none;
  left: 5px;
  top: 10px;
  -webkit-transition: 300ms ease all;
  transition: 300ms ease all;
}

.bar {
  position: relative;
  display: block;
  width: 100%;
}
.bar:before {
  content: '';
  height: 2px;
  width: 0;
  bottom: 0px;
  position: absolute;
  background: #2196F3;
  -webkit-transition: 300ms ease all;
  transition: 300ms ease all;
  left: 0%;
}

</style>
