<template>
	<view>
		<view class="fixed_t w100 z100 bg_fff bt1">
			<div class="iner flex1">
				<image src="../../static/search.png" mode="aspectFit"></image>
				<input type="search" value="" @confirm="searchAddress"  v-model="searChtxt" placeholder="搜索词"/>
			</div>
		</view>
		<view class="w100" style="height: 104rpx;" ></view>
		<view class="f32 line25 bs-bb p20 hotTit"  >当前定位城市</view>
		<view class="hotCity bs-bb  flex justSb wrap"  >
			<view  class="mr-b20 ta-c bg_fff " @tap="location_City(location_city)">
				<image class="Shape" src="../../static/Shape.png"></image>{{location_city}}
			</view>
		</view>
		<!-- <view class="w100" style="height: 104rpx;" v-if="!location_city"></view> -->
		<view class="f32 line25 bs-bb p20 hotTit">热门城市</view>
		<view class="hotCity bs-bb  flex  wrap">
			<view v-for="(item,index) in hotCity" :key="index" class="mr20 ta-c bg_fff " @tap="backCity(item)">
				{{item.name}}
			</view>
		</view>
		<u-index-list :scrollTop="scrollTop" v-if="indexNum" :index-list="indexNum" @select="select" offset-top="104">
			<view v-for="(item, index) in indexNum" :key="index">
				<u-index-anchor :index="item" />
				<view class="list-cell" v-for="(cityName,j) in cityNav[index]" :key="j" @tap="backCity(cityName)">
					{{cityName.name}}
				</view>
			</view>
		</u-index-list>
	</view>
</template>

<script>
	import cityList from '../../common/cityList.js'
	export default {
		data() {
			return {
				location_city:'',
				searChtxt:'',
				hotCity:[
					{"id":320500,"name":"苏州市","pid":320000,"level_id":2,"updated_at":"2021-04-13 11:39:34"},
					{"id":530100,"name":"昆明市","pid":530000,"level_id":2,"updated_at":"2021-04-13 11:39:34"},
					{"id":330400,"name":"嘉兴市","pid":330000,"level_id":2,"updated_at":"2021-04-13 11:39:34"},
					{"id":350200,"name":"厦门市","pid":350000,"level_id":2,"updated_at":"2021-04-13 11:39:34"},
					{"id":210200,"name":"大连市","pid":210000,"level_id":2,"updated_at":"2021-04-13 11:39:34"}
				],
				scrollTop: 0,
				indexNum: [],
				cityNav:[],
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onLoad(option) {
			setTimeout(()=>{
				this.location_city = uni.getStorageSync('cityPosition') || "苏州市"
				this.getCityList();
			}, 3000)
		},
		methods:{
			location_City(City){
				for(let i = 0 ; i < this.cityNav.length;i ++){
					for(let j = 0 ; j < this.cityNav[i].length; j ++){
						// console.log(this.cityNav[i])
						if( this.cityNav[i][j].name == City){
							if (this.cityNav[i][j].id === 530100) {
								uni.setStorageSync('merchantId', 43)
							} else {
								uni.setStorageSync('merchantId', 42)
							}
							uni.setStorageSync("chooseCity",this.cityNav[i][j])
							uni.navigateBack({
								delta:1,
							})
							return
						}
					}
				}
			},
			searchAddress(){
				if(this.searChtxt){
					uni.navigateTo({
						url:'./searchAdd?searchList=' + this.searChtxt
					})
				}else{
					this.$u.toast("请输入内容再进行搜索")
				}
			},
			backCity(ids){
				// uni.setStorageSync("chooseCity",{
				// 	id: items.id,
				// 	name: items.name
				// })
				// uni.setStorageSync('city_id',item.id)
				if (ids.id === 530100) {
					uni.setStorageSync('merchantId', 43)
				} else {
					uni.setStorageSync('merchantId', 42)
				}
				uni.setStorageSync("chooseCity",ids)
				uni.navigateBack({
					delta:1,
				})
			},
			select(e){
				console.log(e)
				console.log(11111)
			},
			getCityList(){
				console.log(cityList)
				this.indexNum = Object.keys(cityList.cityList)
				this.cityNav = Object.values(cityList.cityList)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mr20{
		margin: 20rpx 10rpx;
	}
	.Shape{
		width: 22rpx;
		height: 28rpx;
		margin-right: 20rpx;
	}
	.hotTit{
		background-color: #F7F7F7;
		padding-top: 30rpx;
	}
	.hotCity{
		background-color: #F7F7F7;
		padding-left: 20rpx;
		view{
			padding: 5rpx 50rpx;
			line-height: 80rpx;
			border-radius: 16rpx;
		}
	}
	.fixed_t{
		width: 100%;
		height: 104rpx;
		box-sizing: border-box;
		padding: 20rpx;
		.iner{
			width: 100%;
			height: 100%;
			border-radius: 50rpx;
			line-height: 64rpx;
			background-color: #F7F7F7;
			box-sizing: border-box;
			padding: 0 16rpx;
			display: flex;
			align-items: center;
			image{
				width: 38rpx;
				height: 38rpx;
				flex-shrink: 0;
				margin-right: 10rpx;
			}
			input{
				flex: 1;
				line-height: 40rpx;
				height: 40rpx;
			}
		}
	}
	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
	}
</style>