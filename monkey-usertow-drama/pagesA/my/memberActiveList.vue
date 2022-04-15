<template>
	<view class="app bs-bb p30_all">
		<view class="li w100 flex br-20 ov bg_fff mr-b20" v-for="item in list" @tap="popShow(item)">
			<image class="left mr-2 br-20" :src="item.productImage"></image>
			<view class="right flex1 bs-bb posi-r">
				<div class="tit f28 pt-20 ellipsis-main ellipsis-1" >{{item.productTitle}}</div>
				<div class="time f24 c999  pt-30">{{item.created_at}}</div>
				<div class="desc f24 c999 sl-1 pt-10">{{item.site_location}}</div>
				<div class="goCode posi-a">去扫码</div>
			</view>
		</view>
		<u-mask :show="eject_show" @click="eject_show = false">
			<view class="eject">
				<image src="https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-my-invitation.png" mode="widthFix"></image>
				<view class="Invitation">
					<view class="InvitationCode">
						会员码
					</view>
					<view class="InvitationQRCode">
						<view class="InvitationQRCode-text c999 f20">
							请向活动商展示该码，以便支付
						</view>
						<view class="Outside">
							<view class="centralSection">
								<image :src="popShowMsg.verification_code_image" mode=""></image>
							</view>
						</view>
					</view>
					<view class="additional">
						{{popShowMsg.verification_number}}
					</view>
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				eject_show:false,
				list:'',
				page:{
					pageSize:10,
					pageNum:1,
					total:0,
				},
				popShowMsg:'',
			};
		},
		onReachBottom() {
			this.page.pageNum++;
			this.getData();
		},
		onLoad() {
			this.getData();
		},
		methods:{
			popShow(item){
				this.popShowMsg = item
				this.eject_show = true
			},
			//会员吗 /api/get_member_code_list   
			getData(){
				console.log( [this.page.pageNum, this.page.pageSize])
				this.$api.get_member_code_list({
					range: [this.page.pageNum, this.page.pageSize],
				})
				.then(res => {
					this.page.total = res.data.total
					if (this.page.pageNum === 1) {
						this.list = res.data.data
					} else{
						this.list.push(...res.data.data)
					}
				})
				.finally(() => {
					this.loadDown = false;
					this.loadUp = false;
				});
			},
		},
	}
</script>

<style lang="scss" scoped>
	// 弹出
	.eject{
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		image{
			width: 534rpx;
			height: 274rpx;
		}
		.Invitation{
			position: absolute;
			bottom: 100rpx;
			left: 50%;
			transform: translateX(-50%);
			text-align: center;
			.InvitationCode{
				font-size: 36rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #333333;
			}
			.additional{
				width: 350rpx;
				height: 64rpx;
				line-height: 64rpx;
				text-align: center;
				background: #FFF6EB;
				border-radius: 20rpx;
				margin-top: 40rpx;
				color: #F7931E;
			}
			.InvitationQRCode{
				.InvitationQRCode-text{
					margin: 15rpx 0 20rpx;
				}
				.Outside{
					position: relative;
					width: 350rpx;
					height: 350rpx;
					background: #FFF6EB;
					border-radius: 20rpx;
					.centralSection{
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%,-50%);
						width: 318rpx;
						height: 318rpx;
						background: #FFFFFF;
						border-radius: 20rpx;
						image{
							width: 318rpx;
							height: 318rpx;
						}
					}
				}
			}
		}
	}
		
		
	.app{
		border-top: 1px solid #EEEEEE;
	}
	.li{
		width: 100%;
		height: 176rpx;
		.left{
			width: 176rpx;
			height: 176rpx;
			flex-shrink: 0;
		}
		.right{
			// flex: 1;
			width: 480rpx;
			box-sizing: border-box;
			padding-right: 120rpx;
			height: 176rpx;
			.tit{
				font-weight: 600;
				line-height: 40rpx;
			}
			.goCode{
				right: 0;
				height: 176rpx;
				line-height: 176rpx;
				font-size: 24rpx;
				top: 0;
				width: 110rpx;
				background: url(../../static/you.png) 76rpx center no-repeat;
				background-size: 20rpx 20rpx;
				color: #F7931E;
				// text-align: center;
			}
		}
	}
</style>
