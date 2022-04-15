<template>
	<view class="number-box flex justify-around number-box">
		<view @click="reduce"><u-icon name="minus" color="#999999"></u-icon></view>
		<view class="number-box-text">{{ number }}</view>
		<view @click="add"><u-icon name="plus" color="#333333"></u-icon></view>
	</view>
</template>

<script>
export default {
	props: {
		maxNumber: {
			type: Number,
			default: 99
		},
		minNumber: {
			type: Number,
			default: 1
		}
	},
	data() {
		return {
			number: 1
		};
	},
	methods: {
		add() {
			if (this.number >= this.maxNumber) {
				uni.showToast({
					title:`库存只剩下${this.maxNumber}个了`,
					icon:"none"
				})
				this.number = this.maxNumber;
			} else {
				this.number++;
			}
			this.$emit('add', this.number);
		},
		reduce() {
			if (this.number <= this.minNumber) {
				this.number = this.minNumber;
			} else {
				this.number--;
			}
			this.$emit('reduce', this.number);
		},
		reset(){
			this.number = 1
		}
	}
};
</script>

<style lang="scss" scoped>
.number-box {
	width: 160rpx;
	height: 48rpx;
	border-radius: 26rpx;
	border: 2rpx solid #979797;
	.number-box-text{
		width: 24rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
		line-height: 40rpx;
	}
}
</style>
