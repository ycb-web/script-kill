<template>
	<view :class="['button', 'bj', {mini:mini},{cmini:cmini}]" @click="click"><slot></slot></view>
</template>

<script>
	export default {
		props:{
			mini:{
				type:Boolean,
				default: false
			},
			cmini:{
				type:Boolean,
				default: false
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
.button {
	width: 100%;
	height: 80rpx;
	margin: auto;
	text-align: center;
	line-height: 80rpx;
	font-size: 32rpx;
	font-weight: 500;
	color: #ffffff;
	
	&.cmini{
		height: 54rpx;
		line-height: 54rpx;
	}
	
}
.bj {
	position: relative;
	background: url(../../static/button.png);
	background-size: 100% 80rpx;
	
	&.mini{
		background: url(../../static/mini-button.png);
		background-size: 100% 80rpx;
	}
	
	&.cmini{
		font-size: 24rpx;
		background: url(../../static/mini-button.png);
		background-size: 100% 54rpx;
	}
}
</style>
