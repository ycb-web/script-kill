<template>
  <scroll-view :class="['wrapper', {'dn': !HB_show}]" enable-flex scroll-y>
    <image :src="imgurl" class="canvasImg" @load="onImageLoad"></image>
    <canvas style="width: 1042px; height: 1853px;position: absolute;left: -2000vw;" canvas-id="cardCanvas"></canvas>
    <div class="saveBtn ta-c" @click.stop="savePoster()">保存图片</div>
    <div class="shareDesc c-eee">保存图片到相册，你可以分享到朋友圈</div>
  </scroll-view>
</template>

<script>
export default {
	props: {
		shareDetail: {
			type: Object,
			default:() => ({
        nickname: '',
        share_img: '',
        QRcode: '',
      })
		},
    HB_show: {
      type: Boolean,
      default: false
    }
	},
  data() {
    return {
      imgurl: null,
      // 分享图分辨率 1042 * 1853
			canvasW: 1042,
			canvasH: 1853,
    }
  },
  mounted() {
    console.log(this.shareDetail)
  },
	methods:{
		onImageLoad() {
      console.log('image---loaded')
			uni.hideLoading();
      this.changeHBshow(true);
      this.$emit('hasCreatedImg', true)
		},
    changeHBshow(val) {
      this.$emit('updateHBShow', val);
    },
		canvasImage() {
			const _this = this;
			this.changeHBshow(true);
			const myCanvas = uni.createCanvasContext('cardCanvas', this);

      // 二维码半径
			const arcRadius = 150;
			// 二维码图片坐标
			const imgX = Math.round(this.canvasW - 25 - arcRadius * 2);
			const imgY = Math.round(this.canvasH - 88 - arcRadius * 2);

			const linearHeight = 40; // 渐变高度
      const nameX1 = this.canvasW - 200;
			const nameY1 = 30;

      // 大分享图
			myCanvas.drawImage(_this.shareDetail.share_img, 0, 0, this.canvasW, this.canvasH);

			// 绘制底部渐变
			const grd = myCanvas.createLinearGradient(nameX1, 0, this.canvasW, 0);
			grd.addColorStop(0, 'transparent');
			grd.addColorStop(1, 'black');
			myCanvas.setFillStyle(grd);
			myCanvas.fillRect(nameX1, nameY1, this.canvasW - nameX1, linearHeight);
			myCanvas.fillStyle = '#fff';
			myCanvas.textAlign = 'center';
			myCanvas.font = `${21}px Arial`; //绘制文字
			myCanvas.fillText(this.shareDetail.nickname, nameX1 + 50 + 63, nameY1 + 28, 125);
			myCanvas.save(); //b保存原有图像
			myCanvas.beginPath(); //开始画圆
			myCanvas.arc(imgX + arcRadius, imgY + arcRadius, arcRadius, 0, 2 * Math.PI);
			myCanvas.clip();
			myCanvas.fillStyle="white";
			myCanvas.fillRect(imgX, imgY, arcRadius * 2, arcRadius * 2);
			myCanvas.drawImage(_this.shareDetail.QRcode, imgX, imgY, arcRadius * 2, arcRadius * 2); //在圆内填充二维码
			myCanvas.draw(true, (e) => {
        console.log('draw', e)
				uni.canvasToTempFilePath({
					canvasId: 'cardCanvas',
					success: function(res) {
						_this.imgurl = res.tempFilePath;
					},
          complete: function(res) {
            console.log('complete:', res)
          },
				}, _this);
			});
		},
		saveImageToPhotosAlbum() {
			uni.saveImageToPhotosAlbum({
				filePath: this.imgurl,
				success: (res)=> {
					uni.hideLoading();
					uni.showToast({
						title: '保存成功，请从相册选择再分享',
						icon: 'none'
					});
					this.show = false;
				},
				fail: function(err) {
					uni.hideLoading();
				}
			});
		},
		savePoster() {
			uni.getSetting({
				//获取用户的当前设置
				success: res => {
					if (res.authSetting['scope.writePhotosAlbum']) {
						//验证用户是否授权可以访问相册
						this.saveImageToPhotosAlbum();
					} else {
						uni.authorize({
							//如果没有授权，向用户发起请求
							scope: 'scope.writePhotosAlbum',
							success: () => {
								this.saveImageToPhotosAlbum();
							},
							fail: () => {
								uni.showToast({
									title: '请打开保存相册权限，再点击保存相册分享',
									icon: 'none',
									duration: 3000
								});
								setTimeout(() => {
									uni.openSetting({
										//调起客户端小程序设置界面,让用户开启访问相册
										success: res2 => {
											// console.log(res2.authSetting)
										}
									});
								}, 3000);
							}
						});
					}
				}
			});
		},
	}
};
</script>

<style lang="scss" scoped>
	// canvas弹窗
	.wrapper {
		width: 100vw;
		height: 100vh;
		padding: 3vh 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		position: relative;
		box-sizing: border-box;
		&.dn {
			visibility: hidden;
		}
	}
	
	// 1042 * 1853
	.canvasImg {
		width: 521rpx;
		height: 926rpx;
		flex: none;
	}
	
	.saveBtn {
		width: 340rpx;
		height: 60rpx;
		line-height: 60rpx;
		background: #ffffff;
		border-radius: 10rpx;
		margin-top: 40rpx;
	}
	.shareDesc {
		margin-top: 12rpx;
		width: 100%;
		text-align: center;
	}
</style>
