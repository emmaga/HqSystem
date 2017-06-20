<style scoped>
.form-slider {
	padding: 12px 12px;
	max-width: 400px;
  display: block;
  width: 100%;
  height: 34px;
}
.el-slider:after, .el-slider:before {
	display: none;
}
.head_pic {
	width:100px;
	margin-left: 50px;
}
.input-bar {
	margin-left: 15px;
}
.offline {
	color: red;
}
</style>

<template lang="html">
	<div>
		<div class="top-bar">
		    <div class="container settings">
				<div class="capital">
					终端管理/语音盒/编辑
				</div>
				<div class="btn-bar">
					<button :disabled="saving" class="item btn btn-success" @click="invokeEditVoiceBox">提交</button>
			     	<div class="item btn btn-warning" @click="cancel">取消</div>
			     	<div v-show="status === 'offline'" class="item btn btn-danger" @click="del">删除</div>
				</div>
			</div>
			
		</div>

		<middleLine height='8' class="middleline-topbar"></middleLine>
	     <div class="container info">
	     	<div class="row baseinfo">
     			<h3>基础信息</h3>
	     		<form class="form-horizontal" @submit.prevent="editVoiceBox">
	     		    <div  class="form-group flex-container">
	     		      <label  class="control-label">编号</label>
	     		      <div class="input-bar">
	     		      	{{ id }}
	     		      </div>
	     		    </div>
	     		    <div  class="form-group flex-container">
	     		      <label  class="control-label">IP地址</label>
	     		      <div class="input-bar">
	     		      	{{ ip }}
	     		      </div>
	     		    </div>
	     		    <div  class="form-group flex-container">
	     		      <label  class="control-label">所属分诊台</label>
	     		      <div class="input-bar">
	     		      	{{ stationName }}
	     		      </div>
	     		    </div>
	     		    <div  class="form-group flex-container">
	     		      <label class="control-label">在线状态</label>
	     		      <div class="input-bar">
	     		      	<div :class="[status === 'online' ? '' : 'offline']">{{ status | getOnlineStatus }}</div>
	     		      </div>
	     		    </div>
	     		    <h3>配置信息</h3>
	     		    <div class="form-group flex-container">
	     		    	<label class="control-label">语速</label>
	     		    		<div class="input-bar">
								    <el-slider class="form-slider" v-model="speed"></el-slider>
								  </div>
	     		    </div>
	     		    <div class="form-group flex-container">
	     		    	<label class="control-label">音量</label>
	     		    		<div class="input-bar">
								    <el-slider class="form-slider" v-model="volume"></el-slider>
								  </div>
	     		    </div>
	     		    <div class="form-group flex-container">
	     		    	<label class="control-label">音调</label>
	     		    		<div class="input-bar">
								    <el-slider class="form-slider" v-model="pitch"></el-slider>
								  </div>
	     		    </div>
	     		    <button type="submit" style="display:none" id="btn1">提交</button>
	     		  </form>
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
    import utils from 'common/utils/utils.js'
    import modal from '../../common/modal/modal'
	export default {
		name: 'editVoiceBox',
		data() {
			return {
				saving: false,
				id: '',
				ip: '',
				stationName: '',
        status: '',
				speed: 0,
				volume: 0,
				pitch: 0,
				modal: {
					modalShow: false,
					modalContent: ''
				}
			}
		},
		computed: {
			serverUrl() {
				return this.$store.getters.postUrl('manager', 'mediabox')
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
		methods: {
			_init() {
				this.id = this.queryParas.id
				this.getInfo()
			},
			formatTooltip(val) {
        return val / 100
      },
			invokeEditVoiceBox() {
        document.getElementById('btn1').click()
			},
			getInfo() {
				this.axios.post(this.serverUrl, {
					action: 'getInfo',
					id: this.id
				}).then((res) => {
          let info = res
          this.ip = info.ip
          this.pitch = info.pitch
          this.speed = info.speed
          this.volume = info.volume
          this.stationName = info.stationName
          this.status = info.status
				}, (res) => {
          this.modal.modalShow = true
          this.modal.modalContent = '读取语音盒信息失败'
				})
			},
			editVoiceBox() {
				this.saving = true
				this.axios.post(this.serverUrl, {
					action: 'edit',
					id: this.id,
					speed: this.speed,
					volume: this.volume,
					pitch: this.pitch
				}).then((res) => {
					// this.modal.modalShow = true;
					// this.modal.modalContent = '保存成功';
					this.saving = false
					alert('保存成功')
					// 返回上一步
					this.cancel()
				}, (res) => {
					this.saving = false
          this.modal.modalShow = true;
          this.modal.modalContent = '保存失败';
				})
			},
			del() {
				var flag = confirm('确定删除？')
				if (!flag) {
					return;
				}
				this.axios.post(this.serverUrl, {
					action: 'delete',
					id: this.id
				}).then((res) => {
          alert('删除成功')
          this.cancel()
				}, (res) => {
					alert('删除失败')
				})
			},
			cancel() {
				this.$router.go(-1)
			}
		}
	}
</script>

