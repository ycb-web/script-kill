<template>
	<u-mask :show="eject_show" @click="handleCloseModal">
		<view class="eject">
			<image src="https://shop666.oss-cn-hangzhou.aliyuncs.com/front/mmonkey-my-invitation.png" mode="widthFix"></image>
			<view class="Invitation">
				<view class="InvitationQRCode">
					<view class="InvitationQRCode-text">面对面扫码</view>
					<view class="Outside" @click="turnTo('/pagesA/my/invitation')">
						<view class="centralSection"><image :src="invitation_url" mode=""></image></view>
					</view>
				</view>
				<view class="additional">
					<view class="additional-text">通过以下方式分享</view>
					<image class="division" src="/static/my-division.png" mode=""></image>
					<view class="WechatInvitation flex justify-center">
						<image src="/static/my-Wechat.png" mode=""></image>
						<view class="WechatInvitation-text">微信转发邀请</view>
					</view>
				</view>
			</view>
			<div v-if="openSettingBtnHidden" class="saveBtn posi-a ta-c" @click.stop="savePoster()">保存图片</div>
			<button v-else  class="saveBtn posi-a ta-c" hover-class="none" open-type="openSetting"
				@opensetting='handleSetting'>保存图片</button>
			<div class="shareDesc posi-a c-eee">保存图片到相册，你可以分享到朋友圈</div>
		</view>
	</u-mask>
</template>

<script>
	export default {
		data() {
			return {
				invitation_url: '',
				eject_show: false,
				openSettingBtnHidden: true,
			}
		},
		props: ['show', 'familyId', 'imageUrl'],
		watch: {
			show: {
				handler: async function(v) {
					if (!v) return
					if (this.familyId) {
						this.onInvitation(this.familyId)
					}
					if (this.imageUrl) {
						this.invitation_url = this.imageUrl;
						this.eject_show = true;
					}
				},
				immediate: true
			}
		},
		methods: {
			turnTo(url){
				uni.navigateTo({url})
			},
			onInvitation(fid) {
				this.$api.invite_family({fid}).then(res=>{
					if(res.status == 200){
						this.invitation_url = res.data;
						this.eject_show = true;
					}
				})
			},
			handleSetting(e) {
				if (!e.detail.authSetting['scope.writePhotosAlbum']) {
					this.openSettingBtnHidden = false;
				} else {
					this.openSettingBtnHidden = true;
				}
			},
			savePoster() {
				let _this = this;
				uni.getSetting({
					//获取用户的当前设置
					success: res => {
						if (res.authSetting['scope.writePhotosAlbum']) {
							//验证用户是否授权可以访问相册
							_this.saveImageToPhotosAlbum();
						} else {
							uni.authorize({
								//如果没有授权，向用户发起请求
								scope: 'scope.writePhotosAlbum',
								success: () => {
									_this.saveImageToPhotosAlbum();
								},
								fail: () => {
									this.openSettingBtnHidden = false
									uni.showToast({
										title: '请打开保存相册权限，再点击保存相册分享',
										icon: 'none',
										duration: 3000
									});
								}
							});
						}
					}
				});
			},
			saveImageToPhotosAlbum() {
				let _this = this;
				uni.getImageInfo({
					src: this.invitation_url,
					success: ({path}) => {
						uni.saveImageToPhotosAlbum({
							filePath: path,
							success: function(res) {
								uni.hideLoading();
								uni.showToast({
									title: '保存成功，请从相册选择再分享',
									icon: 'none'
								});
								_this.eject_show = false;
							},
							fail: function(err) {
								uni.hideLoading();
							},
						});
					},
					fail: (e) => {
						uni.showToast({
							title: '获取图片信息失败',
							icon: 'none'
						})
					}
				})
			},
			handleCloseModal() {
				this.eject_show = false;
				this.$emit('close-share-modal', true)
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 弹出
	.eject {
		position: fixed;
		left: 50%;
		top: 45%;
		transform: translate(-50%, -50%);
		image {
			width: 534rpx;
			height: 274rpx;
		}
		.Invitation {
			position: absolute;
			bottom: 50rpx;
			left: 50%;
			transform: translateX(-50%);
			text-align: center;
			.additional {
				.additional-text {
					margin-top: 20rpx;
					font-size: 22rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
				}
				.division {
					margin-bottom: 10rpx;
					width: 266rpx;
					height: 10rpx;
				}
				.WechatInvitation {
					font-size: 22rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					image {
						margin-right: 10rpx;
						width: 38rpx;
						height: 32rpx;
					}
				}
			}
			.InvitationQRCode {
				.InvitationQRCode-text {
					margin: 15rpx 0;
				}
				.Outside {
					position: relative;
					width: 350rpx;
					height: 350rpx;
					background: #fff6eb;
					border-radius: 20rpx;
					.centralSection {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						width: 318rpx;
						height: 318rpx;
						background: #ffffff;
						border-radius: 20rpx;
						image {
							width: 318rpx;
							height: 318rpx;
						}
					}
				}
			}
		}
		
		.saveBtn {
			width: 340rpx;
			height: 60rpx;
			line-height: 60rpx;
			background: #ffffff;
			border-radius: 10rpx;
			bottom: -120rpx;
			left: 50%;
			margin-left: -170rpx;
		}
		.shareDesc {
			bottom: -40rpx;
			width: 100%;
			text-align: center;
		}
	}
</style>
