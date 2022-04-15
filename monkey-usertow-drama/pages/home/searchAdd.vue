<template>
	<view class="content">
		<view class="li bs-bb p-2 f28 line15" v-for="item in dataLList" :key="item.id" @tap="chooseAdd(item)" v-if="dataLList.length">{{item.name}}</view>
		<!-- <view> -->
		<view class="w100 p-5">
			
		</view>
			<u-empty v-if="!dataLList.length"  src="https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-activity-empty.png" text="暂无数据" icon-size="230" color="#333"></u-empty>
		<!-- </view> -->
	</view>
</template>

<script>
	import cityList from '../../common/cityList.js'
	export default {
		data() {
			return {
				dataLList:[],
				searchList:'',
				cityNav:[],
			}
		},
		onLoad(e) {
			this.searchList = e.searchList
			this.getCityList();
			// console.log(e.searchList)
		},
		methods: {
			getCityList(){
				// this.indexNum = Object.keys(cityList.cityList)
				this.cityNav = Object.values(cityList.cityList)
				this.searchAddress()
			},	
			chooseAdd(ids){
				if (ids.id === 530100) {
					uni.setStorageSync('merchantId', 43)
				} else {
					uni.setStorageSync('merchantId', 42)
				}
				uni.setStorageSync("chooseCity",ids)
				uni.switchTab({
					url:'./home'
				})
			},
			searchAddress(){
				let newAddress = [];
				this.cityNav.forEach((item)=>{
					item.forEach((items)=>{
						if(items.name.indexOf(this.searchList) > -1){
							newAddress.push(items)
						}
					})
					
				})
				this.dataLList = newAddress
			},
		}
	}
</script>

<style>

</style>
