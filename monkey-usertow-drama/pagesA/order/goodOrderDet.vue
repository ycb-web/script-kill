<template>
	<view class="app">
		<view class="topMonkey2 w100 posi-r" v-if="dataMsg.store[0].order[0].status == 1">
			<div class="time ta-c c-fff f24 line2">支付剩余时间</div>
			<view class=" ta-c c-fff"><u-count-down @end="shijianend"  :timestamp="xzshiian" :bg-color="bgColor" color="#fff" :show-days="false" :font-size="40" separator-color="#fff" :show-hours="false"></u-count-down></view>
		</view>
		<view class=" w100 posi-r" :class="dataMsg.store[0].order[0].status == 1?'act':'topMonkey'">
			<div class="address w100 br-20 bg_fff bs-bb p20_all mr-b20 posi-r">
				<div class="inner">
					<image src="../../static/icon18.png" mode="scaleToFill" class="addRessIcon posi-a"></image>
					<div class="top">{{dataMsg.consignee || ''}} <text>{{dataMsg.consignee_mobile || ''}}</text></div>
					<div class="bottm sl-1">{{dataMsg.location}}</div>
				</div>
			</div>
		</view>
		<view :class="dataMsg.store[0].order[0].status == 1?'act':''" class="pingtuanGood bs-bb p20_all bg-fff br-20 mr-b20 bg_fff" v-for="items in dataMsg.store" :key="items.store_id">
			<div class="bussiness bs-bb p20_all flex justSb">
				<div class="left"><image :src="items.store.logo_image ? items.store.logo_image : ''" mode="" class="mr-1"></image></div>
				<div class="right flex1">
					{{items.store.shop_name ? items.store.shop_name : '保密'}}
				</div>
			</div>
			<div class="orderTop bs-bb pt-20" v-for="item in items.order" :key="item.id">
				<div class="shopMsg w100 flex">
					<image :src="item.product.show_img" class="mr-2 left br-20" mode="aspectFill"></image>
					<div class="right flex1">
						<view class="tit bs-bb posi-r">{{item.product.title}}<view class="price posi-a">¥{{item.single_price}}</view></view>
						<view class="type w100 flex justSb">
							<view class="guige f24 c666"><div class="inner">{{item.supplement_field}}</div></view>
							<view class="num f22 ta-c">x{{item.total_num}}</view>
						</view>
					</div>
				</div>
			</div>
		</view>
		
		<div class="orderbeizhu mr-t20 p20_all bs-bb m_auto br-20" :class="dataMsg.store[0].order[0].status == 1?'act':''">
			<div class="tit">订单备注</div>
			<div class="desc">{{dataMsg.remark || ''}}</div>
		</div>
		
		<div class="orderPayMsg mr-t20 p20_all bs-bb m_auto br-20 bg-fff pb-20" :class="dataMsg.store[0].order[0].status == 1?'act':''">
			<div class="li justSb flex f24 line15 mr-b10 c666" @click="copy(dataMsg.pay_or_sn)">
				<view>订单号</view>
				<view><image src="../../static/icon5.png" mode="" style="width: 22rpx;height: 22rpx;margin-right: 10rpx;"></image>{{dataMsg.pay_or_sn}}</view>
			</div>
			<div class="li justSb flex f24 line2 mr-b10 c666">
				<view>下单时间</view>
				<view>{{dataMsg.created_at}}</view>
			</div>
			<div class="li justSb flex f24 line2 mr-b10 c666">
				<view>支付金额</view>
				<view>￥{{dataMsg.pay_price}}</view>
			</div>
			<div class="li justSb flex f24 line2 mr-b10 c666">
				<view>优惠</view>
				<view>-￥{{dataMsg.deduction_price}} </view>
			</div>
			<div class="li justSb flex f24 line2 mr-b10 c666">
				<view>支付</view>
				<view>微信支付  </view>
			</div>
		</div>
		<u-gap height="160" bg-color="#f7f7f7"></u-gap>
		<view class="btns bs-bb bg-fff p30_all flex justSb fixed_b" v-if="dataMsg.store[0].order[0].status ==3 ||dataMsg.store[0].order[0].status ==4 || dataMsg.store[0].order[0].status ==1">
			<view class="btn ta-c look" v-if="dataMsg.store[0].order[0].status ==3 ||dataMsg.store[0].order[0].status ==4" @click="goWuLiu()">查看物流</view>
			<view class="btn2 ta-c look" v-if="dataMsg.store[0].order[0].status ==1" @click="cancel_order()">取消订单</view>
			<view class="btn ta-c look" v-if="dataMsg.store[0].order[0].status ==1" @click="submit_pay()">付款</view>
			<view class="btn ta-c look" @click="call()" v-if="dataMsg.store[0].order[0].status ==3 ||dataMsg.store[0].order[0].status ==4">联系我们</view>
		</view>
		<!-- <u-mask :show="is_show" @click="is_show = false">121312313131</u-mask> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_show:false,
				type:false,
				bgColor:'rgb(255,255,255,0)',
				ids:0,
				dataMsg:'',
				xzshiian:0,
			}
		},
		onLoad(e) {
			this.ids  = e.ids
			this.getData();
		},
		methods: {
			shijianend(){
				this.$api.order_expire_change_status({
					id:this.dataMsg.id
				})
				.then(res=>{
					console.log(res)
					this.getData()
				})
				.catch(err=>{
					console.log(err)
				})
			},
			cancel_order(id, index){
				uni.showModal({
					title:'提示',
					content: '确认取消此订单',
					success:(data) => {
						if (data.confirm) {
							this.cancel_order_api()
						}
					}
				})
			},
			cancel_order_api(){
				this.$api.cancel_order({
					id:this.dataMsg.id
				}).then(res => {
					if (res.status === 200) {
						uni.showToast({
							title:'取消订单成功'
						})
						this.getData()
					}
				})
			},
			getTime_pay(){
				this.$api.get_config({
					
				})
				.then(res=>{
					console.log(res,"------------多长时间过期")
					let value = res.data?.value * 60 * 1000
					let created_Z = this.dataMsg.created_at.replace(/-/g,'/')
					let created = new Date(created_Z ).getTime()
					let date = new Date().getTime()
					let guoqu = date-created;
					
					console.log(value)
					console.log((value-guoqu) / 1000 )
					// console.log((value-guoqu) / 1000 % 60)
					this.xzshiian = (value-guoqu) / 1000
					// console.log(date)
					
				})
				.catch(err=>{
					console.log(err)
				})
			},
			submit_pay() {
				const _this = this
				uni.showLoading({
					title: '等待支付...'
				});
				this.$api
					.submit_pay({
						pay_type: this.dataMsg.product_type,
						amount:this.dataMsg.pay_price,
						pay_or_sn:this.dataMsg.pay_or_sn,
						open_id: uni.getStorageSync('open_id')
					})
					.then(res => {
						wx.requestPayment({
							...res.data,
							success() {
								this.getData();
							},
							fail(e) {
								uni.showToast({
									title: e.msg,
									icon: 'none'
								});
							}
						});
					})
					.finally(() => {
						uni.hideLoading();
					});
			},
			
			
			
			
			
			goWuLiu(){
				this.turnTo(`/pagesA/logistics/logistics?ids=${this.ids}`)
			},
			call(){
				let current = uni.getStorageSync("QRcode")
				uni.previewImage({
					current,
					  urls:[current]
				})
				// this.is_show = true;
				// uni.makePhoneCall({
				// 	phoneNumber:this.dataMsg.consignee_mobile
				// })
			},
			getData(){
				this.$api.get_order_detail({
					id:this.ids,
				}).then(res => {
					this.dataMsg = res.data
					console.log(this.dataMsg)
					if(this.dataMsg.store[0].order[0].status == 1){
						this.getTime_pay()
					}
				})
			},
			turnTo(urls){
				uni.navigateTo({
					url:urls
				})
			},
			copy(msg){
				console.log(msg);
				uni.setClipboardData({
					data: msg,
					success(){
						uni.showToast({
							title:"复制成功"
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.act{
		transform: translateY(-80rpx);
	}
	.topMonkey2{
		height: 193rpx;
		background: url(https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-order-icon47.png) bottom center no-repeat;
		background-size:  100% auto;
		.time{
			padding-top: 28rpx;
		}
	}
	.address{
		margin: 30rpx auto;
		width: 690rpx;
		height: 112rpx;
		box-sizing: border-box;
		padding-left: 100rpx;
		position: relative;
		.addRessIcon{
			width: 52rpx;
			height: 52rpx;
			left: 30rpx;
			top: 30rpx;
		}
		.top{
			font-size: 28rpx;
			font-weight: 500;
			color: #333333;
			line-height: 40rpx;
			text{
				color: #999999;
				line-height: 40rpx;
				vertical-align: top;
				font-size: 20rpx;
				padding-left: 20rpx;
				color: #999999;
				display: inline-block;
			}
		}
		.bottm{
			padding-top: 4rpx;
			font-size: 20rpx;
			font-weight: 400;
			color: #666666;
			line-height: 28rpx;
		}
	}
	.btns{
		height: 140rpx;
		background-color: #FFFFFF;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		.btn{
			height: 80rpx;
			line-height: 80rpx;
			width: 310rpx;
			border-radius: 40rpx;
			background-color: #CCCCCC;
			&.look{
				background: url(../../static/icon9.png) ;
				background-size: 100% 100%;
				color: #FFFFFF;
			}
		}
		.btn2{
			height: 60rpx;
			line-height: 60rpx;
			width: 214rpx;
			border-radius: 40rpx;
			background-color: #CCCCCC;
			&.look{
				background: url(../../static/icon9.png) ;
				background-size: 100% 100%;
				color: #FFFFFF;
			}
		}
	}
	.goodNum{
		text{
			color: #E03C3C;
		}
	}
	.topMonkey{
		overflow: hidden;
		height: 172rpx;
		background: linear-gradient(270deg, #038E45 0%, #53C187 100%);
	}
	// .erBox{
	// 	width: 690rpx;
	// 	position: relative;
	// 	z-index: 99;box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.07);
	// 	.erCodeOut{
	// 		width: 350rpx;
	// 		height: 350rpx;
	// 		border-radius: 20rpx;
	// 		background: #FFF6EB;
	// 		padding: 16rpx;
	// 		image{
	// 			width: 100%;
	// 			height: 100%;
	// 		}
	// 	}
	// 	.p1{
	// 		font-size: 24rpx;
	// 		font-family: PingFangSC-Regular, PingFang SC;
	// 		font-weight: 400;
	// 		color: #666666;
	// 		line-height: 34rpx;
	// 		padding-top: 20rpx;
	// 		padding-bottom: 28rpx;
	// 	}
	// 	.p2{
	// 		height: 50rpx;
	// 		font-size: 36rpx;
	// 		font-family: PingFangSC-Medium, PingFang SC;
	// 		font-weight: 500;
	// 		color: #333333;
	// 		line-height: 50rpx;
	// 	}
	// 	.p3{
	// 		line-height: 34rpx;
	// 	}
	// }
	.pingtuanGood{
		padding-top: 0;
		width: 690rpx;
		margin: 30rpx auto 0;
		.bussiness{
			// height: 80rpx;
			border-bottom: 1px solid #EEEEEE;
			.left{
				line-height: 40rpx;
				width: 40rpx;
				border-radius: 50%;
				background: url('https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2844859017,352483783&fm=26&gp=0.jpg');
				background-size: 100% 100%;
				margin-right: 20rpx;
				image{
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					vertical-align: top;
				}
			}
			.right{
				color: #E03C3C;
				font-size: 24rpx;
				.tittime{
					font-size: 24rpx;
					color: #666666;
					line-height: 36rpx;
				}
				.titDesc{
					font-size: 22rpx;
					color: #999999;
					line-height: 30rpx;
				}
			}
		}
		.orderTop{
			padding-bottom: 0;
			.shopMsg{
				height: 128rpx;
				margin-bottom: 20rpx;
				.left{
					height: 128rpx;				
					width: 128rpx;
				}
				.right{
					.tit{
						font-size: 24rpx;
						line-height: 34rpx;
						height: 68rpx;
						padding-right: 110rpx;
						.price{
							right: 0;
							top: 10rpx;
							color: #E03C3C;
						}
					}
					.type{
						height: 50rpx;
						align-items: flex-end;
						.guige{
							border-radius: 22rpx;
							padding: 0 10rpx 0 20rpx;
							background-color: #F1F1F1;
							.inner{
								height: 38rpx;
								padding-right:30rpx;
								background: url(../../static/icon1.png) right center no-repeat ;
								background-size: 28rpx 28rpx;
							}
						}
						.num{
							min-width: 34rpx;
							height: 34rpx;
							line-height: 34rpx;
							border-radius: 10rpx;
							padding: 0 5rpx;
							border: 1px solid #979797;
							font-size: 22rpx;
							color: #999999;
						}
					}
					
				}
				
			}
			.priceMsg{
				line-height: 54rpx;
				padding-bottom: 20rpx;
				.payType{
					color: #E03C3C;
					font-size: 24rpx;
				}
			}
		}
	}
	.orderbeizhu{
		width: 690rpx;
		background: #FFFFFF;
		padding: 30rpx 20rpx;
		box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.07);
		.tit{
			font-weight: 500;
			color: #333333;
			line-height: 34rpx;
			height: 34rpx;
			padding-bottom: 10rpx;
		}
		.desc{
			font-size: 20rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;
			line-height: 28rpx;
		}
	}
	.priceMine{
		width: 690rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.07);
		.priceMsg{
			width: 100%;
			.li{
				padding-left: 20rpx;
				margin-top: 20rpx;
				position: relative;
				.circle{
					width: 8rpx;
					height: 8rpx;
					background: #F7931E;
					position: absolute;
					left: 0;
					top: 14rpx;
					border-radius: 50%;
				}
				.h3{
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
					line-height: 34rpx;
					padding-bottom: 10rpx;
				}
				.p{
					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
					line-height: 28rpx;
				}
			}
		}
		.priceLine{
			width: 40px;
			height: 6px;
			background: linear-gradient(270deg, #F6931F 0%, #FBE859 100%);
			border-radius: 3px;
			margin: 0 auto;
		}
	}
	.orderPayMsg{
		width: 690rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.07);
		padding-top: 30rpx;
		image{
			width: 22rpx;
			height: 22rpx;
		}
	}
	.btns{
		height: 126rpx;
		background-color: #FFFFFF;justify-content: flex-end;
		.btn{
			height: 64rpx;
			line-height: 64rpx;
			width: 214rpx;
			margin-left: 20rpx;
			border-radius: 32rpx;
			background-color: #CCCCCC;
			&.look{
				background: url(../../static/icon9.png) ;
				background-size: 100% 100%;
				color: #FFFFFF;
			}
		}
	}
</style>
