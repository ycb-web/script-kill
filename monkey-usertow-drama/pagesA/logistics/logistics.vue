<template>
	<view class="p-5" >
		<view class="product-info flex">
			<view class="left">
				<image :src="dataMsg.store[0].order[0].image" mode=""></image>
			</view>
			<view class="right">
				<view class="status" v-if="WuLiu">
					{{WuLiu.state | WuLiuState}}
				</view>
				<view class="status" v-else>
					暂无物流信息
				</view>
				<view class="title">
					{{dataMsg.store[0].order[0].supplement_field}}
				</view>
				<view class="wiliu" v-if="WuLiu">
						物流编号：{{WuLiu.nu || "-------"}}
				</view>
				<view class="wiliu" v-else>
						物流编号：暂无物流信息
				</view>
			</view>
		</view>
		<view class="p-1" v-if="WuLiu">
			<u-time-line>
				<u-time-line-item nodeTop="2">
					<!-- 此处自定义了左边内容，用一个图标替代 -->
					<template v-slot:node>
						<view v-if="WuLiu.state == 0" class="u-node" style="background: #19be6b;">
							<!-- 此处为uView的icon组件 -->
							<!-- // 包括0在途，1揽收，2疑难，3签收，4退签，5派件，6退回，7转单，10待清关，11清关中，12已清关，13清关异常，14收件人拒签等13个状态 -->
							<u-icon  name="car-fill" color="#fff" :size="24"></u-icon>
							
							
						</view>
						<view v-if="WuLiu.state == 1" class="u-node" style="background: #19be6b;">
							<u-icon  name="order" color="#fff" :size="24"></u-icon>
						</view>
						<view  v-if="WuLiu.state == 2" class="u-node" style="background: #ecd000;">
							<u-icon name="question" color="#fff" :size="24"></u-icon>
						</view>
						<view v-if="WuLiu.state == 3" class="u-node" style="background: #19be6b;">
							<u-icon  name="checkbox-mark" color="#fff" :size="24"></u-icon>
						</view>
						<view  v-if="WuLiu.state == 4" class="u-node" style="background: #ecd000;">
							<u-icon name="skip-back-left" color="#fff" :size="24"></u-icon>
						</view>
						<view  v-if="WuLiu.state == 5" class="u-node" style="background: #19be6b;">
							<u-icon name="car" color="#fff" :size="24"></u-icon>
						</view>
						<view v-if="WuLiu.state == 6" class="u-node" style="background: #ecd000;">
							<u-icon  name="skip-back-left" color="#fff" :size="24"></u-icon>
						</view>
						<view v-if="WuLiu.state == 7" class="u-node" style="background: #19be6b;">
							<u-icon  name="server-man" color="#fff" :size="24"></u-icon>
						</view>
						<view v-if="WuLiu.state == 10" class="u-node" style="background: #19be6b;">
							<u-icon  name="order" color="#fff" :size="24"></u-icon>
						</view>
						<view v-if="WuLiu.state == 11" class="u-node" style="background: #19be6b;">
							<u-icon  name="calendar" color="#fff" :size="24"></u-icon>
						</view>
						<view v-if="WuLiu.state == 12" class="u-node" style="background: #19be6b;">
							<u-icon  name="calendar" color="#fff" :size="24"></u-icon>
						</view>
						<view v-if="WuLiu.state == 13" class="u-node" style="background: red;">
							<u-icon  name="info-circle-fill" color="#fff" :size="24"></u-icon>
						</view>
						<view v-if="WuLiu.state == 14" class="u-node" style="background: red;">
							<u-icon  name="info-circle-fill" color="#fff" :size="24"></u-icon>
						</view>
					</template>
					<template v-slot:content>
						<view>
							<view class="u-order-title">{{WuLiu.state | WuLiuState}}</view>
							<view class="u-order-desc">{{WuLiu.data[0].context}}</view>
							<view class="u-order-time">{{WuLiu.data[0].time}}</view>
						</view>
					</template>
				</u-time-line-item>
				<u-time-line-item v-for="(item,index) in wuliuList" :key="index">
					<!-- 此处没有自定义左边的内容，会默认显示一个点 -->
					<template v-slot:content >
						<view >
							<view class="u-order-desc">{{item.context}}</view>
							<view class="u-order-time">{{item.time}}</view>
						</view>
					</template>
				</u-time-line-item>
			</u-time-line>
		</view>
		<u-empty v-else src="https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-activity-empty.png" text="暂无数据" icon-size="230" color="#333"></u-empty>
	</view>
</template>

<script>
	
	let WuLiuSta = {
		"0" : "运输中",
		"1" : "已揽收",
		"2" : "疑难",
		"3" : "已签收",
		"4" : "退签",
		"5" : "派送中",
		"6" : "退回中",
		"7" : "转单中",
		"10" : "待清关",
		"11" : "清关中",
		"12" : "已清关",
		"13" : "清关异常",
		"14" : "收件人拒签",
	}
	export default {
		filters:{
			WuLiuState(index){
				return WuLiuSta[index]
			}
		},
		data() {
			return {
				ids:0,
				dataMsg:{},
				WuLiu:{
					state:0
				},
				wuliuList:[],
			}
		},
		onLoad(options) {
			this.ids = options.ids
			this.getData()
		},
		methods: {
			// 获取订单信息
			getData(){
				this.$api.get_order_detail({
					id:this.ids,
				}).then(res => {
					if(res.status != 200)return;
					this.dataMsg = res.data
					this.WuLiu = res.data?.store[0].order[0].logistics_news?res.data?.store[0].order[0].logistics_news : null
					if(res.data?.store[0].order[0].logistics_news && Array.isArray(res.data?.store[0].order[0].logistics_news.data)){
						this.wuliuList = res.data?.store[0].order[0].logistics_news?.data.splice(1)
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.product-info{
		border-bottom: 2rpx solid #F3F3F3;
		padding-bottom: 20rpx;
		.left{
			width: 150rpx;
			height: 150rpx;
			border-radius: 20rpx;
			image{
				width: 150rpx;
				height: 150rpx;
				border-radius: 20rpx;
			}
		}
		.right{
			margin-left: 20rpx;
			.status{
				font-size: 33rpx;
				font-weight: 500;
				color: #333333;
			}
			.title{
				color: #666;
				margin: 10rpx 0;
			}
			.wiliu{
				color: #666;
				
			}
		}
	}
	
.u-node {
		width: 44rpx;
		height: 44rpx;
		border-radius: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #d0d0d0;
	}
	
	.u-order-title {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx;
	}
	
	.u-order-desc {
		color: rgb(150, 150, 150);
		font-size: 28rpx;
		margin-bottom: 6rpx;
	}
	
	.u-order-time {
		color: rgb(200, 200, 200);
		font-size: 26rpx;
	}
</style>
