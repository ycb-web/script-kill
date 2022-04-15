<template>
	<view class="app">
		<div class="topBanner posi-r">
			<image src="http://shop666.oss-cn-hangzhou.aliyuncs.com/2021-05/11/4534phpIiOQQE1620737472210511.png" mode=""></image>
			<!-- <div class="posi-a">活动规格</div> -->
		</div>
		<div class="couponInne">
			<div class="tit">hi，你可以领超值优惠券</div>
			<view class="item flex" v-for="item in list" :key="index">
				<view class="left flex" v-if="item.coupons_type == 1">
					<text class="left_z ellipsis-main ellipsis-1">{{item.discount}}</text>
					折
				</view>
				<view class="left" v-else>
					<div class="tit" style="color: #F7931E;">¥{{item.reduction}}</div>
					<div class="tit1 f20 " style="color: #F7931E;">满{{item.full}}元可用</div>
				</view>
				<view class="right">{{item.name}}</view>
			</view>
			<div class="btn f28 c-fff wAuto" @tap="lingqu()">立即领取</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:1,  //1 优惠券 2 礼包
				ids:1,
				personIds:1,
				list:[],
				vestige_id:'',
			};
		},
		onLoad(e){
			this.type = e.type
			if(this.type == 1){
				this.ids = e.coupons_id
				this.vestige_id  = e.vestige_id 
				// this.personIds = e.personIds
			}else{
				this.ids = e.git_id
				this.vestige_id  = e.vestige_id 
				// this.personIds = e.personIds
			}
			
			console.log(e)
			if(e.type == 1){
				this.getData1();
			}else{
				this.getData();
			}
		},
		methods:{
			//优惠券礼包详情
			getData(){
				this.$api
				.get_coupons_git_list({
					git_id:this.ids
				})
				.then(res => {
					if(res.status == 200){
						this.list.push(...res.data)
					}
				})
				.finally(() => {
					this.loadDown = false;
					this.loadUp = false;
				});
			},
			//优惠券详情
			getData1(){
				this.$api
				.coupons_details({
					id:this.ids
				})
				.then(res => {
					if(res.status == 200){
						this.list.push(res.data)
					}
				})
				.finally(() => {
					this.loadDown = false;
					this.loadUp = false;
				});
			},
			//领取优惠券礼包
			lingqu(){
				if(this.type == 1){
					this.$api
					.receive_coupons_vesige_share({
						coupons_id:this.ids,
						vestige_id:this.vestige_id,
					})
					.then(res => {
						if(res.status == 200){
							this.$u.toast("领取成功")
						}
					})
					.finally(() => {
						this.loadDown = false;
						this.loadUp = false;
					});
				}else{
					this.$api
					.receive_coupons_git_vesige_share({
						git_id:this.ids,
						vestige_id:this.vestige_id,
					})
					.then(res => {
						if(res.status == 200){
							this.$u.toast("领取成功")
						}
					})
					.finally(() => {
						this.loadDown = false;
						this.loadUp = false;
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.topBanner{
		width: 100%;
		height: 352rpx;
		image{
			width: 100%;
			height: 100%;
		}
		.posi-a{
			position: absolute;
			top: 30rpx;
			right: 30rpx;
			color: #FFFFFF;
		}
	}
	.couponInne{
		width: 630rpx;
		// height: 714rpx;
		background: #FFF6EB;
		margin: -68rpx auto 0;
		box-shadow: 0px 0px 12rpx 0px rgba(0, 0, 0, 0.07);
		border-radius: 20rpx;
		position: relative;
		z-index: 100;
		padding: 60rpx 80rpx;
		box-sizing: border-box;
		.tit{
			text-align: center;
			color: #F7931E;
			font-size: 36rpx;
			padding-bottom: 10rpx;
		}
		.item {
			background: url(https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-coupon-background.png) no-repeat;
			position: relative;
			margin: 20rpx 0;
			width: 464rpx;
			height: 118rpx;
			background: url(https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-coupon-background.png) no-repeat;
			background-size: 464rpx 118rpx;
			.left {
				text-align: center;
				width: 120rpx;
				position: absolute;
				top: 50%;
				left: 25rpx;
				transform: translateY(-50%);
				font-size: 25rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #f7931e;
				line-height: 34rpx;
				text-shadow: 0rpx 0rpx 8rpx rgba(255, 194, 122, 0.25);
				.left_z {
					width: 80rpx;
					font-size: 35rpx;
				}
			}
			.right {
				position: absolute;
				top: 50%;
				left: 180rpx;
				transform: translateY(-50%);
				font-size: 29rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #333333;
				line-height: 40rpx;
				text-shadow: 0rpx 0rpx 8rpx rgba(255, 194, 122, 0.25);
			}
		}
		.btn{
			width: 392rpx;
			height: 80rpx;
			line-height: 80rpx;
			background: url(../../static/icon390rpx.png);
			background-size: 100% 100%;
			text-align: center;
			margin-top: 50rpx;
		}
	}
</style>
