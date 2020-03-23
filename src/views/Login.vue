<template>
    <div>
        <!-- <img class="wave" :src="wave"> -->
        <div class="container">
            <div class="img">
                <img :src="bg">
            </div>
            <div class="login-content">
                <form @submit.prevent @submit="login">
                    <img :src="avatar">
                    <h2 class="title">Welcome</h2>
                    <div class="input-div one">
                        <div class="i">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="div">
                            <h5>Username</h5>
                            <input ref="username" type="text" class="input" v-model="username" autocomplete="disabled">
                        </div>
                    </div>
                    <div class="input-div pass">
                        <div class="i"> 
                            <i class="fas fa-lock"></i>
                        </div>
                        <div class="div">
                            <h5>Password</h5>
                            <input ref="password" type="password" class="input" v-model="password" autocomplete="disabled">
                        </div>
                    </div>
                    <a href="#">Forgot Password?</a>
                    <button v-if="process" class="btn btn-loading">
                        ...proccessing  <img :src="oval" class="hgh-100pc">
                    </button>                    
                    <button v-else class="btn" type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
const avatar = require('@/assets/img/avatar.svg')
const wave = require('@/assets/img/wave.png')
const bg = require('@/assets/img/bg.svg')
const oval = require('@/assets/svg-loaders/oval.svg')
import { createNamespacedHelpers, mapState, mapGetters } from 'vuex'

    export default {
        name: "Login",
        data() {
            return {
                avatar : avatar,
                wave : wave,
                bg : bg,
                oval : oval,
                username: '',
                password: '',
                process: false
            }
        },
        mounted() {
            const inputs = document.querySelectorAll(".input");

            function addcl(){
                let parent = this.parentNode.parentNode;
                parent.classList.add("focus");
            }

            function remcl(){
                let parent = this.parentNode.parentNode;
                if(this.value == ""){
                    parent.classList.remove("focus");
                }
            }

            inputs.forEach(input => {
                input.addEventListener("focus", addcl);
                input.addEventListener("blur", remcl);
            });
            
        },
        methods: {
            login(){
                if(this.username == ''){
                    this.$nextTick(() => this.$refs.username.focus())
                }else if(this.password == ''){
                    this.$nextTick(() => this.$refs.password.focus())
                }else if(this.username != '' && this.password != '' ){
                    this.process = true
                    setTimeout(()=>{    
                        this.$store.dispatch('auth/login', {username:this.username, password:this.password}).then( (res) => {
                            console.log(res)
                            if(res == false){
                                this.$toasted.error('Failed, check your username/password').goAway(3000)
                            }else{
                                setTimeout(()=>{
                                    this.$toasted.success('Welcome').goAway(3000)
                                },800)
                            }
                            this.process = false
                        })
                    },500)
                }

            }
        },
    }
</script>

<style scoped>
.login-content .hgh-100pc{
    height: 80%;
}
button.btn-loading{
    text-transform: lowercase;
    line-height: 2.5rem;
    font-weight: 500;
}
*{
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}

body{
    font-family: 'Poppins', sans-serif;
    overflow: hidden;
}

.wave{
	position: fixed;
	bottom: 0;
	left: 0;
	height: 100%;
	z-index: -1;
}

.container{
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap :7rem;
    padding: 0 2rem;
}

.img{
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

.login-content{
	display: flex;
	justify-content: flex-start;
	align-items: center;
	text-align: center;
}

.img img{
	width: 500px;
}

form{
	width: 360px;
}

.login-content img{
    height: 100px;
}

.login-content h2{
	margin: 15px 0;
	color: #333;
	text-transform: uppercase;
    font-size: 2.3rem;
    font-weight: 900;
}

.login-content .input-div{
	position: relative;
    display: grid;
    grid-template-columns: 7% 93%;
    margin: 25px 0;
    padding: 5px 0;
    border-bottom: 2px solid #d9d9d9;
}

.login-content .input-div.one{
	margin-top: 0;
}

.i{
	color: #d9d9d9;
	display: flex;
	justify-content: center;
	align-items: center;
}

.i i{
	transition: .3s;
}

.input-div > div{
    position: relative;
	height: 45px;
}

.input-div > div > h5{
	position: absolute;
	left: 10px;
	top: 50%;
	transform: translateY(-50%);
	color: #999;
	font-size: 18px;
	transition: .3s;
}

.input-div:before, .input-div:after{
	content: '';
	position: absolute;
	bottom: -2px;
	width: 0%;
	height: 2px;
	/* background-color: #38d39f; */
	background-color: #1ebaf0;
	transition: .4s;
}

.input-div:before{
	right: 50%;
}

.input-div:after{
	left: 50%;
}

.input-div.focus:before, .input-div.focus:after{
	width: 50%;
}

.input-div.focus > div > h5{
	top: -5px;
	font-size: 15px;
}

.input-div.focus > .i > i{
	color: #38d39f;
}

.input-div > div > input{
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	border: none;
	outline: none;
	background: none;
	padding: 0.5rem 0.7rem;
	font-size: 1.2rem;
	color: #555;
	font-family: 'poppins', sans-serif;
}

.input-div.pass{
	margin-bottom: 4px;
}

a{
	display: block;
	text-align: right;
	text-decoration: none;
	color: #999;
	font-size: 0.9rem;
	transition: .3s;
}

a:hover{
	color: #4A7EA9;
}

.btn{
	display: block;
	width: 100%;
	height: 50px;
	border-radius: 25px;
	outline: none;
	border: none;
	/* background-image: linear-gradient(to right, #32be8f, #38d39f, #32be8f); */
    background-image: linear-gradient(to right, #19b5fe, #1ebaf0, #52c4ef);
	background-size: 200%;
	font-size: 1.2rem;
	color: #fff;
	font-family: 'Poppins', sans-serif;
	text-transform: uppercase;
	margin: 1rem 0;
	cursor: pointer;
	transition: .5s;
}
.btn:hover{
	background-position: right;
}


@media screen and (max-width: 1050px){
	.container{
		grid-gap: 5rem;
	}
}

@media screen and (max-width: 1000px){
	form{
		width: 290px;
	}

	.login-content h2{
        font-size: 2.4rem;
        margin: 8px 0;
	}

	.img img{
		width: 400px;
	}
}

@media screen and (max-width: 900px){
	.container{
		grid-template-columns: 1fr;
	}

	.img{
		display: none;
	}

	.wave{
		display: none;
	}

	.login-content{
		justify-content: center;
	}
}
</style>