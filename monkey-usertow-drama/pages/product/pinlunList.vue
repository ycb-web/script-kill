<template>
	<view class="content">
		<view class="main">
			<view class="evaluate_z-item"  v-for="index in pinglunMsg.data" :key="index">
				<view class="user-info flex">
					<u-avatar size="64" :src="index.user_name.icon"></u-avatar>
					<view class="user_name">
						<view class="top">
							{{index.user_name.nickname}}
						</view>
						<view class="bottom">
							{{index.user_name.created_at}}
							<!-- 5天前 -->
						</view>
					</view>
				</view>
				<view class="content ellipsis-main ellipsis-2">
					{{index.user_name.content}}
				</view>
				<view class="imgs p20_all flex wrap">
					<image src="../../../static/Activity-Tourism.png" mode="aspectFill" class="mr-2 mr-b20 br-10" style="width: 160rpx;height: 160rpx;"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pinglunMsg:[],
				page:{
					pageNum:1,
					pageSize:20,
					total:0,
				},
				ids:0,
			};
		},
		onLoad(e) {
			this.ids = e.ids
			this.getPinlun()
			
		},
		methods:{
			getPinlun(){
				this.$api.get_evalutae_selected({
					product_id:this.ids,
					range: [this.page.pageNum, this.page.pageSize]
				}).then(res => {
					console.log(res)
					this.pinglunMsg = res
				})
			},
		},
	}
</script>

<style lang="scss">

</style>
