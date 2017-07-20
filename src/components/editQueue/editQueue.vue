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
    .sceneList .scene-label{
        line-height: 60px;
        margin-right 30px;
        display: inline-block;
        min-width 100px;
    }
    .sceneList .form-item:nth-of-type(odd) .input-bar {
        padding-right: 0px;
    }
    .addSceneSupport{
        width 6em;
        margin-left:20px;
    }
    #sceneSupportModal,#editSceneModal{
        /*display: none;*/
        background: rgba(0, 0, 0, 0.8);
        /*width: 100%;*/
        z-index: 667;
        color: black;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        overflow: auto;
    }
    .sceneSupportModal_content{
        position: relative;
        padding: 20px;
        width: 60%;
        margin: 100px auto;
        opacity: 1;
        z-index: 3;
        background: #fff;
        border-radius: 5px;
    }
    .sceneSupportModal_content tr{
        display :block;
        margin-top:20px;
    }
    .DISIL{
        display inline-block;
    }
    .WIDTH130{
        width:130px;
    }
    .TxtRight{
        text-align: right;
    }
    .MarginLeft20{
        margin-left: 20px;
    }
    .MarginRight20{
        margin-right: 20px;
    }
    .Color_blue{
        color: #2885f4;
    }
    .Color_blue:hover{
        color: blue;
        cursor: pointer;
    }
    .Color_gray{
        color: #A5A5A5;
    }
    .form-item {
        width: 100%!important;
    }
    .noShow{
        visibility :hidden;
    }
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
     		    <h3>策略配置 <span class="DISIL btn btn-default addSceneSupport" @click="sceneShow = true">添加</span></h3>
     	        <div class="form-flex-container sceneList">
         		    <div class="form-item flex-container" v-for="(sceneSupport, index) in form.sceneSupportList">
	         			<input class="control-label input-btn" type="radio" :id="sceneSupport.id + 'radio'"  v-model="form.sceneID" @click="chooseScene(sceneSupport.id, sceneSupport.name)"  :value="sceneSupport.id" >
         		        <label :for="sceneSupport.id + 'radio'" class="scene-label">&nbsp;{{sceneSupport.name}}</label>
         		        <span class="MarginRight20 noShow" v-if="index<4">编辑</span>
         		        <span class="Color_blue MarginRight20" v-if="index>3" @click="getEditScene(sceneSupport.id, index)">编辑</span>
         		        <span class="Color_gray">(<span>{{sceneSupport.descText}}</span>)</span>
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

	     <div id="sceneSupportModal" v-show="sceneShow">
            <div class="sceneSupportModal_content">
                <div>
                <button class="btn" style="float: right" @click="sceneShow = false">&times;</button>
              </div>
                <table>
                    <tr>
                        <td class="TxtRight WIDTH130">自定义名称：</td>
                        <td>
                            <input type="text" v-model="addSceneData.name" placeholder="自定义名称" class="form-control" style="width: 150px;">
                        </td>
                    </tr>
                    <tr>
                        <td class="TxtRight WIDTH130">是否刷卡报道：</td>
                        <td>
                            <select v-model="addSceneData.activeLocal" class="form-control">
                                <option value="0" selected = "selected">否</option>
                                <option value="1">是</option>
                            </select>
                        </td>
                        <td>
                            <span class="MarginLeft20 Color_gray">分诊台是否有自助报道机报道</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="TxtRight WIDTH130">排序方式：</td>
                        <td>
                            <select v-model="addSceneData.rankWay" class="form-control">
                                <option value="snumber">按序号</option>
                                <option value="registTime">按挂号时间</option>
                                <option value="activeTime">按激活时间</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="TxtRight WIDTH130">延时时间（分钟）：</td>
                        <td>
                            <input type="number" v-model="addSceneData.delayTime" min="0" class="form-control">
                        </td>
                        <td>
                            <span class="MarginLeft20 Color_gray">检验科激活后延时一定时间进入排队，如憋尿</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="TxtRight WIDTH130">缓冲人数：</td>
                        <td>
                            <select v-model="addSceneData.waitNum" class="form-control">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </td>
                        <td>
                            <span class="MarginLeft20 Color_gray">二级分诊时诊室门口缓冲等待人数</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="TxtRight WIDTH130">复诊优先机制：</td>
                        <td>
                            <select v-model="addSceneData.reviewWaitNum" class="form-control">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                            </select>
                        </td>
                        <td>位</td>
                        <td>
                            <span class="MarginLeft20 Color_gray">设置后，复诊患者排在正在就诊后第 n 位</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="TxtRight WIDTH130">挂号惩罚机制：</td>
                        <td>
                            <select v-model="addSceneData.passedWaitNum" class="form-control">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                            </select>
                        </td>
                        <td>位</td>
                        <td>
                            <span class="MarginLeft20 Color_gray">设置后，过号患者召回后排在正在就诊后第 n 位作为惩罚</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="TxtRight WIDTH130">语音内容：</td>
                        <td>
                            请 &times;&times;&times; 到 &times;&times;&times;
                        </td>
                        <td>
                            <input v-model="addSceneData.outputText" placeholder="就诊" class="form-control MarginLeft20" type="text">
                        </td>
                    </tr>
                </table>
                <div class="TxtRight">
                    <button class="btn btn-success" id="addSceneBtn" @click="addscene()">添加</button><button class="btn MarginLeft20 btn-warning" @click="sceneShow = false">取消</button>
                </div>
            </div>
         </div>

         <div id="editSceneModal" v-show="aditSceneShow">
            <div class="sceneSupportModal_content">
                <div>
                    <button class="btn" style="float: right" @click="aditSceneShow = false">&times;</button>
                </div>
                <table>
                    <tr>
                        <td class="TxtRight WIDTH130">自定义名称：</td>
                        <td>
                            <input type="text" v-model="editSceneData.name" placeholder="自定义名称" class="form-control" style="width: 150px;">
                        </td>
                    </tr>
                    <tr>
                        <td class="TxtRight WIDTH130">是否刷卡报道：</td>
                        <td>
                            <select v-model="editSceneData.activeLocal" class="form-control">
                                <option value="0" selected = "selected">否</option>
                                <option value="1">是</option>
                            </select>
                        </td>
                        <td>
                            <span class="MarginLeft20 Color_gray">分诊台是否有自助报道机报道</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="TxtRight WIDTH130">排序方式：</td>
                        <td>
                            <select v-model="editSceneData.rankWay" class="form-control">
                                <option value="snumber">按序号</option>
                                <option value="registTime">按挂号时间</option>
                                <option value="activeTime">按激活时间</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="TxtRight WIDTH130">延时时间（分钟）：</td>
                        <td>
                            <input type="number" v-model="editSceneData.delayTime" min="0" class="form-control">
                        </td>
                        <td>
                            <span class="MarginLeft20 Color_gray">检验科激活后延时一定时间进入排队，如憋尿</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="TxtRight WIDTH130">缓冲人数：</td>
                        <td>
                            <select v-model="editSceneData.waitNum" class="form-control">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </td>
                        <td>
                            <span class="MarginLeft20 Color_gray">二级分诊时诊室门口缓冲等待人数</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="TxtRight WIDTH130">复诊优先机制：</td>
                        <td>
                            <select v-model="editSceneData.reviewWaitNum" class="form-control">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                            </select>
                        </td>
                        <td>位</td>
                        <td>
                            <span class="MarginLeft20 Color_gray">设置后，复诊患者排在正在就诊后第 n 位</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="TxtRight WIDTH130">挂号惩罚机制：</td>
                        <td>
                            <select v-model="editSceneData.passedWaitNum" class="form-control">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                            </select>
                        </td>
                        <td>位</td>
                        <td>
                            <span class="MarginLeft20 Color_gray">设置后，过号患者召回后排在正在就诊后第 n 位作为惩罚</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="TxtRight WIDTH130">语音内容：</td>
                        <td>
                            请 &times;&times;&times; 到 &times;&times;&times;
                        </td>
                        <td>
                            <input v-model="editSceneData.outputText" placeholder="就诊" class="form-control MarginLeft20" type="text">
                        </td>
                    </tr>
                </table>
                <div class="TxtRight">
                    <button class="btn btn-success" id="editSceneBtn" @click="editscene()">编辑</button><button class="btn MarginLeft20 btn-warning" @click="aditSceneShow = false">取消</button>
                </div>
            </div>
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
                    sceneID: null,
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
				},
              sceneShow: false,
              addSceneData: {
                name: '',
                activeLocal: '0',
                rankWay: 'snumber',
                delayTime: '5',
                waitNum: '3',
                passedWaitNum: '0',
                reviewWaitNum: '0',
                outputText: '就诊'
              },
              aditSceneShow: false,
              editSceneData: {
                name: '',
                activeLocal: '0',
                rankWay: 'snumber',
                delayTime: '5',
                waitNum: '3',
                passedWaitNum: '0',
                reviewWaitNum: '0',
                outputText: '就诊'
              },
              editSceneId: null,
              editSceneIndex: null
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
			},
            sceneUrl() {
              return this.$store.getters.postUrl('manager', 'scene')
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
			chooseScene(id, name) {
			  this.form.sceneID = id
              this.form.scene = name
//              alert(this.form.sceneID)
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
                        sceneID: this.form.sceneID,
						descText: this.form.descText,
						filter: `queue='${this.form.filter}'`,
						workerLimit: this.form.workerLimit
					}).then((res) => {
//					  alert(this.form.sceneID)
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
//					console.log(this.form.sceneSupportList)
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
					console.log(this.queueInfoUrl)
				}, (res) => {
					console.log('failed')
				})
			},
			setParas() {
//				console.log(this.queryParas.info)
				this.form.name = this.queryParas.info.name
				this.form.scene = this.queryParas.info.scene
                this.form.sceneID = this.queryParas.info.sceneID
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
			},
            addscene () {
                function isNull (str) {
                  if (str ==='') return true
                  var regu = '^[ ]+$'
                  var re = new RegExp(regu)
                  return re.test(str)
                }
                if (isNull(this.addSceneData.name)) {
                  this.$message({
                    type: 'warning',
                    message: '自定义名称不能为空!'
                  })
                  return
                }
                if (isNull(this.addSceneData.delayTime)) {
                  this.$message({
                    type: 'warning',
                    message: '延时时间不能为空!'
                  })
                  return
                }
                var re2 = /^([1-9]\d*|[0]{1,1})$/
                if (!re2.test(this.addSceneData.delayTime)) {
                  this.$message({
                    type: 'warning',
                    message: '延时时间必须为大于或等于0的整数!'
                  })
                  return
                }
                if (isNull(this.addSceneData.outputText)) {
                  this.$message({
                    type: 'warning',
                    message: '语音不能为空!'
                  })
                  return
                }
                document.getElementById('addSceneBtn').disabled = true
                var data = {
                  token: 'safe action',
                  action: 'addScene',
                  name: this.addSceneData.name,
                  activeLocal: this.addSceneData.activeLocal,
                  rankWay: this.addSceneData.rankWay,
                  delayTime: this.addSceneData.delayTime,
                  waitNum: this.addSceneData.waitNum,
                  reviewWaitNum: this.addSceneData.reviewWaitNum,
                  passedWaitNum: this.addSceneData.passedWaitNum,
                  outputText: this.addSceneData.outputText
                }
                this.axios.post(this.sceneUrl, data).then((res) => {
                  this.$message({
                    type: 'success',
                    message: '添加成功!'
                  })
                  this.sceneShow = false
                  document.getElementById('addSceneBtn').disabled = false
                  this.getSceneSupportList()
                }, (res) => {
                  console.log('failed')
                })
              },
            editscene () {
                function isNull (str) {
                  if (str ==='') return true
                  var regu = '^[ ]+$'
                  var re = new RegExp(regu)
                  return re.test(str)
                }
                if (isNull(this.editSceneData.name)) {
                  this.$message({
                    type: 'warning',
                    message: '自定义名称不能为空!'
                  })
                  return
                }
                if (isNull(this.editSceneData.delayTime)) {
                  this.$message({
                    type: 'warning',
                    message: '延时时间不能为空!'
                  })
                  return
                }
                var re2 = /^([1-9]\d*|[0]{1,1})$/
                if (!re2.test(this.editSceneData.delayTime)) {
                  this.$message({
                    type: 'warning',
                    message: '延时时间必须为大于或等于0的整数!'
                  })
                  return
                }
                if (isNull(this.editSceneData.outputText)) {
                  this.$message({
                    type: 'warning',
                    message: '语音不能为空!'
                  })
                  return
                }
                document.getElementById('editSceneBtn').disabled = true
                var data = {
                  token: 'safe action',
                  action: 'editScene',
                  sceneID: this.editSceneId + '',
                  name: this.editSceneData.name,
                  activeLocal: this.editSceneData.activeLocal + '',
                  rankWay: this.editSceneData.rankWay,
                  delayTime: this.editSceneData.delayTime + '',
                  waitNum: this.editSceneData.waitNum + '',
                  reviewWaitNum: this.editSceneData.reviewWaitNum + '',
                  passedWaitNum: this.editSceneData.passedWaitNum + '',
                  outputText: this.editSceneData.outputText
                }
                this.axios.post(this.sceneUrl, data).then((res) => {
                  console.log(res)
                  this.$message({
                    type: 'success',
                    message: '编辑成功!'
                  })
                  this.aditSceneShow = false
                  document.getElementById('editSceneBtn').disabled = false
                  this.getSceneSupportList()
                }, (res) => {
                  console.log('failed')
                })
              },
            getEditScene (id, index) {
                var data = {
                  token: 'safe action',
                  action: 'getSceneInfo',
                  sceneID: id
                }
                this.axios.post(this.sceneUrl, data).then((res) => {
    //          console.log(res)
                  this.editSceneData = res
                  this.aditSceneShow = true
                  this.editSceneId = id
                  this.editSceneIndex = index
                }, (res) => {
                  console.log('failed')
                })
              }
		}
	}
</script>

