<style scoped>
.caller-type {
	margin-left: 20px;
}



</style>
<template lang="html">
	<div class="editCaller">
			<div class="top-bar">
				<div class="container settings">
					<div class="capital">
						<span>{{stationName}}</span>/编辑叫号器
					</div>
					<div class="btn-bar">
						<div class="item btn btn-success" @click="invokeEditCaller">提交</div>
				     	<div class="item btn btn-warning" @click="cancel">取消</div>
				     	<div class="item btn btn-danger" @click="del">删除</div>
					</div>
				</div>
				
			</div>
			<middleLine height='8' class="middleline-topbar"></middleLine>
	     	<div class="container info">
		     	<div class="row baseinfo">
		     		<h3>基础信息</h3>
		     		<vue-form :state="formstate"  class="form-horizontal" @submit.prevent="editCaller">
		     		    <validate  class="form-group flex-container">
		     		      <label  class="control-label">名称</label>
		     		      <div class="input-bar">
		     		      	<input v-model="form.name" required name="name" class="form-control" :class="[fieldClassName(formstate.name)]"/>
		     		      </div>
		     		    </validate>
		     		    <validate  class="form-group flex-container">
		     		      <label  class="control-label">类型</label>
		     		      <div class="input-bar caller-type">
		     		      	<input id="xunicalleredit" v-model="form.type" required value="soft" name="type" type="radio"/><label for="xunicalleredit">虚拟叫号器</label>
		     		      	&nbsp;&nbsp;
		     		      	<input id="wulicalleredit" v-model="form.type" required value="physic" name="type" type="radio"/><label for="wulicalleredit">物理叫号器</label>
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
		     		      	<input v-model="form.pos"  name="pos" class="form-control"/>
		     		      </div>
		     		    </validate>
	         		    <h3>可登录医生</h3>
	    		        <div class="form-group form-item flex-container">
	            		    <input id="alldoctors" class="control-label input-btn" type="checkbox"  v-model="form.workerListCheckboxAll"   >
	        		        &nbsp;<label for="alldoctors" class="input-bar">全部</label>
	    		        </div>
	         		    <div class="form-group form-flex-container">
	         		        <div class="form-group form-item flex-container" v-for="worker in form.workerList">
    		         		    	<input class="control-label input-btn" type="checkbox" :id="worker.id + 'checkbox'" v-model="form.workerLimit"  :value="worker.id" >
    	         		        <label :for="worker.id + 'checkbox'" class="col-sm-3 ">{{worker.name}}</label>
	         		        </div>
	         		    </div>
	         		    <h3>优先队列</h3>
             		    <div class="orm-group form-flex-container">
	         		        <div  v-for="queue in form.queueList" class="form-group form-item flex-container">
		    	         		    	<input :id="queue.id + 'radio'" class="control-label input-btn" type="radio"  v-model="form.priorQueue"  :value="queue.id" >
		             		        <label :for="queue.id + 'radio'" class="col-sm-3 ">{{queue.name}}</label>
	         		        </div>
             		    </div>
             		    <button type="submit" style="display:none" ref="editCallerSubmit">提交</button>
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
		name: 'editCaller',
		data() {
			return {
				formstate: {
				},
				form: {
					name: '',
					scene: '',
					descText: '',
					ip: '',
					id: '',
					workerList: '',
					pos: '',
					workerListCheckbox: [],
					queueList: '',
					priorQueue: '',
					workerListCheckboxAll: false,
					isIpValid: true
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
			callerUrl() {
				return this.$store.getters.postUrl('manager', 'caller')
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
					this.form.workerLimit = this.form.workerList.map(function(ele, index, array) {
                         return ele.id
					})
            	} else {
            		this.form.workerLimit = []
            	}
            }
		},
		methods: {
			_init() {
				this.setParas()
				this.getWorkerList()
				this.getQueueList()
			},
			setParas() {
				this.form.id = this.queryParas.info.id
				this.form.name = this.queryParas.info.name
				this.form.type = this.queryParas.info.type
				this.form.ip = this.queryParas.info.ip
				this.form.pos = this.queryParas.info.pos
				this.form.descText = this.queryParas.info.descText
				this.form.priorQueue = this.queryParas.info.priorQueue
				this.form.workerLimit = this.queryParas.info.workerLimit
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
			invokeEditCaller() {
                this.$refs.editCallerSubmit.click()
			},
			editCaller() {
				if (!this.form.isIpValid) {
					alert('IP不合法')
					return
				}
				if (this.formstate.$invalid) {
					return
					// this.modal.modalShow = true;
					// this.modal.modalContent = '请填写完整数据';
				} else {
					this.form.user = this.form.name;
					this.axios.post(this.callerUrl, {
						action: 'edit',
						stationID: this.stationID,
						name: this.form.name,
						type: this.form.type,
						ip: this.form.ip,
						id: this.form.id,
						pos: this.form.pos,
						workerLimit: this.form.workerLimit,
						priorQueue: this.form.priorQueue
					}).then((res) => {
                       // this.modal.modalShow = true;
                       // this.modal.modalContent = '保存成功';
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
			getQueueList() {
				this.axios.post(this.queueInfoUrl, {
					action: 'getList',
					stationID: this.stationID
				}).then((res) => {
					console.log(res)
					this.form.queueList = res.list;
				}, (res) => {
					console.log('failed ')
				})
			},
			cancel() {
				this.$router.go(-1)
			},
			// 删除
			del() {
				// todo
				// 弹出框优化
				var flag = confirm('确定删除？')
				if (!flag) {
					return;
				}
				this.axios.post(this.callerUrl, {
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

