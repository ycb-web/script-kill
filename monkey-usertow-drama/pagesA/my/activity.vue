<template>
	<view class="app p-3">
<!-- 		<view class="flex box">
			<u-avatar :src="dataMsg.smallMonkey.icon"></u-avatar>
			<view class="user">
				<view>{{dataMsg.smallMonkey.name}}</view>
				<view class="flex">
					todo: 此行注释
					<u-icon :name="id === 1 ? 'woman' : 'man'" :color="id === 1 ? '#FF7676' : '#478DFF'" size="28"></u-icon>
					<text class="margin">我的{{dataMsg.smallMonkey.call}}</text>
					<text>{{dataMsg.smallMonkey.age}}岁</text>
				</view>
			</view>
		</view> -->
		
		<view class="p52">
			<title title="TA的活动"></title>
		</view>
		
		<view class="listBox" v-if="dataMsg.length > 0">
			<view class="list" v-for="item in dataMsg" :key="item">
				<view class="header flex">
					<view class="flex">
						<image src="../../static/my-date.png" mode=""></image>
						<text>{{item.createTime}}</text>
					</view>
<!-- 					<view class="status">
						待核销
					</view> -->
				</view>
				<view class="body flex">
					<image class="body_img" :src="item.pic" mode=""></image>
					<view class="center  flex align-start direction-column justify-between">
						<view class="tit">{{item.orderItemDtos[0].prodName}}</view>
						<view class="sku">{{item.orderItemDtos[0].skuName}}</view>
					</view>
				</view>
				<view class="btn">
					<view class="btn_z">
						<view class="button bj" @click="navTo(item.orderNumber, item.status)">查看活动</view>
					</view>
				</view>
			</view>
		</view>
<!-- 		<view v-if="dataMsg.length == 0">
			<u-empty  src="https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-activity-empty.png" text="暂无数据" icon-size="230" color="#333"></u-empty>
		</view> -->
<!-- 		<view class="p52">
			<title title="TA的家人" ></title>
		</view>
		<view class="listBox">
			<view class="flex list listtow" v-if="dataMsg.largeMonkey.length > 0" v-for="item in dataMsg.largeMonkey" :key="item">
				<u-avatar class="listBox_img" :src="item.icon" size="136"></u-avatar>
				<view class="user_tow flex align-start direction-column justify-between">
					<view class="user_top">
						<view>{{item.name}}</view>
					</view>
					<view class="tit">
						<text>{{dataMsg.smallMonkey.name}}的{{item.call}}</text>
					</view>
				</view>
			</view>
			<u-empty  v-else src="https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-activity-empty.png" text="暂无数据" icon-size="230" color="#333"></u-empty>
		</view> -->
		<!-- <view class="btn_bottom"> -->
			<!-- <image  class="btn_img" src="../../static/button.png" mode="widthFix"></image> -->
			<!-- 邀请TA的家人关注TA的精彩活动 -->
		<!-- </view> -->
		<loading
		  :status="loading"
		  v-if="!(loading == 'onMore' && dataMsg.length == 0)"
		/>
	</view>
</template>

<script>
	import title from '@/components/my/title.vue';
	import lzButton from '@/components/common/button.vue';
	import loading from '@/components/loading/uni-load-more';
	export default {
		components:{title, lzButton, loading},
		data() {
			return {
				id: '',
				dataMsg:'',
				page: {
				  pageNum: 1,
				  pageSize: 20,
				  total: 0,
				},
				loading: 'loading',
			};
		},
		onLoad(option) {
			this.id = Number.parseInt(option.ids)
			this.getData();
		},
		onShow() {
		  this.page.pageNum = 1;
		  this.getData();
		},
		onReachBottom() {
		  this.page.pageNum++;
		  this.loading = 'loading';
		  setTimeout((e) => {
		    this.getData();
		  }, 1500);
		},
		onPullDownRefresh() {
		  uni.stopPullDownRefresh();
		  this.page.pageNum = 1;
		  this.loading = 'loading';
		  setTimeout((e) => {
		    this.getData();
		  }, 1500);
		},
		methods:{
			getData(){
				const data = {
					merchantId: uni.getStorageSync('merchantId'),
					rows: this.page.pageSize,
					start: (this.page.pageNum - 1) * this.page.pageSize,
					status: 5,
				}
				this.$api.get_order_list(data).then((res) => {
				    if (this.page.pageNum === 1) {
				      this.dataMsg = res.data.records;
				    } else {
				      this.dataMsg.push(...res.data.records);
				    }
				    if (!Object.keys(res.data).length) {
				      this.loading = 'onMore';
				    } else if (res.data.records.length < this.page.pageSize) {
				      this.loading = 'onMore';
				    } else {
				      this.loading = 'more';
				    }
				});
			},
			navTo(ids,orderTypeNum){
				uni.navigateTo({
					url: '/pagesA/order/activeOrderDet?ids=' + ids + '&type=' + orderTypeNum
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.box {
		background: #ffffff;
		box-shadow: 0px 0px 12rpx 0px rgba(0, 0, 0, 0.07);
		border-radius: 20rpx;
		padding: 20rpx;
		box-sizing: border-box;
	
		.list {
			padding: 20rpx 0;
			border-bottom: 2rpx solid #eee;
		}
		.listBox_img{
			
		}
	}
	.listtow{
		margin-top: 20rpx;
		padding-bottom: 20rpx;
		border-bottom: 2rpx solid #F3F3F3;
		
	}
	.listtow:last-child {
		border: none;
		padding-bottom: 0rpx;
	}
	.user_tow{
		margin-left: 20rpx;
		
		height: 100rpx;
		.user_top{
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #333333;
		}
	}
.user {
	flex: 1;
	margin-left: 20rpx;
	view {
		&:first-child {
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #333;
			line-height: 40rpx;
			margin-bottom: 24rpx;
		}
		&:last-child {
			text {
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #666;
				line-height: 24rpx;
				&.margin{
					margin: 0 20rpx;
				}
			}
		}
	}
}
.btn_bottom{
			width: 690rpx;
			height: 80rpx;
			position: relative;
			margin-top: 150rpx;
			background: url(../../static/button.png)no-repeat;
			background-size: 690rpx 80rpx;
			line-height: 80rpx;
			text-align: center;
			color: #fff;
			font-size: 28rpx;
		}
.p52{
	margin: 50rpx 0 20rpx 0;
}

.listBox{
	width: 690rpx;
	padding: 20rpx;
	padding-bottom: 5rpx;
	background: #FFFFFF;
	box-shadow: 0px 0px 12rpx 0px rgba(0, 0, 0, 0.07);
	border-radius: 20rpx;
	.list{
		margin-bottom: 40rpx;
	}
	.header{
		justify-content: space-between;
		image{
			width: 26rpx;
			height: 26rpx;
			vertical-align: middle;
		}
		text{
			margin-left: 15rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #666666;
			line-height: 24rpx;
		}
		.status{
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #E03C3C;
			line-height: 40rpx;
		}
	}
	
	.body{
		margin: 20rpx 0 ;
		padding-bottom: 20rpx;
		border-bottom: 2rpx solid #F3F3F3;
		.center{
			height: 108rpx;
		}
		.body_img{
			width: 128rpx;
			height: 128rpx;
			vertical-align: middle;
			border-radius: 20rpx;
			margin-right: 20rpx;
		}
		.tit{
			text-align: start;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #25252F;
			line-height: 34rpx;
			width: 504rpx;
			overflow:hidden;  
			text-overflow:ellipsis;  
			white-space: normal;  
			display:-webkit-box;  
			-webkit-box-orient:vertical;  
			-webkit-line-clamp:2;
		}
		.sku{
			margin-top: 20rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #666666;
			line-height: 24rpx;
		}
	}
	
	.btn{
		width: 160rpx;
		height: 54rpx;
		margin-left: 480rpx;
		.btn_z{
			background: url(../../static/mini-button.png)no-repeat;
			background-size: 100% 100%;
			width: 160rpx;
			height: 54rpx;
			text-align: center;
			line-height: 54rpx;
		}
		
		view{
			width: 160rpx;
			height: 54rpx;
			color: #fff;
			font-size: 24rpx;
		}
	}
}
</style>
