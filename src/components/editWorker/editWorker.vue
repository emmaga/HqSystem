<style scoped>
.head_pic {
	width:100px;
	margin-left: 50px;
}
.input-bar {
	margin-left: 15px;
}
</style>

<template lang="html">
	<div class="editWorker">
		<div class="top-bar">
		    <div class="container settings">
				<div class="capital">
					<span>{{stationName}}</span>/编辑医生
				</div>
				<div class="btn-bar">
					<div class="item btn btn-success" @click="invokeEditWorker">提交</div>
			     	<div class="item btn btn-warning" @click="cancel">取消</div>
			     	<div class="item btn btn-danger" @click="del">删除</div>
				</div>
			</div>
			
		</div>

		<middleLine height='8' class="middleline-topbar"></middleLine>
	     <div class="container info">
	     	<div class="row baseinfo">
     			<h3>基础信息</h3>
	     		<vue-form :state="formstate"  class="form-horizontal" @submit.prevent="editWorker">
	     		    <validate  class="form-group flex-container">
	     		      <label  class="control-label">编号</label>
	     		      <div class="input-bar">
	     		      	<input v-model="form.id" required name="id" class="form-control"  disabled />
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group flex-container">
	     		      <label  class="control-label">姓名</label>
	     		      <div class="input-bar">
	     		      	<input v-model="form.name" required name="name" class="form-control" :class="[fieldClassName(formstate.name)]"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group flex-container">
	     		      <label  class="control-label">职称</label>
	     		      <div class="input-bar">
	     		      	<input v-model="form.title" required name="title" class="form-control" :class="[fieldClassName(formstate.title)]"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group flex-container">
	     		      <label  class="control-label">科室</label>
	     		      <div class="input-bar">
	     		      	<input v-model="form.department" required name="department" class="form-control" :class="[fieldClassName(formstate.department)]"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group flex-container height-auto">
	     		      <label  class="control-label">简介</label>
	     		      <div class="input-bar">
	     		      	<textarea v-model="form.descText"  name="descText" class="form-control"></textarea>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group flex-container height-auto">
	     		      <label  class="control-label">头像</label>
	     		      <div class="input-bar">
      	     		      <div class="input-bar">
                               <upLoad @upLoadInfo="showPic($event)" :upLoadUrl="upLoadUrl"></upLoad>
                               <img :src="form.headPic" alt="" class="head_pic">
                            </div>
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
	     	</div>
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
    import utils from 'common/utils/utils.js'
    import modal from '../../common/modal/modal'
    import upLoad from '../../common/upLoad/upLoad'
    Vue.use(VueForm)
	export default {
		name: 'editWorker',
		data() {
			return {
				name: 'file',
				formstate: {
				},
				form: {},
				formId: '',
				formIdValid: '',
				formBtnVal: ['连接失败', '连接测试', '连接成功'],
				modal: {
					modalShow: false,
					modalContent: ''
				}
			}
		},
		computed: {
			upLoadUrl() {
                return this.$store.state.upLoadUrl
			},
			stationID() {
				return Number(this.$route.query.stationID);
			},
			serverUrl() {
				return this.$store.getters.postUrl('manager', 'worker')
			},
			stationName() {
				return this.$route.query.stationName;
			},
			queryParas() {
				return this.$route.query
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
				this.form = this.queryParas.info
				this.formId = this.form.id
				this.validateId(this.form.id)
			},
			invokeEditWorker() {
                document.getElementById('btn1').click()
			},
			editWorker() {
				if (!this.formIdValid) {
					alert('编号只能是数字和字母')
					return
				}
				if (this.formstate.$invalid) {
					return;
				} else {
					this.form.user = this.form.id;
					this.axios.post(this.serverUrl, {
						action: 'edit',
						stationID: this.stationID,
						id: this.form.id,
						name: this.form.name,
						title: this.form.title,
						department: this.form.department,
						descText: this.form.descText,
						user: this.form.user,
	                    password: this.form.password,
	                    headPic: this.form.headPic
					}).then((res) => {
                       // this.modal.modalShow = true;
                       // this.modal.modalContent = '保存成功';
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
				if (this.form.id === this.formId) return
				this.validateId(this.form.id)
				if (!this.formIdValid) {
					alert('编号只能是数字和字母')
					return
				}
				if (!this.form.verifyIDFlag) {
					return;
				}
				this.axios.post(this.serverUrl, {
					action: 'checkID',
					stationID: this.stationID,
					id: this.form.id
				}).then((res) => {
					console.log(res)
					if (res.conflict === 0) {
                        this.form.verifyIDFlag = true;
					} else if (res.conflict === 1) {
						this.form.verifyIDFlag = false;
	                    this.modal.modalShow = true;
	                    this.modal.modalContent = '该编号已被占用';
					}
				}, (res) => {
				})
			},
			// 验证id是否合法
			validateId(id) {
				let reg = /^[A-Za-z0-9]+$/g
				if (!reg.test(id)) {
                   this.formIdValid = false
				} else {
					this.formIdValid = true
				}
			},
			del() {
				console.log('del')
				var flag = confirm('确定删除？')
				if (!flag) {
					return;
				}
				this.axios.post(this.serverUrl, {
					action: 'del',
					stationID: this.stationID,
                    id: this.queryParas.info.id
				}).then((res) => {
                   alert('删除成功')
                   this.cancel()
				}, (res) => {
					alert('删除失败')
				})
			},
			cancel() {
				this.$router.go(-1)
			},
			fieldClassName(field) {
               return utils.fieldClassName(field)
			}
		}
	}
</script>

