<template lang="html">
	<div class="login">
	    <div class="login-header":style="{'backgroundImage':'url('+loginBG+')'}">
	      <div class="title">
	      	<h1 class="en-title">H<span>Q</span>MS</h1>
	      	<h2 class="zh-title">排队叫号管理系统</h2>
	      </div>
	    </div>
	    <vue-form :state="formstate" @submit.prevent="saveForm" class="saveForm">
	        <validate  class="form-group">
	          <input v-model="form.user" required name="user" placeholder="用户名 " class="form-control input"  :class="[fieldClassName(formstate.user)]" />
	          <i class="iconfont icon-yonghuming" style=""></i>
	        </validate>
	        <validate  class="form-group">
	          <input v-model="form.passwd"  name="passwd" placeholder="密码" type="password" required :class="[fieldClassName(formstate.passwd)]" class="form-control input" />
	          <i class="iconfont icon-mimasuo"></i>
	        </validate>
	        <button type="submit" class="btn btn-primary btn-block"><h2>登录</h2></button>
	      </vue-form>
	</div>
</template>
<script>
    import Vue from 'vue'
	import VueForm from 'vue-form'
	import utils from 'common/utils/utils.js'
	import loginBG from 'img/login-bg.png'
	Vue.use(VueForm)
	export default {
		name: 'login',
		data() {
			return {
				formstate: {},
				form: {
					user: '',
					passwd: ''
				},
				formClass: {
					formControl: true
				},
				loginBG: loginBG
			}
		},
		computed: {
			serverUrl() {
				return this.$store.getters.postUrl('login')
			}
		},
		components: {
		},
		mounted() {
			console.log(this)
		},
		methods: {
			saveForm() {
				if (this.formstate.$invalid) {
					return;
				}
				this.axios.post(this.serverUrl, {
					action: 'GetToken',
					user: this.form.user,
					passwd: this.form.passwd
				}).then((res) => {
					if (res.hasOwnProperty('token')) {
						this.$store.commit('login', res.token);
						// 路由跳转
						// todo
						// this.$route 和 this.$router不一样
						let userType = res.userType
						if (userType === 'Manager') {
							this.$router.push({
								name: 'manage'
							})
						} else if (userType === 'station') {
                            this.$router.push({
                            	name: 'workStation',
                            	query: {
                            		stationID: res.stationID
                            	}
                            })
						}
					} else {
						alert('账号密码错误，请重新登录')
					}
				}, (res) => {
					console.log('failed')
				})
			},
			fieldClassName(field) {
               return utils.fieldClassName(field)
			}
		}
	}
</script>

<style lang="stylus" scoped>
h1
 	font-family: Arial-Black
 	font-size: 40px
 
h2,h3,ul,label
	margin: 0
	padding: 0

h2
	font-family: PingFangSC-Light
	font-size: 18px
	font-weight: 300
	
h3
	font-size: 14px

.form-group
	position: relative
	display:flex
	align-items: center
	margin-bottom: 42.7px
	line-height: 3em
	.form-control 
		font-size: 14px
		height: 3em
	.input
		width:100%
		position: absolute
		z-index:0

.form-group:first-child 
	margin-bottom: 16.1px

.login-header 
	height: 186.7px
	background: #0097FB
	width:100%
	
.title 
	width:500px
	margin:0 auto
	text-align: center
	position: relative
	top:50%
	transform: translateY(-50%)
	
.en-title 
	font-family: 'Arial-Black'
	color: #fff
	height:73px
	text-shadow: 0px 2px 4px rgba(0,0,0,.1)
	margin: 0
	padding: 0
	font-size: 40px

.en-title span 
	color: #47CAF9

.zh-title 
	font-family: PingFangSC
	color: #fff
	height:42px
	text-shadow: 0px 2px 4px rgba(0,0,0,.1)
	font-size: 24px

button
	background-image: linear-gradient(45deg, #109EFC 0%, #00C8FF 100%)
	box-shadow: 0 10px 20px 0 rgba(7,180,254,0.20)
	border-radius: 5px
	border: 0
	font-weight: 300
	height: 53.3px
	border: none

.saveForm 
	width: 25.89%
	margin: 46.6px auto
	
.iconfont
	color: black
	// position: absolute
	// top: 0px
	right: 18.6px
	color: #C8C8C8
	
.icon-yonghuming,
.icon-mimasuo
	margin-left: auto
	margin-right: 0.5em
	font-size: 20px
	z-index: 666
		
	

</style>