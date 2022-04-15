<template>
	<view class="m_app">
		<view class="top">
			<u-avatar size="136" :src="userInfo.icon"></u-avatar>
			<view class="top_text">
				{{userInfo.nickname || '----'}}
			</view>	
		</view>
		<view class="main">
			<image src="https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-my-Tips.png" mode="widthFix"></image>
			<view class="main_text">
				邀请您加入亲友团，
				共同分享她的成长故事？
			</view>
		</view>
		<view class="btn" @click="join()">
			<image src="../../static/button.png" mode="widthFix"></image>
			<view class="btn_text">
				马上加入
			</view>
		</view>
		<view class="Tips">
			* 如您不是其家人，请忽略该消息
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
				maxId:'',
				code:'',
			}
		},
		onLoad(option) {
			console.log(option,"------------option")
			this.maxId = option.maxId || ''
			this.code = option.code || ''
			
			
			uni.setStorageSync('inviteCode',this.code)
			this.get_code_user_info()
		},
		methods: {
			get_code_user_info(){
				this.$api.get_code_user_info({
					code:this.code
				})
				.then(res=>{
					console.log(res)
					if(res.status == 200){
						this.userInfo = res.data || {}
					}else{
						this.userInfo = {}
					}
				})
				.catch(err=>{
					console.log(err)
				})
			},
			join(){
				let {
					maxId
				} = this;
				this.$api.max_monkey_relation({
					id:maxId
				})
				.then(res=>{
					console.log(res)
					if(res.status == 200){
						uni.showToast({
							title:"加入成功",
							icon:"none"
						})
						setTimeout(e=>{
							uni.navigateTo({
								url:`/pagesA/my/family`
							})
						},500)
					}
				})
				.catch(err=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.m_app{
	.top{
		width: 136rpx;
		margin: 40rpx auto;
		text-align: center;
		.top_text{
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
		}
	}
	.main{
		position: relative;
		width: 548rpx;
		margin: 0 auto;
		margin-top: 100rpx;
		image{
			width: 548rpx;
		}
		.main_text{
			position: absolute;
			left: 20rpx;
			top: 30rpx;
			width: 308rpx;
			height: 80rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
		}
	}
	.btn{
		position: relative;
		margin:  40rpx auto;
		width: 630rpx;
		height: 80rpx;
		image{
			width: 100%;
			height: 100%;
		}
		.btn_text{
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50% ,-50%);
			color: #fff;
			font-size: 28rpx;
		}
	}
	.Tips{
		width: 358rpx;
		height: 34rpx;
		margin: 0 auto;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
	}
}
</style>
