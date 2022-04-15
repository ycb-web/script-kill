<template>
	<view class="m-app" v-show="swiper_list.length > 0 && product_info">
		<!-- <view class="evaluate-top  flex justify-around" v-show="is_heiht_top"
          :class="is_heiht_top ? 'evaluate-top_act' : ''">
      <view
          class="evaluate-top-item "
          @click="swiper_current(index)"
          :class="evaluate_top_index == index ? 'evaluate-top-item_act' : ''"
          v-for="(item, index) in evaluate_top_list"
          :key="index"
      >
        {{ item }}
      </view>
    </view> -->
		<!-- 轮播 -->
		<view class="u-swiper-top">
			<u-swiper :list="swiper_list" mode="number" border-radius="0" indicator-pos="bottomRight" height="496">
			</u-swiper>
		</view>

		<!-- 详情 -->
		<view class="detail all_transform all_box-shadow" v-if="groupGoodsForm.type == 3">
			<view class="detail-top flex justify-between">
				<view class="detail-top-left">
					¥
					<text class="detail-top-left-price">{{ curr_price || 0 }} 起</text>
					<text v-if="false && commission"
						style="margin-left: 20rpx; font-size: 24rpx;">预估佣金{{ commission }}元</text>
				</view>
				<view class="detail-top-right" @click="merchandise_collection">
					<image v-if="!product_info.isCollect" class="detail-top-right-img"
						src="/static/product-flames_act.png" mode=""></image>
					<image v-else class="detail-top-right-img" src="/static/product-flames.png" mode=""></image>
					{{ product_info.collectCount || 0 }}人喜欢
				</view>
			</view>
			<view class="detail-title">{{ product_info.prodName }}</view>
			<view class="detail-top-bottom flex justify-between">
				<view class="detail-top-bottom-left"></view>
				<view class="detail-top-bottom-right">
					已售{{ product_info.soldNum *2 + product_info.stocks }}/{{product_info.stocks+ skuTotal + product_info.soldNum }}
				</view>
				<!-- <view class="detail-top-bottom-right">只剩{{ product_info.stocks }}份</view> -->
			</view>
		</view>
		<!-- 详情页面显示sku -->
		<view class="main-sku all_transform all_box-shadow" @click="sku_show">
			<view class="main-sku-top flex justify-between">
				<view class="main-sku-top-text">可选套餐</view>
				<image class="main-sku-top-img" src="/static/Product-rightArrow.png" mode=""></image>
			</view>
			<!-- 	<view class="main-sku-time flex">
        <view class="sku-title">时间</view>
        <view class="sku-item" v-for="index in 2" :key="index">8月22日上午</view>
      </view> -->
			<view class="main-sku-time flex" v-for="(item, index) in product_info.propertyInfos" :key="index">
				<view class="sku-title white-space">{{ item.propName }}</view>
				<view class="sku-item ellipsis-main ellipsis-1 max_w_200" v-for="(sku, key) in item.valueInfos"
					:key="key">
					{{ sku.name }}
				</view>
			</view>
		</view>
		<!-- 优惠券 -->
		<view class="coupon all_transform all_box-shadow flex justify-between">
      <view class="left flex">
        领券
        <view class="coupon-item" v-for="item in product_info.coupons_list" :key="item.id">{{item.name}}</view>
      </view>
      <image class="right_img" src="/static/Product-rightArrow.png" mode=""></image>
    </view>

		<!-- 活动信息 -->
		<view class="information all_transform all_box-shadow">
			<view class="tabs">
				<text v-for="(item, index) in list" :class="{tabText: true, active: current === index}"
					@click="current = index">{{item.name}}</text>
			</view>
			<view class="information-title">活动方信息</view>
			<view class="information-tal flex justify-between" @click="phone(product_info.site_info.mobile)">
				<view class="left ellipsis-main ellipsis-1">商家电话：{{ product_info.site_info.mobile || '商家暂未保留电话号' }}
				</view>
				<image src="/static/icon7.png" mode=""></image>
			</view>
			<view class="information-tal flex justify-between" @click="address()">
				<view class="left  ellipsis-main ellipsis-1">地址：{{ product_info.site_info.location || '商家暂未保留地址' }}
				</view>
				<image src="/static/Product-navigation.png" mode=""></image>
			</view>
			<view class="information-title">团队购买</view>
			<view class="information-tal flex justify-between" @click="phone('18669004444')">
				<view class="left ellipsis-main ellipsis-1">详情请咨询：{{ 18669004444 || '商家暂未保留电话号' }}</view>
				<image src="/static/icon7.png" mode=""></image>
			</view>
		</view>
		<!-- 评价/导师介绍 -->
		   <view class="evaluate all_transform all_box-shadow" id="evaluate-top">
		     <view class="evaluate_z">
		       <view class="evaluate_z-top flex justify-between"
		             @click="navTo(`/pages/product/Comments?id=${groupGoodsForm.id}`)">
		         <view class="left">用户评价（{{ evalutaeList.total }}）</view>
		         <view class="right">
		           查看全部
		           <u-icon name="arrow-right"></u-icon>
		         </view>
		       </view>
		       <view class="main" v-if="evalutaeList.data.length > 0">
		         <view class="evaluate_z-item" v-for="item in evalutaeList.data" :key="item.id">
		           <view class="user-info flex">
		             <u-avatar size="64" :src="item.user_name.icon"></u-avatar>
		             <view class="user_name">
		               <view class="top">{{ item.user_name.nickname }}</view>
		               <view class="bottom">{{ item.created_at }}</view>
		             </view>
		           </view>
		           <view class="content ellipsis-main ellipsis-2">{{ item.content }}</view>
		         </view>
		       </view>
		       <view v-else style="margin-top: 20rpx; width: 100%;">暂无评论</view>
		     </view>
		   </view>
		   <view class="Introduction all_transform all_box-shadow" id="Introduction-top">
		     <view class="Introduction-top">导师介绍</view>
		     <view class="item flex">
		       <u-avatar size="64" :src="product_info.vestige_info.icon"></u-avatar>
		       <view class="left">
		         <view class="user_name">{{ product_info.vestige_info.name }}</view>
		         <view class="user_info">{{ product_info.vestige_info.introduction }}</view>
		       </view>
		     </view>
		   </view>
		<!-- 场景介绍 -->
		<view class="PriceDescription all_transform all_box-shadow" id="activity-top">
			<view class="title1">购买须知</view>
			<u-parse :html="product_info.buyDetail"></u-parse>
			<!-- <rich-text :nodes="product_info.details"></rich-text> -->
		</view>
		<!-- 活动详情 -->
		<view class="PriceDescription all_transform all_box-shadow" id="scene-top">
			<view class="title1">活动详情</view>
			<u-parse :html="product_info.productDetail"></u-parse>
		</view>
		<!-- 价格说明 -->
		<view class="PriceDescription all_transform all_box-shadow" id="top5">
			<view class="title1">价格说明</view>
			<u-parse :html="product_info.priceDetail"></u-parse>
			<!-- <rich-text :nodes="product_info.price_details"></rich-text> -->
		</view>
		<!-- 底部 -->
		<view class="ButtonGroup flex justify-around all_box-shadow">
			<view class="item" @click="merchandise_collection" v-if="groupGoodsForm.type == 3">
				<image v-if="!product_info.isCollect" src="/static/product-love.png" mode=""></image>
				<image v-else src="/static/product-love-act.png" mode=""></image>
				<view>收藏</view>
			</view>
			<view class="item" @click="callMe()">
				<image src="/static/product-service-personnel.png" mode="aspectFit"></image>
				<view>客服</view>
			</view>
			<view class="item share" @click="generate_goods_code">
				<image src="/static/product-sharing.png" mode=""></image>
				<view>分享</view>
				<!-- <button open-type="share" class="btnShare"></button> -->
			</view>
			<view class="item pay-Cart" v-if="groupGoodsForm.type == 2" @click="sku_show(1)">
				<text>直接购买</text>
			</view>
			<view class="item pay-btn1" v-if="groupGoodsForm.type == 2" @click="sku_show(2)">
				<!-- <text>¥ 49.49932</text> -->
				<text>立即抢购</text>
			</view>
			<view class="item pay-btn" @click="sku_show(2)" v-if="!(groupGoodsForm.type == 2)">
				<!-- <text>¥ 49.49932</text> -->
				<text>立即抢购</text>
			</view>
		</view>

		<!-- sku弹出 -->
		<u-popup @close="close" class="u-popup" v-model="show" mode="bottom" safe-area-inset-bottom border-radius="20"
			closeable close-icon-color="#D6D6D6" close-icon-size="22" height="auto">
			<view class="p-3">
				<view class="flex">
					<view class="headImg mr-4">
						<u-image lazy-load width="128rpx" height="128rpx" border-radius="20"
							:src="product_info.imageUrls[0]"></u-image>
					</view>
					<view>
						<view class="goods-price">
							<!-- 拼团-直接购买（不拼团） -->
							<template v-if="groupGoodsForm.type === 2 && pay_type===1">
								<text class="price mr-1">￥{{ skuData.price }}</text>
							</template>
							<!-- 拼团-立即抢购（真拼团） -->
							<template v-if="groupGoodsForm.type === 2 && pay_type===2">
								<text class="price mr-1">￥{{ skuData.price.spell_group_price }}</text>
								<text class="purchase">单价买￥{{ skuData.price }}</text>
							</template>
							<!-- 秒杀（限时） -->
							<template v-if="groupGoodsForm.type === 1">
								<text class="price mr-1">￥{{ skuData.price.spell_group_price }}</text>
								<text class="purchase">单价买￥{{ skuData.price }}</text>
							</template>
							<!-- 首页-直接购买（无活动） -->
							<template v-if="groupGoodsForm.type === 3">
								<text class="price mr-1">￥{{ skuData.price }}</text>
							</template>
						</view>
						<view class="goods-people-number my-2" v-if="groupGoodsForm.type == 2">
							{{ (product_info.spell_group_info && product_info.spell_group_info.spell_group_people) || 0 }}人拼
						</view>
						<!--            <view class="goods-number">-->
						<!--              <text>已选：</text>-->
						<!--              <text>{{ skuData.properties }}</text>-->
						<!--              <text class="ml-1">{{ skuData.number }}份</text>-->
						<!--            </view>-->
						<view class="goods-number">
							<text>库存：</text>
							<text>{{ skuData.actualStocks }}份</text>
						</view>
					</view>
				</view>

				<view class="border-bottom mt-3"></view>
				<scroll-view scroll-y="true">
					<view style="height: auto;">
						<view v-for="(item, index) in result" :key="index">
							<view class="title">{{ item.propName }}</view>
							<view class="flex flex-wrap">
								<view :class="['sku', 'px-3', 'mr-3', 'mb-3', { active: sku.flag }]"
									v-for="(sku, key) in item.valueInfos" :key="key" @click="selectSku(index, key)">
									{{ sku.name }}
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="border-bottom mt-3"></view>

				<view class="lz_button">
					<view class="flex justify-between mb-5">
						<view class="title">购买数量</view>
						<view
							style="border-radius: 3px;width: 20px;height: 20px;border: 1px solid #ccc;min-width: 20rpx;text-align: center;line-height: 18px;text-align: center;font-size: 10px;">
							x1
						</view>
						<!-- <view class="flex number">
              <view class="mr-3 number-text">限购两件</view>
              <number @add="addNumber" minNumber="1" :maxNumber="skuData.final_stock" @reduce="reduceNumber" ref="number"></number>
            </view> -->
					</view>

					<lz-button @click="goOrder">确认</lz-button>
				</view>
			</view>
		</u-popup>

		<view class="status0" v-if="is_status0">
			<view class="status0_mengcheng"></view>
			<view class="status0_z" @click="navswitch(`/pages/home/home`)">
				<view class="status0_z_title">拼团已结束</view>
				<image src="https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-ku.png" mode="widthFix"></image>
				<view class="status0_z_btn">返回</view>
			</view>
		</view>

		<u-mask :show="HB_show" @tap="HB_show = false" :zoom="false">
			<share-detail ref="canvasShare" :HB_show="HB_show" :shareDetail="shareDetail"
				@hasCreatedImg="isCreatedImg = true" @updateHBShow="updateHBShow"></share-detail>
		</u-mask>

	</view>
</template>

<script>
	import number from '@/components/groupGoods/number.vue';
	import lzButton from '@/components/common/button.vue';
	import ShareDetail from '@/components/activity/shareDetail.vue';

	import { mapMutations } from 'vuex';
	import { numberPrecision } from '@/common/util.js';

	export default {
		components: {
			number,
			lzButton,
			ShareDetail
		},
		data() {
			return {
				list: [{
					name: '用户评价'
				}, {
					name: '活动详情'
				}, {
					name: '场景介绍',
				}, {
					name: '价格说明',
				}],
				current: 0,
				isCreatedImg: false,
				commission: 0,
				HB_show: false,
				pay_type: 1, //1:直接购买 2:拼团
				is_status0: false,
				arr: [],
				newarr: [],
				is_heiht_top: false,
				heiht_top0: 0,
				heiht_top1: 0,
				heiht_top2: 0,
				heiht_top3: 0,
				heiht_top4: 0,
				heiht_top5: 0,
				evaluate_top_list: ['活动介绍', '用户评价', '导师介绍', '购买须知', '活动详情'],
				evaluate_top_index: 0, //轮播index
				evaluate_top_current: 0, //控制轮播index
				show: false, // 弹框开关
				// sku列表详情，用于result映射sku详情信息
				skuListDetail: [],
				// 选中规格id
				skuId: 0,
				// 选择其他id
				otherId: 0,
				// 拼团信息
				groupGoodsForm: {
					id: '', // 商品id
					activity_id: '', // 拼团id
					type: '' // 活动类型1:秒杀2:拼团3:无活动
				},
				// 商品详情
				product_info: null,
				// sku
				result: [],
				resultMin: [],
				skuData: {
					id: '',
					price: 0, // sku价格
					selectSkuText: '', // sku文字
					image: '', // sku图片
					number: 0, // 选择数量
					actualStocks: 0, // 库存
				},

				// 无活动价格
				curr_price: '',
				// 评价
				evalutaeList: {
					data: '',
					total: 0
				},
				end_time: '', // 秒杀结束时间
				inviteCode: '',
				imgurl1: '',
				HB_img: '',
				shareDetail: {
					nickname: '',
					share_img: '',
					QRcode: '',
				},
				activityImage: 'https://monkeyoss-qa.oss-cn-hangzhou.aliyuncs.com/monkeyoss-qa/2021-09-02/a360a4495316473ba47c893b70dda8fc/小猴子.png',
				productType: "", // 1活动 2好物 3门票
			};
		},
		computed: {
			swiper_list() {
				try {
					return this.product_info.imageUrls;
				} catch (e) {
					return '';
				}
			},
			userInfo() {
				return uni.getStorageSync('userInfo');
			},
			skuTotal() {
				return this.skuListDetail.reduce((total, item) => (item.actualStocks || 0) + total, 0)
			}
		},
		onPageScroll(res) {
			this.is_heiht_top = res.scrollTop > 20;

			if (res.scrollTop >= this.heiht_top1 && res.scrollTop < this.heiht_top2) {
				this.evaluate_top_index = 1;
			} else if (res.scrollTop >= this.heiht_top2 && res.scrollTop < this.heiht_top3) {
				this.evaluate_top_index = 2;
			} else if (res.scrollTop >= this.heiht_top3 && res.scrollTop < this.heiht_top4 - 40) {
				this.evaluate_top_index = 3;
			} else if (res.scrollTop >= this.heiht_top4) {
				this.evaluate_top_index = 4;
			} else if (res.scrollTop < this.heiht_top1) {
				this.evaluate_top_index = 0;
			}
		},
		onLoad(option) {
			let params = {};
			if (option.scene) {
				uni.showToast({
					title: option.scene,
					icon: 'none'
				})
				const scene = decodeURIComponent(option.scene)
				const tmp = scene.split('&');
				tmp.forEach(e => {
					if (e.split('=')[0] === 'productId') {
						params.product_id = e.split('=')[1];
					}
					if (e.split('=')[0] === 'code') {
						params.inviteCode = e.split('=')[1];
					}
				})
			} else {
				params = option;
			}
			uni.showLoading({});
			this.inviteCode = params.inviteCode; // 邀请码
			if (this.inviteCode) {
				uni.setStorageSync('inviteCode', this.inviteCode);
			}
			if (params.vestige_id) {
				uni.setStorageSync('vestige_id', params.vestige_id);
			}
			this.groupGoodsForm.id = Number.parseInt(params.product_id); // 商品id
			this.groupGoodsForm.activity_id = Number.parseInt(params.id) || ''; // 拼团id
			this.groupGoodsForm.type = Number.parseInt(params.type) || 3; // 活动类型 1:秒杀2:拼团3:无活动
			this.productType = params.productType || '1'; // 1活动 2好物 3门票
			uni.setNavigationBarTitle({
				title: this.productType === "1" ? '活动详情' : this.productType === '2' ? '好物详情' : '门票详情'
			})
			// this.curr_price = Number.parseFloat(option.curr_price); // 无活动价格
			this.end_time = params.end_time;

		},
		async onShow() {
			// this.$refs.number.reset()
			await this.getProductSkuCustomer();
			await this.get_product_info();
			await this.getCoupons();
			if (this.product_info) {
				// 评价
				// await this.get_evalutae_selected();
				const data = uni.getStorageSync('groupType');
				if (data) {
					await this.sku_show();
					uni.setStorageSync('groupType', null);
				}
				// this.getData()
				setTimeout(e => {
					this.GetTop();
				}, 500);
			}
		},
		// 分享
		onShareAppMessage() {
			const invitationCode = this.userInfo.inviteCode;
			const id = this.groupGoodsForm.id;
			const activityId = this.groupGoodsForm.activity_id;
			const type = this.groupGoodsForm.type;
			const productType = this.productType;
			return {
				title: this.product_info.title,
				path: `/pages/product/EventProductsDetail/EventProductsDetail?product_id=${id}&id=${activityId}&type=${type}&inviteCode=${invitationCode}&productType=${productType}`
			};
		},

		methods: {
			...mapMutations(['setOrederPay', 'setGoodsInfo']),
			tabChange(e) {
				this.current = e
			},
			updateHBShow(val) {
				this.HB_show = val;
			},
			generate_goods_code() {
				const _this = this;
				if (_this.isCreatedImg) {
					this.HB_show = true;
					return
				}
				uni.showLoading({
					title: '正在生成图片'
				});
				this.$api.generate_goods_code({
					productId: this.groupGoodsForm.id,
				}).then(res => {
					uni.hideLoading()
					let nowUrls = res.data;
					if (res.data.split(':')[0] == 'http') {
						nowUrls = 'https:' + res.data.split(':')[1];
					}
					uni.downloadFile({
						url: nowUrls,
						success: res => {
							if (res.statusCode === 200) {
								const QRcode = res.tempFilePath;
								_this.shareDetail.QRcode = QRcode;
								setTimeout(() => {
									_this.$refs.canvasShare.canvasImage();
								}, 0)
							}
						},
						fail: (e) => {
							uni.showToast({
								title: '服务器异常',
								icon: 'none'
							})
						}
					});
				})
			},
			// from /my/my （我的客服）
			callMe(phone) {
				uni.previewImage({
					current: this.activityImage,
					urls: [this.activityImage]
				})
			},
			// 商品收藏
			merchandise_collection() {
				this.$api.merchandise_collection({
					productId: this.groupGoodsForm.id
				}).then(res => {
					if (res.status === 200) {
						this.product_info.isCollect = !this.product_info.isCollect
						if (this.product_info.isCollect) {
							this.product_info.collectCount++
						} else {
							this.product_info.collectCount--
						}
					}
				})
			},
			// 手动切换轮播
			swiper_current(index) {
				this.evaluate_top_index = index;
				let heiht_top = this['heiht_top' + index];
				uni.pageScrollTo({
					scrollTop: heiht_top,
					duration: 0
				});
			},
			// sku一系列操作
			sku_show(type) {
				if (typeof type === 'number') {
					this.pay_type = type
				}
				this.show = true;
				this.selectSku(0, 0);
				this.selectSku(1, 0);
			},
			selectSku(index, skuKey) {
				let is_guan = false;
				// 选择规格变色
				this.result[index].valueInfos.forEach((item, key) => {
					this.$set(item, 'flag', false);
					if (skuKey === key) {
						this.$set(item, 'flag', true);
					}
				});
				this.$forceUpdate();

				let skuCast = ''; // sku映射   正序
				let skuCast1 = ''; // sku映射 倒序
				const resLength = this.result.length;
				let count = 0; // sku映射   正序
				let count1 = 0; // sku映射  倒序
				// 选择规格提交
				const temp = [...this.result] // sku映射 正序
				const temp1 = [...this.result].reverse() // sku映射 倒序
				// sku映射 正序
				temp.forEach((item, key) => {
					item.valueInfos.forEach(sku => {
						if (sku.flag) {
							count += 1;
							skuCast += item.propName + ':' + sku.name + ';';
							// skuCast += item.propName + ':' + sku.name + ';';
						}
					});
				});
				// sku映射 倒序
				temp1.forEach((item, key) => {
					item.valueInfos.forEach(sku => {
						if (sku.flag) {
							count1 += 1;
							skuCast1 += item.propName + ':' + sku.name + ';';
							// skuCast += item.propName + ':' + sku.name + ';';
						}
					});
				});
				if (count !== resLength) {
					return;
				}
				skuCast = skuCast.slice(0, -1);
				skuCast1 = skuCast1.slice(0, -1);
				if (!this.skuListDetail.length) {
					this.message('产品库存不足');
					return;
				}

				// 寻找映射的值
				this.skuListDetail.forEach(item => {
					if (is_guan) return;
					if (skuCast === item.properties || skuCast1 === item.properties) {
						is_guan = true;
						let final_stock = 0; // 最终库存
						if (this.groupGoodsForm.type === 1) {
							// 秒杀
							final_stock = item.seconds_kill_stock;
						} else if (this.groupGoodsForm.type === 2) {
							// 拼团
							final_stock = item.spell_group_stock;
						} else {
							// 无活动
							final_stock = item.actualStocks;
						}
						//https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-ku.png
						if (final_stock <= 0) {
							this.ku = true;
							this.message('当前产品库存不足');
						}

						this.skuData = {
							id: item.skuId,
							price: item.price, // sku价格
							properties: item.properties, // sku文字
							pic: item.pic || this.product_info.imageUrls[0], // sku图片
							number: 1,
							validityTime: item.validityTime,
							actualStocks: final_stock
						};
						// this.$refs.number.reset()
					} else {
						this.skuData = {
							id: '',
							price: "商品库存不足", // sku价格
							selectSkuText: "商品库存不足", // sku文字
							pic: item.pic || this.product_info.imageUrls[0], // sku图片
							number: 1,
							validityTime: "商品库存不足", // 时间
							actualStocks: 0,
							is_show: 1
						};
					}
				});
			},
			async getProductSkuCustomer() {
				this.$api.get_product_sku_customer({
					productId: this.groupGoodsForm.id
				}).then(res => {
					if (res.code !== 200) return
					this.skuListDetail = res.data;

				});
			},
			addNumber(number) {
				this.skuData.number = number;
				this.skuData.price = numberPrecision(this.skuData.price * this.skuData.number);
			},
			reduceNumber(number) {
				this.skuData.number = number;
				this.skuData.price = numberPrecision(this.skuData.price * this.skuData.number);
			},
			//取元素距离顶部的高度
			GetTop() {
				const query = uni.createSelectorQuery().in(this);
				query
					.select('#evaluate-top')
					.boundingClientRect(data => {
						this.heiht_top1 = data.top - 30
					})
					.exec();
				query
					.select('#Introduction-top')
					.boundingClientRect(data => {
						this.heiht_top2 = data.top - 30
					})
					.exec();
				query
					.select('#activity-top')
					.boundingClientRect(data => {
						this.heiht_top3 = data.top - 30
					})
					.exec();
				query
					.select('#scene-top')
					.boundingClientRect(data => {
						this.heiht_top4 = data.top - 30
					})
					.exec();
				query
					.select('#top5')
					.boundingClientRect(data => {
						this.heiht_top5 = data.top - 30
					})
					.exec();
			},
			// 获取活动详情
			get_product_info() {
				this.$api.get_product_info({
					productId: this.groupGoodsForm.id
				}).then(res => {
					if (res.status !== 200) return;

					// if (res.data.spell_status == 1) {
					// 	this.is_status0 == true;
					// }
					const data = res.data;
					this.product_info = data;
					this.curr_price = data.price;
					uni.hideLoading();

					// 改造sku
					const skuList = data.propertyInfos;
					this.result = skuList;
					skuList.forEach((item, key) => {
						item.valueInfos.forEach((sku, index) => {
							const name = sku.valueName;
							item.valueInfos[index] = {
								flag: false,
								name
							};
						});
						// 默认选择
						// this.selectSku(key, 0);
					});

					this.setGoodsInfo({
						count: data.collectCount
					});
					uni.downloadFile({
						url: data.shareImg || data.imageUrls[0],
						success: res => {
							if (res.statusCode === 200) {
								this.imgurl1 = res.tempFilePath;
								this.shareDetail.nickname = this.userInfo.nickname;
								this.shareDetail.share_img = this.imgurl1;
							}
						}
					});

					let nowUrls2 = '';
					if ("https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey_HB_bg.png".split(':')[0] === 'http') {
						nowUrls2 = 'https:' + "https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey_HB_bg.png".split(':')[1];
					}
					uni.downloadFile({
						url: nowUrls2,
						success: res => {
							if (res.statusCode === 200) {
								this.HB_img = res.tempFilePath;
							}
						}
					});

					// let attr_product_info_arr = this.product_info.attr_product_info
					// let maxcurr_price = null;
					// attr_product_info_arr.forEach(v=>{
					// 	if(!maxcurr_price){
					// 		maxcurr_price = v
					// 	}else{
					// 		if(maxcurr_price.curr_price < v.curr_price){
					// 			maxcurr_price = v
					// 		}
					// 	}
					// })
					// this.get_money(maxcurr_price.id)
				});
			},
			getCoupons() {
				const params = {
					productId: this.groupGoodsForm.id,
					merchantId: uni.getStorageSync('merchantId'),
				}
				this.$api.getCouponsInProductDetail(params).then(res => {
					console.log(res.data)
				})
			},
			get_money(good_detail_id) {
				this.$api.get_money({
					good_detail_id
				}).then(res => {
					if (res.status == 200) {
						this.commission = res.data || null
					}
				})
			},
			// 获取精选评价
			get_evalutae_selected() {
				this.$api.get_evalutae_selected({
					range: [1, 2],
					product_id: this.groupGoodsForm.id
				}).then(res => {
					if (res.status !== 200) {
						return;
					}
					this.evalutaeList = {
						data: res.data.data,
						total: res.data.total
					};
				});
			},
			// 取消拼团
			close() {
				this.setOrederPay({
					group_id: ''
				});
			},
			// 确认提交订单
			goOrder() {
				if (this.skuData.is_show == 1 || !this.skuListDetail.length) {
					this.message('商品库存不足');
					return;
				}
				if (!this.skuData.id) {
					this.message('请选择商品规格');
					return;
				}

				if (this.skuData.actualStocks <= 0) {
					this.message('当前产品库存不足');
					return;
				}
				if (this.skuData.number <= 0) {
					this.message('请选择数量');
					return;
				}
				// activity_id: 一般活动，秒杀和拼团必传
				// pay_type: 1直接购买；2拼团
				// groupGoodsForm.type: 1秒杀；2拼团；3无活动
				if (this.groupGoodsForm.type === 3) {
					this.setOrederPay({
						type: 3,
						productId: this.product_info.prodId,
						product_type: this.product_info.prodType, //商品类型：1:活动2:实物3:门票（购物车下单时默认为2）
						order_type: 1, // 订单类型：1：商品详情下单2:购物车下单
						prodName: this.product_info.prodName,
						...this.skuData,
						// activity_id: this.groupGoodsForm.activity_id // 活动id
					});
					this.setGoodsInfo({
						...this.product_info, // 商品信息
						skuData: this.skuData, // 规格信息
						activity_id: this.groupGoodsForm.activity_id // 活动id
					});
					uni.navigateTo({
						url: `/pagesB/activity/createdActiveOrder?type=${3}&product_type=${this.product_info.prodType}`
					});
					return;
				}
				this.setOrederPay({
					type: this.groupGoodsForm.type,
					parent_product_id: this.product_info.id,
					product_type: this.product_info.prodType, //商品类型：1:活动2:实物3:门票（购物车下单时默认为2）
					order_type: 1, // 订单类型：1：商品详情下单2:购物车下单
					activity_id: this.groupGoodsForm.activity_id, // 活动id
					...this.skuData,
				});
				this.setGoodsInfo({
					...this.product_info, // 商品信息
					skuData: this.skuData, // 规格信息
					activity_id: this.groupGoodsForm.activity_id // 活动id
				});
				uni.navigateTo({
					url: `/pagesB/activity/createdActiveOrder?type=${this.groupGoodsForm.type}&product_type=${this.product_info.prodType}`
				});
			},
			phone(mobile) {
				uni.makePhoneCall({
					phoneNumber: mobile
				});
			},
			bd09togcj02(bd_lon, bd_lat) {
				var x_PI = (3.14159265358979324 * 3000.0) / 180.0;
				var bd_lon = +bd_lon;
				var bd_lat = +bd_lat;
				var x = bd_lon - 0.0065;
				var y = bd_lat - 0.006;
				var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_PI);
				var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_PI);
				var gg_lng = z * Math.cos(theta);
				var gg_lat = z * Math.sin(theta);
				return [gg_lng, gg_lat];
			},
			address() {
				let latitude = this.bd09togcj02(Number(this.product_info.site_info.latitude), Number(this.product_info
					.site_info.longitude))[0];
				let longitude = this.bd09togcj02(Number(this.product_info.site_info.latitude), Number(this.product_info
					.site_info.longitude))[1];

				wx.openLocation({
					latitude,
					longitude,
					success: res => {
						console.log(res);
					},
					fail: err => {
						uni.showToast({
							title: '定位到火星了～',
							icon: 'none'
						});
					}
				});
			},
			//
			message(title) {
				uni.showToast({
					title,
					icon: 'none'
				});
			},
			navswitch(url) {
				uni.switchTab({
					url
				});
			},
			navTo(url) {
				uni.navigateTo({
					url
				});
			}
		}
	};
</script>

<style>
	.u-swiper-indicator {
		bottom: 60px !important;
		right: calc((100vw - 690rpx) / 2) !important;
		padding: 0 !important;
	}
</style>
<style lang="scss" scoped>
	.tabs {
		position: relative;
		padding-bottom: 15px;
		display: flex;
		justify-content: space-around;
		border-bottom: 2px #f5f5f5 solid;
		margin-bottom: 10px;
	}

	.tabText {
		position: relative;
		display: block;
	}

	.tab-text::after {
		display: none;
	}

	.active {
		color: #ff9900;
	}

	.active::after {
		position: absolute;
		bottom: -10px;
		background-color: #ff9900;
		height: 4px;
		width: 60rpx;
		border-radius: 100px;
		content: '';
		display: block;
		left: 50%;
		transform: translateX(-50%);
	}

	#scene-top {
		width: 100vw;
		padding: 0;
		margin: 0;
		background: none;

		>.title1 {
			padding: 40rpx 0 0 0;
			margin: 0 50rpx 20rpx 50rpx;
		}
	}

	.status0 {
		.status0_mengcheng {
			position: fixed;
			top: 0%;
			width: 100%;
			height: 100vh;
			background-color: #000000;
			opacity: 0.5;
		}

		.status0_z {
			padding-top: 80rpx;
			text-align: center;
			position: fixed;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 620rpx;
			height: 584rpx;
			background: #ffffff;
			border-radius: 20rpx;

			image {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				width: 186rpx;
				height: 224rpx;
			}

			.status0_z_title {
				font-size: 38rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #333333;
			}

			.status0_z_btn {
				text-align: center;
				width: 256rpx;
				height: 82rpx;
				color: #f7931e;
				line-height: 82rpx;
				background: #ffffff;
				border-radius: 10rpx;
				border: 2rpx solid #ffefdd;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				bottom: 50rpx;
			}
		}
	}

	.m-app {
		width: 750rpx;
		min-height: 100vh;
		background: #f7f7f7;
		padding-bottom: 158rpx;

		.all_transform {
			transform: translateY(-80rpx);
		}

		.all_box-shadow {
			box-shadow: box-shadow;
			padding: 0 20rpx;
		}

		.u-swiper-top {
			overflow: hidden;
			border-bottom-right-radius: 50% 30px;
			border-bottom-left-radius: 50% 30px;

			// border-radius: 0 0 80rpx 80rpx;
			.u-swiper-indicator {
				bottom: 45rpx !important;
			}
		}

		.detail {
			width: 690rpx;
			margin: 0 auto;
			background: #ffffff;
			box-shadow: 0 0 12rpx 0 rgba(0, 0, 0, 0.07);
			border-radius: 20rpx;
			padding: 20rpx;

			.detail-top-bottom {
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
			}

			.detail-title {
				margin: 15rpx 0;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
				line-height: 40rpx;
			}

			.detail-top {
				.detail-top-left {
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #e03c3c;

					.detail-top-left-price {
						font-size: 38rpx;
						margin-left: 10rpx;
					}
				}

				.detail-top-right {
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;

					.detail-top-right-img {
						width: 16rpx;
						height: 22rpx;
						margin-right: 10rpx;
					}
				}
			}
		}

		.main-sku {
			margin: 20rpx auto;
			width: 690rpx;
			padding-bottom: 20rpx;
			background: #ffffff;
			box-shadow: 0rpx 0rpx 12rpx 0rpx rgba(0, 0, 0, 0.07);
			border-radius: 20rpx;

			.main-sku-top {
				padding-top: 20rpx;

				.main-sku-top-text {
					font-size: 24rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #333333;
				}

				.main-sku-top-img {
					width: 24rpx;
					height: 29.54rpx;
				}
			}

			.main-sku-time,
			.main-sku-people {
				margin-top: 30rpx;

				.sku-title {
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
				}

				.sku-item {
					margin: 0 20rpx;
					padding: 5rpx 15rpx;
					background: #f2f3f5;
					border-radius: 30rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
				}
			}
		}

		.coupon {
			margin: 0 auto;
			width: 690rpx;
			height: 102rpx;
			background: #ffffff;
			box-shadow: 0rpx 0rpx 12rpx 0rpx rgba(0, 0, 0, 0.07);
			border-radius: 20rpx;

			.right_img {
				width: 24rpx;
				height: 29.54rpx;
			}

			.left {
				.coupon-item {
					margin: 0 20rpx;
					width: 132rpx;
					height: 42rpx;
					line-height: 42rpx;
					text-align: center;
					background: url(/static/Product-discount.png);
					background-size: 132rpx 42rpx;
					color: #fff;
					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
				}
			}
		}

		.information {
			padding-top: 30rpx;
			padding-bottom: 20rpx;
			margin: 0 auto;
			margin-top: 20rpx;
			// padding: 30rpx 0;
			width: 690rpx;
			// height: 300rpx;
			background: #ffffff;
			box-shadow: 0rpx 0rpx 12rpx 0rpx rgba(0, 0, 0, 0.07);
			border-radius: 20rpx;

			.information-title {
				font-size: 24rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 800;
				color: #333333;
			}

			.information-tal {
				margin: 20rpx 0;

				.left {
					width: 488rpx;
					height: 34rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
				}

				image {
					width: 108rpx;
					height: 36rpx;
				}
			}
		}

		.evaluate-top_act {
			width: 750rpx;
			position: fixed;
			top: 0;
			z-index: 999;
		}

		.evaluate-top {
			background-color: #fff;
			padding-top: 20rpx;
			padding-bottom: 20rpx;
			border-bottom: 2rpx solid #f3f3f3;
		}

		.evaluate-top-item {
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #666666;
		}

		.evaluate-top-item_act {
			position: relative;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #f7931e;
		}

		.evaluate-top-item_act::before {
			content: '';
			position: absolute;
			left: 50%;
			bottom: -10rpx;
			transform: translateX(-50%);
			width: 60rpx;
			height: 6rpx;
			background: #f7931e;
			border-radius: 3rpx;
		}

		.evaluate {
			margin: 0 auto;
			margin-top: 20rpx;
			width: 690rpx;
			// height: 764rpx;
			background: #ffffff;
			border-radius: 20rpx;

			.evaluate_z {
				// padding-top: 20rpx;
				padding: 20rpx 0;

				.evaluate_z-top {
					.right {
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #f7931e;
					}

					.left {
						position: relative;
						font-size: 24rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 600;
						color: #333333;
					}

					.left:before {
						position: absolute;
						left: 0;
						bottom: -10rpx;
						content: '';
						width: 40rpx;
						height: 6rpx;
						background: linear-gradient(270deg, #f6931f 0%, #fbe859 100%);
						border-radius: 3rpx;
					}
				}

				.main {
					margin-top: 30rpx;

					.evaluate_z-item {
						margin-top: 20rpx;

						.user-info {
							.user_name {
								margin-left: 20rpx;
								font-size: 24rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #333333;

								.bottom {
									font-size: 20rpx;
									font-family: PingFangSC-Regular, PingFang SC;
									font-weight: 400;
									color: #999999;
								}
							}
						}

						.content {
							margin-top: 10rpx;
							font-size: 20rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #666666;
						}
					}
				}

				.evaluate_z-bottom {
					border-top: 2rpx solid #f3f3f3;
					margin-top: 40rpx;
					padding-top: 40rpx;

					.evaluate_z-bottom-top {
						.left {
							font-size: 24rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #333333;
						}

						.right {
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #f7931e;
						}
					}

					.evaluate_z-bottom-img {
						margin-top: 20rpx;

						image {
							width: 190rpx;
							height: 136rpx;
							border-radius: 20rpx;
						}
					}
				}
			}
		}

		.Introduction {
			padding-top: 20rpx;
			margin: 0 auto;
			margin-top: 20rpx;
			width: 690rpx;
			background: #ffffff;
			border-radius: 20rpx;

			.Introduction-top {
				position: relative;
				font-size: 24rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #333333;
			}

			.Introduction-top:before {
				position: absolute;
				left: 0;
				bottom: -10rpx;
				content: '';
				width: 40rpx;
				height: 6rpx;
				background: linear-gradient(270deg, #f6931f 0%, #fbe859 100%);
				border-radius: 3rpx;
			}

			.item {
				margin-top: 20rpx;
				border-bottom: 2rpx solid #f3f3f3;
				padding-bottom: 20rpx;

				.left {
					margin-left: 10rpx;
				}

				.user_name {
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
				}

				.user_info {
					margin-top: 10rpx;
					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
				}
			}
		}

		.PriceDescription {
			padding: 20rpx;
			margin: 0 auto;
			margin-top: 20rpx;
			width: 690rpx;
			min-height: 200rpx;
			background: #ffffff;
			border-radius: 20rpx;

			.title1 {
				margin-bottom: 20rpx;
				position: relative;
				font-size: 24rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #333333;
			}

			.title1:before {
				position: absolute;
				left: 0;
				bottom: -10rpx;
				content: '';
				width: 40rpx;
				height: 6rpx;
				background: linear-gradient(270deg, #f6931f 0%, #fbe859 100%);
				border-radius: 3rpx;
			}

			.item {
				margin: 20rpx 0;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #666666;

				.item-title {
					position: relative;
					margin-bottom: 20rpx;
				}

				.item-title:before {
					position: absolute;
					left: -15rpx;
					top: 16rpx;
					border-radius: 50%;
					transform: translateY(-50%);
					content: '';
					width: 8rpx;
					height: 8rpx;
					background: #f7931e;
				}

				.item-main {
					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
				}
			}
		}

		.ButtonGroup {
			position: fixed;
			bottom: 0;
			width: 750rpx;
			height: 128rpx;
			background: #ffffff;
			box-shadow: 0 0 12rpx 0 rgba(0, 0, 0, 0.07);

			// border-radius: 20rpx 20rpx 0rpx 0rpx;、
			.item {
				image {
					width: 38rpx;
					height: 36rpx;
				}

				font-size: 20rpx;
				font-family: PingFangSC-Regular,
				PingFang SC;
				font-weight: 400;
				color: #666666;
			}

			.pay-Cart {
				width: 222rpx;
				height: 67.33rpx;
				background: url(/static/icon222rpx.png) no-repeat;
				background-size: 222rpx 67.33rpx;
				color: #fff;
				line-height: 67.22rpx;
				text-align: center;
				font-size: 24rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #ffffff;
			}

			.pay-btn1 {
				width: 222rpx;
				height: 67.22rpx;
				background: url(/static/icon14.png) no-repeat;
				background-size: 222rpx 67.22rpx;
				color: #fff;
				line-height: 67.22rpx;
				text-align: center;
				font-size: 24rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #ffffff;
			}

			.pay-btn {
				width: 304rpx;
				height: 67.22rpx;
				background: url(/static/big-button.png) no-repeat;
				background-size: 304rpx 67.22rpx;
				color: #fff;
				line-height: 67.22rpx;
				text-align: center;
				font-size: 24rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #ffffff;
			}
		}
	}

	// sku一系列样式
	.headImg {
		width: 128rpx;
		height: 128rpx;
		border-radius: 20rpx;
	}

	.goods-price {
		.price {
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #e03c3c;
			line-height: 34rpx;
		}

		.purchase {
			font-size: 20rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #666666;
			line-height: 28rpx;
		}
	}

	.goods-people-number {
		width: 96rpx;
		height: 32rpx;
		background: #f7931e;
		border-radius: 16rpx;
		font-size: 22rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #ffffff;
		line-height: 32rpx;
		text-align: center;
	}

	.goods-number {
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 28rpx;
	}

	.title {
		margin: 30rpx 0 20rpx 0;
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
		line-height: 34rpx;
	}

	.sku {
		height: 38rpx;
		line-height: 38rpx;
		border-radius: 19rpx;
		background: #f2f3f5;
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;

		&.active {
			background: linear-gradient(270deg, #f6931f 0%, #ffcd50 100%);
			color: #ffffff;
		}
	}

	.number {
		.number-text {
			font-size: 20rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #e03c3c;
			line-height: 28rpx;
		}
	}

	.share {
		position: relative;

		button {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 990;
			opacity: 0;
		}
	}
</style>
