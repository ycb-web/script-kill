<template>
	<view class="app bs-bb p30">
		<div class="tit flex p-20"><div class="lineY mr-r10"></div><text>我的意见</text></div>
		<view class="textarea">
			<u-input v-model="value" :type="type" :border="border" :height="height" :maxlength="300"  :auto-height="autoHeight" placeholder="选填，请先和商家协商一致"/>
		</view>
		<view class="btn fixed_b ta-c c-fff" @click="submit()">确认提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				type: 'textarea',
				border:false,
				height: 240,
				autoHeight: true,
			}
		},
		methods: {
			submit(){
				if(this.value){
					this.$api
					.add_feedback({
						content:this.value
					})
					.then(res => {
						this.$u.toast("反馈成功")
						setTimeout(()=>{
							uni.navigateBack()
						},300)
					})
					.finally(() => {
						this.loadDown = false;
						this.loadUp = false;
					});
				}else{
					this.$u.toast("请填写反馈意见")
				}
			}
		}
	}
</script>

<style lang="scss">
	.tit{
		.lineY{
			width: 8rpx;
			height: 30rpx;
			background: linear-gradient(270deg, #038E45 0%, #53C187 100%);
			border-radius: 4rpx;
		}
	}
	.textarea{
		width: 690rpx;
		min-height: 280rpx;
		background: #FFFFFF;
		padding: 10rpx 10rpx 10rpx 20rpx ;
		box-shadow: 0px 0px 12rpx 0px rgba(0, 0, 0, 0.07);
		border-radius: 20rpx;
	}
	.btn{
		width: 690rpx;
		height: 80rpx;
		line-height: 80rpx;
		left: 30rpx;
		bottom: 40rpx;
		background: url(../../static/button.png) top center no-repeat;
		background-size: 100% 100%;
		
	}
</style>
