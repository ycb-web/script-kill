<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import 'uview-ui/index.scss';
</style>
<script>
	import getLocation from './utils/location.js'
	export default {

		onLaunch: function(options) {
			console.log('onLaunch', options);
			this.shouldGetLocation = options.path !== 'pages/home/home'
			this.autoUpdate()
			const accountInfo = wx.getAccountInfoSync();
			const appId = accountInfo.miniProgram.appId; 
			// const appId = "wx08372359ec71307c";
			console.log('appId', appId);
			uni.setStorageSync('appId', appId);
			this.getStoreInfo(appId);
			// this.initTabBarItem()
		},
		methods: {
			initTabBarItem() {
				uni.setTabBarItem({
					index: 0,
					text: '首页',
					iconPath: 'https://monkeyoss-qa.oss-cn-hangzhou.aliyuncs.com/test/tab1-1.png',
					selectedIconPath: 'https://monkeyoss-qa.oss-cn-hangzhou.aliyuncs.com/test/tab1-2.png'
				})
				uni.setTabBarItem({
					index: 1,
					text: '我的活动',
					iconPath: 'https://monkeyoss-qa.oss-cn-hangzhou.aliyuncs.com/test/tab2-1.png',
					selectedIconPath: 'https://monkeyoss-qa.oss-cn-hangzhou.aliyuncs.com/test/tab2-2.png'
				})
				uni.setTabBarItem({
					index: 2,
					text: '我的',
					iconPath: 'https://monkeyoss-qa.oss-cn-hangzhou.aliyuncs.com/test/tab3-1.png',
					selectedIconPath: 'https://monkeyoss-qa.oss-cn-hangzhou.aliyuncs.com/test/tab3-2.png'
				})
			},
			async getStoreInfo(appId) {
				const res = await this.$api.get_store_info(appId);
				if (res && res.data) {
					console.log("🚀 ~ file: App.vue ~ line 19 ~ getStoreInfo ~ res.data", res.data)
					uni.setStorageSync('merchantInfo', res.data)
					uni.setStorageSync('naviBarTitleHome', res.data.shopName)
					uni.setStorageSync('merchantId', res.data.id)
					uni.setStorageSync("QRcode", res.data.kfCode)
					if (!uni.getStorageSync('merchantId') && this.shouldGetLocation) {
						console.log('onLaunch getLocation')
						getLocation()
					}
				}
			},
			autoUpdate() {
				console.log(new Date())
				var self = this
				// 获取小程序更新机制兼容
				if (uni.canIUse('getUpdateManager')) {
					const updateManager = uni.getUpdateManager()
					//1. 检查小程序是否有新版本发布
					updateManager.onCheckForUpdate(function(res) {
						// 请求完新版本信息的回调
						if (res.hasUpdate) {
							//2. 小程序有新版本，则静默下载新版本，做好更新准备
							updateManager.onUpdateReady(function() {
								console.log(new Date())
								uni.showModal({
									title: '更新提示',
									content: '新版本已经准备好，是否重启应用？',
									success: function(res) {
										if (res.confirm) {
											//3. 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
											updateManager.applyUpdate()
										} else if (res.cancel) {
											//如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
											uni.showModal({
												title: '温馨提示~',
												content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
												success: function(res) {
													self.autoUpdate()
													return;
													//第二次提示后，强制更新                      
													if (res.confirm) {
														// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
														updateManager.applyUpdate()
													} else if (res.cancel) {
														//重新回到版本更新提示
														self.autoUpdate()
													}
												}
											})
										}
									}
								})
							})
							updateManager.onUpdateFailed(function() {
								// 新的版本下载失败
								wx.showModal({
									title: '已经有新版本了哟~',
									content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
								})
							})
						}
					})
				} else {
					// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
					wx.showModal({
						title: '提示',
						content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
					})
				}
			},
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	};
</script>

<style>
	/*每个页面公共css */
	@import './common/style.css';
	@import './common/common.css';

	.u-countdown-item {
		border-radius: 13rpx !important;
	}

	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
</style>
