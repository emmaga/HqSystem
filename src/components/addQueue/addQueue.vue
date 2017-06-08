<template lang="html">
	<div class="addQueue">
		<div class="top-bar">
			<div class="container settings">
				<div class="capital">
					<span>分诊台</span>/{{stationName}}/新建列队
				</div>
				<div class="btn-bar">
					<div class="item btn btn-success" @click="invokeAddQueue">保存</div>
	     			<div class="item btn btn-warning" @click="cancel">取消</div>
				</div>
			</div>
		</div>
		<middleLine height='8' class="middleline-topbar"></middleLine>
		<div class="container info">
     		<vue-form :state="formstate"  class="form-horizontal" @submit.prevent="addQueue">
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
	     		      		<input v-model="form.descText"  name="descText" class="form-control" :class="[fieldClassName(formstate.user)]"/>
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
	         			<input class="control-label input-btn" type="radio" :id="sceneSupport.id + 'radio'"  v-model="form.sceneSupportRadio"  :value="sceneSupport.name" >
         		        <label :for="sceneSupport.id + 'radio'" class="input-bar">&nbsp;{{sceneSupport.name}}</label> 
         		    </div>
     		    </div>
     		    <middleLine height='6.6'></middleLine>
     		    <h3>所属医生</h3>
 		        <div class="form-group form-item flex-container">
         		    <input id="all" class="control-label input-btn" type="checkbox"  v-model="form.workerListCheckboxAll"   >
     		        &nbsp;<label for="all" class="input-bar">全部</label>
 		        </div>
     		    <div class="form-flex-container footer-space">
         		    <div class="form-group form-item flex-container" v-for="worker in form.workerList">
	         		    <input class="control-label input-btn" type="checkbox" :id="worker.id + 'checkbox'" v-model="form.workerListCheckbox"  :value="worker.id" >
         		        &nbsp;<label :for="worker.id + 'checkbox'" class="input-bar">{{worker.name}}</label>
         		    </div>
     		    </div>
     		    <button type="submit" style="display:none" id="btn1">提交</button>
     		</vue-form>
	     	
	     	<modal v-if="modal.modalShow" @close="modal.modalShow = false" >
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
		name: 'addQueue',
		data() {
			return {
				formstate: {
				},
				form: {
					name: '',
					scene: '',
					descText: '',
					workerList: '',
					workerListCheckbox: [],
					workerListCheckboxAll: false, // 是否全部医生
					sceneSupportList: '',
					sceneSupportRadio: '',
					sourceQueueList: '',
					filter: '',
					password: '123456'
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
			stationName() {
				return this.$route.query.stationName;
			},
			queueInfoUrl() {
				return this.$store.getters.postUrl('manager', 'queueInfo')
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
		watch: {
            'form.workerListCheckboxAll': function() {
            	console.log('form.workerListCheckboxAll')
            	if (this.form.workerListCheckboxAll) {
					this.form.workerListCheckbox = this.form.workerList.map(function(ele, index, array) {
                         return ele.id
					})
            	} else {
            		this.form.workerListCheckbox = []
            	}
            }
		},
		methods: {
			_init() {
				this.getWorkerList()
				this.getSceneSupportList()
				this.getSourceQueueList()
			},
			invokeAddQueue() {
                document.getElementById('btn1').click()
			},
			addQueue() {
				console.log('addQueue')
				if (this.formstate.$invalid) {
					console.log('addQueue invalid')
					return;
				} else {
					if (this.form.workerListCheckbox.length === 0) {
						alert('至少选择一名医生')
						return;
					}
					this.form.user = this.form.name;
					this.axios.post(this.queueInfoUrl, {
						action: 'add',
						stationID: Number(this.stationID),
						name: this.form.name,
						scene: this.form.sceneSupportRadio,
						descText: this.form.descText,
						filter: `queue='${this.form.filter}'`,
						workerLimit: this.form.workerListCheckbox
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
					this.form.sceneSupportRadio = this.form.sceneSupportList[0].name
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
					this.form.filter = this.form.sourceQueueList[0];
				}, (res) => {
					console.log('failed ')
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

<style lang="stylus" scoped>

// 去掉button等默认点击效果
a, button, input, select, select:active, select:visited
	webkit-tap-highlight-color: rgba(0,0,0,0)
	webkit-user-modify: read-write-plaintext-only
	outline: none

.form-group
	margin: 0 

.btn-select
	width: 10em
	margin-left: 15px
	
.input-bar
	line-height: 60px

.footer-space
	margin-bottom: 40.6px
	
.form-flex-container
	margin-bottom: 1em

	
</style>