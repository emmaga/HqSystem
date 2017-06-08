<style scoped>
.input-bar {
	margin-left: 15px;
}
.head_pic {
	width:100px;
	margin-left: 50px;
}
.forminfo {
	position: absolute;
	right:0;
	top:0;
	width:15px;
	height:15px;
}
</style>
<template lang="html">
	<div class="addWorker">
		<div class="top-bar">
			<div class="container settings">
				<div class="capital">
					<span>分诊台</span>/{{stationName}}/添加医生
				</div>
				<div class="btn-bar">
					<div class="item btn btn-success" @click="invokeAddWorker">保存</div>
	     			<div class="item btn btn-warning" @click="cancel">取消</div>
				</div>
			</div>
			
		</div>
		<middleLine height='8' class="middleline-topbar"></middleLine>
	     <div class="container info">
     			<h3>基础信息</h3>
	     		<vue-form :state="formstate"  class="form-horizontal" @submit.prevent="addWorker" >
     				<validate  class=" form-group flex-container">
	     		      <label  class="control-label">编号</label>
	     		      <div class="input-bar" style="position:relative">
	     		      	<input v-model="form.id" required name="id" class="form-control" :class="[fieldClassName(formstate.id)]" @change="verifyID"/>
	     		      	<span class="forminfo" v-if="form.idIsUsed"><img :src="usedImg" alt=""></span>
	     		      </div>
	     		    </validate>
	     		    <validate  class=" form-group flex-container">
	     		      <label  class="control-label">姓名</label>
	     		      <div class="input-bar">
	     		      	<input v-model="form.name" required name="name" class="form-control" :class="[fieldClassName(formstate.name)]"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class=" form-group flex-container">
	     		      <label  class="control-label">职称</label>
	     		      <div class="input-bar">
	     		      	<input v-model="form.title" required name="title" class="form-control" :class="[fieldClassName(formstate.title)]"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class=" form-group flex-container">
	     		      <label  class="control-label">科室</label>
	     		      <div class="input-bar">
	     		      	<input v-model="form.department" required name="department" class="form-control" :class="[fieldClassName(formstate.department)]"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class=" form-group flex-container  height-auto">
	     		      <label  class="control-label">简介</label>
	     		      <div class="input-bar">
	     		      	<textarea v-model="form.descText"  name="descText" class="form-control"></textarea>
	     		      </div>
	     		    </validate>
	     		    <validate  class=" form-group flex-container height-auto">
	     		      <label  class="control-label">头像</label>
	     		      <div class="input-bar">
                         <upLoad @upLoadInfo="showPic($event)" :upLoadUrl="upLoadUrl"></upLoad>	     		      
                         <img :src="form.headPic" alt="" class="head_pic">
                      </div>
	     		    </validate>
	     		    <h3>账号信息</h3>
	     		    <div class="form-group flex-container">
	     		    	<label  class="control-label">账号</label>
	     		    	<div class="input-bar">
	     		    	&nbsp;&nbsp;
		     		    	<input  type="radio" checked   name="user" class="not-allowed" />&nbsp;&nbsp;{{form.id}}（和基础信息编号一样）
	     		    	</div>
	     		    </div>
	     		    <div class="form-group flex-container">
	     		    	<label  class="control-label">密码</label>
	     		    	<div class="input-bar">
	     		    		<input v-model="form.password"   required name="password" class="form-control" :class="[fieldClassName(formstate.password)]"/>
	     		    	</div>
	     		    </div>
	     		    <button type="submit" style="display:none" id="btn1">提交</button>
	     		  </vue-form>
	     	<modal v-if="modal.modalShow" @close="modal.modalShow = false">
	     		<p slot='body'>{{modal.modalContent}}</p>
	     	</modal>
	     </div>
	</div>
</template>
<script >
    import Vue from 'vue'
    import middleLine from '../../common/middleLine/middleLine'
    import VueForm from 'vue-form'
    import utils from 'common/utils/utils'
    import modal from '../../common/modal/modal'
    import upLoad from '../../common/upLoad/upLoad'
    import resourceImg from 'img'
    Vue.use(VueForm)
	export default {
		name: 'addWorker',
		data() {
			return {
				name: 'file',
				formstate: {
				},
				form: {
					id: '',
					name: '',
					title: '',
					department: '',
					descText: '',
					user: '',
                    password: '123456',
                    headPic: '',
                    verifyIDFlag: false,
                    idValid: false,
                    idIsUsed: false // id是否已被占用
				},
				formBtnVal: ['连接失败', '连接测试', '连接成功'],
				modal: {
					modalShow: false,
					modalContent: ''
				},
				usedImg: resourceImg.usedImg
			}
		},
		computed: {
			upLoadUrl() {
                return this.$store.state.upLoadUrl
			},
			stationID() {
				return this.$route.query.stationID;
			},
			stationName() {
				return this.$route.query.stationName;
			},
			serverUrl() {
				return this.$store.getters.postUrl('manager', 'worker')
			}
		},
		components: {
			middleLine,
			modal,
			upLoad
		},
		created() {
			this._init()
		},
		mounted() {
		},
		watch: {
			'form.id': function(val, oldval) {
                this.form.verifyIDFlag = true;
			}
		},
		methods: {
			_init() {
			},
			invokeAddWorker() {
                document.getElementById('btn1').click()
			},
			addWorker() {
				if (!this.form.idValid) {
					alert('编号只能是数字和字母')
					return;
				}
				if (!this.form.verifyIDFlag) {
					alert('编号已被占用')
					return;
				}
				if (this.formstate.$invalid) {
					console.log('invalid')
					return;
					// this.modal.modalShow = true;
					// this.modal.modalContent = '请填写完整数据';
				} else {
					this.form.user = this.form.id;
					this.axios.post(this.serverUrl, {
						action: 'add',
						stationID: this.stationID,
						id: this.form.id,
						name: this.form.name,
						title: this.form.title,
						department: this.form.department,
						descText: this.form.descText,
						user: this.form.user,
	                    password: this.form.password,
	                    headPic: this.form.headPic
	                    // headPic: 'www.baidu.com'
					}).then((res) => {
                       alert('保存成功')
                       // 返回上一步
                       this.cancel()
					}, (res) => {
                        this.modal.modalShow = true;
                        this.modal.modalContent = '保存失败';
					})
				}
			},
			showPic(para) {
               let info = JSON.parse(para)
               this.form.headPic = info.upload_path
			},
			verifyID() {
				console.log(this.form.id.length)
				if (this.form.id.length === 0) return
				let reg = /^[A-Za-z0-9]+$/g
				if (!reg.test(this.form.id)) {
                   alert('编号只能是数字和字母')
                   this.form.idValid = false
                   return
				} else {
					this.form.idValid = true
				}
				if (!this.form.verifyIDFlag) {
					return;
				}
				this.axios.post(this.serverUrl, {
					action: 'checkID',
					stationID: this.stationID,
					id: this.form.id
				}).then((res) => {
					if (res.conflict === 0) {
                        this.form.verifyIDFlag = true;
                        this.form.idIsUsed = false;
					} else if (res.conflict === 1) {
						this.form.verifyIDFlag = false;
	                    this.modal.modalShow = true;
	                    this.modal.modalContent = '编号已被占用';
	                    this.form.idIsUsed = true;
					}
				}, (res) => {
				})
			},
			cancel() {
				// todo
				// 切换回去 有缓存
				this.$router.go(-1)
			},
			fieldClassName(field) {
               return utils.fieldClassName(field)
			}
		}
	}
</script>

