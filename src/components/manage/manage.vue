<template lang="html">
	<div class="manage">
		<div class="header-box">
			<div class="container manage-header">
	            <ul class="clearfix">
		            <li @click="goToState('stationList', 0)" id="fenzhentai" class="manage-tab  custom-cursor-pointer">
			            <div class="label" :class="{'isChoose':showInfoNumber == 0}"><i class="iconfont icon-fenzhentai"></i><h2>分诊台</h2></div>
					</li>
					<li @click="goToState('terminalManage', 5)" id="fenzhentai" class="manage-tab custom-cursor-pointer">
						<div class="label" :class="{'isChoose':showInfoNumber == 5}"><i class="iconfont icon-shujufenxi"></i><h2>终端管理</h2></div>
					</li>
					<li @click="goToState('stationList', 1)" id="fenzhentai" class="manage-tab custom-cursor-pointer">
						<div class="label" :class="{'isChoose':showInfoNumber == 1}"><i class="iconfont icon-shujufenxi"></i><h2>数据分析</h2></div>
					</li>
					<li @click="goToState('stationList', 2)" id="fenzhentai" class="manage-tab custom-cursor-pointer">
						<div class="label" :class="{'isChoose':showInfoNumber == 2}"><i class="iconfont icon-paibanguanli"></i><h2>排班管理</h2></div>
					</li>
					<li @click="goToState('stationList', 3)" id="fenzhentai" class="manage-tab custom-cursor-pointer">
						<div class="label" :class="{'isChoose':showInfoNumber == 3}"><i class="iconfont icon-weixinguanli"></i><h2>微信管理</h2></div>
					</li>
					<li @click="goToState('userManage', 4)" id="fenzhentai" class="manage-tab custom-cursor-pointer">
						<div class="label" :class="{'isChoose':showInfoNumber == 4}"><i class="iconfont icon-yonghuguanli1"></i><h2>用户管理</h2></div>
					</li> 
	            </ul>
	            <div>
	            	<div class="logout pull-right custom-cursor-pointer" @click="logout"><i class="iconfont icon-tuichu"></i><h2>退出</h2></div>
	            </div>
		    </div>
		</div>
	    <keep-alive>
	      <router-view v-if="$route.meta.keepAlive"></router-view>
	    </keep-alive>
	    <router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>
<script>
	export default {
		name: 'manage',
		created() {
			console.log('created')
			this._init()
		},
		computed: {
            showInfoNumber() {
            	return Number(this.$store.state.tab.tabShowMoudleNum)
            }
		},
		methods: {
			_init() {
                this.goToState('stationList', 0)
			},
			goToState(state, num) {
				this.$store.commit('changeTab', {
					whichTab: 'tabShowMoudleNum',
					num: num
				});
                this.$router.push({name: state})
			},
			logout() {
				var flag = confirm('确定退出？')
				if (!flag) {
				 	return;
				}
				this.$store.commit('logout');
				this.goToState('login')
				// 退出时 清除实例
				this.$destroy()
			}
		}
	}
</script>

<style lang="stylus" scoped>
h2,h3,ul,label
	margin: 0
	padding: 0
	
h2, h3
	font-weight: 200

h2
	font-size: 18px

// h3
// 	font-size: 20px

.header-box
	width: 100%
	position: fixed
	top: 0
	background-image: linear-gradient(45deg, #2a82f3 0%, #00b0ff 100%)
	z-index: 666

.manage-header
	height: 64px
	display: flex
	align-items: center
	justify-content: space-between

.container:after, .container:before
	content: none
	
.clearfix
	display: flex
	width: 768px
	@media screen and (max-width: 850px)
		margin: 0 auto
		padding: 0
    	
.iconfont
	font-size: 34px
	margin-right: 15px
	
.manage-tab
	// float: left
	color:#fff
	padding: 0
	margin-right: 1em
	// input
	// 	display: none
	.label
		opacity: 0.5
		display: flex
		align-items: center
		font-weight: normal
		
	.label:hover
		opacity: 1
		font-weight: medium
		i
			font-weight: normal
	@media (max-width: 540px)
		width: 50%

	@media (max-width: 1078px)
		margin: 0
		padding: 0
		font-size: 18px
		
@media (min-width: 1078px)	
	.manage-tab:first-child
		margin-right: 1.2em
		
.logout
	display:flex
	justify-content: center
	align-items: center
	color: #fff
	opacity: 0.5

.logout:hover
	opacity: 1
	
.userManage
	float: right
div.label.isChoose 
	opacity: 1
// input[type=radio]:checked + label {
//     opacity: 1
// }

	
</style>