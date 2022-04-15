<!-- 
	废弃
 -->

<template>
	<view class="input" @click="click">
		<text>{{ title }}</text>
		<view class="uInput">
			<u-input v-model="currentValue" :type="type" :placeholder="placeholder" :clearable="false"/>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		value: {},
		title: {
			type: String
		},
		type: {
			type: String,
			default: 'text'
		},
		placeholder: {
			type: String
		}
	},
	computed: {
		currentValue: {
			get() {
				return this.value;
			},
			set(newVal) {
				this.$emit('input', newVal);
			}
		}
	},
	methods:{
		click(){
			this.$emit('click')
		}
	}
};
</script>

<style lang="scss" scoped>
.input {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 66rpx;
	padding: 20rpx;
	box-sizing: border-box;
	background: #ffffff;
	border-radius: 44rpx;
	border: 2rpx solid #f0f0f0;
	text {
		flex: 0 0 158rpx;
		text-align: left;
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
		line-height: 34rpx;
	}
	.uInput {
		flex: 1 1 354rpx;
		padding-left: 20rpx;
		box-sizing: border-box;
	}
}
</style>
