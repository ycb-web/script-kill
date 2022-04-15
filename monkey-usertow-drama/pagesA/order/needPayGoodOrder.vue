<template>
	<view class="app">
		<view class="topMonkey w100 posi-r">
			<div class="time ta-c c-fff f24 line2">支付剩余时间</div>
			<view class=" ta-c c-fff"><u-count-down :timestamp="300" :bg-color="bgColor" color="#fff" :show-days="false" :font-size="40" separator-color="#fff" :show-hours="false"></u-count-down></view>
		</view>
		<div class="address w100 br-20 bg_fff bs-bb p20_all mr-b20 posi-r">
			<div class="inner">
				<image src="../../static/icon18.png" mode="scaleToFill" class="addRessIcon posi-a"></image>
				<div class="top">杨希希 <text>123****8909</text></div>
				<div class="bottm sl-1">广州市越秀区东风中路268号1109-1110广州市越秀区东风中…</div>
			</div>
		</div>
		<view class="pingtuanGood bs-bb p20_all bg-fff br-20 mr-b20 bg_fff">
			<div class="orderTop bs-bb pt-20">
				<div class="shopMsg w100 flex">
					<image src="../../static/demo.jpeg"  mode="aspectFill" class="mr-2 left br-20"></image>
					<div class="right flex1">
						<view class="tit bs-bb posi-r">走进吴门医派，传承中医文明！小小医药师，等你来体验！<view class="price posi-a">¥ 49.09</view></view>
						<view class="type w100 flex justSb">
							<view class="guige f24 c666"><div class="inner">8月22日上午一大一小</div></view>
							<view class="num f22 ta-c">x111</view>
						</view>
					</div>
				</div>
				<div class="shopMsg w100 flex">
					<image src="../../static/demo.jpeg"  mode="aspectFill" class="mr-2 left br-20"></image>
					<div class="right flex1">
						<view class="tit bs-bb posi-r">走进吴门医派，传承中医文明！小小医药师，等你来体验！<view class="price posi-a">¥ 49.09</view></view>
						<view class="type w100 flex justSb">
							<view class="guige f24 c666"><div class="inner">8月22日上午一大一小</div></view>
							<view class="num f22 ta-c">x111</view>
						</view>
					</div>
				</div>
			</div>
			<view class="orderGoodPrice f24 line2 ta-r">共5件商品，实付：<text>¥ 189.9</text></view>
		</view>
		
		<div class="orderbeizhu mr-t20 p20_all bs-bb m_auto br-20">
			<div class="tit">订单备注</div>
			<div class="desc">这是一个订单备注这是一个订单备注</div>
		</div>
		
		<div class="orderPayMsg mr-t20 p20_all bs-bb m_auto br-20 bg-fff pb-20">
			<div class="li justSb flex f24 line15 mr-b10 c666">
				<view>订单号</view>
				<view><image src="../../static/icon5.png" mode="" style="width: 22rpx;height: 22rpx;margin-right: 10rpx;"></image>2125 2108 0873 8571 484</view>
			</div>
			<div class="li justSb flex f24 line15 mr-b10 c666">
				<view>下单时间</view>
				<view>2020-04-18 </view>
			</div>
			<div class="li justSb flex f24 line15 mr-b10 c666">
				<view>商品累计金额</view>
				<view>￥49.90  </view>
			</div>
			<div class="li justSb flex f24 line15 mr-b10 c666">
				<view>商品累计件数</view>
				<view>8件 </view>
			</div>
			<div class="li justSb flex f24 line15 mr-b10 c666">
				<view>运费</view>
				<view>￥9.90  </view>
			</div>
			<div class="li justSb flex f24 line15 mr-b10 c666">
				<view>优惠</view>
				<view>-￥0.00  </view>
			</div>
			<div class="li justSb flex f24 line15 mr-b10 c666">
				<view>支付</view>
				<view>￥1.00 微信支付  </view>
			</div>
		</div>
		<u-gap height="160" bg-color="#f7f7f7"></u-gap>
		<view class="btns bs-bb bg-fff p30_all flex justSb fixed_b">
			<view class="btn ta-c">取消订单</view>
			<view class="btn ta-c look" @tap="turnTo('/pagesA/order/goodOrderDet')">立即付款</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:false,
				bgColor:'rgb(255,255,255,0)',
			}
		},
		methods: {
			turnTo(urls){
				uni.navigateTo({
					url:urls
				})
			}
		}
	}
</script>

<style lang="scss">
	.address{
		margin: -50rpx auto 0;
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
	}
	.goodNum{
		text{
			color: #E03C3C;
		}
	}
	.topMonkey{
		height: 193rpx;
		background: url(https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-order-icon47.png) bottom center no-repeat;
		background-size:  100% auto;
		.time{
			padding-top: 28rpx;
		}
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
			height: 80rpx;
			border-bottom: 1px solid #EEEEEE;
			.left{
				line-height: 40rpx;
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
