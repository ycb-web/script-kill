<template>
	<view class="m_app">
		<view class="header">
			<view class="tip-1">
				目前您累计已省
			</view>
			<view class="amount">￥{{info.price||0}}</view>
			<view class="detail" @click="toList">
				<image src="../../static/tabs/mark.png" 
				v-if='new_coupon_show'
				style='width: 12px;
					height: 12px;
					vertical-align: middle;
					margin-right: 4px;'/>
				剩余{{info.couponCount||0}}张优惠券>
			</view>
		</view>
		<view class="mian-title  justify-between">
			<view class="mian-title-left flex">
				<view class="line"></view>
				<view class="title">优惠券礼包购买</view>
			</view>
		</view>
		<view class="main flex" v-if="list.length > 0">
			<view v-for="item in list" style='width: 50%;' :key="item.id" >
				<couponItem :couponItem="item" @detail='handleClick'/>
				<view class="button" @click="handleBuy(item)">
					立即购买
				</view>
			</view>
		</view>
		<view class="Mask" @click="coupon_show = false" v-if="coupon_show"></view>
		<view class="Mask_z" v-if='coupon_show'>
			<view class="top">
				<text>HI,</text>
				<view style="font-size: 14px;">
					该礼包已减¥
					<text style="font-size: 28px;">{{curCoupon.oriPrice-curCoupon.price}}</text>
				</view>
			</view>
			<scroll-view scroll-y class="list">
				<view class="item flex" v-for="(item, index) in couponList" :key="index">
					<view class="left flex" v-if="item.discountType == 1">
						<text class="left_z ellipsis-main ellipsis-1">{{ item.discountValue }}</text>
						折
					</view>
					<view class="left" v-else>
						<div class="tit" style="color: #F7931E;">¥{{ item.couponPrice }}</div>
						<div class="tit1 f20 " style="color: #F7931E;">满{{ item.useMinPrice }}元可用</div>
					</view>
					<view class="right">
						<text>{{ item.title }}</text>
						<view style="color: #666;font-size: 10px;font-weight: normal;">
						{{ item.useStartTime.slice(0,10) }}-{{ item.useEndTime.slice(0,10)  }}
						</view>
					</view>
				</view>
			</scroll-view>
			<view @tap="handleBuy(curCoupon)" class="saveCouPon" style="width: 392rpx;height: 80rpx;text-align: center;line-height: 80rpx;">立即购买</view>
		</view>
		<u-empty v-if="loading == 'onMore'&&list.length == 0"
			src="https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-activity-empty.png" text="暂无数据" icon-size="230" color="#333">
		</u-empty>
		<loading :status="loading" v-if="!(list.length == 0 && loading == 'onMore')" />
	</view>
</template>

<script>
	import loading from '@/components/loading/uni-load-more.vue';
	import couponItem from './component/couponBagItem.vue';
	export default {
		components: {
			couponItem,
			loading
		},
		computed:{
		},
		data() {
			return {
				password: '', // 优惠券口令
				coupon_show: false,
				page: {
					pageNum: 1,
					pageSize: 10,
					total: 0,
				},
				loadUp: true, // 刷新
				loadDown: false, // 下拉
				noMore: false, // 无数据
				loading: 'loading', // 下面猴子状态
				list: [],
				curCoupon: {},
				couponList: [],
				merchantId: '', //商户ID
				pageSize1: 20,
				pageNum1: 1,
				info: {},
				new_coupon_show: false
			};
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
			this.list = []
			this.loading = "loading"
			this.page.pageNum = 1
			this.getRecieve();
		},
		onReachBottom() {
			if (this.page.total <= this.list.length) return;

			this.loading = 'loading'
			this.page.pageNum++
				this.getRecieve();
		},
		onLoad() {
			this.merchantId =  uni.getStorageSync('merchantId') || null;
			this.page.pageNum1 = 1;
			this.getRecieve();
			this.coupon_page_info()
		},
		onShow(){
			this.getCouPon()
		},
		methods: {
			//获取优惠券
			getCouPon() {
				const params = {
					merchantId: uni.getStorageSync('merchantId'),
					rows: 9,
					start: 0
				}
				this.$api.get_not_received_coupons(params).then(res => {
					this.couponList = res.data.record || [];
					if (this.couponList.filter(item=>item.status==0).length) {
						this.new_coupon_show = true;
					}
				});
			},
			toList(){
				uni.navigateTo({
					url:'/pages/coupon/my-coupon'
				})
			},
			async handleBuy(item){
				console.log('buy', item)
				const code = await this.$api.get_code()
				const res = await this.$api.buy_coupon({
					id: item.id,
					code
				})
				if(res.status != 200) return
				res.data.package = res.data.packageValue;
				wx.requestPayment({
					...res.data,
					success:()=> {
						wx.requestSubscribeMessage({
							tmplIds: [
								"kh7ERqA4DRGxkx_ZkdSPDtjP7s-Nqdaf8vAmQpfFTwc",
							],
							success(res) {
								console.log(res);
								this.list = []
								this.loading = "loading"
								this.page.pageNum = 1
								this.getRecieve();
							},
						});
					},
					fail:(e)=> {
						uni.showToast({
							title: e.msg,
							icon: "none",
						});
					},
					complete(e) {
					},
				});
			},
			handleClick(item){
				console.log('click-detail', item)
				uni.showLoading()
				this.$api.coupon_bag_info({packageId: item.id}).then(res=>{
					this.curCoupon = res.data || {}
					this.couponList = res.data.couponList || []
					this.coupon_show = true
				}).finally(()=>{
					uni.hideLoading()
				})
			},
			getRecieve() {
				this.$api.coupon_packages({
					pageNumber: this.pageNum1,
					pageSize: this.pageSize1,
					merchantId: this.merchantId,
				}).then(res => {
					this.page.total = res.data.total;
					if (this.page.pageNum1 - 1 === 1) {
						this.list = res.data.records
					} else {
						this.list.push(...res.data.records)
					}
					if (res.data.records.length < this.page.pageSize1 || !this.page.pageSize1) {
						this.loading = "onMore"
					} else {
						this.loading = "more"
					}
				}).finally(() => {
					this.loadDown = false;
					this.loadUp = false;
				});
			},
			coupon_page_info() {
				this.$api.coupon_page_info({
				}).then(res => {
					this.info = res.data || {}
				})
			},
		}
	};
</script>

<style lang="scss" scoped>
	.m_app {
		width: 750rpx;
		min-height: 100vh;
		background-color: #f7f7f7;

		.header {
			color: #fff;
			width: 750rpx;
			height: 424rpx;
			overflow: hidden;
			background: url(https://monkeyoss-prod.oss-cn-hangzhou.aliyuncs.com/monkeyoss-prod/2021-11-03/320b1db2d5f34de6872699c4fddf50fd/背景图.png) no-repeat;
			background-size: contain;
			.tip-1{
				margin-top: 14px;
				margin-left: 164px;
				font-size: 16px;
			}
			.amount{
				font-size: 36px;
				margin-right: 57px;
				margin-top: 18px;
				text-align: right;
			}
			.detail{
				font-size: 12px;
				margin-right: 27px;
				margin-left: auto;
				text-align: right;
			}
		}

		.main{
			flex-wrap: wrap;
		}
		.mian-title {
			padding-left: 18px;
			.title{
				margin-left: 8px;
				font-size: 14px;
				font-weight: bold;
			}
		}
		.button{
			width: 59px;
			height: 24px;
			background: url(../../static/icon14.png) no-repeat;
			background-size: 100% 100%;
			color: #fff;
			line-height: 24px;
			text-align: center;
			font-size: 10px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #ffffff;
			margin: 0 auto;
		}
	}
	.Mask_wrap{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.Mask {
		width: 100%;
		height: 100vh;
		background-color: #000;
		opacity: 0.6;
		position: fixed;
		top: 0;
	}
	.saveCouPon {
		position: absolute;
		bottom: -20rpx;
		left: 50%;
		margin-left: -196rpx;
		background: url(../../static/icon390rpx.png);
		background-size: 100% 100%;
		color: #ffffff;
	}
	.Mask_z {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 999;
		width: 640rpx;
		height: 808rpx;
		background: url(https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-yhq1-bg.png) no-repeat;
		background-size: 640rpx 808rpx;
		.top {
			position: absolute;
			top: 102rpx;
			left: 76rpx;
			font-size: 60rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #ffffff;
			.Tips {
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #ffffff;
			}
		}
		.list {
			position: absolute;
			left: 50%;
			top: 300rpx;
			transform: translateX(-50%);
			height: 435rpx;
			.item {
				position: relative;
				margin: 20rpx auto;
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
		}
	}
</style>
