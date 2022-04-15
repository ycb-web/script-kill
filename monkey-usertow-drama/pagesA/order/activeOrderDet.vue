<template>
	<view class="app" v-if="dataMsg">
		<Header title='查看订单'></Header>
		<!-- <view class="topMonkey2 w100 posi-r" v-if="dataMsg.status == 1"> -->
		<view class="topMonkey2 w100 posi-r" v-if="dataMsg.status == ''">
			<div class="time ta-c c-fff f24 line2">支付剩余时间</div>
			<view class="ta-c c-fff" v-if="xzshiian">
				<u-count-down @end="shijianend" :timestamp="xzshiian" :bg-color="bgColor" color="#fff"
					:show-days="false" :font-size="40" separator-color="#fff" :show-hours="false"></u-count-down>
			</view>
		</view>
		<!-- <view class="topMonkey w100 posi-r" v-else>
            <view class="txt posi-a f28">{{ filter.orderStatus(dataMsg.status) }}</view>
        </view> -->
		<view class="erCodeOut bs-bb m_auto qr" v-if="
                 dataMsg.status == 2
            ">
			<!-- <image :src="item.verification_code_image" mode="aspectFit" ></image> -->
			<view class="qrcode">
				<canvas style="width: 200px; height: 200px; margin: 0 auto" canvas-id="myQrcode"></canvas>
			</view>

			<view class="desc">请将此二维码展示给商家核销</view>

			<view class="code">核销码：{{ dataMsg.orderNo }}</view>

			<view class="time">使用时间：{{ date }}</view>
		</view>

		<!-- <div class="shopsMsg mr-t20 p20_all bs-bb m_auto ">
			<div class="tit">大猴小猴亲子</div>
			<div class="li bs-bb posi-r sl-1">商家电话：{{item.product_details.supplement_field}}
				<image src="../../static/icon6.png" class="posi-a"></image>
			</div>
			<div class="li bs-bb posi-r sl-1">地址：苏州工业区星海五号文化创意创意园苏州工业区星海五号文化创意创意园
				<image src="../../static/icon7.png" class="posi-a"></image>
			</div>
		</div> -->
		<div class="orderMsg mr-t20 p20_all bs-bb m_auto " :class="
                dataMsg.status == 7 ||
                dataMsg.status == 6 ||
                dataMsg.status == 1
                    ? 'act'
                    : ''
            " :key="index" :style="{
				marginTop:  dataMsg.status !== 2 ? '-40rpx' : '20rpx'
			}">
			<div class="shopMsg w100 flex">

				<image :src="dataMsg.pic" mode="aspectFill" class="mr-2 left "
					style="width: 164rpx;height: 192rpx; border-radius: 20rpx;"></image>
				<div class="right flex1">
					<view class="tit bs-bb posi-r" style="height: auto">
						<view class="ellipsis-main ellipsis-2 prodName" style="
                                line-clamp: 3;
                                -webkit-line-clamp: 3;
                                font-weight: 600;
                            ">
							{{ dataMsg.productItemList[0].prodName }}
						</view>
						<!-- <view class="price posi-a">¥ {{item.price}}</view> -->
					</view>
					<!-- <view class="type w100 flex justSb">
						<view class="guige f24 c666">
							<div class="inner ellipsis-main ellipsis-1">{{dataMsg.productItemList[0].skuName}}</div>
						</view>
						<view class="num f22 ta-c">x{{item.prodCount}}</view> 
					</view> -->
				</div>
			</div>
			<view class="timeData">{{dataMsg.productItemList[0].skuName}}</view>

			<!-- <div class="column">
                <text>活动日期：</text>
                <text>{{ date }}</text>
            </div>
            <div class="column" :style="!dataMsg.productItemList.length ? 'border-botttom: none' : ''">
                <text>有效期：</text>
                <text>指定入园日期当日可用</text>
            </div> -->
			<div style="overflow: hidden">
				<view class="sku-list" v-for="(sku, key) in dataMsg.productItemList" :key="key" style="margin-top: 8px">
					<!-- <view :class="['sku1', { active: sku.number > 0 }]">
                        {{ sku.skuName | name }}
                    </view> -->
					<view class="payInfo">
						<text style="color: #fff;margin-right: 10rpx;">实付: </text> <text class="moneyImg">￥</text><text
							class="moneyNum">{{ sku.price }}</text>
						<!-- <text >×{{ sku.prodCount || 0 }}</text> -->
					</view>
				</view>
			</div>
		</div>
		<view class="">
			<view class="information all_transform all_box-shadow">
				<view class="information-title">商家信息</view>
				<view class="information-tal flex justify-between" @click="phone(product_info.site_info.mobile)">
					<view class="left ellipsis-main ellipsis-1">商家电话：{{
		                product_info.site_info.mobile || "商家暂未保留电话号"
		            }}
					</view>
					<image src="../../static/icon7.png" mode=""></image>
				</view>
				<view class="information-tal flex justify-between" @click="address()">
					<view class="left ellipsis-main ellipsis-1">地址：{{
		                product_info.site_info.location || "商家暂未保留地址"
		            }}
					</view>
					<image src="../../static/icon6.png" mode=""></image>
				</view>
				<!-- <view class="information-title">团队购买</view>
			<view class="information-tal flex justify-between" @click="phone('18669004444')">
				<view class="left ellipsis-main ellipsis-1">详情请咨询：{{ 18669004444 || "商家暂未保留电话号" }}</view>
				<image src="../../../static/icon7.png" mode=""></image>
			</view> -->
			</view>
		</view>

		<!-- <div class="orderbeizhu mr-t20 p20_all bs-bb m_auto " v-if="dataMsg.remarks" :class="
                dataMsg.status == 7 ||
                dataMsg.status == 6 ||
                dataMsg.status == 1
                    ? 'act'
                    : ''
            "> -->
		<div class="orderbeizhu  bs-bb m_auto " :class="
			        dataMsg.status == 7 ||
			        dataMsg.status == 6 ||
			        dataMsg.status == 1
			            ? 'act'
			            : ''
			    ">
			<div class="tit">订单备注</div>
			<div class="desc">{{ dataMsg.remarks || "" }}</div>
		</div>
		<div class="priceMine mr-t20 p20_all bs-bb m_auto  bg-fff" :class="
                dataMsg.status == 7 ||
                dataMsg.status == 6 ||
                dataMsg.status == 1
                    ? 'act'
                    : ''
            ">
			<div class="tit ta-c line2 pt-10">价格说明</div>
			<!-- <div class="priceLine"></div> -->
			<div class="priceMsg">
				<div class="li">
					<view class="circle"></view>
					<div class="h3">划线价格</div>
					<div class="p">
						经展示过的销售价等，并非原价，仅供参者未划线价格经展示过的销售价等，并非原价，仅供参者未划线价格
					</div>
				</div>
				<div class="li">
					<view class="circle"></view>
					<div class="h3">未划线价格</div>
					<div class="p">
						商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。
					</div>
				</div>
				<div class="li">
					<view class="circle"></view>
					<!-- <div class="h3">划线价格</div> -->
					<div class="p">
						商家详情页(含主图)以图片或文字形式标注的一口价，促销价优惠价等价格可能是在使用优惠券。满减或特定优惠活动和时段等情形下的价格，具体请以结算页面的标价、优惠条件或活动规则为准。
					</div>
				</div>
			</div>
		</div>

		<div class="orderPayMsg mr-t20 p20_all bs-bb m_auto  bg-fff pb-20" :class="
                dataMsg.status == 7 ||
                dataMsg.status == 6 ||
                dataMsg.status == 1
                    ? 'act'
                    : ''
            ">
			<view class="li justSb flex f24 line15 mr-b10 " @click="copy(dataMsg.orderNo)">
				<view>订单号</view>
				<view>
					<image src="../../static/icon5.png" mode=""
						style="width: 22rpx; height: 22rpx; margin-right: 10rpx">
					</image>{{ dataMsg.orderNo }}
				</view>
			</view>
			<div class="li justSb flex f24 line2 mr-b10 ">
				<view>下单时间</view>
				<view>{{ parseTime(dataMsg.createTime) }}</view>
			</div>
			<div class="li justSb flex f24 line2 mr-b10 ">
				<view>支付金额</view>
				<view>￥{{ order.price }}</view>
			</div>
			<div class="li justSb flex f24 line2 mr-b10 ">
				<view>优惠</view>
				<view>-￥{{ dataMsg.reduceAmount || 0 }} </view>
			</div>
			<div class="li justSb flex f24 line2 mr-b10 payMsgNum">
				<view>支付
					<view class="payNumInfo">
						<text style="color: #fff;margin-right: 10rpx;">实付: </text> <text class="moneyImg">￥</text><text
							class="moneyNum">{{ order.price }}</text>
						<!-- <text >×{{ sku.prodCount || 0 }}</text> -->
					</view>
				</view>

				<view>微信支付 </view>
			</div>
		</div>
		<u-gap height="40"></u-gap>

		<!-- <view
            class="btns bs-bb bg-fff p30_all flex justSb fixed_b"
            v-if="dataMsg.status == 1"
        > -->
		<view class="btns bs-bb bg-fff p30_all flex justSb fixed_b" v-if="dataMsg.status == ''">
			<!-- <view class="btn ta-c look" v-if="order.status ==3 ||order.status ==4" @click="goWuLiu()">查看物流</view> -->
			<view class="btn2 ta-c look" @click="cancel_order()">取消订单</view>
			<view class="btn ta-c look" @click="submit_pay()">付款</view>
		</view>
	</view>
</template>

<script>
	import drawQrcode from "../../utils/weapp.qrcode.esm.js";
	import filter from "../../filters/index.js";

	function add0(m) {
		return m < 10 ? "0" + m : m;
	}
	import {
		parseTime
	} from "../../common/util.js";
	export default {
		data() {
			return {
				type: false,
				ids: 0,
				dataMsg: "",
				xzshiian: null,
				order: null,
				filter,
			};
		},
		onLoad(e) {
			this.ids = e.ids;
			this.getData();
		},
		computed: {
			date() {
				return this.dataMsg.productItemList[0]?.properties
					?.split(";")
					?.filter((item) => item.indexOf("日期") >= 0)[0]
					?.split(":")?. [1];
			},
		},
		methods: {
			parseTime,
			shijianend() {
				this.$api
					.cancel_order({
						id: this.dataMsg.orderNo,
					})
					.then((res) => {
						this.getData();
					});
			},
			cancel_order(id, index) {
				uni.showModal({
					title: "提示",
					content: "确认取消此订单",
					success: (data) => {
						if (data.confirm) {
							this.cancel_order_api();
						}
					},
				});
			},
			cancel_order_api() {
				this.$api
					.cancel_order({
						id: this.dataMsg.orderNo,
					})
					.then((res) => {
						if (res.status === 200) {
							uni.showToast({
								title: "取消订单成功",
							});
							this.getData();
						}
					});
			},
			submit_pay() {
				const _this = this;
				uni.showLoading({
					title: "等待支付...",
				});
				this.$api
					.submit_pay({
						pay_type: this.dataMsg.product_type,
						amount: this.dataMsg.pay_price,
						orderNo: this.dataMsg.orderNo,
						code: wx.login(),
						open_id: uni.getStorageSync("open_id"),
					})
					.then((res) => {
						wx.requestPayment({
							...res.data,
							success() {
								this.getData();
							},
							fail(e) {
								uni.showToast({
									title: e.msg,
									icon: "none",
								});
							},
						});
					})
					.finally(() => {
						uni.hideLoading();
					});
			},
			getTime(shijianchuo) {
				//shijianchuo是整数，否则要parseInt转换
				var time = new Date(shijianchuo * 1000);
				var y = time.getFullYear();
				var m = time.getMonth() + 1;
				var d = time.getDate();
				var h = time.getHours();
				var mm = time.getMinutes();
				var s = time.getSeconds();
				return y + "-" + add0(m) + "-" + add0(d);
			},
			getData() {
				this.$api
					.get_order_detail({
						orderNo: this.ids,
					})
					.then((res) => {
						this.dataMsg = res.data;
						this.order = this.dataMsg.productItemList[0];
						if (this.dataMsg.status == 1) {
							this.getTime_pay();
						}
						if (this.dataMsg.status == 2) {
							const orderNo = this.dataMsg.orderNo;
							console.log(orderNo);
							drawQrcode({
								width: 200, // 必须，二维码宽度，与canvas的width保持一致
								height: 200, // 必须，二维码高度，与canvas的height保持一致
								canvasId: "myQrcode",
								background: "#ffffff", //	非必须，二维码背景颜色，默认值白色
								foreground: "#2bb15e", // 非必须，二维码前景色，默认值黑色 	'#000000'
								// ctx: wx.createCanvasContext('myQrcode'), // 非必须，绘图上下文，可通过 wx.createCanvasContext('canvasId') 获取，v1.0.0+版本支持
								text: orderNo, // 必须，二维码内容
								// v1.0.0+版本支持在二维码上绘制图片
								image: {
									// imageResource: '../../images/icon.png', // 指定二维码小图标
									dx: 70,
									dy: 70,
									dWidth: 60,
									dHeight: 60,
								},
							});
						}
					});
			},
			getTime_pay() {
				this.$api.get_config({}).then((res) => {
					let value = res.data?.value * 60 * 1000;
					let created_Z = this.dataMsg.createTime;
					let created = new Date(created_Z).getTime();
					let date = new Date().getTime();
					let guoqu = date - created;

					this.xzshiian = (value - guoqu) / 1000;
				});
			},
			turnTo(urls) {
				uni.navigateTo({
					url: urls,
				});
			},

			copy(msg) {
				uni.setClipboardData({
					data: msg,
					success() {
						uni.showToast({
							title: "复制成功",
						});
					},
				});
			},
		},
		filters: {
			name(value) {
				return value
					.split(";")
					.filter((item) => item.startsWith("人数"))[0]
					?.split(":")?. [1];
			},
		},
	};
</script>

<style lang="scss">
	.all_box-shadow {
		box-shadow: box-shadow;
	}

	.all_transform {
		transform: translateY(-20rpx);
	}

	.information {
		padding-bottom: 20rpx;
		margin: 30rpx 20rpx 20rpx;

		// border-radius: 20rpx;
		border-bottom: 1rpx solid rgba(204, 165, 255, 0.2);

		.information-title {
			font-size: 30rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #BC9D75;
		}

		.information-tal {
			margin: 20rpx 0;

			.left {
				width: 488rpx;
				height: 34rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #E7E7E7;
			}

			image {
				width: 108rpx;
				height: 36rpx;
			}
		}
	}

	.moneyNum {
		font-family: DINAlternate-Bold;
		font-size: 36rpx;
		font-weight: normal;
		line-height: 28rpx;
		text-align: right;
		color: #FF5F17;
	}

	.moneyImg {
		font-family: DINAlternate-Bold;
		font-size: 24rpx;
		font-weight: normal;
		line-height: 24rpx;
		color: #FF5F17;
	}

	.payInfo {
		position: absolute;
		right: 28rpx;
		top: 159rpx;
		font-family: PingFangSC-Regular;
		font-size: 28rpx;
		font-weight: normal;
		line-height: 34rpx;
		text-align: right;
		color: #FFFFFF;
	}

	.timeData {
		position: absolute;
		left: 210rpx;
		top: 120rpx;
		width: 270rpx;
		height: 32rpx;
		border-radius: 10rpx;

		background: rgba(255, 255, 255, 0.5);
		font-family: PingFangSC-Regular;
		font-size: 20rpx;
		font-weight: normal;
		line-height: 32rpx;
		text-align: center;
		letter-spacing: 0px;
		color: #333333;
	}

	.prodName {
		margin-top: -68rpx;
		font-size: 24prx;
		line-height: 40rpx;
		margin-left: 10rpx;
		color: #FFFFFF !important;
	}

	.sku-list {
		display: flex;
		font-size: 26rpx;
		justify-content: space-between;
		align-items: flex-start;
		padding: 10rpx 10rpx;

		& view:nth-child(1) {
			max-width: 230px;
			text-overflow: ellipsis;
			overflow: hidden;
			color: #666666;
			white-space: nowrap;
			display: -webkit-box;
			-webkit-box-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
			text-overflow: ellipsis;
		}
	}

	.add {
		display: flex;
		flex-direction: row;
		align-items: flex-end;

		text:first-child {
			color: rgb(224, 60, 60);
			font-size: 14px;
			font-weight: 600;
			margin-right: 3px;
		}
	}

	.column {
		font-size: 24rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
		margin-top: 8px;

		text:nth-child(1) {
			color: #999999;
			display: inline-block;
			width: 80px;
			margin-right: 7px;
		}

		text:nth-child(2) {
			color: #666666;
			margin-right: 7px;
		}
	}

	.qr {
		width: 690rpx;
		margin-top: -40rpx;
		z-index: 10000;
		position: relative;
		border-radius: 20rpx;
		text-align: center;
		overflow: hidden;

		.desc {
			font-size: 24rpx;
			color: #999;
			margin-top: 7px;
			text-align: center;
			margin-bottom: 20px;
		}

		.code {
			color: #333333;
			font-size: 17px;
			font-weight: bold;
		}

		.qrcode {
			background: #f7931e11;
			width: 200px;
			display: inline-block;
			margin-top: 20px;
		}

		.time {
			margin-bottom: 20px;
			font-size: 24rpx;
			color: #999;
			text-align: center;
			margin-top: 5px;
		}
	}

	.topMonkey2 {
		height: 193rpx;
		background: url(https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-order-icon47.png) bottom center no-repeat;
		background-size: 100% auto;

		.time {
			padding-top: 28rpx;
		}
	}

	.app {
		padding-top: 230rpx;
		min-height: 100vh;
		padding-bottom: 100rpx;
		width: 100%;
		height: 100%;
		background: linear-gradient(0deg, #070000 -72%, #070000 -72%, #121632 100%, #121632 100%);
	}

	.btns {
		height: 140rpx;
		background-color: #ffffff;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;

		.btn {
			height: 80rpx;
			line-height: 80rpx;
			width: 310rpx;
			border-radius: 40rpx;
			background-color: #cccccc;

			&.look {
				background: url(../../static/icon9.png);
				background-size: 100% 100%;
				color: #ffffff;
			}
		}

		.btn2 {
			height: 80rpx;
			line-height: 80rpx;
			width: 310rpx;
			border-radius: 40rpx;
			background-color: #cccccc;

			&.look {
				background-color: #ccc;
				background-size: 100% 100%;
				color: #ffffff;
			}
		}
	}

	.act {
		// transform: translateY(-80rpx);
	}

	.goodNum {
		text {
			color: #e03c3c;
		}
	}

	.topMonkey {
		height: 273rpx;
		background: url(https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-order-icon4.png) bottom center no-repeat;
		background-size: 100% auto;

		.txt {
			color: #4f2f12;
			left: 220rpx;
			top: 72rpx;
			width: 130rpx;
			height: 54rpx;
			line-height: 54rpx;
			text-align: center;
		}
	}

	.erBox {
		width: 690rpx;
		margin: -70rpx auto 0;
		position: relative;
		z-index: 99;
		box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.07);

		.erCodeOut {
			width: 216px;
			height: 216px;
			border-radius: 20rpx;
			background: #fff6eb;
			padding: 16rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.p1 {
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #666666;
			line-height: 34rpx;
			padding-top: 20rpx;
			padding-bottom: 28rpx;
		}

		.p2 {
			height: 50rpx;
			font-size: 36rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #333333;
			line-height: 50rpx;
		}

		.p3 {
			line-height: 34rpx;
		}
	}

	.shopsMsg {
		width: 690rpx;
		box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.07);
		padding-bottom: 30rpx;

		.tit {
			line-height: 34rpx;

			padding-top: 10rpx;
		}

		.li {
			height: 36rpx;
			line-height: 36rpx;
			margin-top: 22rpx;
			padding-right: 110rpx;

			image {
				height: 36rpx;
				width: 108rpx;
				right: 0;
				top: 0;
			}
		}
	}

	.orderbeizhu {
		width: 690rpx;
		padding-top: -10rpx;
		padding-bottom: 30rpx;
		box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.07);
		border-bottom: 1rpx solid rgba(204, 165, 255, 0.2);

		.tit {
			font-family: PingFangSC-Regular;
			font-size: 28rpx;
			font-weight: normal;
			line-height: 34rpx;
			color: #FFFFFF;
			padding-bottom: 10rpx;
		}

		.desc {
			font-family: PingFangSC-Regular;
			font-size: 20rpx;
			font-weight: normal;
			line-height: 28rpx;
			color: #FFFFFF;
		}
	}

	.orderMsg {
		width: 690rpx;
		box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.07);
		// padding-bottom: 0rpx;
		// margin-top: -50rpx;
		position: relative;
		z-index: 999;
		border-bottom: 1rpx solid rgba(204, 165, 255, 0.2);

		.shopMsg {
			height: 128rpx;
			margin-bottom: 20rpx;

			image {
				margin-top: 30rpx;
			}

			.left {
				height: 128rpx;
				width: 128rpx;
			}

			.right {
				.tit {
					font-size: 24rpx;
					line-height: 34rpx;
					height: 68rpx;
					// padding-right: 110rpx;

					.price {
						right: 0;
						top: 10rpx;
						color: #e03c3c;
					}
				}

				.type {
					height: 50rpx;
					align-items: flex-end;

					.guige {
						border-radius: 22rpx;
						padding: 0 10rpx 0 20rpx;
						max-width: 310rpx;
						overflow: hidden;
						background-color: #f1f1f1;

						.inner {
							height: 38rpx;
							padding-right: 30rpx;
							background: url(../../static/icon1.png) right center no-repeat;
							background-size: 28rpx 28rpx;
						}
					}

					.num {
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

		.priceMsg {
			line-height: 54rpx;
			padding-bottom: 20rpx;

			.payType {
				color: #e03c3c;
				font-size: 24rpx;
			}
		}
	}

	.priceMine {
		width: 690rpx;
		box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.07);
		font-family: PingFangSC-Medium;
		font-size: 28rpx;
		font-weight: 500;
		line-height: 34rpx;
		text-align: center;
		color: #FFFFFF;
		border-bottom: 1rpx solid rgba(204, 165, 255, 0.2);

		.priceMsg {
			width: 100%;

			.li {
				padding-left: 20rpx;
				margin-top: 20rpx;
				position: relative;

				.circle {
					width: 8rpx;
					height: 8rpx;
					background: radial-gradient(79% 79% at 42% 29%, #56D6FF 0%, #56D6FF 0%, #417EED 100%, #417EED 100%);
					position: absolute;
					left: 0;
					top: 14rpx;
					border-radius: 50%;
				}

				.h3 {
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					line-height: 34rpx;
					padding-bottom: 10rpx;
					text-align: left;
					font-weight: normal;
					color: #FFFFFF;
				}

				.p {
					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					line-height: 28rpx;
					font-weight: normal;
					color: #FFFFFF;
					text-align: left;
				}
			}
		}

		.priceLine {
			width: 40px;
			height: 6px;
			background: linear-gradient(270deg, #f6931f 0%, #fbe859 100%);
			border-radius: 3px;
			margin: 0 auto;
		}
	}
	.payMsgNum {
		position: relative;
		.payNumInfo {
			position: absolute;
			right: 114rpx;
			top: 8rpx;
			font-family: PingFangSC-Regular;
			font-size: 28rpx;
			font-weight: normal;
			line-height: 34rpx;
			text-align: right;
			color: #FFFFFF;
		}
	}
	.orderPayMsg {
		width: 690rpx;
		box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.07);
		padding-top: 30rpx;
		font-family: PingFangSC-Regular;
		font-size: 24rpx;
		font-weight: normal;
		line-height: 34rpx;
		text-align: center;
		color: #FFFEFE !important;
	}

	.btns {
		height: 140rpx;
		background-color: #ffffff;

		.btn {
			height: 80rpx;
			line-height: 80rpx;
			width: 310rpx;
			border-radius: 40rpx;
			background-color: #cccccc;

			&.look {
				background: url(../../static/icon9.png);
				background-size: 100% 100%;
				color: #ffffff;
			}
		}
	}
</style>
