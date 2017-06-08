<style scoped lang="stylus">
.form-group
	margin: 0 

.btn-select
	width: 10em
	margin-left: 15px

.input-btn
	margin: 1em
	
.input-bar
	line-height: 60px

.form-flex-container
	margin-bottom: 1em

.footer-space
	margin-bottom: 40.6px
</style>
<template lang="html">
	<div class="editQueue">
		<div class="top-bar">
			<div class="container settings">
				<div class="capital">
					<span>{{stationName}}</span>/编辑队列
				</div>
				<div class="btn-bar">
					<div class="item btn btn-success" @click="invokeEditQueue">保存</div>
	     			<div class="item btn btn-warning" @click="cancel">取消</div>
	     			<div class="item btn btn-danger" @click="del">删除</div>
				</div>
			</div>
			
		</div>
		<middleLine height='8' class="middleline-topbar"></middleLine>
	     <div class="container info">
     		<vue-form :state="formstate"  class="form-horizontal" @submit.prevent="editQueue">
     			<h3>基础信息</h3>
     			<div class="form-flex-container">
     				<validate class="form-group flex-container">
	     		      	<label class="control-label">队列名字</label>
	     		      	<div class="input-bar">
	     		      		<input v-model="form.name" required name="name" class="form-control" :class="[fieldClassName(formstate.name)]"/>
	     		      	</div>
	     		    </validate>
	     		    <validate  class="form-group flex-container">
	     		      	<label  class="control-label">队列描述</label>
	     		      	<div class="input-bar">
	     		      		<input v-model="form.descText"  name="descText" class="form-control" />
	     		      	</div>
	     		    </validate>
	     		    <div class="form-group flex-container">
	     		      	<label class="control-label">系统拼接队列关键字</label>
	     		      	<div class="input-bar">
	     		      		<select class="btn-select btn btn-default dropdown-toggle" v-model="form.filter">
	     		      			<option v-for="sourceQueue in form.sourceQueueList">{{sourceQueue}}
	     		      			</option>
	     		      		</select>
	     		      	</div>
	     		    </div>
     			</div>
     		    <middleLine height='6.6'></middleLine>
     		    <h3>策略配置</h3>
 		    	<div class="form-flex-container">
         		    <div class="form-item flex-container" v-for="(sceneSupport, index) in form.sceneSupportList">
	         			<input class="control-label input-btn" type="radio" :id="sceneSupport.id + 'radio'"  v-model="form.scene"  :value="sceneSupport.name" >
         		        <label :for="sceneSupport.id + 'radio'" class="input-bar">&nbsp;{{sceneSupport.name}}</label>
         		    </div>
     		    </div>
     		    <middleLine height='6.6'></middleLine>
     		    <h3>所属医生</h3>
		        <div class="form-group form-item flex-container">
        		    <input id="alledit" class="control-label input-btn" type="checkbox"  v-model="form.workerListCheckboxAll"   >
    		        &nbsp;<label for="alledit" class="input-bar">全部</label>
		        </div>
     		    <div class="form-flex-container footer-space">
         		    <div class="form-group form-item flex-container" v-for="worker in form.workerList">
	         		    <input class="control-label input-btn" type="checkbox" :id="worker.id + 'checkbox'" v-model="form.workerLimit"  :value="worker.id" >
         		        <label :for="worker.id + 'checkbox'" class="input-bar">{{worker.name}}</label>
         		    </div>
     		    </div>
     		    <button type="submit" style="display:none"  ref="editQueueSubmit">提交</button>
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
    import utils from 'common/utils/utils.js'
    import modal from '../../common/modal/modal'
    Vue.use(VueForm)
	export default {
		name: 'editQueue',
		data() {
			return {
				formstate: {
				},
				form: {
					name: '',
					scene: '',
					id: '',
					descText: '',
					workerList: '',
					workerListCheckbox: [],
					sceneSupportList: '',
					sceneSupportRadio: '',
					sourceQueueList: '',
					filter: '',
					password: '',
					workerLimit: '',
					workerListCheckboxAll: false // 默认不是全选
				},
				formBtnVal: ['连接失败', '连接测试', '连接成功'],
				modal: {
					modalShow: false,
					modalContent: ''
				}
			}
		},
		computed: {
			stationID() {
				return this.$route.query.stationID;
			},
			workerUrl() {
				return this.$store.getters.postUrl('manager', 'worker')
			},
			queueInfoUrl() {
				return this.$store.getters.postUrl('manager', 'queueInfo')
			},
			stationName() {
				return this.$route.query.stationName;
			},
			queryParas() {
				return this.$route.query
			}
		},
		watch: {
            'form.workerListCheckboxAll': function() {
            	console.log('form.workerListCheckboxAll')
            	if (this.form.workerLimitWatch) {
            		return
            	}
            	if (this.form.workerListCheckboxAll) {
					this.form.workerLimit = this.form.workerList.map(function(ele, index, array) {
                         return ele.id
					})
            	} else {
            		this.form.workerLimit = []
            	}
            }
		},
		components: {
			middleLine,
			modal
		},
		created() {
			this._init()
			this.setParas()
		},
		mounted() {
		},
		methods: {
			_init() {
				this.getWorkerList()
				this.getSceneSupportList()
				this.getSourceQueueList()
			},
			invokeEditQueue() {
				this.$refs.editQueueSubmit.click()
			},
			editQueue() {
				if (this.formstate.$invalid) {
					this.modal.modalShow = true;
					this.modal.modalContent = '请填写完整数据';
				} else {
					this.form.user = this.form.name;
					this.axios.post(this.queueInfoUrl, {
						action: 'edit',
						stationID: this.stationID,
						id: this.form.id,
						name: this.form.name,
						scene: this.form.scene,
						descText: this.form.descText,
						filter: `queue='${this.form.filter}'`,
						workerLimit: this.form.workerLimit
					}).then((res) => {
                       alert('保存成功')
                       this.cancel()
					}, (res) => {
                        this.modal.modalShow = true;
                        this.modal.modalContent = '保存失败';
					})
				}
			},
			getWorkerList() {
				this.axios.post(this.workerUrl, {
					action: 'getList',
					stationID: this.stationID
				}).then((res) => {
					this.form.workerList = res.workerList;
				}, (res) => {
					console.log('failed')
				})
			},
			// 策略列表
			getSceneSupportList() {
				this.axios.post(this.queueInfoUrl, {
					action: 'getSceneSupportList',
					stationID: this.stationID
				}).then((res) => {
					this.form.sceneSupportList = res.list;
				}, (res) => {
					console.log('failed')
				})
			},
			getSourceQueueList() {
				this.axios.post(this.queueInfoUrl, {
					action: 'getSourceQueueList',
					stationID: this.stationID
				}).then((res) => {
					this.form.sourceQueueList = res.list;
				}, (res) => {
					console.log('failed')
				})
			},
			setParas() {
				console.log(this.queryParas.info)
				this.form.name = this.queryParas.info.name
				this.form.scene = this.queryParas.info.scene
				this.form.descText = this.queryParas.info.descText
				this.form.filter = this.queryParas.info.filter.slice(7, -1)
				this.form.workerLimit = this.queryParas.info.workerLimit
				this.form.id = this.queryParas.info.id
			},
			cancel() {
				this.$router.go(-1)
			},
			// 删除
			del() {
				var flag = confirm('确定删除？')
				if (!flag) {
					return;
				}
				this.axios.post(this.queueInfoUrl, {
					action: 'delete',
					stationID: this.stationID,
                    id: this.queryParas.info.id
				}).then((res) => {
                   alert('删除成功')
                   this.cancel()
				}, (res) => {
				})
			},
			fieldClassName(field) {
               return utils.fieldClassName(field)
			}
		}
	}
</script>

