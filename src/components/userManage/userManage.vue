<style scoped>


 .station-content {
 	width:100%;
 }
 .station-content .nav-bar {
    width:200px;
    float: left;
    background: #109EFC;
    color:#fff;
    heigth:100%;
    min-height:980px;
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
  .station-content .nav-bar>.tab-title.isChoose {
   background: #4DB8FF; 
  }
 .station-content .nav-bar>.tab-title:hover {
    background: #4DB8FF; 
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

 
 .nav-info-content {
 	 padding:37px 35px;
 }
 .nav-info-content {

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
.userManage {

	margin-top:64px;

}

</style>
<template lang="html">
    <div>
	 	<div class="userManage">
	            <div class="station-content  container info no-left-padding">
		               <div class="nav-info">
		               	   <div class="workList nav-info-content" >
		               	   	   <table class="table">
		               	   	        <thead>
		               	   	           <tr>
		               	   	        	    <th>分诊台ID</th>
		               	   	        	    <th>名字</th>
		               	   	        	    <th>用户</th>
		               	   	        	    <th>密码</th>
		               	   	        	    <th>类型</th>
		               	   	        		<th>用户ID</th>
		               	   	        		<th>操作</th>
		               	   	           </tr>
		               	   	        </thead>
		               	   	   	    <tbody>
		               	   	   	        <div class="noData" v-if="accountListLength == 0">没有用户</div>
		               	   	   	        <tr v-for="account in accountList">
		               	   	   	            <td>{{account.stationID}}</td>
		               	   	   	            <td>{{account.descText}}</td>
		               	   	   	            <td>{{account.user}}</td>
		               	   	   	        	<td>{{account.password}}</td>

		               	   	   	        	<td>{{account.type}}</td>
		               	   	   	        	<td>{{account.id}}</td>

		               	   	   	        	<td @click="edit('editUser', account)" class="custom-cursor-pointer edit">编辑</td>

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
	export default {
		name: 'userManage',
		data() {
			return {
				accountList: [],
				accountListLength: 0
			}
		},
		computed: {
			serverUrl() {
				return this.$store.getters.postUrl('manager', 'stationAccount')
			}
		},
		components: {
		},
		created() {
           this._init()
		},
		mounted() {
		},
		methods: {
			_init() {
				this.getList()
			},
			getList() {
				this.axios.post(this.serverUrl, {
					action: 'getList'
				}).then((res) => {
					this.accountList = res.accountList;
					this.accountListLength = this.accountList.length;
				}, (res) => {
					console.log('failed')
				})
			},
			edit(stateName, info) {
                this.$router.push({
                	name: stateName,
                	query: {
                		info: info
                	}
                })
			}
		}
	}
</script>

