<template lang="html">
	<div class="stationlist-box">
	       <middleLine height='8' class="middleline-topbar"></middleLine>
		   	<div class="card-container">
			   	<a class="card-box" @click="goToState('addStation', {'theLastStationID': theLastStationID})">
			   		<div class="card">
			   			<div class="card-bg xinjian" >
			   				<i class="iconfont icon-xinjianfenzhentai"></i>
			   			</div>
			   			<h3>新建分诊台</h3>
			   		</div>
			   	</a>
   				<a v-for="station in stationList" class="card-box" @click="goToStationDetail(station)">
   					<div class="card">
   						<i class="iconfont icon-fenzhentai2 card-bg"></i>
   						<h3>{{station.name}}</h3>
   					</div>
   				</a>
   				<a  class="card-box" v-if="stationListLength == 0">
   					暂无分诊台
   				</a>
		   	</div>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
	</div>
</template>
<script>
    import Vue from 'vue'
    import stationLogo from 'img/Shape.png'
    import middleLine from '../../common/middleLine/middleLine'

	export default {
		name: 'station',
		data() {
			return {
				stationList: '',
				stationListLength: 0,
				stationLogo: stationLogo,
				theLastStationID: -1 // 最后一次添加分诊台的id，如果没有，记为-1
			}
		},
		computed: {
			serverUrl() {
				return this.$store.getters.postUrl('manager', 'station')
			}
		},
		components: {
			middleLine
		},
		created() {
			this._init()
		},
		mounted() {
			console.log(this.$route.name)
		},
		methods: {
			_init() {
				this.axios.post(this.serverUrl, {
					action: 'getList'
				}).then((res) => {
                    this.stationList = res.stationList
                    this.stationListLength = this.stationList.length
                    // this.length = res.stationList.length
                    if (this.stationListLength) {
                    	this.theLastStationID = this.stationList[this.stationListLength - 1].id
                    }
				}, (res) => {
					console.log('failed')
				})
			},
			goToStationDetail(station) {
				this.$router.push(
					{ name: 'station',
					query: {
						id: station.id,
						name: encodeURIComponent(station.name)
					}
				})
			},
			goToState(state, info) {
				console.log(info)
				this.$router.push(
					{
						name: state,
						query: info
					})
			}
		}
	}
</script>

<style lang="stylus" scoped>
h2,h3
	margin: 0
	padding: 0

h2
	font-size: 24px
	
label,ul
	margin: 0

button
	border: none

// 去掉button等默认点击效果 
a, button, input
	webkit-tap-highlight-color: rgba(0,0,0,0)
	webkit-user-modify: read-write-plaintext-only
	outline: none
	
.card-container
	margin: 50px auto
	display: -webkit-flex
	flex-wrap: wrap
	six2(num)
		if (num%6 == 0)
			justify-content: flex-start
			.card-box
			.card-box:nth-of-type(4n)
			.card-box:nth-of-type(5n)
				margin-right: 66.7px
			.card-box:nth-of-type(6n)
				margin-right: 0
		else
			justify-content: space-between
	six(num)
		if (num%6 == 0)
			justify-content: flex-start
			.card-box
			.card-box:nth-of-type(4n)
			.card-box:nth-of-type(5n)
				margin-right: calc((85vw - 799.8px)/5)
			.card-box:nth-of-type(6n)
				margin-right: 0
		else
			justify-content: space-between
	five(num)
		if (num%5 == 0)
			justify-content: flex-start
			.card-box
			.card-box:nth-of-type(4n)
				margin-right: calc((85vw - 666.5px)/4)
			.card-box:nth-of-type(5n)
				margin-right: 0
		else
			justify-content: space-between
	four(num)
		if (num%4 == 0)
			justify-content: flex-start
			.card-box
				margin-right: 35.6px
			.card-box:nth-of-type(4n)
				margin-right: 0
		else
			justify-content: space-between
			
	@media (max-width: 772px)
		justify-content: space-between
		width:80%
	
	@media (min-width: 773px)
		width:640px
		four(4)
	@media (min-width: 933.38px)
		width: 85vw
		five(5)
	@media (min-width: 1066.72px)
		width: 85vw
		six(6)
	@media (min-width: 1280px)
		width: 1133.4px
		six2(6)
		

.iconfont
	color: #009CFF
	font-size: 60px	

a
	color: #000
	
a:hover
	color: #00C7FF
	text-decoration: none
	.iconfont
		color: #00C7FF
	.card-bg
		border: 1px solid #00C7FF
	
.card-box
	width: 133.3px
	margin-bottom: 2.5em

.card-box:hover
	cursor: pointer
	
.card
	h3
		text-align: center
		margin-top: 1.33em
		border-bottom: none

.card-bg
	height: 173.3px
	border:1px solid #d7d7d7
	display: flex
	justify-content: center
	align-items: center

.addstation
	width: 8em
	height: 2.5em
	box-shadow: 0 5px 10px rgba(8,181,254, 0.2)
	background: -webkit-gradient(45deg, #109EFC, #00C8FF) //chrome/Safari
	background: -moz-linear-gradient(45deg, #109EFC, #00C8FF) //Firefox
	background: -o-linear-gradient(45deg, #109EFC, #00C8FF)
	background: linear-gradient(45deg, #109EFC, #00C8FF)
	border-radius: 5px
	color:#fff
	font-size: 14px
	padding: 0 auto

.top-bar
	display: flex
	align-items: center
	justify-content: center
	height: 64px

.middleline-topbar
	margin-top: 64px
	
.icon-xinjianfenzhentai
	font-size: 60px
	color: #D6D6D6


</style>