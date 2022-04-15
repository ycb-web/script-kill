<template>
	<view class="m_app p-3">
		<view class="top flex justify-around">
			<image class="top_img" src="https://shop666.oss-cn-hangzhou.aliyuncs.com/front/my-monkeyone.png" mode=""></image>
			<view class="top_text">
				为了您的账户安全
				请及时绑定手机
			</view>
		</view>
		<view class="main">
			<input type="number" value="" class="main_tal" placeholder="请输入手机号" />
			<!-- <u-input class="main_tal" :border="border" border-color="#FFEFDD" v-model="value" :type="type"/> -->
			<view class="main_code flex justify-between">
				<input type="number" value="" class="main_code_inp" placeholder="请输入手机号" />
				<view class="code_btn">
					获取验证码
				</view>
			</view>
		</view>
		<view class="btn">
			<image  class="btn_img" src="../../static/button.png" mode="widthFix"></image>
			<view class="btn_text">
				确认提交
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				border: true,
				
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.m_app {
		background: #F2F3F5;
		min-height: 100vh;

		.top {
			width: 450rpx;
			margin: 50rpx auto;

			.top_img {
				width: 152rpx;
				height: 174rpx;
				margin-right: 10rpx;
			}

			.top_text {
				width: 224rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 40rpx;
			}
		}

		.main {
			width: 690rpx;
			margin: 0 auto;

			.main_tal {
				box-sizing: border-box;
				width: 690rpx;
				height: 82rpx;
				background: #FFFFFF;
				border-radius: 10rpx;
				border: 2rpx solid #FFEFDD;
				padding-left: 20rpx;
			}
			.main_code{
				margin-top: 20rpx;
				.main_code_inp{
					width: 404rpx;
					height: 82rpx;
					background: #FFFFFF;
					border-radius: 10rpx;
					border: 2rpx solid #FFEFDD;
					padding-left: 20rpx;
				}
				.code_btn{
					width: 236rpx;
					height: 82rpx;
					text-align: center;
					line-height: 82rpx;
					color: #F7931E;
					background: #FFEFE0;
					border-radius: 10rpx;
					border: 2rpx solid #F7931E;
				}
			}
			
		}
		.btn{
			position: relative;
			margin-top: 150rpx;
			.btn_img{
				width: 690rpx;
				height: 80rpx;
			}
			.btn_text{
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				color: #fff;
				font-size: 28rpx;
			}
		}
	}
</style>
