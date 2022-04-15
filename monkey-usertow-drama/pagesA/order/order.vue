<template>
	<view class="app">
		<Header title="我的订单" class="title">
			<view class=" bs-bb  colum">
				<view class=" px-2 border-box search">
					<input type="text" value="" v-model="searchKey" class="searchText" @confirm="getData()"
						placeholder="查看我的订单" />
					<view class="image" @tap="getData()">
						<image src="../../static/home/search.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="flex justSb w100">
					<view v-for="(item, i) in orderType" :key="i" class="nav nav4 f26 c666 ta-c"
						:class="{ select: orderTypeNum == i }" @tap="changOrderTypeNum(i)">{{ item }}</view>
				</view>
			</view>
		</Header>
		<!-- <view class="flex mt-2 mb-3 tabs justify-around"> -->
		<!-- 			<view class="tab" v-for="(item, index) in typeOption" :key="index">
				<view class="flex direction-column justify-between" @click="changOrderType(item.type, index)">
					<image :class="switch_nav_index==index?'item-image_act':''" :src="item.iconUrl"></image>
					<view class="text" :class="switch_nav_index==index?'item-tet_act':''">{{ item.title }}</view>
				</view>
			</view> -->
		<!-- 			<view class="tab">
				<view class="flex direction-column justify-between" @click="changOrderType(1)">
					<image :src="item.iconUrl"></image>
					<view class="text">活动订单</view>
				</view>
			</view>
			<view class="tab">
				<view class="flex direction-column justify-between" @click="changOrderType(2)">
					<image :src="item.iconUrl"></image>
					<view class="text">购物订单</view>
				</view>
			</view> -->
		<!-- </view> -->

		<view class="w100 gray"></view>
		<view class="orderList" v-if="dataMsg.length > 0">
			<div class="order " v-for="(item, index) in dataMsg" :key="item.orderNumber"
				@tap="goodOrder(item.orderNumber)">
				<div class="orderTop bs-bb ">
					<div class="shopMsg w100 flex" v-for="good in item.orderItemDtos" :key="good.prodName">
						<image :src="item.pic" mode="aspectFill" class="mr-2 left "></image>
						<div class="right flex1">
							<view class="tit bs-bb posi-r">
								<view class="ellipsis-main ellipsis-2 prodName">
									{{ good.prodName }}
								</view>
								<!-- <view class="price posi-a">¥ {{ good.price }}</view> -->
							</view>
							<view class="type w100 flex justSb">
								<view class="guige f24 c666 max_w_500 ellipsis-main ellipsis-1">
									{{ good.properties }}
								</view>
								<!-- <view class="num f22 ta-c">x{{ good.prodCount }}</view> -->
							</view>
						</div>
					</div>
					<div class="priceMsg flex justSb f24">
						<view class="payType" v-if="item.status == 1 && smNavType == 2">等待卖家付款</view>
						<view class="payType" v-if="item.status == 2 && smNavType == 2">买家已付款，等待卖家发货</view>
						<view class="payType" v-if="item.status == 3 && smNavType == 2">卖家已发货</view>
						<view class="payType" v-if="item.status == 4 && smNavType == 2">等待买家评价</view>
						<view class="payType" v-if="item.status == 5 && smNavType == 2">交易成功</view>
						<view class="payType" v-if="item.status == 6 && smNavType == 2">订单取消</view>
						<view class="payType" v-if="item.status == 7 && smNavType == 2">订单超时支付</view>

						<view class="priceMsgInfo">
							<view class="li justSb flex f24 line15  priceMsgInfo-order" @click="copy(good.orderNo)">
								<view>订单号: </view>
								<view style="margin-left: 12rpx;">
									{{ good.orderNo || '6909452893'}}
									<image src="../../static/icon5.png" mode=""
										style="width: 22rpx; height: 22rpx; margin-left: 30rpx;margin-top: 5rpx;">
									</image>
								</view>
							</view>
							<!-- <view v-if="item.status < 6">
								实付：
								<text class="bold">¥ {{ item.actualTotal }}</text>
							</view> -->
							<view class="priceMsgInfo-price">
								<text style="color: #FFFFFF; font-size: 24rpx;">实付款： </text>
								<text class="" style="color: #FF5F17;"><text style="color: #FF5F17;">¥</text><text
										style="font-size: 36rpx;">{{ item.actualTotal }}.00</text></text>
							</view>
						</view>
					</div>
				</div>
				<div class="orderBottom p20 flex">
					<text class="btn f24 ta-c" v-if="item.status == 1 && smNavType == 2"
						@click.stop="cancel_order(item.orderNumber, index)">取消订单</text>
					<text class="btn f24 ta-c cancelbtn" v-if="item.status == 6">订单取消</text>
					<text class="btn f24 ta-c" v-if="item.status == 7">订单超时</text>
					<text class="btn select f24 ta-c" v-if="item.status == 1"
						@click.stop="submit_pay(item.orderNumber, item.actualTotal)">付款</text>
					<div class="btn select f24 ta-c" v-if="item.status == 3 && smNavType == 2"
						@click.stop="navTo(`/pagesA/logistics/logistics?ids=${item.orderNumber}`)">
						查看物流
					</div>
					<div class="btn select f24 ta-c" v-if="item.status == 3 && smNavType == 2"
						@click.stop="shouhuook(item)">
						确认收货
					</div>
					<div class="btn select f24 ta-c" v-if="item.status == 4 && smNavType == 2"
						@click.stop="pingjiaOrder(item.orderNumber)">
						去评价
					</div>
					<text class="btn select f24 ta-c" v-if="item.status == 2 && smNavType == 2"
						@click.stop="callMe(item.consignee_mobile)">联系我们</text>
					<text class="btn select f24 ta-c" v-if="item.status == 2 && !(smNavType == 2)">去使用</text>
					<text class="btn f24 ta-c" v-if="item.status == 1 && !(smNavType == 2)"
						@click.stop="cancel_order(item.orderNumber, index)">取消订单</text>
					<text class="btn select f24 ta-c" v-if="item.status == 3 && !(smNavType == 2)"
						@click.stop="pingjiaOrder(item.orderNumber)">去评价</text>
					<!-- 后付 -->
					<text class="btn select f24 ta-c"
						v-if="item.status != 6 && item.openPostpaid && item.postpaidStatus==0"
						@click.stop="toPay(item.orderNumber)">付款</text>
					<text class="btn f24 ta-c" v-if="item.status == 4 && !(smNavType == 2)"
						@click.stop="cancel_order(item.orderNumber, index)">交易完成</text>
					<text class="btn f24 ta-c" v-if="item.status == 5 && smNavType == 2">交易完成</text>
				</div>
			</div>
		</view>
		<view v-if="loading == 'onMore' && dataMsg.length == 0" style="padding-top: 500rpx">
			<u-empty src="https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-activity-empty.png" text="暂无数据"
				icon-size="230" color="#333"></u-empty>
		</view>

		<u-modal v-model="showShouHuo" :content="content" :show-cancel-button="true" :show-title="false"
			@confirm="shouhuoClick" confirm-text="确认收货" confirm-color="#F7931E"></u-modal>
		<view class="loadingBar">
			<loading :status="loading" v-if="!(loading == 'onMore' && dataMsg.length == 0)" />
		</view>
	</view>
</template>
<script>
	import loading from '@/components/loading/uni-load-more';
	export default {
		components: {
			loading,
		},
		data() {
			return {
				searchKey: '',
				showShouHuo: false,
				content: '是否确认收货',
				loading: 'loading',
				orderType: ['全部', '待付款', '待使用', '待评价', '已完成'],
				orderTypeNum: 0,
				open: false,
				smNavType: null,
				dataMsg: [],
				page: {
					pageNum: 1,
					pageSize: 20,
					total: 0,
				},
				shouhuoMsg: '',
				typeOption: [{
						iconUrl: '',
						title: '门票订单',
						type: 3,
					},
					{
						iconUrl: '',
						title: '活动订单',
						type: 1,
					},
					{
						iconUrl: '',
						title: '购物订单',
						type: 2,
					},
				],
				switch_nav_index: -1,
				code: '',
			};
		},
		onLoad(e) {
			// this.smNavType = e.type;
			// console.log(e.type)
			this.orderTypeNum = e.orderNav;
			this.getData();
			// uni.setNavigationBarTitle({
			//     title: e.title
			// });
		},
		onShow() {
			this.page.pageNum = 1;
			this.getData();
		},
		onReachBottom() {
			this.page.pageNum++;
			this.loading = 'loading';
			this.getData();
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
			this.page.pageNum = 1;
			this.loading = 'loading';
			this.getData();
		},
		methods: {
			navTo(url) {
				uni.navigateTo({
					url,
				});
			},
			pingjiaOrder(id) {
				uni.navigateTo({
					url: '/pages/product/PostComments?type=' + this.smNavType + '&id=' + id,
				});
			},
			shouhuoClick() {
				this.$api
					.user_confirm_the_goods({
						id: this.shouhuoMsg.id,
					})
					.then((res) => {
						this.page.pageNum = 1;
						this.getData();
					});
			},
			shouhuook(item) {
				this.showShouHuo = true;
				this.shouhuoMsg = item;
				// uni.setStorageSync("pngjiaMsg",item);
				// uni.navigateTo({
				// 	url:'../product/PostComments?type=' + this.smNavType
				// })
			},
			callMe(phone) {
				let current = uni.getStorageSync('QRcode');
				uni.previewImage({
					current,
					urls: [current],
				});
				// uni.makePhoneCall({
				// 	phoneNumber:phone
				// })
			},
			changOrderType(type, index) {
				this.loading = 'loading';
				this.smNavType = type;
				this.page.pageNum = 1;
				this.switch_nav_index = index;
				this.dataMsg = [];
				this.getData();
			},
			changOrderTypeNum(i) {
				this.loading = 'loading';
				this.orderTypeNum = i;
				this.page.pageNum = 1;
				this.dataMsg = [];
				this.getData();
			},
			goodOrder(ids) {
				if (this.smNavType == 2) {
					uni.navigateTo({
						url: './goodOrderDet?ids=' + ids,
					});
				} else {
					uni.navigateTo({
						url: './activeOrderDet?ids=' + ids + '&type=' + this.orderTypeNum,
					});
				}
			},
			getData() {
				// {?merchantId,rows,start,status}
				this.$api
					.get_order_list({
						merchantId: uni.getStorageSync('merchantId'),
						rows: this.page.pageSize,
						start: (this.page.pageNum - 1) * this.page.pageSize,
						orderType: this.smNavType,
						status: this.orderTypeNum == 0 ? '' : Number(this.orderTypeNum),
						searchKey: this.searchKey,
					})
					.then((res) => {
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
						// }).finally(() => {
					});
			},
			turnto(urls) {
				uni.navigateTo({
					url: urls,
				});
			},
			// 后付
			async toPay(orderNo) {
				this.submit_pay(orderNo, 0)
			},
			// 支付
			async submit_pay(pay_or_sn, amount) {
				const _this = this;
				await this.getCode()
				await uni.showLoading({
					title: '等待支付...',
				});

				await this.$api
					.submit_pay({
						code: this.code,
						pay_type: 1,
						amount,
						orderNo: pay_or_sn,
						open_id: uni.getStorageSync('open_id'),
					})
					.then((res) => {
						res.data.package = res.data.packageValue
						wx.requestPayment({
							...res.data,
							success() {
								wx.requestSubscribeMessage({
									tmplIds: ['kh7ERqA4DRGxkx_ZkdSPDtjP7s-Nqdaf8vAmQpfFTwc'],
									success(res) {
										this.getData();
									}
								})
							},
							fail(e) {
								uni.showToast({
									title: e.msg,
									icon: 'none',
								});
							},
						});
					})
					.finally(() => {
						uni.hideLoading();
					});
			},
			cancel_order(id, index) {
				uni.showModal({
					title: '提示',
					content: '确认取消此订单',
					success: (data) => {
						if (data.confirm) {
							this.cancel_order_api(id, index);
						}
					},
				});
			},
			cancel_order_api(id, index) {
				this.$api
					.cancel_order({
						id,
					})
					.then((res) => {
						if (res.status === 200) {
							uni.showToast({
								title: '取消订单成功',
							});
							this.dataMsg.splice(index, 1);
						}
					});
			},
			async getCode() {
				const _this = this
				return await new Promise(resolve => wx.login({
					success({
						code
					}) {
						_this.code = code
						resolve(code)
					},
				}))
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
	};
</script>

<style lang="scss" scoped>
	.app {
		width: 100%;
		height: 100%;
		// background: linear-gradient(0deg, #1F113F 3%, #1F113F 3%, #121632 100%, #121632 100%);
		background-color: #121632;
	}

	.title {
		background-color: #121632;
		z-index: 999;
	}

	/deep/ .headerBox {
		background-color: #121632;
	}

	/deep/ .back {
		background-color: #121632;
		height: 98rpx !important;
	}

	.colum {
		padding: 32rpx;
		padding-bottom: 0rpx;
		border-top: 1rpx solid rgba(165, 168, 255, 0.2);
		border-bottom: 1rpx solid rgba(165, 168, 255, 0.2);
		background-color: #121632;
	}

	.search {
		position: relative;
		background: #fff;
		padding: 6rpx 20rpx;
		margin-bottom: 32rpx;
		width: 686rpx;
		height: 60rpx;
		border-radius: 10rpx;
		background: rgba(235, 235, 235, 0.8);
		box-shadow: inset 0px 0px 10px 0px rgba(0, 0, 0, 0.3);

		.searchText {
			flex: 1;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333;
			line-height: 34rpx;
			padding: 0 32rpx;
			padding-left: 60rpx;
		}

		.image {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			left: 30rpx;
			width: 24rpx;
			height: 24rpx;
			margin-right: 32rpx;

			image {
				width: 32rpx;
				height: 32rpx;
			}
		}
	}

	.prodName {
		font-size: 24rpx;
		line-height: 40rpx;
		color: #FFFFFF;
	}

	.openList {
		line-height: 32rpx;
		height: 32rpx;

		image {
			width: 32rpx;
			height: 32rpx;
			vertical-align: top;
		}
	}

	.priceMsgInfo {
		display: flex;
		justify-content: space-between;
		width: 100%;

		.priceMsgInfo-order {
			font-family: PingFangSC-Regular;
			font-size: 24rpx;
			font-weight: normal;
			line-height: 34rpx;
			color: #DBDBDB;
		}

		.priceMsgInfo-price {
			// margin-left: 100rpx;
			margin-left: 30rpx;
		}
	}

	.orderList {
		box-sizing: border-box;
		// margin: 0rpx 30rpx;
		padding: 12vh 0rpx 30rpx;

		.order {
			margin-bottom: 20rpx;
			padding: 20rpx 30rpx 0rpx;
			border-bottom: 24rpx solid rgba(136, 115, 255, 0.2);

			.orderTop {
				padding-bottom: 0;
				border-bottom: 1px solid #f3f3f3;

				.shopMsg {
					height: 128rpx;
					margin-bottom: 20rpx;

					image {
						width: 144rpx;
						height: 144rpx;
						border-radius: 20rpx;
						box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
					}

					.right {
						.tit {
							font-size: 24rpx;
							line-height: 34rpx;
							height: 68rpx;
							padding-right: 110rpx;

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
								// width: 300rpx;
								height: 32rpx;
								border-radius: 10rpx;
								background: rgba(255, 255, 255, 0.5);

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

			.orderBottom {
				height: 94rpx;
				display: flex;

				justify-content: flex-end;

				.btn {
					width: 160rpx;
					border-radius: 31rpx;
					height: 54rpx;
					line-height: 54rpx;
					margin-left: 20rpx;
					color: #333333;
					font-size: 24rpx;
					background: linear-gradient(180deg, #FFF2DA -2%, #FFF2DA -2%, #F3BD73 100%, #F3BD73 100%);

					&.select {
						background: url(../../static/icon2.png) top center no-repeat;
						background-size: 100% 100%;
						color: #ffffff;

					}
				}
			}
		}

	}

	.cancelbtn {
		width: 160px;
		height: 54rpx;
		border-radius: 31rpx;
		background: rgba(255, 255, 255, 0.8) !important;
		font-family: PingFangSC-Regular;
		font-size: 24rpx;
		font-weight: normal;
		line-height: 34rpx;
		text-align: center;
		color: #999999 !important;
	}

	.loadingBar /deep/ .uni-load-more {
		background-color: transparent;
	}

	.orderList :last-child {
		border-bottom: none;
	}

	.shopMsg:last-of-type {
		// margin-bottom: 0rpx!important;
		margin-bottom: 20px;
	}

	.gray {
		height: 210rpx;
	}
	.nav {
		font-size: 22rpx;
		width: 126rpx;
		height: 70rpx;
		line-height: 44rpx;
		border-radius: 22rpx;
		font-family: PingFangSC-Regular;
		font-size: 28rpx;
		font-weight: normal;
		color: #E7E7E7;

		&.select {
			font-size: 32rpx;
			font-weight: 500;
			font-size: 35rpx;
			background: url(../../static/coupon-stars.png) no-repeat;
			background-position: 50% 64rpx;
			font-family: PingFangSC-Medium;
			font-size: 16px;
			font-weight: 500;
			line-height: 22px;
			color: #FFFFFF;

		}
	}

	.tabs {
		width: 100%;

		.tab {
			width: 164rpx;
			height: 100%;
			text-align: center;

			image {
				width: 56px;
				height: 56px;
				margin-bottom: 20rpx;

				&.item-image_act {
					border-radius: 30rpx;
					box-shadow: 0 0 6rpx 0 rgba(247, 147, 30, 1);
				}
			}

			.text {
				font-size: 24rpx;
				line-height: 24rpx;
				color: #333333;
				width: 686rpx;
				height: 60rpx;
				border-radius: 10rpx;
				background: rgba(235, 235, 235, 0.8);
				box-shadow: inset 0px 0px 10px 0px rgba(0, 0, 0, 0.3);

				&.item-tet_act {
					color: #333;
					font-weight: 700;
					font-size: 26rpx;
				}
			}
		}
	}
</style>
