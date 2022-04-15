<template>
	<view class="container">
		<view class="pingfen">
			<view class="pingfen-z">
				
				<!-- <view class="pingjia-fenlei">
					<view class="feilei-quanbu">
						全部 1128
					</view>
					<view class="pingja-fenlei-item">
						有图 83
					</view>
					<view class="pingja-fenlei-item">
						有图 83
					</view>
					<view class="pingja-fenlei-item">
						有图 83
					</view>
				</view> -->
				<!-- <view class="xiala-z">
					<image src="../../static/shangcheng/xiajiantou.png" mode="" class="xiala"></image>
				</view> -->
				
			</view>
			<view class="penlun-main">
				<view class="evaluate-list">
					<view class="evaluate-item" :key="index" v-for="(item,index) in evalutae_list">
						<view class="evaluate-user">
							<image v-if="item.user_name && item.user_name.icon" :src="item.user_name.icon" mode="widthFix"
								class="evaluate-portrait"></image>
							<view class="user-name">
								{{item.user_name.nickname || "系统用户"}}
							</view>
						</view>
						<view class="evaluate-text">
							{{item.content}}
						</view>
						<view class="flex">
						<block v-for="(item2, index) in item.image" :key="index" class="flex">
							<view class="evaluate-img">
								<image :src="item2"  @click="preview(item2,index)" mode="widthFix"></image>
							</view>
						</block>
						</view>
					</view>
				</view>
			</view>
		</view>
		<loading :status="loading" />
	</view>
</template>

<script>
	import loading from '@/components/loading/uni-load-more-copy.vue'
	export default {
		components:{
			loading
		},
		data() {
			return {
				id:'',
				skip:1,
				limit:10,
				loading:"loading",
				evalutae_list:[],
				shopIt:false,
			}
		},
		onLoad(options) {
			this.id = options.id
			this.get_evalutae()
		},
		onReachBottom() {
			if(this.shopIt)return;
			this.skip ++
			this.loading = "loading"
			setTimeout(e=>{
				this.get_evalutae()
			},1500)
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh()
			this.skip = 1;
			this.evalutae_list = []
			this.loading = "loading"
			setTimeout(e=>{
				this.get_evalutae()
			},1500)
		},
		methods: {
			preview(item,index){
					let urls = this.evalutae_list[index].image
					console.log(urls)
					uni.previewImage({
						urls,
						current:item
					})
			},
			get_evalutae(){
				let {
					skip,limit,id
				} = this;
				this.$api.get_evalutae({
					product_id:id,
					range:[skip,limit]
				})
				.then(res=>{
					console.log(res,"-----------评价")
					if(res.status == 200){
						this.evalutae_list.push(...res.data.data)
						if(res.data.data.length < limit){
							this.loading = "noMore"
							this.shopIt = true
						}else{
							this.loading = "more"
							this.shopIt = false
						}
					}
				})
				.catch(err=>{
					console.log(err)
				})
			}
			
			
			
			
			
			
		}
	}
</script>

<style lang="scss">
	.container{
		.header{
			margin-top: 88rpx;
			display: flex;
			justify-content: space-between;
			border-bottom: 2rpx solid #F2F2F2;
			padding-bottom: 30rpx;
			.header-right{
				width: 48rpx;height: 46rpx;
				margin-right: 40rpx;
			}
			.header-left{
				display: flex;
				align-items: center;
				margin-left: 40rpx;
				image{
					width: 24rpx;height: 42rpx;
					margin-right: 30rpx;
				}
			}
		}
		.evaluate-list {
			margin-top: 20rpx;
		
			.evaluate-item {
				margin: 30rpx 0;
				padding-bottom: 20rpx;
				border-bottom: 2rpx solid #F2F2F2;
		
				.gengduo {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 22rpx;
					color: #FE5725;
		
					image {
						width: 20rpx;
						height: 20rpx;
						margin-left: 10rpx;
					}
				}
		
				.evaluate-text {
					font-size: 26rpx;
					color: #333333;
					line-height: 50rpx;
					margin: 20rpx;
				}
				.evaluate-img{
					position: relative;
					display: flex;
					flex-wrap: wrap;
					width: 200rpx;
					height: 200rpx;
					margin: 10rpx 10rpx;
					overflow: hidden;
					image{
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50% , -50%);
					}
				}
				.evaluate-user {
					display: flex;
					align-items: center;
					font-size: 26rpx;
					font-weight: 400;
					color: #666666;
		
					.evaluate-portrait {
						width: 50rpx;
						height: 50rpx;
						border-radius: 50%;
						margin-right: 10rpx;
					}
					.Grade{
						margin-left: 20rpx;
						.Grade_item{
							position: relative;
							.Grade_item_text1{
								position: absolute;
								right: 20rpx;
								font-size: 20rpx;
								color: #F9B831;
								top: 10rpx;
							}
							.Grade_item_img1{
								width: 130rpx;
								height: 30rpx;
							}
							.Grade_item_text2{
								position: absolute;
								right: 20rpx;
								font-size: 20rpx;
								color: #FF7CA8;
								top: 10rpx;
							}
							.Grade_item_img2{
								width: 120rpx;
								height: 30rpx;
							}
							.Grade_item_text3{
								position: absolute;
								right: 20rpx;
								font-size: 20rpx;
								color: #8C68EB;  
								top: 10rpx;
							}
							.Grade_item_img3{
								width: 110rpx;
								height: 30rpx;
							}
							.Grade_item_text4{
								position: absolute;
								right: 20rpx;
								font-size: 20rpx;
								color: #E23B3B;
								top: 10rpx;
							}
							.Grade_item_img4{
								width: 110rpx;
								height: 30rpx;
							}
							.Grade_item_text5{
								position: absolute;
								right: 20rpx;
								font-size: 20rpx;
								color: #F9B831;
								top: 10rpx;
							}
							.Grade_item_img5{
								width: 110rpx;
								height: 30rpx;
							}
						}
					}
				}
			}
		}
		.pingfen{
			.penlun-main{
				width: 90%;
				margin: 0 auto;
				.penlun-mian-item{
					margin: 10rpx 0;
				}
			}
			.pingfen-z{
				width: 90%;
				margin: 0 auto;
				.xiala-z{
					margin-top: 30rpx;
					width: 100%;
					text-align: center;
				}
				.xiala{
					margin: 0 auto;
					width: 28rpx;height: 16rpx;
				}
				.pingjia-fenlei{
					display: flex;
					.pingja-fenlei-item{
						padding: 0rpx 15rpx;
						background: #F2F3F5;
						height: 64rpx;
						line-height: 64rpx;
						border-radius: 32rpx;
						font-size: 24rpxpx;
						font-weight: 400;
						color: #666666;
						margin: 0 10rpx;
					}
					.feilei-quanbu{
						width: 158rpx;
						height: 64rpx;
						background: #FFEEE6;
						border-radius: 32rpx;
						line-height: 64rpx;
						text-align: center;
						font-size: 24rpx;
						font-weight: 400;
						color: #8C6754;
					}
				}
				.fenlei{
					display: flex;
					.fenlei-item{
						font-size: 20rpx;
						font-weight: 400;
						color: #666666;
						margin: 10rpx 10rpx;
					}
				}
				.pingfen-title{
					font-size: 26rpx;
					font-weight: 600;
					color: #FD5A65;
					.num{
						font-size: 42rpx;
						margin-right: 15rpx;
					}
				}
			}
		}
	}
	
</style>
