<template>
	<view class="app bs-bb p30_all">
		<Header title='提交订单'></Header>
		<div class="w100   mb-2 shopMsgInfo">
			<div class="shopMsg flex bs-bb p20_all">
				<u-image lazy-load width="164rpx" height="192rpx" border-radius="20" :src="goodsInfo.skuData.image"
					mode="aspectFill" class="mr-2 left "></u-image>
				<div class="right flex1">
					<view class="tit bs-bb posi-r sl-2 mr-b10 prodName">{{
                        goodsInfo.prodName
                    }}</view>
					<!-- <view class="type w100 flex justSb mr-t20">
					<view class="guige f24 c666">
						<div class="inner max_w_200 ellipsis-main ellipsis-1">{{ goodsInfo.skuData.properties }}</div>
					</view>
					<view class="num">x{{ goodsInfo.skuData.number }}</view>
				</view> -->
				</div>
			</div>
			<view class="timeData">{{ goodsInfo.skuData.properties }}</view>
			<view class="payInfo">实付：<text class="moneyImg">￥</text><text class="moneyNum">{{curr_price}}</text></view>
			<!-- <div class="column pl-20 pr-20 pb-20">
				<text>收费项目: </text>
				<text />
			</div> -->
			<!-- <div class="column pb-20">
                <text>入园日期: </text>
                <text>{{ goodsInfo.date }}</text>
            </div>
            <div class="column pb-20">
                <text>有效期: </text>
                <text>指定入园日期当日可用</text>
            </div> -->
			<div style="overflow: hidden">
				<view class="sku-list" v-for="(sku,i) in goodsInfo.skuDataList" :key="sku.id"
					style="margin-bottom: 8px">
					<view :class="['sku1', { active: sku.number > 0 }]">
						{{ sku.optionName }}
					</view>
					<view class="add">
						<text @click="sub(sku,i)" style="padding: 1px">-</text>
						<text>{{ sku.number || 0 }}</text>
						<text @click="add(sku,i)" style="padding: 1px">+</text>
					</view>
				</view>
			</div>
		</div>
		<view class="box-shadow p-2 mb-2" v-if="type == 2">
			<view class="header flex">
				<view class="image-bj">[正在开团]</view>
				<view>立即支付，即可开团成功</view>
			</view>
			<view class="flex justify-center imageBox mt-4">
				<view>
					<view class="image">
						<image :src="userInfo.icon"></image>
					</view>
					<!-- <view class="word">待支付</view> -->
				</view>
				<view class="border"></view>
				<view>
					<view class="yuan">?</view>
					<!-- <view class="word">待支付</view> -->
				</view>
			</view>
			<view class="flex justify-center imageBox">
				<view class="word">待支付</view>
				<view class="border border-none"></view>
				<view class="word">分享拼团</view>
			</view>
		</view>
		<div class="perMsg w100  ">
			<div class="top bs-bb p20_all  line2   f24 bold contacts">
				联系人信息
			</div>
			<view class="bottom">
				<!-- <div class="li flex">
					<div class="smtit ta-c">姓名</div>
					<div class="flex1 bt1 bs-bb p-10 f24"><input type="text" v-model="formPay.consigneeMobile" placeholder="联系人姓名" /></div>
				</div>
				<div class="li flex"> -->
				<!-- <div class="smtit ta-c">电话</div> -->
				<!-- <u-field label="电话" v-model="formPay.consignee" placeholder="请输入你的电话号码" :error-message="message"></u-field> -->
				<!-- <div class="flex1 bs-bb p-10 f24">
						<input type="number" v-model="formPay.consignee" placeholder="请输入你的电话号码" />
						<u-field v-model="formPay.consignee" placeholder="请输入你的电话号码" :error-message="message"></u-field>
					</div> -->
				<!-- </div> -->
				<u-field class="usertext" label="姓名" v-model="formPay.consignee" placeholder="联系人姓名"
					placeholder-style='font-size: 24rpx;font-weight: normal;line-height: 34rpx;color: #BFBFBF;'>
				</u-field>
				<u-field class="usertext" label="电话" v-model="formPay.consigneeMobile" placeholder="请输入你的电话号码"
					:error-message="message" @blur="phoneReg"
					placeholder-style='font-size: 24rpx;font-weight: normal;line-height: 34rpx;color: #BFBFBF;'>
				</u-field>
			</view>
		</div>
		<!-- 		<div class="smperJoin w100  " v-if="!isHiddenMonkey">
			<div class="top bs-bb p20_all bt1 line2 w100 mr-t20 f24 bold">
				小猴子信息
				<text class="desc c999 f20">请至少添加或选择一位未成年参与人</text>
			</div>
			<view class="bottom bs-bb p20_all flex flex-wrap">
				<div class="chooseBtn mr-r20 ta-c mb-1" v-for="item in monkey.minor" :key="item.id">
					{{ item.realName }}
				</div>
				<div class="btn bs-bb f20 ta-c" @tap="turnTo('/pagesA/my/family?type=1')">
					+新增/选择
				</div>
			</view>
		</div>
		<div class="smperJoin w100  " v-if="!isHiddenMonkey">
			<div class="top bs-bb p20_all bt1 line2 w100 mr-t20 f24 bold">
				大猴子信息
				<text class="desc c999 f20">请至少添加或选择一位成年参与人</text>
			</div>
			<view class="bottom bs-bb p20_all flex flex-wrap bt1">
				<div class="chooseBtn mr-r20 ta-c mb-1" v-for="item in monkey.adult" :key="item.id">
					{{ item.realName }}
				</div>
				<div class="btn bs-bb f20 ta-c" @tap="turnTo('/pagesA/my/family?type=2')">
					+新增/选择
				</div>
			</view> -->
		<!-- <view class="us bs-bb p20_all">
				<div class="p1 line15">参与人</div>
				<div class="p1 line15 f20 c999">微信号：weixinhao</div>
			</view> -->
		</div>
		<div class="beizhu w100   p20_all mr-t20 bs-bb flex">
			<view class=" mr-2 bold sellText">买家留言</view>
			<input type="text" v-model="formPay.remarks" class="flex1 f20 c999" placeholder="选填，请先和商家协商一致" />
		</div>
		<div class="beizhu w100   p20_all mr-t20 bs-bb flex justSb select" @tap="coupon()" v-if="type != 1">
			<view class="f24 mr-2 bold selectcoupon">选择优惠券</view>
			<view class="flex">
				<text class="coupon" v-if="useCarCoupon.id">{{
                    useCarCoupon.name || useCarCoupon.title
                }}</text>
				<!-- <text class="coupon" v-else>选择优惠券</text> -->
				<image class="rightIcon" src="../../static/direction.png" mode="aspectFill"></image>
			</view>
		</div>
		<view class="agree w100   p20_all mr-t20 bs-bb flex f24 yellowText" @tap="choose = !choose">
			<image src="../../static/icon10.png" mode="" v-if="!choose"></image>
			<image v-if="choose" src="../../static/icon11.png" mode=""></image>
			我已阅读并同意
			<text @tap.stop="showPop = true">《商品不退款协议》</text>
		</view>
		<!-- <u-gap height="130" bg-color="#f7f7f7"></u-gap> -->
		<view class="fixed_b  bs-bb p30_all flex justSb" style="z-index: 10000;">
			<div class="left">
				<div class="payPrice">
					<view class="">总计：</view>
					<view class=""><text class="f34"><text class="payImg">¥</text> <text
								class="payNum">{{ showTotal || 0 }}</text></text></view>
				</div>
				<!-- <div class="payPrice f28" v-else>
					总计：
					<text class="f34">¥ {{ curr_price || 0 }}</text>
				</div> -->
				<view class="c-fff oldPrice" v-if="curr_price != oldPrice">
					总计：
					<text class="c999 f20">¥ {{ oldPrice || 0 }}</text>
				</view>
				<view class="delText"><text class="payImgUnder">¥</text><text class="payNumUnder">0</text></view>
			</div>
			<text class="detailed">明细</text>
			<div class="right ta-c c-fff" @tap="payOrder()">确认支付</div>
		</view>
		<u-mask :show="showPop" @click="showPop = false">
			<view class="warp">
				<image src="https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-order-icon45.png"
					mode="aspectFit"></image>
				<view class="rect" @tap.stop="(showPop = false), (choose = true)">我已阅读且同意</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex";
	export default {
		data() {
			return {
				choose: true,
				showPop: false,
				message: "", //手机号错误
				formPay: {
					consigneeMobile: "",
					consignee: "",
					remarks: "",
					distributorCode: "",
				}, // 订单支付参数
				type: "", // 活动类型1:秒杀2:拼团3:无活动
				useCarCoupon: "", // 优惠卷
				spell_group_price: "", // 拼团价
				curr_price: "", // 现价
				oldPrice: "",
				product_type: "",
				isloading: false, //
				couponDiscount: 0 //优惠券减免
			};
		},
		computed: {
			...mapState(["orederPay", "goodsInfo", "monkey"]),
			userInfo() {
				return uni.getStorageSync("userInfo");
			},
			// productType === 2 (对应首页的好物)；productType === 3 （对应首页的门票）,此时不需要填写大猴子和小猴子的信息
			isHiddenMonkey() {
				return this.product_type === 2 || this.product_type === 3;
			},
			total() {
				const skuTotal =
					this.goodsInfo.skuDataList.reduce((total, item) => {
						return total + item.optionPrice * (item.number || 0);
					}, 0) || 0;
				return this.goodsInfo.skuData.price + skuTotal;
			},
			showTotal() {
				const res = this.total - this.couponDiscount
				if (isNaN(res)) return 0
				return res.toFixed(2)
			}
		},
		onLoad(option) {
			this.type = Number.parseInt(option.type); // 活动类型1:秒杀2:拼团3:无活动
			this.product_type = Number.parseInt(option.product_type);
			const invition_code = uni.getStorageSync("invite");
			this.formPay.distributorCode = invition_code;
			// this.formPay.distributorCode = "UUOQZK";
		},
		onShow() {
			this.oldPrice = this.goodsInfo.skuData.price;
			this.curr_price = this.goodsInfo.skuData.price;
			this.useCarCoupon = uni.getStorageSync("useCarCoupon");
			// 使用优惠券
			if (this.useCarCoupon) {
				this.setOrederPay({
					coupons_id: this.useCarCoupon.couponId,
				});
				this.couponCount();
				uni.setStorageSync("useCarCoupon", null);
			}
		},
		methods: {
			...mapMutations(["setOrederPay"]),
			turnTo(url) {
				uni.navigateTo({
					url
				});
			},
			handleNumber(num) {
				if (isNaN(num)) return 0
				return num || 0
			},
			add(sku, i) {
				sku.number = (sku.number || 0) >= sku.actualStocks ?
					sku.number :
					(sku.number || 0) + 1,
					this.$set(this.goodsInfo.skuDataList, i, sku)
			},
			sub(sku, i) {
				sku.number = (sku.number || 0) <= 0 ?
					0 :
					(sku.number || 0) - 1,
					this.$set(this.goodsInfo.skuDataList, i, sku)
			},
			coupon() {
				if (this.type == 3) {
					uni.setStorageSync("shopCarorderPrice", this.curr_price);
				} else {
					uni.setStorageSync("shopCarorderPrice", this.spell_group_price);
				}
				this.turnTo(`/pages/coupon/coupon?ids=${this.goodsInfo.prodId}`)
			},
			//
			async couponCount() {
				const res = await this.$api.get_discount_price({
					totalPrice: this.total,
					couponId: this.useCarCoupon.couponId,
				});
				this.couponDiscount = res.data || 0
			},
			phoneReg() {
				const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
				if (!reg.test(this.formPay.consigneeMobile)) {
					this.message = "手机号错误";
					return;
				} else {
					this.message = "";
				}
			},
			async payOrder() {
				if (this.isloading) {
					return;
				}

				const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
				if (!reg.test(this.formPay.consigneeMobile)) {
					this.message = "手机号错误";
					return;
				}
				const formPay = {
					...this.formPay
				};
				formPay.productId = this.orederPay ?
					this.orederPay.productId :
					null;
				formPay.couponId = this.useCarCoupon ?
					this.useCarCoupon.couponId :
					null;
				formPay.productCount = this.goodsInfo.skuData.number;
				formPay.merchantId = uni.getStorageSync("merchantId");
				const info = await new Promise((reslove, reject) => {
					uni.login({
						success(res) {
							reslove(res);
						},
						fail(error) {
							uni.showToast({
								title: "授权失败",
								icon: "none",
							});

						},
					});
				});
				formPay.code = info.code;
				const sku = this.goodsInfo.skuData;
				const options = this.goodsInfo.skuDataList
					.filter((item) => item.number)
					.map((item) => {
						return {
							optionId: item.id,
							optionCount: item.number
						};
					})
				formPay.skuOrderInfos = [{
					skuId: this.goodsInfo.skuData.skuId,
					count: 1,
					optionInfos: options

				}, ];
				if (!this.isHiddenMonkey) {
					const minorIds = [];
					const adultIds = [];
					// 大小猴子id
					this.monkey.minor.forEach((item) => {
						minorIds.push(item.id);
					});
					this.monkey.adult.forEach((item) => {
						adultIds.push(item.id);
					});
					formPay.minorIds = minorIds.join(",");
					formPay.adultIds = adultIds.join(",");

					// if (formPay.minorIds == "" || formPay.adultIds == "") {
					// 	this.messageTitle("至少选择一个大猴子和一个小猴子");
					// 	return;
					// }
				}

				this.isloading = true;
				this.submit_pay_order(formPay);
			},
			// 下单接口
			submit_pay_order(formPay) {
				if (!this.choose) {
					this.messageTitle('请同意商品不退款协议')
					return;
				}
				uni.showLoading({
					title: "正在支付",
					mask: true,
				});
				this.isloading = true;
				this.$api.submit_pay_order(formPay).then((res) => {
					uni.hideLoading();
					if (res.status === 200) {
						this.submit_pay(
							res.data.orderNumber,
							res.data.orderId,
							formPay.code
						);
					} else {
						this.messageTitle(res.msg);
					}
				});
			},
			submit_pay(pay_or_sn, id, code) {
				const _this = this;
				let amount = 0;
				if (this.type == 1 || this.type == 2) {
					amount = this.spell_group_price + "";
				} else {
					amount = this.curr_price + "";
				}
				this.isloading = false;
				this.$api
					.submit_pay({
						payType: 1,
						orderNo: pay_or_sn,
						code,
					})
					.then((res) => {
						res.data.package = res.data.packageValue;
						wx.requestPayment({
							...res.data,
							success: () => {
								wx.requestSubscribeMessage({
									tmplIds: [
										"kh7ERqA4DRGxkx_ZkdSPDtjP7s-Nqdaf8vAmQpfFTwc",
									],
									success(res) {
										uni.showToast({
											title: '支付成功',
											icon: 'success'
										})
										_this.turnTo(
											`/pagesA/order/payOrderSucess?money=${_this.total}&id=${id}&orderNumber=${pay_or_sn}&type=${_this.type}&product_type=${_this.product_type}`
										)
									},
								});
							},
							fail: (e) => {
								_this.messageTitle(e.msg)
							},
						});
					})
					.finally(() => {
						uni.hideLoading();
					});
			},
			messageTitle(title) {
				uni.showToast({
					title,
					icon: "none",
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

<style lang="scss" scoped>
	.delText {
		position: absolute;
		top: 82rpx;
		left: 112rpx;
		text-decoration: line-through;
		color: #C8C8C8;

		.payImgUnder {
			font-size: 20rpx;
			color: #C8C8C8;
		}

		.payNumUnder {
			font-size: 28rpx;
		}
	}

	/deep/ .u-border-bottom::after {
		border-bottom: none !important;
		background-color: transparent;
	}

	.detailed {
		font-family: PingFangSC-Regular;
		font-size: 24rpx;
		font-weight: normal;
		line-height: 34rpx;
		color: #C8C8C8;
		margin-right: -64rpx;
	}

	.selectcoupon {
		font-family: PingFangSC-Medium;
		font-size: 24rpx;
		font-weight: 500;
		line-height: 34rpx;
		color: #FFFFFF;
	}

	.sellText {
		font-family: PingFangSC-Medium;
		font-size: 24rpx;
		font-weight: 500;
		line-height: 34rpx;
		color: #FFFFFF;
	}

	.bottom /deep/ .u-flex-1 {
		font-size: 24rpx;
		font-weight: 500;
		line-height: 34rpx;
		color: #FFFFFF;
	}

	.bottom /deep/.u-label {
		width: 100rpx;
	}

	.bottom /deep/.fild-body {
		margin-left: -60rpx;
	}

	.bottom /deep/.u-label-text {
		font-family: PingFangSC-Regular;
		font-size: 24rpx;
		font-weight: normal;
		line-height: 34rpx;
		color: #C5C5C5;
	}

	.usertext {
		font-family: PingFangSC-Regular;
		font-size: 24rpx;
		font-weight: normal;
		line-height: 34rpx;
		letter-spacing: 0px;
		color: #C5C5C5;
	}

	/deep/ .u-field {
		border: none !important;
		padding: 8rpx 20rpx !important;
	}

	.userTel {}

	.contacts {
		font-family: PingFangSC-Medium;
		padding: 8rpx 20rpx !important;
		font-size: 14px;
		font-weight: 500;
		line-height: 17px;
		letter-spacing: 0px;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#FFF2DA), to(#F3BD73));
	}

	.yellowText {
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#FFF2DA), to(#F3BD73));
	}

	.w100 {
		border-bottom: 2rpx solid rgba(204, 165, 255, 0.2);
		padding-bottom: 30rpx;
	}

	.payInfo {
		font-family: PingFangSC-Regular;
		font-size: 28rpx;
		font-weight: normal;
		line-height: 34rpx;
		text-align: right;
		color: #FFFFFF;
	}

	.moneyImg {
		font-family: DINAlternate-Bold;
		font-size: 24rpx;
		font-weight: normal;
		line-height: 24rpx;
		color: #FF5F17;
	}

	.moneyNum {
		font-family: DINAlternate-Bold;
		font-size: 36rpx;
		font-weight: normal;
		line-height: 28rpx;
		text-align: right;
		color: #FF5F17;
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
		font-size: 24prx;
		line-height: 40rpx;
		margin-left: 40rpx;
		color: #FFFFFF !important;
	}

	.app {
		padding-top: 200rpx;
		width: 100%;
		height: 100%;
		background: linear-gradient(0deg, #070000 -72%, #070000 -72%, #121632 100%, #121632 100%);
	}

	.add {
		display: flex;
		flex-direction: row;
		align-items: center;
		border: 1px #666 solid;
		border-radius: 100px;
		padding: 0px 6px;
		width: 60px;
		box-sizing: border-box;
		justify-content: space-between;
		font-size: 26rpx;

		text:nth-child(2) {
			margin: 0 3px;
			color: #666666;
		}
	}

	.sku-list {
		display: flex;
		font-size: 26rpx;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx 30rpx;

		& view:nth-child(1) {
			max-width: 200px;
			text-overflow: ellipsis;
			overflow: hidden;
			color: #666666;
			white-space: nowrap;
		}
	}

	.column {
		font-size: 24rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;

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

	.column:nth-child(3) {
		border-bottom: 1px rgba(1, 1, 1, 0.1) solid;

		margin-bottom: 10px;
	}

	.rect {
		width: 550rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		color: #ffffff;
		margin: 0 auto;
		background: url(https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-icon46.png);
		background-size: 100% 100%;
		margin-top: 50rpx;
	}

	.warp {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.payImg {
		font-family: DINAlternate-Bold;
		font-size: 24rpx;
		font-weight: normal;
		line-height: 24rpx;
		color: #FF5F17;
	}

	.payNum {
		font-family: DINAlternate-Bold;
		font-size: 36rpx;
		font-weight: normal;
		color: #FF5F17;
	}

	.fixed_b {
		margin-bottom: 20rpx;

		.left {
			.payPrice {
				font-family: PingFangSC-Regular;
				font-size: 28rpx;
				width: 330rpx;
				font-weight: normal;
				color: #FFFFFF;
				line-height: 34rpx;
				display: flex;
				justify-content: flex-start;
			}

			.oldPrice {
				line-height: 34rpx;

				text {
					text-decoration: line-through;
				}
			}
		}

		.right {
			width: 220rpx;
			height: 68rpx;
			line-height: 68rpx;
			background: url(../../static/icon15.png);
			background-size: 100% 100%;
		}
	}

	.agree {
		padding: 30rpx 20rpx;
		margin: 10rpx 0;
		border-bottom: none;

		image {
			width: 32rpx;
			height: 32rpx;
			margin-right: 10rpx;
		}
	}

	.select {
		height: 150rpx;
	}

	.beizhu {
		line-height: 54rpx;
		margin: 10rpx 0 !important;

		.flex1 {
			line-height: 54rpx;
		}

		.rightIcon {
			width: 18rpx;
			height: 34rpx;
			// transform: rotate(0deg);
			// background: rgba(255, 255, 255, 0.9);
		}
	}

	.smperJoin {
		.us {}

		.top {
			.desc {
				padding-left: 20rpx;
				font-weight: 500;
			}
		}

		.bottom {
			.btn {
				width: 138rpx;
				height: 48rpx;
				line-height: 44rpx;
				border-radius: 10rpx;
				border: 2rpx solid #cccccc;
				color: #f7931e;
			}

			.chooseBtn {
				width: 140rpx;
				height: 48rpx;
				color: #f7931e;
				font-size: 20rpx;
				line-height: 48rpx;
				background: url(../../static/icon39.png) top center no-repeat;
				background-size: 100% 100%;
			}
		}
	}

	.perMsg {
		.li {
			line-height: 74rpx;
			height: 74rpx;

			.smtit {
				line-height: 74rpx;
				height: 74rpx;
				width: 90rpx;
				font-size: 24rpx;
			}

			.flex1 {
				line-height: 74rpx;
				height: 74rpx;

				input {
					font-size: 24rpx;
					line-height: 54rpx;
					height: 54rpx;
					display: block;
				}
			}
		}
	}

	.shopMsgInfo {
		position: relative;
	}

	.shopMsg {
		align-items: flex-start;

		.left {
			height: 128rpx;
			width: 128rpx;
		}

		.right {
			width: 400rpx;

			.tit {
				font-weight: bold;
				white-space: pre-wrap;
				line-height: 34rpx;
				height: 68rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
				text-overflow: ellipsis;
				overflow: hidden;
			}

			.type {
				height: 38rpx;
				align-items: flex-end;

				.guige {
					border-radius: 22rpx;
					padding: 0 10rpx 0 20rpx;
					background-color: #f1f1f1;

					.inner {
						height: 38rpx;
						padding-right: 30rpx;
						background: url(../../static/icon1.png) right center no-repeat;
						background-size: 28rpx 28rpx;
					}
				}
			}
		}
	}

	.header {
		height: 42rpx;

		.image-bj {
			margin-right: 44rpx;
			width: 152rpx;
			background: url(../../static/goods/red.png) no-repeat;
			background-size: 152rpx 42rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #ffffff;
			line-height: 34rpx;
			text-align: center;
		}

		view {
			font-size: 24rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #333333;
			line-height: 34rpx;
		}
	}

	.imageBox {
		.image {
			width: 74rpx;
			height: 74rpx;
			border-radius: 50%;
			border: 2rpx solid #f8b62d;

			image {
				width: 74rpx;
				height: 74rpx;
				border-radius: 50%;
			}
		}

		.border {
			width: 62rpx;
			height: 2rpx;
			border: 2rpx solid #ffc27a;
		}

		.yuan {
			width: 74rpx;
			height: 74rpx;
			border-radius: 50%;
			background: linear-gradient(180deg, #fff7e4 0%, #ffd6a6 100%);
			border: 2rpx dashed #f8b62d;
			font-size: 52rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #f7931e;
			line-height: 74rpx;
			text-align: center;
		}

		.word {
			min-width: 74rpx;
			margin-top: 10rpx;
			font-size: 20rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
			line-height: 28rpx;
			text-align: center;
		}
	}

	.coupon {
		font-size: 20rpx;
		font-weight: 400;
		margin-right: 15rpx;
	}
</style>
