<template>
	<view>
		<Header title="地图"></Header>
		<map id="map" ref="map" :style="'width: ' + width + '; height: ' + height + ';'" :scale="map.scale"
			@regionchange="regionchange" @updated="updated" :latitude="map.latitude" :longitude="map.longitude"
			:markers="covers" @callouttap="handleCallout"
			>
			<cover-view slot="callout">
				<block v-for="(item,index) in covers" :key="index">
					<cover-view class="map-icon" :marker-id="item.id" @tap='iconTap(item)'>
						<image class="map-icon-img" :src="item.avatar" mode=""></image>
						<!-- <cover-image class="map-icon-img" :src="item.avatar" mode=""></cover-image> -->
					</cover-view>
				</block>
			</cover-view>
		</map>
		<u-popup v-model="show" mode="bottom">
			<view class="popup-down">
				<!-- <view class="popup-down-line">

				</view> -->
				<image class="tip-bg-img" src="../../static/map/small-border.png" mode="widthFix"></image>
				<view class="popup-down-first flex">
					<view class="popup-down-icon">
						<image :src="curPoint.icon"
							style="width: 100%;height: 100%;object-fit: cover;border-radius: 100%;" mode=""></image>
					</view>
					<view class="popup-down-first-left">
						<view class="popup-down-first-left-first">
							{{curPoint.name}}
						</view>
						<view class="popup-down-first-left-second">
							{{curPoint.memo}}
						</view>
						<view class="popup-down-tip">
							您需要先打卡才能开始做任务~
							<!-- <image class="tip-bg-img" src="../../static/map/small-border.png" mode="widthFix"></image> -->
						</view>
					</view>
				</view>
				<view class="popup-down-second">
					<view class="popup-down-second-box" v-for='item in curPoint.taskList' :key='item.id'
						@tap="handleTask(item)" :class="item.click? '' : 'active'">
						{{item.name}}
						<image v-show="item.click" class="popup-down-second-box-border"
							src="../../static/map/big-border.png" mode="widthFix">
					</view>
				</view>
				<view class="popup-down-third">
					<view class="popup-down-third-box" @tap='location'>
						<view class="popup-down-third-box-img">
							<image src="../../static/map/bottom-table-focus.png" style="width: 100%;height: 100%;"
								mode=""></image>
						</view>
						<view class="popup-down-third-box-text" style="color: #F96654;">
							重新定位
						</view>
					</view>
					<view class="popup-down-third-box" @tap='handleActPoint'>
						<view class="popup-down-third-box-img">
							<image src="../../static/map/bottom-table-location.png" style="width: 100%;height: 100%;"
								mode=""></image>
						</view>
						<view class="popup-down-third-box-text">
							立即打卡
						</view>
					</view>
					<view class="popup-down-third-box">
						<view class="popup-down-third-box-img">
							<image src="../../static/map/bottom-table-bell.png" style="width: 100%;height: 100%;"
								mode=""></image>
						</view>
						<view class="popup-down-third-box-text">
							呼叫队友
						</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	// import zjMarker()
	import { scanCode } from '@/common/util.js'
	
	var map;
	export default {
		data() {
			return {
				// show: true, //测试专用
				show: false,
				pointId: null,
				mainPageInfo: uni.getStorageSync('mainPageInfo'),
				activityId: '',
				latitude: 31.205036,
				longitude: 121.449472,
				height: '500px',
				width: '500px',
				map: {
					scale: 16,
					latitude: 31.205036,
					longitude: 121.449472
				},
				covers: [
				// 	{
				// 	latitude: 31.205036,
				// 	longitude: 121.449472
				// },
				],
				list: [],
				curPoint: {
					taskList: [{
						name: 'task-name',
						id: 8
					}],
					name: 'name',
					memo: 'memo',
				},
				poinList: [
				// 	{
				// 	"id": 1264501,
				// 	"user_id": 333955,
				// 	"age": 0,
				// 	"gender": 0,
				// 	"zodiac": 0,
				// 	"flag": "",
				// 	"secret": "",
				// 	"place": "福州市",
				// 	"views": 0,
				// 	"likes": 6,
				// 	"reviews": 0,
				// 	"shares": 0,
				// 	"text": "处对象，想一直陪着你你",
				// 	"images": "",
				// 	"weigh": 0,
				// 	"collect": 1,
				// 	"third_id": 53616605,
				// 	"latitude": "31.22753",
				// 	"longitude": "121.459843",
				// 	"createtime": 1604204665,
				// 	"updatetime": 1604207899,
				// 	"deletetime": null,
				// 	"status": "normal",
				// 	"nickname": "晚坏",
				// 	"avatar": "https://image.aishencn.com/2020/10/25/125546184_97953460-user.jpg",
				// 	"bio": "",
				// 	"distance": 11601,
				// 	"images_arr": [
				// 		""
				// 	]
				// }, 
				],
				load: true,
			};
		},
		onLoad({
				activityId,
				stageId,
				pointId
			}) {
			this.is_updated = false,
			this.activityId = activityId
			this.pointId = pointId
			console.log('onload',pointId, activityId)
			// this.getPoints({
			// 	activityId,
			// 	stageId
			// })
			
			this.setPoints()
			this.getMyLocation()
			this.list = this.poinList.map((item, index)=>({
				...item,
				avatar: item.icon,
				text: item.memo,
				index
			}))
			this.list.push({
				avatar: this.mainPageInfo.dSramaActiveRoleDetailDto.roleLogo,
				text: '我',
				latitude: this.latitude,
				longitude: this.longitude,
				index: this.list.length,
				gps: false
			})
			// 创建地图上下文
			map = uni.createMapContext('map', this);
			uni.getSystemInfo({
				success: res => {
					this.height = res.windowHeight + 'px';
					this.width = res.windowWidth + 'px';
				}
			});
		},
		onLaunch() {
			// this.regionchange();
		},

		methods: {
			async handleActPoint(){
				if(this.curPoint.done){
					uni.showToast({
						title: '已经打卡完成',
					})
					return
				}
				const param = {
					pointId: this.curPoint.id,
					activityId: this.activityId,
					relationId: '',
					longitude: '',
					latitude: ''
				}
				// rule=1的时候是GPS打卡，要上传经纬度
				// rule=2的时候是二维码，二维码里面的内容是点位关联主键
				// rule=3的时候可以直接打卡
				switch(this.curPoint.rule){
					case 1: 
						param.longitude= this.longitude
						param.latitude= this.latitude
						break
					case 2:
						const scanRes = await scanCode()
						// {"activityId":1,"relationId":12}
						param.relationId= scanRes.relationId
						break
					case 3:
						break
				}
				const res = await this.$api.submitPoint(param)
				if(!res.status === 200) return
				if(res.data){
					uni.showToast({
						title: res.message || '打卡成功'
					})
					this.curPoint.done = true
				}else{
					uni.showToast({
						title: res.message || '打卡失败',
						icon: "error"
					})
				}
			},
			iconTap(item){
				debugger
			},
			handleTask(item){
				this.navTo('/pagesB/activity/task?id='+item.id)
			},
			navTo(url) {
				uni.navigateTo({
					url
				})
			},
			setPoints(){
				this.poinList = uni.getStorageSync('poinList') || []
				setTimeout(() => {
					this.regionchange();
					this.locationInit();
				}, 2000);
			},
			async getPoints({
				activityId,
				stageId
			}) {
				const res = await this.$api.getPointList({
					activityId,
					stageId
				})
				if (res.status !== 200) {
					uni.showToast({
						title: res.msg,
						icon: 'none',
					})
				}
				const list = res.data || []
				this.poinList = list.map(item=>({
					...item,
					avatar: item.icon,
					text: item.memo,
				}))
				
				setTimeout(() => {
					this.regionchange();
				}, 2000);
			},
			getRegion() {
				map.getRegion({
					success: res => {
						map.getScale({
							success: ress => {
								// console.log("getRegion ",res);
								this.covers = this.getFortMatMarkerList(res.northeast, res
									.southwest, ress.scale, this.list)
							}
						})
						// "northeast": {
						// 	"longitude": 111.7890356728411,
						// 	"latitude": 27.34148740552791
						// },
						// "southwest": {
						// 	"longitude": 111.70248749493365,
						// 	"latitude": 27.17478887207441
						// },
					}
				})
			},
			//根据东北 西南经纬度 以及后台返回标记点 格式化成小程序marker点
			getFortMatMarkerList(northeast, southwest, scale, backendMarkerList) {
				//屏幕中显示的经度的长度和纬度的长度
				let mapWidth = southwest.longitude - northeast.longitude;
				let mapHeight = northeast.latitude - southwest.latitude;
				//将屏幕中地图分割的横向 格子数和 纵向格子数
				let widthSize = scale;
				let heightSize = widthSize + parseInt(scale / 2);
				//计算每个格子的经纬度的长度
				let unitWidth = mapWidth / widthSize;
				let unitHeight = mapHeight / heightSize;
				console.log(widthSize, heightSize)
				console.log(unitWidth, unitHeight)
				let pointData = {};
				backendMarkerList.forEach(latLng => {
					//如果点在显示范围内
					if (latLng.latitude < northeast.latitude && latLng.latitude > southwest.latitude &&
						latLng.longitude < northeast.longitude && latLng.longitude > southwest.longitude) {
						let relativeX = latLng.longitude - northeast.longitude;
						let relativeY = latLng.latitude - southwest.latitude;
						//计算出这个点，处于哪个格子
						let x = parseInt(Math.floor(relativeX / unitWidth));
						let y = parseInt(Math.floor(relativeY / unitHeight));
						if (x < 0 || y < 0) {
							console.log('点位不在格子内', '失败');
						}
						//生成单元格点位数据
						let pointKey = x + ',' + y;
						if (pointData[pointKey] == undefined) {
							pointData[pointKey] = [];
						}
						pointData[pointKey].push(latLng);
					}
				});
				console.log('pointData', pointData.length);

				let resultMapArray = [];
				for (let y = 0; y < heightSize; y++) {
					for (let x = 0; x < widthSize; x++) {
						let pointKey = x + ',' + y;
						//筛选没有充电站点位的格子
						if (pointData[pointKey] != undefined) {
							let markerItem = {};
							//聚合点与单点共存 , 长度等于一 不聚合点
							if (pointData[pointKey].length == 1) {
								// console.log('不聚合点', pointData[pointKey][0]);

								markerItem = {
									id: pointData[pointKey][0].index,
									latitude: pointData[pointKey][0].latitude,
									longitude: pointData[pointKey][0].longitude,
									avatar: pointData[pointKey][0].avatar,
									iconPath: 'https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/a.png',
									width: 0,
									height: 0,
									// label: {
									// 	content: '',
									// 	color: '#000000',
									// 	fontSize: 12,
									// 	borderWidth: 4,
									// 	borderColor: '#ffffff',
									// 	borderRadius: 100,
									// 	padding: 10,
									// 	textAlign: 'center',
									// 	anchorX: 0,
									// 	anchorY: -24,
									// },
									customCallout: {
										anchorY: 0, // Y轴偏移量
										anchorX: 0, // X轴偏移量
										display: "ALWAYS" // 一直展示
									},
								}

								// let iconPath = pointData[pointKey][0].ScanAndCharge == 1 ? '/img/scanMarkerIcon.png' : '/img/markerIcon.png';
								// markerItem = new zjMarker(pointData[pointKey][0].longitude, pointData[pointKey][0].latitude, pointData[pointKey][0].StationID, {
								//   iconPath: iconPath
								// })
								//长度大于一 聚合点
							} else if (pointData[pointKey].length > 1) {
								// console.log('聚合点');
								markerItem = {
									id: pointData[pointKey][0].index,
									latitude: pointData[pointKey][0].latitude,
									longitude: pointData[pointKey][0].longitude,
									avatar: '/static/logo.png',
									iconPath: 'https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/a.png',
									width: 0,
									height: 0,
									customCallout: {
										anchorY: 0, // Y轴偏移量
										anchorX: 0, // X轴偏移量
										display: "ALWAYS" // 一直展示
									},
								}
							}
							resultMapArray.push(markerItem);
						}
					}
				}
				console.log('resultMapArray', resultMapArray);
				// console.log('thislist', this.list);
				return resultMapArray;
			},
			updated() {
				console.log('渲染完成');
				this.is_updated = true;
			},
			// 当视野发生改变
			regionchange(e) {
				console.log('当视野发生改变 渲染：is_updated',this.is_updated);
				// for (var i = 0; i < this.poinList.length; i++) {
				// 	this.poinList[i].index = i;
				// 	this.list = this.poinList;
				// }
				// this.list = this.poinList.map((item, index)=>({
				// 	...item,
				// 	avatar: item.icon,
				// 	text: item.memo,
				// 	index
				// }))
				// this.list.push({
				// 	avatar: this.mainPageInfo.dSramaActiveRoleDetailDto.roleLogo,
				// 	text: '我',
				// 	latitude: this.latitude,
				// 	longitude: this.longitude,
				// 	index: this.list.length,
				// 	gps: false
				// })
				this.getRegion();
				// let loadDelay = 200;
				// if (this.load) {
				//     console.log('等待加载');
				// } else {
				//     this.load = true;
				//     setTimeout(() => {
				//         this.getList();
				//     }, loadDelay);
				// }
			},
			// 定位到初始点位
			locationInit() {
				const point = this.poinList.find((item)=>{
					return item.id == this.pointId
				})
				map.moveToLocation({
					latitude: point.latitude,
					longitude: point.longitude
				})
			},
			getMyLocation(){
				console.log('开始获取地址');
				uni.getLocation({
					type: 'gcj02',
					success: res => {
						// console.log('地址获取成功,切换到目标点nvue', res);
						this.latitude = res.latitude
						this.longitude = res.longitude
					},
					fail: () => {
						console.log('地理位置获取失败');
					}
				});
			},
			//定位当前
			location() {
				map.moveToLocation({
					latitude: this.latitude,
					longitude: this.longitude
				})
			},
			// 废弃测试用
			getList(la = 0, lo = 0) {
				var arr = [];
				map.getCenterLocation({
					success: res => {
						let latitude = res.latitude
						let longitude = res.longitude
						if (la !== 0) {
							latitude = la
							longitude = lo
						}
						console.log('当前中心坐标', latitude + ',' + longitude);
						uni.request({
							data: {
								latitude: latitude,
								longitude: longitude
							},
							method: 'POST',
							url: 'https://api.mymoyi.cn/api/moyicosmic/test/testList',
							success: res => {
								console.log('完成请求', res);

								if (res.data.code) {
									res = res.data.data;
									for (var i = 0; i < res.list.length; i++) {
										res.list[i].index = i;
										this.list = res.list;
										// arr.push({
										// 	id: i,
										// 	callout: {
										// 		content: res.list[i].text.substr(0, 10),
										// 		color: '#000',
										// 		textAlign: 'center',
										// 		padding: 5
										// 	},
										// 	latitude: res.list[i].latitude,
										// 	longitude: res.list[i].longitude,
										// 	iconPath: res.list[i].avatar,
										// 	width: 30,
										// 	height: 30
										// });
									}
								} else {
									uni.showToast({
										title: res.data.msg,
										icon: 'none'
									});
								}
								// this.covers = arr;
								console.log('arr', arr)
							},
							complete: () => {
								this.load = false;
							}
						});
					}
				});

			},
			async handleCallout(i) {
				let point = this.list[i.detail.markerId];
				console.log(point)
				if(!point.id) return
				const res = await this.$api.getPointDetail({
					pointId: point.id,
					activityId: this.activityId
				})
				this.curPoint = res.data || {}
				this.show = true;
			}
		}
	};
</script>

<style lang="scss" scoped>
	/deep/.back  {
		color: black!important;
	}
	/deep/.rt_pos {
		border-color: black!important;
	}
	.map-icon {
		padding-top: 8rpx;
		width: 60rpx;
		height: 76rpx;
		background-image: url('https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/activity/dian.png');
		background-size: 60rpx 76rpx;
		background-repeat: no-repeat;
		display: flex;
		justify-content: center;
	}

	.map-icon-img {
		width: 45rpx;
		height: 45rpx;
		border-radius: 100%;
	}

	// .map-icon {
	// 	width: 140rpx;
	// 	height: 140rpx;
	// }
	// 弹框
	/deep/.u-drawer-content-visible {
		border-radius: 40rpx 40rpx 0 0;
	}

	.popup-down {
		padding-bottom: 50rpx;
	}

	// .popup-down-line {
	// 	width: 155rpx;
	// 	height: 8rpx;
	// 	margin: 0 auto;
	// 	border-radius: 50rpx;
	// 	margin-top: 23rpx;
	// 	z-index: 99;
	// 	background-color: pink;
	// }

	.popup-down-first {
		padding-top: 10rpx;
		padding-left: 46rpx;
		position: relative;
	}
	.popup-down-icon{
		width: 128rpx;
		height: 128rpx;
		margin-right: 32rpx;
	}

	.popup-down-tip {
		position: fixed;
		right: 0;
		top: 15rpx;
		padding: 0 12rpx;
		color: #333;
	}

	.tip-bg-img {
		position: fixed;
		right: 0;
		top: 0rpx;
		width: 425rpx;
		height: auto;
		z-index: -99999;
	}

	.popup-down-first-left {
		width: 504rpx;
	}

	.popup-down-first-left-first {
		font-weight: bold;
		font-size: 32rpx;
		margin-top: 28rpx;
	}

	.popup-down-first-left-second {
		font-size: 24rpx;
		color: #333333b3;
		margin-top: 15rpx;
	}

	.popup-down-first-left-third {
		display: flex;
		margin-top: 30rpx;
	}

	.popup-down-first-left-third-left {
		font-size: 24rpx;
		font-style: italic;
	}

	.popup-down-first-left-third-right {
		font-size: 24rpx;
		color: red;
	}

	.popup-down-second {
		width: 90%;
		margin: 0 auto;
		border-bottom: 1rpx solid #CCC;
		display: flex;
		flex-wrap: wrap;
	}

	.popup-down-second-box {
		position: relative;
		min-width: 120rpx;
		height: 30rpx;
		line-height: 30rpx;
		font-size: 24rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 15rpx;
		margin-top: 15rpx;
		margin-left: 20rpx;
		padding: 4rpx 8rpx;
		border-radius: 8rpx;
		margin-bottom: 20rpx;

	}

	.active {
		background-color: #F3F3F3;
	}

	.popup-down-second-box-border {
		position: absolute;
		width: 120rpx;
		height: 30rpx;
		top: -4rpx;
		left: 0;
		z-index: -1;
	}

	.popup-down-third {
		width: 664rpx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: -20rpx;
		margin-bottom: 20rpx;
	}

	.popup-down-third-box {
		display: flex;
		align-items: center;
		line-height: 30rpx;
		margin-top: 56rpx;
	}

	.popup-down-third-box-img {
		width: 30rpx;
		height: 30rpx;
		margin-right: 20rpx;
		// z-index: -999;
	}

	.popup-down-third-box-text {
		font-size: 32rpx;
	}
</style>
