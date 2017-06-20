<style scoped>
.offline {
  color: red;
}
.middleline-topbar {
  margin-top: 64px;    
}
 .station-content {
 	width:100%;
 }
 .station-content .nav-bar {
    width:200px;
    float: left;
    background: #109EFC;
    color:#fff;
    /* heigth:100vh; */
    /* min-height:980px; */
    text-align: center;
 }
 .station-content .nav-bar .station-name {
    font-size: 14px;
    color: #FFFFFF;
    border-bottom: 1px solid rgba(241,241,241,.5);
    padding:10px 0;
 }
  .station-content .nav-bar>.tab-title {
  	height:50px;
  	line-height: 50px;
  	font-size: 14px;
  	position:relative;
  }
 .station-content .nav-bar>.tab-title.isChoose,
 .station-content .nav-bar>.tab-title:hover {
    background: #4DB8FF; 
    opacity: 1
 }
 .station-content .nav-bar>.tab-title::after {
    content:' ';
    display: inline-block;
    width:0px;
    height: 0px;
    border-right: 20px;
    border-color: #ff3300 #ffffff #ffffff #ffffff;
    position:absolute;
    right:10px;
    top:10px;
 }
 .station-content .nav-info {
    margin-left:220px;
 }
 
 .nav-info-content {
 	 padding: 16px;
 }
 
 .clearfix {
 /*	display: block
 	margin-left: */
 }
 .no-left-padding{
 	padding-left: 0
 }

 .tab-title {
 	font-size: 14px;
 	opacity: 0.8
 }

 .tab-title:hover {
 	opacity: 1;
 }

 .station-name {
 	font-size: 14px;
 }

.table thead, .table td, .table th {
	font-size: 14px;
	font-weight: 300;
}

.table th {
	color: #A5A5A5;
}

.edit {
	color: #0097FB;
}

.config {
	position: fixed !important;
    bottom: 60px;
    width: 200px;
    background-color: #0091F1;
}
.station .station-content .nav-info tr td {
	vertical-align: middle;
}
.head_pic {
	max-width:50px;
	max-height:40px;
}

</style>
<template lang="html">
 	<div class="station">
 			<middleLine height='8' class="middleline-topbar"></middleLine>
            <div class="station-content  container info no-left-padding">

	               <div class="nav-bar" style="height: calc(100vh - 72px);position:fixed;">
	               	     <div class="tab-title  text-center custom-cursor-pointer" @click="showInfo(0)" :class="{'isChoose':showInfoNumber == 0}">语音盒</div>
	               	     <div class="tab-title text-center custom-cursor-pointer" @click="showInfo(1)" :class="{'isChoose':showInfoNumber == 1}">报到机</div>
	               </div>
	               <div class="nav-info">
	               	   <div class="workList nav-info-content" style="overflow:auto" v-if="showInfoNumber == 0">
	               	   	   <table class="table">
	               	   	        <thead>
	               	   	           <tr>
	               	   	        	    <th>编号</th>
	               	   	        	    <th>语音盒IP</th>
	               	   	        	    <th>所属分诊台</th>
	               	   	        	    <th>在线情况</th>
	               	   	        		  <th>操作</th>
	               	   	           </tr>
	               	   	        </thead>
	               	   	   	    <tbody>
	               	   	   	        <div class="noData" v-if="voiceBoxList.length == 0">没有语音盒</div>
	               	   	   	        <tr v-for="box in voiceBoxList">
	               	   	   	            <td>{{box.id}}</td>
	               	   	   	            <td>{{box.ip}}</td>
	               	   	   	        	<td>{{box.stationName}}</td>
	               	   	   	        	<td :class="[box.status === 'online' ? '' : 'offline']">{{box.status | getOnlineStatus}}</td>
	               	   	   	        	<td><span class="custom-cursor-pointer edit" @click="edit('editVoiceBox', box.id)">编辑</span></td>
	               	   	   	        </tr>	
	               	   	   	    </tbody>
	               	   	   </table>
	               	   </div>
	               	   <div class="checkInMcList nav-info-content" v-if="showInfoNumber == 1">
		               	   <table class="table">
		               	   		<thead>
		               	   			<tr>
			               	        	<th>编号</th>
			               	        	<th>报到机IP</th>
			               	        	<th>所属分诊台</th>
			               	        	<th>在线情况</th>
		               	        	</tr>
		               	   		</thead>
		               	   	    <tbody>
		               	   	         <div class="noData" v-if="checkInMcList.length == 0">没有报到机</div>
		               	   	        <tr v-for="mc in checkInMcList">
		               	   	        	<td>{{mc.id}}</td>
		               	   	        	<td>{{mc.ip}}</td>
		               	   	        	<td>{{mc.stationName}}</td>
		               	   	        	<td :class="[mc.status === 'online' ? '' : 'offline']">{{mc.status | getOnlineStatus}}</td>
		               	   	        </tr>	
		               	   	    </tbody>
		               	   </table>
	               	   </div>
	               </div>
            </div>
 	</div>   	
</template>
<script >
    import middleLine from '../../common/middleLine/middleLine'
    import getOnlineStatus from '../../filter/getOnlineStatus'
    import stringSlice from '../../filter/stringSlice'
	export default {
		name: 'station',
		data() {
			return {
				voiceBoxList: '',
				checkInMcList: ''
			}
		},
		computed: {
			voiceBoxUrl() {
				return this.$store.getters.postUrl('manager', 'mediabox')
			},
			checkInMcUrl() {
				return this.$store.getters.postUrl('manager', 'CheckInDev')
			},
			showInfoNumber() {
				return Number(this.$store.state.tab.tabShowInfoNumber)
			}
		},
		components: {
			middleLine
		},
		created() {
           this._init()
		},
		mounted() {
		},
		methods: {
			_init() {
				this.getVoiceBoxList()
				this.getCheckInMcList()
			},
			getVoiceBoxList() {
				this.axios.post(this.voiceBoxUrl, {
					action: 'getListAll'
				}).then((res) => {
					this.voiceBoxList = res.list
				}, (res) => {
					console.log('failed')
				})
			},
			getCheckInMcList() {
				this.axios.post(this.checkInMcUrl, {
					action: 'getListAll'
				}).then((res) => {
					this.checkInMcList = res.list;
				}, (res) => {
					console.log('failed ')
				})
			},
			// 显示右侧内容
			showInfo(num) {
				this.$store.commit('changeTab', {
					whichTab: 'tabShowInfoNumber',
					num: num
				});
			},
			edit(stateName, id) {
        this.$router.push({
        	name: stateName,
        	query: {
        		id: id
        	}
        })
			}
		}
	}
</script>

