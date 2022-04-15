<template>
	<view class="d-flex flex-wrap activityBox">
		<view class="mb-3 item" v-for="item in list" :key="item.prodId"
			@click="goActivity(item.prodId, item.price, item.prodType)">
			<sub-activity :item="item" :notShowType="true"></sub-activity>
		</view>
	</view>
</template>

<script>
	import subActivity from './subActivity.vue'
	export default {
		props: {
			list: {
				type: Array,
				default: () => []
			}
		},
		components: {
			subActivity
		},
		computed: {
			product_label() {
				return label => {
					const data = label.split(',').filter((item, index) => {
						return index < 2
					})
					return data
				}
			},
		},
		onLoad() {
			console.log(this.list)
		},
		methods: {
			//商品类型：1:活动2:实物3:门票（购物车下单时默认为2）
			goActivity(product_id, curr_price, product_type) {
				let nextPage = 'EventProductsDetail'
				// switch (product_type) {
				// 	case 1:
				// 		nextPage = 'EventProductsDetail';
				// 		break;
				// 	case 2:
				// 		nextPage = 'GoodsProductDtails';
				// 		break;
				// 	case 3:
				// 		nextPage = 'TicketProductDetails';
				// 		break;
				// }
				uni.navigateTo({
					url: `/pages/product/${nextPage}/${nextPage}?product_id=${product_id}&type=3&productType=${product_type}`
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.activityBox {
		font-family: PingFangSC-Medium, PingFang SC;

		.item {
			&:nth-of-type(odd) {
				margin-right: 15rpx;
			}

			&:nth-of-type(even) {
				margin-left: 15rpx;
			}
		}
	}
</style>
