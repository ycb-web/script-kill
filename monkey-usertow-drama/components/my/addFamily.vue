<template>
	<view class="flex justify-center" :class="['add',{shadow:isShadow}]" :style="{padding: padding}" @click="click">
		<image v-if="type === 1" src="../../static/my-add1.png" mode=""></image>
		<image v-else src="../../static/my-add2.png" mode=""></image>
		<text :style="{color: color}">{{text}}</text>
	</view>
</template>

<script>
	export default {
		props:{
			// 图片类型
			type:{
				type: Number,
				default: 1
			},
			// 显示文字
			text:{
				type: String,
			},
			// 内边距
			padding:{
				type: String,
				default: '20rpx'
			},
			// 文字颜色
			color:{
				type: String,
				default: '#333333'
			},
			// 是否box-shadow
			isShadow:{
				type: Boolean,
				default: true
			}
		},
		methods:{
			click(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add{
		width: 100%;
		text-align: center;
		background: #FFFFFF;
		// box-shadow: 0px 0px 12rpx 0px rgba(0, 0, 0, 0.07);
		border-radius: 20rpx;
		image{
			width: 52rpx;
			height: 52rpx;
			vertical-align: middle;
			margin-right: 20rpx;
		}
		text{
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			line-height: 40rpx;
		}
	}
	.shadow{
		box-shadow: 0px 0px 12rpx 0px rgba(0, 0, 0, 0.07);
	}
</style>
