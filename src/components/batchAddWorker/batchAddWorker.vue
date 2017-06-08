<template lang="html">
	<div class="batchAddWorker">
		<div class="top-bar">
			<div class="container settings">
				<div class="capital">
					<span>分诊台</span>/{{stationName}}/导入医生
				</div>
				<div class="btn-bar">
					<div class="item btn btn-success" @click="batchAddWorker">导入</div>
	     			<div class="item btn btn-warning" @click="cancel">取消</div>
				</div>
			</div>
		</div>
		<middleLine height='8' class="middleline-topbar"></middleLine>
	     <div class="container info">
     		<h3>数据库信息</h3>
     		<span class="custom-form-info">
     			<span class="untest-info" v-if="showInfo.DBtestInfoNum == 0"><img :src="resourceImg.untestImg" alt="" >未测试连接</span>
     			<span class="failed-info" v-if="showInfo.DBtestInfoNum == 1"><img :src="resourceImg.failedImg" alt="" >连接失败</span>
     			<span class="success-info" v-if="showInfo.DBtestInfoNum == 2"><img :src="resourceImg.successImg" alt="" >连接成功</span>
     		</span> 
     		<vue-form :state="formstate.form1"  class="form-horizontal" @submit.prevent="testDB">
     			<div class="form-flex-container">
     				<validate  class="form-item form-group flex-container">
	     		      <label  class="control-label cutom-require-item">数据库类型</label>
	     		      <div class="input-bar">
	     		      	<input v-model="form.DBType" required name="DBType" :class="[fieldClassName(formstate.form1.DBType),'form-control']" />
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-item form-group flex-container">
	     		      <label  class="control-label cutom-require-item">编码</label>
	     		      <div class="input-bar">
	     		      	<input v-model="form.charset" required name="charset" :class="[fieldClassName(formstate.form1.charset),'form-control']" />
	     		      </div>
	     		    </validate>
     				<validate  class="form-item form-group flex-container">
	     		      <label  class="control-label cutom-require-item">数据库地址</label>
	     		      <div class="input-bar">
	     		      	<input v-model="form.host" required name="host" :class="[fieldClassName(formstate.form1.host),'form-control']"/>
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-item form-group flex-container">
	     		      <label  class="control-label cutom-require-item">端口</label>
	     		      <div class="input-bar">
	     		      	<input v-model="form.port" required name="port" :class="[fieldClassName(formstate.form1.port),'form-control']" />
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-item form-group flex-container">
	     		      <label  class="control-label cutom-require-item">用户名</label>
	     		      <div class="input-bar">
	     		      	<input v-model="form.user" required name="user" :class="[fieldClassName(formstate.form1.user),'form-control']" />
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-item form-group flex-container">
	     		      <label  class="control-label cutom-require-item">密码</label>
	     		      <div class="input-bar">
	     		      	<input v-model="form.passwd" required name="passwd" :class="[fieldClassName(formstate.form1.passwd),'form-control']" />
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-item form-group flex-container">
	     		      <label  class="control-label cutom-require-item">数据库名（DBName）</label>
	     		      <div class="input-bar">
	     		      	<input v-model="form.DBName" required name="DBName" :class="[fieldClassName(formstate.form1.DBName),'form-control']" />
	     		      </div>
	     		    </validate>
	     		    <validate  class="form-item form-group flex-container">
	     		      <label  class="control-label cutom-require-item">数据库表名(Table)</label>
	     		      <div class="input-bar">
	     		      	<input v-model="form.table" required name="table" :class="[fieldClassName(formstate.form1.table),'form-control']" />
	     		      </div>
	     		    </validate>
     			</div>
     			<div class="test-btn"><button type="submit" class="center-block ">连接测试</button></div>
     		    
     		</vue-form>
     		<h3>SQL信息</h3>
     		<span class="custom-form-info">
     			<span class="untest-info" v-if="showInfo.SQLtestInfoNum == 0"><img :src="resourceImg.untestImg" alt="" >未测试连接</span>
     			<span class="failed-info" v-if="showInfo.SQLtestInfoNum == 1"><img :src="resourceImg.failedImg" alt="" >连接失败</span>
     			<span class="success-info" v-if="showInfo.SQLtestInfoNum == 2"><img :src="resourceImg.successImg" alt="" >连接成功</span>
     		</span> 
     		<vue-form :state="formstate.form2"  class="form-horizontal" @submit.prevent="testSQL">
     			<div class="form-flex-container">
     				<validate  class="form-item form-group flex-container">
	     		        <label  class="control-label cutom-require-item">医生编号(ID)</label>
	     		        <div class="input-bar">
	     		        	<input v-model="form.aliasID" required name="aliasID":class="[fieldClassName(formstate.form2.aliasID),'form-control']" />
	     		        </div>
	     		      </validate>
	     		      <validate  class="form-item form-group flex-container">
	     		        <label  class="control-label cutom-require-item">医生姓名(Name)</label>
	     		        <div class="input-bar">
	     		        	<input v-model="form.aliasName" required name="aliasName" :class="[fieldClassName(formstate.form2.aliasName),'form-control']" />
	     		        </div>
	     		      </validate>
	     		      <validate  class="form-item form-group flex-container">
	     		        <label  class="control-label cutom-require-item">所属科室(Department)</label>
	     		        <div class="input-bar">
	     		        	<input v-model="form.aliasDepartment" required name="aliasDepartment" :class="[fieldClassName(formstate.form2.aliasDepartment),'form-control']" />
	     		        </div>
	     		      </validate>
	     		      <validate  class="form-item form-group flex-container">
	     		        <label  class="control-label cutom-require-item">医生职称(title)</label>
	     		        <div class="input-bar">
	     		        	<input v-model="form.aliasTitle" required  name="aliasTitle" :class="[fieldClassName(formstate.form2.aliasTitle),'form-control']" />
	     		        </div>
	     		      </validate>
	     		      <validate  class="form-item form-group flex-container">
	     		        <label  class="control-label">医生描述(DescText)</label>
	     		        <div class="input-bar">
	     		        	<input v-model="form.aliasDescText"  name="aliasDescText" :class="[fieldClassName(formstate.form2.aliasDescText),'form-control']" />
	     		        </div>
	     		      </validate>
	     		      <validate  class="form-item form-group flex-container">
	     		        <label  class="control-label">医生照片(HeadPic)</label>
	     		        <div class="input-bar">
	     		        	<input v-model="form.aliasHeadPic"  name="aliasHeadPic" :class="[fieldClassName(formstate.form2.aliasHeadPic),'form-control']" />
	     		        </div>
	     		      </validate>
     			</div>
     		      <div class="form-group flex-container">
     		      	<label for="" class="control-label">生成SQL语句</label>
     		      	<div class="input-bar">
     		      		<textarea  :class="{'form-control':formControlObj.formControl}" v-model="form.sqlLang"></textarea>
     		      	</div>
     		      </div>
     		      <div class="test-btn"><button type="submit" class="center-block ">连接测试</button></div>
     		</vue-form>
     		<h3>账号信息</h3>
     		<form novalidate class="form-horizontal footer-space">
     		     <div class="form-group flex-container">
     		     	<label for="" class="control-label">账号：</label>
     		     	<div class="input-bar">
     		     		<input type="radio" class="" checked> &nbsp; 同医生编号
     		     	</div>
     		     </div>
     		     <div class="form-group flex-container">
     		     	<label for="" class="control-label">密码：</label>
     		     	<div class="input-bar">
     		     		<input type="radio" class="" checked> &nbsp; 123456(默认密码)
     		     	</div>
     		     </div>
     		</form>

	     	
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
    import utils from 'common/utils/utils'
    import resourceImg from 'img'
    Vue.use(VueForm)
	export default {
		name: 'batchAddWorker',
		data() {
			return {
				formstate: {
					form1: {},
					form2: {}
				},
				form: {
					name: '',
					describe: '',
					DBType: 'mysql',
					host: '192.168.17.184',
					port: '3306',
					charset: 'utf8',
					user: 'root',
					passwd: '123456',
					DBName: 'HisQueue',
					table: 'workers_import',
					aliasName: 'name',
					aliasID: 'id',
					aliasTitle: 'title',
					aliasDepartment: 'department',
					aliasDescText: '',
					aliasHeadPic: '',
					sqlLang: ''
				},
				formControlObj: {
					form1BtnVal: '',
					form2BtnVal: '',
					formControl: true
				},
				formBtnVal: ['连接失败', '连接测试', '连接成功'],
				modal: {
					modalShow: false,
					modalContent: ''
				},
				resourceImg: resourceImg,
				showInfo: {
					DBtestInfoNum: 0,  // 数据库连接提示信息
					SQLtestInfoNum: 0  // SQL连接提示信息
				}
			}
		},
		computed: {
			stationID() {
				return Number(this.$route.query.stationID);
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
			console.log(this.$route.name, this.$route, this.$route.query)
		},
		methods: {
			_init() {
				this.formControlObj.form1BtnVal = this.formBtnVal[1]
				this.formControlObj.form2BtnVal = this.formBtnVal[1]
			},
			// 测试数据库连接  测试工作站数据源，测试数据库
			testDB() {
				if (this.formstate.form1.$invalid) {
					return
				} else {
					this.axios.post(this.workerUrl, {
						action: 'testSource',
						stationID: this.stationID,
						DBType: this.form.DBType,
						host: this.form.host,
						port: this.form.port,
						charset: this.form.charset,
						user: this.form.user,
						passwd: this.form.passwd,
						DBName: this.form.DBName,
						table: this.form.table
					}).then((res) => {
						if (res.result === 'failed') {
							// 标记工作站数据源连接不成功
							this.formstate.form1.linkTest = false;
							this.modal.modalContent = '连接失败，请重试';
							this.modal.modalShow = true;
							this.formControlObj.form1BtnVal = this.formBtnVal[0]
							this.showInfo.DBtestInfoNum = 1;
						} else {
							this.formstate.form1.linkTest = true;
							this.formControlObj.form1BtnVal = this.formBtnVal[2];
							this.modal.modalContent = '连接成功';
							this.modal.modalShow = true;
							this.showInfo.DBtestInfoNum = 2;
						}
					}, (res) => {
						console.log(res)
						console.log('failed')
					})
				}
			},
			// 测试 sql 连接   测试工作站数据源，测试数据库
			testSQL() {
				if (!this.formstate.form1.linkTest) {
                   this.modal.modalContent = '请先测试数据库信息';
                   this.modal.modalShow = true;
                   return;
				}
				if (this.formstate.form2.$invalid) {
					return
				} else {
					if (this.form.aliasHeadPic.length === 0) {
						this.form.aliasHeadPic = '';
					}
					this.axios.post(this.workerUrl, {
						action: 'testSourceConfig',
						stationID: this.stationID,
						DBType: this.form.DBType,
						host: this.form.host,
						port: this.form.port,
						charset: this.form.charset,
						user: this.form.user,
						passwd: this.form.passwd,
						DBName: this.form.DBName,
						table: this.form.table,
						aliasName: this.form.aliasName,
						aliasID: this.form.aliasID,
						aliasTitle: this.form.aliasTitle,
						aliasDepartment: this.form.aliasDepartment,
						aliasDescText: this.form.aliasDescText,
						aliasHeadPic: this.form.aliasHeadPic
					}).then((res) => {
						if (res.result === 'failed') {
							// 标记工作站数据源连接不成功
							this.formstate.form2.linkTest = false;
							this.modal.modalContent = '连接失败，请重试';
							this.modal.modalShow = true;
							this.formControlObj.form2BtnVal = this.formBtnVal[0]
							this.showInfo.SQLtestInfoNum = 1;
						} else {
							this.modal.modalContent = '连接成功';
							this.modal.modalShow = true;
							this.form.sqlLang = res.sql;
							this.formstate.form2.linkTest = true;
							this.formControlObj.form2BtnVal = this.formBtnVal[2];
							this.showInfo.SQLtestInfoNum = 2;
						}
					}, (res) => {
						console.log(res)
						console.log('failed')
					})
				}
			},
			batchAddWorker() {
				console.log('batchAddWorker')
				if (!this.formstate.form1.linkTest) {
                   this.modal.modalContent = '请先测试数据库信息';
                   this.modal.modalShow = true;
                   return;
				}
				if (!this.formstate.form2.linkTest) {
	               this.modal.modalContent = '请先测试SQL连接信息';
	               this.modal.modalShow = true;
	               return;
				}
				this.axios.post(this.workerUrl, {
					action: 'import',
					stationID: this.stationID,
					DBType: this.form.DBType,
					host: this.form.host,
					port: this.form.port,
					charset: this.form.charset,
					user: this.form.user,
					passwd: this.form.passwd,
					DBName: this.form.DBName,
					table: this.form.table,
                    aliasName: this.form.aliasName,
                    aliasID: this.form.aliasID,
                    aliasTitle: this.form.aliasTitle,
                    aliasDepartment: this.form.aliasDepartment,
                    aliasDescText: this.form.aliasDescText,
                    aliasHeadPic: this.form.aliasHeadPic
				}).then((res) => {
                   console.log(res)
                   // this.modal.modalShow = true;
                   // this.modal.modalContent = '保存成功';
                   alert('导入成功')
                   this.cancel()
				}, (res) => {
                    this.modal.modalShow = true;
                    this.modal.modalContent = '保存失败';
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

<style scoped>
a, button, input {
	webkit-tap-highlight-color: rgba(0,0,0,0);
	webkit-user-modify: read-write-plaintext-only;
	outline: none;
}


</style>