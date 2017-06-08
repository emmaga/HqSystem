<style scoped >
	.caller-type {
		margin-left: 20px;
	}
</style>


<template lang="html">
	<div class="addCaller">
			<div class="top-bar">
				<div class="container settings">
					<div class="capital">
						<span>分诊台</span>/{{stationName}}/新建叫号器
					</div>
					<div class="btn-bar">
						<div class="item btn btn-success" @click="invokeAddCaller">提交</div>
				     	<div class="item btn btn-warning" @click="cancel">取消</div>
					</div>
				</div>
			</div>
			<middleLine height='8' class="middleline-topbar"></middleLine>
	     	<div class="container info">
		     	<div class="row baseinfo">
		     		<h3>基础信息</h3>
		     		<vue-form :state="formstate"  class="form-horizontal" @submit.prevent="addCaller">
		     		    <validate  class="form-group flex-container">
		     		      <label  class="control-label">名称</label>
		     		      <div class="input-bar">
		     		      	<input v-model="form.name" required name="name" class="form-control" :class="[fieldClassName(formstate.name)]"/>
		     		      </div>
		     		    </validate>
		     		    <validate  class="form-group flex-container">
		     		      <label  class="control-label">类型</label>
		     		      <div class="input-bar caller-type">
		     		      	<input id="xunicaller" v-model="form.type" required value="soft" name="type" type="radio"/> <label for="xunicaller">虚拟叫号器</label>
		     		      	&nbsp;&nbsp;
		     		      	<input id="wulicaller" v-model="form.type" required value="physic" name="type" type="radio"/> <label for="wulicaller">物理叫号器</label>
		     		      </div>
		     		    </validate>
		     		    <validate  class="form-group flex-container">
		     		      <label  class="control-label">IP</label>
		     		      <div class="input-bar">
		     		      	<input v-model="form.ip" required name="ip" class="form-control" :class="[fieldClassName(formstate.ip)]" @change="verifyIP"/>
		     		      </div>
		     		    </validate>
		     		    <validate  class="form-group flex-container">
		     		      <label  class="control-label">位置</label>
		     		      <div class="input-bar">
		     		      	<input v-model="form.pos"  name="pos" class="form-control" required :class="[fieldClassName(formstate.pos)]"/>
		     		      </div>
		     		    </validate>
	         		    <h3>可登录医生</h3>
	    		        <div class="form-group form-item flex-container">
	            		    <input id="allcaller" class="control-label input-btn" type="checkbox"  v-model="form.workerListCheckboxAll"   >
	        		        &nbsp;<label for="allcaller" class="input-bar">全部</label>
	    		        </div>
	         		    <div class="form-group form-flex-container">
	         		        <div class="form-group form-item flex-container" v-for="worker in form.workerList">
    		         		    	<input class="control-label input-btn" type="checkbox" :id="worker.id + 'checkbox'" v-model="form.workerListCheckbox"  :value="worker.id" >
    	         		        <label :for="worker.id + 'checkbox'" class="col-sm-3 ">{{worker.name}}</label>
	         		        </div>
	         		    </div>
	         		    <h3>优先队列</h3>
	         		    <div class="form-group form-flex-container">
	         		        <div  v-for="queue in form.queueList" class="form-group form-item flex-container">
		    	         		<input :id="queue.id + 'radio'" class="control-label input-btn" type="radio"  v-model="form.priorQueue"  :value="queue.id" >
		             		    <label :for="queue.id + 'radio'" class="col-sm-3">{{queue.name}}</label>
	         		        </div>
	         		    </div>
	         		    <button type="submit" style="display:none" ref="addCallerSubmit">提交</button>
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
    import utils from 'common/utils/utils'
    import modal from '../../common/modal/modal'
    Vue.use(VueForm)
	export default {
		name: 'addCaller',
		data() {
			return {
				formstate: {
				},
				form: {
					name: '',
					scene: '',
					descText: '',
					ip: '',
					workerList: '',
					pos: '',
					workerListCheckbox: [],
					queueList: '',
					priorQueue: '',
					type: 'soft',
					workerListCheckboxAll: false, // 是否全部医生
					isIpValid: true   // ip是否有效
				},
				formBtnVal: ['连接失败', '连接测试', '连接成功'],
				modal: {
					modalShow: false,
					modalContent: ''
				}
			}
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
		computed: {
			stationID() {
				return this.$route.query.stationID;
			},
			serverUrl() {
				return this.$store.getters.postUrl('queueInfo')
			},
			queueInfoUrl() {
				return this.$store.getters.postUrl('manager', 'queueInfo')
			},
			callerUrl() {
				return this.$store.getters.postUrl('manager', 'caller')
			},
			stationName() {
				return this.$route.query.stationName;
			},
			workerUrl() {
				return this.$store.getters.postUrl('manager', 'worker')
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
			console.log(this.$route.name)
		},
		methods: {
			_init() {
				this.getWorkerList()
				this.getQueueList()
			},
			invokeAddCaller() {
				this.$refs.addCallerSubmit.click()
			},
			addCaller() {
				if (!this.form.isIpValid) {
					alert('IP不合法')
					return
				}
				if (this.formstate.$invalid) {
					console.log('editCaller failed')
					return;
				} else {
					this.axios.post(this.callerUrl, {
						action: 'add',
						stationID: this.stationID,
						name: this.form.name,
						type: this.form.type,
						ip: this.form.ip,
						pos: this.form.pos,
						workerLimit: this.form.workerListCheckbox,
						priorQueue: this.form.priorQueue
					}).then((res) => {
                       alert('保存成功')
                       this.cancel()
					}, (res) => {
                        this.modal.modalShow = true;
                        this.modal.modalContent = '保存失败';
					})
				}
			},
			verifyIP() {
               let reg =/^(\d+\.){3}\d+$/g
               if (!reg.test(this.form.ip)) {
               	  alert('IP不合法')
               	  this.form.isIpValid = false
               } else {
               	  this.form.isIpValid = true
               }
			},
			getWorkerList() {
				console.log('getWorkerList')
				this.axios.post(this.workerUrl, {
					action: 'getList',
					stationID: this.stationID
				}).then((res) => {
					this.form.workerList = res.workerList;
				}, (res) => {
					console.log('failed')
				})
			},
			getQueueList() {
				console.log('getQueueList')
				this.axios.post(this.queueInfoUrl, {
					action: 'getList',
					stationID: this.stationID
				}).then((res) => {
					console.log(res)
					this.form.queueList = res.list;
					// 默认选择第一个
					this.form.priorQueue = this.form.queueList[0].id
				}, (res) => {
					console.log('failed ')
				})
			},
			fieldClassName(field) {
               return utils.fieldClassName(field)
			},
			cancel() {
				this.$router.go(-1)
			}
		}
	}
</script>

