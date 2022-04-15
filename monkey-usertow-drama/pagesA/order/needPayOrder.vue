<template>
	<view class="app">
		<view class="topMonkey w100 posi-r">
			<div class="time ta-c c-fff f24 line2">支付剩余时间</div>
			<view class=" ta-c c-fff"><u-count-down :timestamp="300" :bg-color="bgColor" color="#fff" :show-days="false" :font-size="40" separator-color="#fff" :show-hours="false"></u-count-down></view>
		</view>
		<div class="orderMsg mr-t20 p20_all bs-bb m_auto br-20">
			<div class="shopMsg w100 flex">
				<image src="../../static/demo.jpeg"  mode="aspectFill" class="mr-2 left br-20"></image>
				<div class="right flex1">
					<view class="tit bs-bb posi-r sl-2">走进吴门医派，传承中医文明传承中医文明传承中医文明传承中医文明传承中医文明！小小医药师，等你来体验！</view>
					<view class="type w100 flex justSb">
						<view class="guige f24 c666"><div class="inner">8月22日上午一大一小</div></view>
						<view class="num f22 ta-c">x111</view>
					</view>
				</div>
			</div>
			<div class="priceMsg flex justSb f24">
				<view class="payType"></view>
				<view class="goodNum">共1件商品，实付：<text class="bold ">¥ 49.09</text></view>
			</div>
		</div>
		<div class="shopsMsg mr-t20 p20_all bs-bb m_auto br-20">
			<div class="tit">大猴小猴亲子</div>
			<div class="li bs-bb posi-r sl-1">商家电话：12345678909
				<image src="../../static/icon6.png" class="posi-a"></image>
			</div>
			<div class="li bs-bb posi-r sl-1">地址：苏州工业区星海五号文化创意创意园苏州工业区星海五号文化创意创意园
				<image src="../../static/icon7.png" class="posi-a"></image>
			</div>
		</div>
		<div class="orderbeizhu mr-t20 p20_all bs-bb m_auto br-20">
			<div class="tit">订单备注</div>
			<div class="desc">这是一个订单备注这是一个订单备注</div>
		</div>
		<div class="priceMine mr-t20 p20_all bs-bb m_auto br-20 bg-fff">
			<div class="tit c666 ta-c line2 bold pt-10">价格说明</div>
			<div class="priceLine"></div>
			<div class="priceMsg">
				<div class="li">
					<view class="circle"></view>
					<div class="h3">划线价格</div>
					<div class="p">经展示过的销售价等，并非原价，仅供参者未划线价格经展示过的销售价等，并非原价，仅供参者未划线价格</div>
				</div>
				<div class="li">
					<view class="circle"></view>
					<div class="h3">未划线价格</div>
					<div class="p">商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。</div>
				</div>
				<div class="li">
					<view class="circle"></view>
					<!-- <div class="h3">划线价格</div> -->
					<div class="p">商家详情页(含主图)以图片或文字形式标注的一口价，促销价优惠价等价格可能是在使用优惠券。满减或特定优惠活动和时段等情形下的价格，具体请以结算页面的标价、优惠条件或活动规则为准。</div>
				</div>
			</div>
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
				<view>商品金额</view>
				<view>￥49.90  </view>
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
			<view class="btn ta-c look" @tap="turnTo('/pagesA/order/payOrderSucess')">立即付款</view>
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
		height: 273rpx;
		background: url(https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-order-icon42.png) bottom center no-repeat;
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
	.shopsMsg{
		width: 690rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.07);
		padding-bottom: 30rpx;
		.tit{
			line-height: 34rpx;
			
			padding-top: 10rpx;
		}
		.li{
			height: 36rpx;
			line-height: 36rpx;
			margin-top: 22rpx;
			padding-right: 110rpx;
			image{
				height: 36rpx;
				width: 108rpx;
				right: 0;
				top: 0;
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
	.orderMsg{
		width: 690rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.07);
		padding-bottom: 0rpx;
		background-color: #FFFFFF;
		position: relative;
		z-index: 100;
		margin: -130rpx auto 0;
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
		height: 140rpx;
		background-color: #FFFFFF;
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
</style>
