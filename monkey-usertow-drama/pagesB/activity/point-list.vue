<template>
	<view class="point-page">
		<Header title="点位"></Header>
		<view class="bg">
			<image style="width: 100%;height: 100%;"
				src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/bg/activity-index.png"></image>
		</view>
		<view class="avatar-wrap">
			<image
				:src='roleInfo.roleLogo'
				class="avatar-item"
			></image>
			<view class="info-box flex justify-around">
				<view class="info-item">
					<image 
						src='https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/icon/role.png'
						class="info-icon"
					></image>
					角色：{{roleInfo.roleName}}
				</view>
				<view class="info-item">
					<image 
						src='https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/icon/point.png'
						class="info-icon"
					></image>
					积分：{{roleInfo.pointValue}}
				</view>
				<view class="info-item">
					<image 
						src='https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/icon/team.png'
						class="info-icon"
					></image>
					团队：{{roleInfo.teamName}}
				</view>
			</view>
		</view>
		
		<view class="point-list-wrap">
			<view class="point-address">
				<image 
					src='https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/icon/position.png'
					class="info-icon"
				></image>
				当前位置： 经度：{{latitude}} 纬度：{{longitude}}
			</view>
			<view class="point-item-wrap">
				<view class="point-item" 
					v-for="(item, index) in poinList"
					@tap="handlePointTap(item)"
					:key="item.id"
					:class="{done: item.done}"
				>
					<view class="item-title">
						{{index + 1}}
					</view>
					<view class="item-title-sub" v-if='item.done'>
						【已完成】
					</view>
					<view class="item-title-sub" v-else>
						【{{mapType[item.type] || ''}}】
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mainPageInfo: uni.getStorageSync('mainPageInfo'),
				poinList: [],
				roleInfo: {},
				// 1-普通点、2-拍卖点、3-G点、4-挑战点
				mapType:{
					'1': '普通点',
					'2': '拍卖点',
					'3': 'G点',
					'4': '挑战点',
				},
				latitude: '',
				longitude: '',
			}
		},
		created() {
			this.roleInfo = this.mainPageInfo.dSramaActiveRoleDetailDto
		},
		onLoad({
				activityId,
				stageId
			}) {
			this.activityId = activityId
			this.stageId = stageId
			this.getPoints({
				activityId,
				stageId
			})
			this.location()
		},
		methods: {
			location() {
				console.log('开始获取地址');
				uni.getLocation({
					type: 'gcj02',
					success: res => {
						this.latitude = res.latitude
						this.longitude = res.longitude
					},
					fail: () => {
						console.log('地理位置获取失败');
					}
				});
			},
			handlePointTap(item){
				uni.navigateTo({
					url: `/pagesB/activity/map?pointId=${item.id}&activityId=${this.activityId}&stageId=${this.stageId}`
				})
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
				uni.setStorageSync('poinList', this.poinList)
			},
		}
	}
</script>

<style lang="scss">
	.point-page{
		color: #fff;
	}
	.avatar-wrap{
		padding-top: 136rpx;
		text-align: center;
	}
	.avatar-item{
		width: 144rpx;
		height: 144rpx;
		border-radius: 50%;
		border: 1px solid #FFFFFF;
		margin: 68rpx 0 48rpx;
	}
	.info-box{
		margin-bottom: 48rpx;
		.info-item{
			font-size: 24rpx;
			.info-icon{
				width: 24rpx;
				height: 24rpx;
				margin-right: 8rpx;
			}
		}
	}
	.point-list-wrap{
		padding: 32rpx;
		background: linear-gradient(0deg, #1F113F 3%, #1F113F 3%, #121632 100%, #121632 100%);
		min-height: 90vh;
		border-radius: 16rpx;
		.point-address{
			margin-bottom: 16rpx;
			.info-icon{
				width: 24rpx;
				height: 24rpx;
				margin-right: 8rpx;
			}
		}
		.point-item-wrap{
			display: flex;
			flex-wrap: wrap;
			.point-item{
				width: 120rpx;
				height: 120rpx;
				box-sizing: border-box;
				font-size: 24rpx;
				background: rgba(15, 70, 173, 0.5);
				text-align: center;
				border-radius: 10rpx;
				margin: 0 8rpx 22rpx;
				color: #FFDCAA;
				&.done{
					background: #FFDCAA;
					color: #333;
				}
				.item-title{
					font-size: 48rpx;
					margin: 4rpx;
				}
			}
		}
	}
</style>
