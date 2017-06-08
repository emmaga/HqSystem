<style scoped>


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
    <div>
 	<div class="station">
 			<div class="top-bar">
 				<div class="container settings">
 					<div class="capital">
 						<span>分诊台</span>/{{stationName}} ( {{stationID}} )
 					</div>
	                <div v-if="showInfoNumber == 0" class="btn-bar">
	 	               	<div class="item btn btn-success" @click="add('addWorker', stationName)">添加医生</div>
	 	               	<div class="item btn btn-warning" @click="add('batchAddWorker', stationName)">导入医生</div>
	                </div>
	               <div v-if="showInfoNumber == 1" class="btn-bar">
		               	<div class="item btn btn-success" @click="add('addQueue', stationName)">添加队列</div>
	               </div>
	               <div v-if="showInfoNumber == 2" class="btn-bar">
		               	<div class="item btn btn-success" @click="add('addCaller', stationName)">添加叫号器</div>
	               </div>
 				</div>
 			</div>
 			<middleLine height='8' class="middleline-topbar"></middleLine>
            <div class="station-content  container info no-left-padding">

	               <div class="nav-bar" style="height: calc(100vh - 136px);position:fixed;">

	               	     <div class="tab-title  text-center custom-cursor-pointer" @click="showInfo(0)" :class="{'isChoose':showInfoNumber == 0}">医生信息</div>
	               	     <div class="tab-title text-center custom-cursor-pointer" @click="showInfo(1)" :class="{'isChoose':showInfoNumber == 1}">队列</div>
	               	     <div class="tab-title text-center custom-cursor-pointer" @click="showInfo(2)" :class="{'isChoose':showInfoNumber == 2}">叫号器</div>

	               	     <div class="tab-title text-center custom-cursor-pointer config" @click="edit('editStation', {'stationID':stationID}, stationName )">配置分诊台</div>
	               </div>
	               <div class="nav-info">
	               	   <div class="workList nav-info-content" style="overflow:auto" v-if="showInfoNumber == 0">
	               	   	   <table class="table">
	               	   	        <thead>
	               	   	           <tr>
	               	   	        	    <th>编号</th>
	               	   	        	    <th>姓名</th>
	               	   	        	    <th>职称</th>
	               	   	        	    <th>科室</th>
	               	   	        		<th>头像</th>
	               	   	        		<th>操作</th>
	               	   	           </tr>
	               	   	        </thead>
	               	   	   	    <tbody>
	               	   	   	        <div class="noData" v-if="workerList.length == 0">没有医生</div>
	               	   	   	        <tr v-for="worker in workerList">
	               	   	   	            <td>{{worker.id}}</td>
	               	   	   	            <td>{{worker.name}}</td>
	               	   	   	        	<td>{{worker.title}}</td>
	               	   	   	        	<td>{{worker.department}}</td>
	               	   	   	        	<td class="head_pic_td"><img :src="worker.headPic" alt="" class="head_pic"></td>
	               	   	   	        	<!-- <td class="head_pic_td">头像</td> -->
	               	   	   	        	<td><span class="custom-cursor-pointer edit" @click="edit('editWorker', worker, stationName)">编辑</span></td>
	               	   	   	        </tr>	
	               	   	   	    </tbody>
	               	   	   </table>
	               	   </div>
	               	   <div class="callerList nav-info-content" v-if="showInfoNumber == 1">
		               	   <table class="table">
		               	       	<thead>
			               	       	<tr>
			               	       		<th>ID</th>
			               	        	<th>队列名字</th>
			               	        	<th>系统拼接队列关键字</th>
			               	        	<th>策略</th>
			               	        	<th>操作</th>
			               	        </tr>
		               	       	</thead>
		               	   	    <tbody>
		               	   	        <div class="noData" v-if="queueList.length == 0">没有队列</div>
		               	   	        <tr v-for="queue in queueList">
		               	   	        	<td>{{queue.id}}</td>
		               	   	        	<td>{{queue.name}}</td>
		               	   	        	<td>{{queue.filter | stringSlice(7, -1)}}</td>
                                        <td>{{queue.scene}}</td>
		               	   	        	<td><span class="custom-cursor-pointer edit" @click="edit('editQueue', queue, stationName)">编辑</span></td>
		               	   	        </tr>	
		               	   	    </tbody>
		               	   </table>
	               	   </div>
	               	   <div class="queueList nav-info-content" v-if="showInfoNumber == 2">
		               	   <table class="table">
		               	   		<thead>
		               	   			<tr>
			               	        	<th>名称</th>
			               	        	<th>类型</th>
			               	        	<th>IP</th>
			               	        	<th>位置</th>
			               	        	<th>优先队列</th>
			               	        	<th>操作</th>
		               	        	</tr>
		               	   		</thead>
		               	   	    <tbody>
		               	   	         <div class="noData" v-if="callerList.length == 0">没有叫号器</div>
		               	   	        <tr v-for="caller in callerList">
		               	   	        	<td>{{caller.name}}</td>
		               	   	        	<td>{{caller.type | getCallerType}}</td>
		               	   	        	<td>{{caller.ip}}</td>
		               	   	        	<td>{{caller.pos}}</td>
		               	   	        	<td>{{caller.priorQueue}}</td>
		               	   	        	<td><span class="custom-cursor-pointer edit" @click="edit('editCaller', caller, stationName)">编辑</span></td>
		               	   	        </tr>	
		               	   	    </tbody>
		               	   </table>
	               	   </div>
	               </div>
            </div>
 	</div>   	
    </div>
</template>
<script >
    import middleLine from '../../common/middleLine/middleLine'
    import getCallerType from '../../filter/getCallerType'
    import stringSlice from '../../filter/stringSlice'
	export default {
		name: 'station',
		data() {
			return {
				stationInfo: '',
				workerList: '',
				queueList: '',
				callerList: ''
			}
		},
		computed: {
			serverUrl() {
				return this.$store.getters.postUrl('station')
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
			stationID() {
				return this.$route.query.id;
			},
			stationName() {
				return decodeURIComponent(this.$route.query.name);
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
				this.getWorkerList()
				this.getQueueList()
				this.getCallerList()
			},
			getWorkerList() {
				this.axios.post(this.workerUrl, {
					action: 'getList',
					stationID: this.stationID
				}).then((res) => {
					this.workerList = res.workerList;
				}, (res) => {
					console.log('failed')
				})
			},
			getQueueList() {
				this.axios.post(this.queueInfoUrl, {
					action: 'getList',
					stationID: this.stationID
				}).then((res) => {
					this.queueList = res.list;
				}, (res) => {
					console.log('failed ')
				})
			},
			getCallerList() {
				this.axios.post(this.callerUrl, {
					action: 'getList',
					stationID: this.stationID
				}).then((res) => {
					this.callerList = res.list;
				}, (res) => {
					console.log('failed')
				})
			},
			// 显示右侧内容
			showInfo(num) {
				this.$store.commit('changeTab', {
					whichTab: 'tabShowInfoNumber',
					num: num
				});
			},
			add(stateName, stationName) {
				this.$router.push({
					name: stateName,
					query: {
						stationID: this.stationID,
						stationName: stationName
					}
				})
			},
			edit(stateName, info, stationName) {
                this.$router.push({
                	name: stateName,
                	query: {
                		stationID: this.stationID,
                		info: info,
                		stationName: stationName
                	}
                })
			}
		}
	}
</script>

