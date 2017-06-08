<style scoped>

	.input-bar {
		margin-left: 15px;
	}
	textarea {
		font-size: 14px;
		resize: none;
		border: 1px solid #ccc !important;
	}

	.control-label {
		width: 4em;
	}

</style>

<template lang="html">
	<div class="editUser">
		<div class="top-bar">
		    <div class="container settings">
				<div class="capital">
					<span>编辑工作站</span>
				</div>
				<div class="btn-bar">
					<div class="item btn btn-success" @click="editUser">提交</div>
			     	<div class="item btn btn-warning" @click="cancel">取消</div>
				</div>
			</div>
		</div>

		<middleLine height='8' class="middleline-topbar"></middleLine>

	     <div class="container info">
	     	<div class="row baseinfo">
     			<h3>基础信息</h3>
	     		<vue-form :state="formstate"  class="form-horizontal" >
	     		    <validate  class="form-group flex-container">
	     		      <label  class="control-label">分诊台ID</label>
	     		      <div class="input-bar">
	     		      	<input v-model="form.stationID" disabled  name="stationID" class="form-control"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group flex-container">
	     		      <label  class="control-label">用户</label>
	     		      <div class="input-bar">
	     		      	<input v-model="form.user" required name="user" class="form-control"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group flex-container">
	     		      <label  class="control-label">密码</label>
	     		      <div class="input-bar">
	     		      	<input v-model="form.password" required name="password" class="form-control"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group flex-container">
	     		      <label  class="control-label">类型</label>
	     		      <div class="input-bar">
	     		      	<input v-model="form.type" required disabled name="type" class="form-control"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group flex-container">
	     		      <label  class="control-label">用户ID</label>
	     		      <div class="input-bar">
	     		      	<input v-model="form.id" required disabled name="id" class="form-control"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-group flex-container">
	     		      <label  class="control-label">描述</label>
	     		      <div class="input-bar">

	     		      	<textarea v-model="form.descText" required name="descText" class="form-control"></textarea>

	     		      </div>
	     		    </validate>
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
    import modal from '../../common/modal/modal'
    Vue.use(VueForm)
	export default {
		name: 'editUser',
		data() {
			return {
				formstate: {
				},
				form: {},
				modal: {
					modalShow: false,
					modalContent: ''
				}
			}
		},
		computed: {
			serverUrl() {
				return this.$store.getters.postUrl('manager', 'stationAccount')
			},
			queryParas() {
				return this.$route.query.info
			}
		},
		components: {
			middleLine,
			modal
		},
		created() {
			this._init()
		},
		mounted() {
		},
		methods: {
			_init() {
				this.form = this.queryParas
			},
			editUser() {
				if (this.formstate.$invalid) {
					this.modal.modalShow = true;
					this.modal.modalContent = '请填写完整数据';
					return;
				} else {
					this.axios.post(this.serverUrl, {
						action: 'edit',
						stationID: this.form.stationID,
						id: this.form.id,
						user: this.form.user,
						password: this.form.password,
						type: this.form.type,
						descText: this.form.descText
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
			cancel() {
				this.$router.go(-1)
			}
		}
	}
</script>

