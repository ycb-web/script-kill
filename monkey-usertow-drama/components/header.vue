<template>
	<view class="headerBar">
		<!-- 这里是状态栏 -->
		<!--
		<view class="status_bar"></view>
		<view class="back" @tap='handleBack'>
		</view> -->
		<view class="headerBox" :style="{paddingTop:top+'px',height:height+'px'}">
			<view class="back" @tap='handleBack' v-if="showGoBackButton">
				<text class='rt_pos'></text>
				<text>返回</text>
				<text class="w-header-tt">{{title}}</text>
			</view>
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: "header",
		data() {
			return {
				top: 0,
				height: 0,
				showGoBackButton: true
			};
		},
		props: {
			onBack: {
				type: Function,
				default: ()=>{}
			},
			title: {
				type: String,
				default: ''
			},
			toIndex:{
				type:Boolean,
				default:false
			}
		},
		created() {
			this.getMenuButtonBoundingClientRect();
			this.isShowGoBackButton();
		},
		onLoad() {
			const pages = getCurrentPages()
			console.log(pages)
		},
		methods: {
			getMenuButtonBoundingClientRect() {
				let info = uni.getMenuButtonBoundingClientRect();
				console.log("MenuButton", info);
				this.top = info.top;
				this.height = info.height;
			},
			handleBack() {
				// uni.showToast({icon:"none",title:"测试" })
				if (this.onBack) {
					this.onBack()
				}else if(this.toIndex){
					console.log(this.toIndex)
					uni.switchTab({
						url:'/pages/home/home'
					})
				} else {
					uni.navigateBack()
				}
			},
			isShowGoBackButton() {
				const pages = getCurrentPages()
				if (pages.length == 1) this.showGoBackButton = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.headerBar {
		position: fixed;
		z-index: 999;
		top: -4rpx;
	}
	.w-header-tt {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		font-size: 32rpx;
				font-weight: bold;
	}
	.headerBox {
		width: 100%;
	}
	.back {
		color: white;
		padding: 0 30rpx;
		// width: 200rpx;
		width: 750rpx;
		font-size: 32rpx;
		height: 72rpx;
		line-height: 72rpx;
	}

	.rt_pos {
		margin-right: 5rpx;
		content: "";
		display: inline-block;
		height: 20rpx;
		width: 20rpx;
		border-width: 0 0 2px 2px;
		// border-width: 0 6rpx 6rpx 0;
		border-color: #fff;
		border-style: solid;
		transform: matrix(0.71, 0.71, -.71, 0.71, 0, 0);
		-webkit-transform: matrix(0.71, 0.71, -.71, 0.71, 0, 0);
	}
</style>
