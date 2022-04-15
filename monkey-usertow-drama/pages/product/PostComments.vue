<template>
	<view class="p-3 m-app">
		<view class="main">
			<view class="main-top flex">
				<image :src="dataMsg.pic" mode=""></image>
				<view class="main-top-right">
					<view class="main-top-title">
						{{dataMsg.productItemList[0].prodName}}
					</view>
					<view class="main-top-bottom flex">
						<view class="main-top-item">
							{{dataMsg.productItemList[0].skuName ? dataMsg.productItemList[0].skuName : '暂无'}}
						</view>
					</view>
				</view>
			</view>
			<view class="content">
				<textarea  value="" v-model="textarea" placeholder="建议从多个方面评价活动，描述活动的过程和感受" />
			</view>
			<view class="UploadPictures flex flex-wrap p-1">
				<view class="img_z item" v-for="(item,index) in chooseImageList" :key="index" v-if="chooseImageList.length>0">
					<image :src="item" mode="widthFix" class="item_img" @click="previewImage(item,chooseImageList)"></image>
					<image class="del" src="../../static/circle-del.png" @click="imgdelete(index)" mode=""></image>
				</view>
				<view class="addto item" @click="chooseImage" v-if="chooseImageList.length<9">
					<image src="../../static/circle-jia.png" mode=""></image>
					<view class="addto-tet">
						添加
					</view>
				</view>
			</view>
			<view v-if="type == 1" class="Tips">
				优秀的描述+配上图片会被<text class="Tips-tet">精选到活动圈</text>哦～
			</view>
			<view v-if="type == 1" class="bottom flex justify-between">
				<view class="bottom-left flex">
					<image src="../../static/circle-ren.png" mode=""></image>谁可以看
					
				</view>
				<view class="bottom-right flex">
					<view class="bottom-right-item flex" @click="choice(1)">
						<image src="../../static/icon11.png" mode="" v-show="is_act==1"></image>
						<image src="../../static/icon10.png" mode="" v-show="is_act==2"></image>公开
					</view>
					<view class="bottom-right-item flex"  @click="choice(2)">
						<image src="../../static/icon11.png" mode="" v-show="is_act==2"></image>
						<image src="../../static/icon10.png" mode="" v-show="is_act==1"></image>家庭圈
					</view>
				</view>
			</view>
		</view>
		<!-- 评分 -->
		<view class="score" v-if="type == 1">
			<view class="score-title flex justify-between">
				<view class="score-title-left">
					活动评价
				</view>
				<view class="score-title-right">
					满意请给五星哦
				</view>
			</view>
			<view class="scorenum">
				<view class="scorenum-item flex">
					<view class="scorenum-left">
						场地情况
					</view>
					<view class="scorenum-right flex">
						<view class="scorenum-right-item " v-for="(index) in 5" :key="index" @click="all_score('activity',1,index)">
							<image src="../../static/post-commentXingAct.png" mode="" v-if="Venuescore>=index"></image>
							<image src="../../static/post-commentXing.png" mode="" v-if="Venuescore<index"></image>
						</view>
					</view>
				</view>
				<view class="scorenum-item flex">
					<view class="scorenum-left">
						领教质量
					</view>
					<view class="scorenum-right flex">
						<view class="scorenum-right-item " v-for="(index) in 5" :key="index" @click="all_score('activity',2,index)">
							<image src="../../static/post-commentXingAct.png" mode="" v-if="TeacherRating>=index"></image>
							<image src="../../static/post-commentXing.png" mode="" v-if="TeacherRating<index"></image>
						</view>
					</view>
				</view>
				<view class="scorenum-item flex">
					<view class="scorenum-left">
						领教态度
					</view>
					<view class="scorenum-right flex">
						<view class="scorenum-right-item " v-for="(index) in 5" :key="index" @click="all_score('activity',3,index)">
							<image src="../../static/post-commentXingAct.png" mode="" v-if="TeacherAttitude>=index"></image>
							<image src="../../static/post-commentXing.png" mode="" v-if="TeacherAttitude<index"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="score" v-if="type == 2">
			<view class="score-title flex justify-between">
				<view class="score-title-left">
					商品评价
				</view>
				<view class="score-title-right">
					满意请给五星哦
				</view>
			</view>
			<view class="scorenum">
				<view class="scorenum-item flex">
					<view class="scorenum-left">
						描述相符
					</view>
					<view class="scorenum-right flex">
						<view class="scorenum-right-item " v-for="(index) in 5" :key="index" @click="all_score('goods',1,index)">
							<image src="../../static/post-commentXingAct.png" mode="" v-if="describe>=index"></image>
							<image src="../../static/post-commentXing.png" mode="" v-if="describe<index"></image>
						</view>
					</view>
				</view>
				<view class="scorenum-item flex">
					<view class="scorenum-left">
						物流服务
					</view>
					<view class="scorenum-right flex">
						<view class="scorenum-right-item " v-for="(index) in 5" :key="index" @click="all_score('goods',2,index)">
							<image src="../../static/post-commentXingAct.png" mode="" v-if="logistics>=index"></image>
							<image src="../../static/post-commentXing.png" mode="" v-if="logistics<index"></image>
						</view>
					</view>
				</view>
				<view class="scorenum-item flex">
					<view class="scorenum-left">
						服务态度
					</view>
					<view class="scorenum-right flex">
						<view class="scorenum-right-item " v-for="(index) in 5" :key="index" @click="all_score('goods',3,index)">
							<image src="../../static/post-commentXingAct.png" mode="" v-if="service>=index"></image>
							<image src="../../static/post-commentXing.png" mode="" v-if="service<index"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="score" v-if="type == 3">
			<view class="score-title flex justify-between">
				<view class="score-title-left">
					门票评价
				</view>
				<view class="score-title-right">
					满意请给五星哦
				</view>
			</view>
			<view class="scorenum">
				<view class="scorenum-item flex">
					<view class="scorenum-left">
						环境质量
					</view>
					<view class="scorenum-right flex">
						<view class="scorenum-right-item " v-for="(index) in 5" :key="index" @click="all_score('admission',1,index)">
							<image src="../../static/post-commentXingAct.png" mode="" v-if="environment>=index"></image>
							<image src="../../static/post-commentXing.png" mode="" v-if="environment<index"></image>
						</view>
					</view>
				</view>
				<view class="scorenum-item flex">
					<view class="scorenum-left">
						设施质量
					</view>
					<view class="scorenum-right flex">
						<view class="scorenum-right-item " v-for="(index) in 5" :key="index"  @click="all_score('admission',2,index)">
							<image src="../../static/post-commentXingAct.png" mode="" v-if="facilities>=index"></image>
							<image src="../../static/post-commentXing.png" mode="" v-if="facilities<index"></image>
						</view>
					</view>
				</view>
				<view class="scorenum-item flex">
					<view class="scorenum-left">
						是否满意
					</view>
					<view class="scorenum-right flex">
						<view class="scorenum-right-item " v-for="(index) in 5" :key="index"  @click="all_score('admission',3,index)">
							<image src="../../static/post-commentXingAct.png" mode="" v-if="satisfied>=index"></image>
							<image src="../../static/post-commentXing.png" mode="" v-if="satisfied<index"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btn" @click="submit()">
			提交评价
		</view>
		<u-mask :show="show_Tips" @click="show_Tips = false">
			<view class="show_Tips">
				<view class="title">
					等待审核
				</view>
				<view class="item">
					预计1-3个工作日，届时会有站内信通知，
				</view>
				<view class="item">
					或是在个人中心查看审核状态！
				</view>
				<view class="item">
					感谢您使用平台
				</view>
				<image src="https://shop666.oss-cn-hangzhou.aliyuncs.com/front/monkey-post-commentTips.png" mode=""></image>
				<view class="show_Tips_btn">
					关闭
				</view>
			</view>
		</u-mask>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				textarea:'',
				show_Tips:false,//提示的显示和隐藏
				chooseImageList:[],
				is_act:1,
				Venuescore:0,//活动场地评分
				TeacherRating:0,//领教评分
				TeacherAttitude:0,//领教态度
				describe:0,//商品描述评分
				logistics:0,//物流评分
				service:0,//服务评分
				environment:0,//门票环境评分
				facilities:0,//门票设施评分
				satisfied:0,//门票满意评分
				type:1,
				dataMsg:'',
				ids:0,
				imglsit:'',
			}
		},
		onLoad(e) {
			this.ids = e.id
			// this.dataMsg = uni.getStorageSync("pngjiaMsg")
			// console.log(this.dataMsg)
			this.type = e.type
			this.getdata();
		},
		methods: {
			// 查看大图
			previewImage(current,urls){
				uni.previewImage({
					current,
					urls
				})
			},
			getdata(){
				this.$api.get_order_detail({
					orderNo: this.ids,
				}).then(res => {
					this.dataMsg = res.data;
				})
			},
			chooseImage(){
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success:  (res)=> {
						console.log(res.tempFilePaths);
						this.chooseImageList.push(...res.tempFilePaths)
					}
				})
			},
			imgdelete(index){
				this.chooseImageList.splice(index,1)
			},
			choice(index){
				this.is_act = index
			},
			all_score(type,index,score){
				if(type=='activity'){
					if(index==1){
						this.Venuescore = score
					}
					if(index==2){
						this.TeacherRating = score
					}
					if(index==3){
						this.TeacherAttitude = score
					}
				}
				if(type=='goods'){
					if(index==1){
						this.describe = score
					}
					if(index==2){
						this.logistics = score
					}
					if(index==3){
						this.service = score
					}
				}
				if(type=='admission'){
					if(index==1){
						this.environment = score
					}
					if(index==2){
						this.facilities = score
					}
					if(index==3){
						this.satisfied = score
					}
				}
			},
			submit(){
				if(!this.textarea){
					this.$u.toast("请填写评论内容")
					return
				}
				if(this.chooseImageList){
					this.$UploadPictures(this.chooseImageList)
					.then(res=>{
						this.imglsit = res
						this.submitSucess()
					})
				}else{
					this.submitSucess()
				}
			},
			submitSucess(){
				uni.showToast({
					title: "该功能暂未开放",
					icon: 'none'
				})
				return 
				let obj = {};
				if(this.type == 1){
					obj.field_level = this.Venuescore + 1
					obj.understanding_level = this.TeacherRating + 1
					obj.attitude_level = this.TeacherAttitude + 1
				}
				if(this.type == 2){
					obj.describe_level = this.describe + 1
					obj.logistics_level = this.logistics + 1
					obj.service_level = this.service + 1
				}
				if(this.type == 3){
					obj.describe_level = this.environment + 1
					obj.logistics_level = this.facilities + 1
					obj.service_level = this.satisfied + 1
				}
				this.$api.add_evalutae({
					store_id:this.dataMsg.store[0].store_id,	//商铺id
					order_id:this.dataMsg.id,	//订单id
					product_detail_id:this.dataMsg.store[0].order[0].product_details.id,	//单一规格商品id
					product_id:this.dataMsg.store[0].order[0].product.id,
					product_type:this.type,	
					content:this.textarea,	//商铺id
					image:this.imglsit.length > 0 ? this.imglsit : '',
					type:this.is_act,
					...obj
				}).then(res => {
					uni.navigateBack();
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.show_Tips{
		text-align: center;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		padding-top: 40rpx;
		width: 550rpx;
		height: 684rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 12rpx 0rpx rgba(0, 0, 0, 0.07);
		border-radius: 20rpx;
		.title{
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #333333;
		}
		.item{
			margin: 20rpx 0;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #666666;
		}
		image{
			margin: 20rpx;
			width: 242rpx;
			height: 208rpx;
		}
		.show_Tips_btn{
			
			margin: 0 auto;
			margin-top: 20rpx;
			width: 310rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			background: url(../../static/big-button.png) no-repeat;
			background-size: 310rpx 80rpx;
		}
	}
	.UploadPictures {
		.img_z {
			position: relative;
			overflow: hidden;
			width: 188rpx;
			height: 122rpx;
			border-radius: 20rpx;
			.item_img {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%,-50%);
			}
			.del{
				position: absolute;
				top: -10rpx;
				right: -10rpx;
				width: 34rpx;
				height: 34rpx;
			}
		}
		.item{
			margin: 10rpx;
		}
		.addto {
			text-align: center;
			width: 188rpx;
			height: 122rpx;
			padding-top: 20rpx;
			background: #F7F7F7;
			border-radius: 20rpx;
			border: 2rpx dashed #D7D7D7;
	
			image {
				width: 42rpx;
				height: 42rpx;
			}
	
			.addto-tet {
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #666666;
			}
		}
	}

	.m-app {
		border-top: 2rpx solid #F3F3F3;
		.main{
			width: 690rpx;
			
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 12rpx 0rpx rgba(0, 0, 0, 0.07);
			border-radius: 20rpx;
			.main-top{
				box-shadow: box-shadow;
				padding: 20rpx 20rpx;
				border-bottom: 2rpx solid #F3F3F3;
				image{
					width: 104rpx;
					height: 104rpx;
					box-shadow: 0rpx 0rpx 12rpx 0rpx rgba(247, 147, 30, 0.2);
					border-radius: 20rpx;
					margin-right: 30rpx;
				}
				.main-top-right{
					.main-top-title{
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #25252F;
					}
					.main-top-bottom{
						.main-top-item{
							margin: 10rpx;
							padding: 5rpx 10rpx;
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #666666;
							background: #F1F1F1;
							border-radius: 22px;
						}
					}
				}
			}
			.content{
				height: 300rpx;
				textarea{
					font-size: 20rpx;
					box-sizing: border-box;
					padding: 20rpx;
					height: 200rpx;
					width: 100%;
					font-size: 28rpx;
				}
			}
			.Tips{
				.Tips-tet{
					color: #F7931E;
				}
				text-align: center;
				margin: 0 auto;
				margin-top: 20rpx;
				width: 630rpx;
				height: 42rpx;
				line-height: 42rpx;
				background: #F7F7F7;
				border-radius: 10rpx;
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
			}
			.bottom{
				padding: 20rpx;
				margin-top: 20rpx;
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
				.bottom-left{
					image{
						width: 16rpx;
						height: 20rpx;
						margin-right: 10rpx;
					}
				}
				.bottom-right{
					.bottom-right-item{
						margin: 0rpx 5rpx;
					}
					image{
						margin-right: 10rpx;
						width: 20rpx;
						height: 20rpx;
					}
				}
			}
		}
		.score{
			box-shadow: box-shadow;
			padding: 20rpx;
			margin: 20rpx auto;
			width: 690rpx;
			height: 246rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 0rpx 12rpx 0rpx rgba(0, 0, 0, 0.07);
			border-radius: 20rpx;
			.score-title-left{
				font-size: 24rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #333333;
			}
			.score-title-right{
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
			}
			.scorenum{
				
				.scorenum-item{
					margin: 20rpx 0;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #333333;
					.scorenum-right{
						margin-left: 20rpx;
						image{
							width: 22rpx;height: 22rpx;
						}
						.scorenum-right-item{
							margin: 0 20rpx;
						}
					}
				}
			}
		}
		.btn{
			margin-top: 50rpx;
			width: 690rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #fff;
			background: url(../../static/button.png)no-repeat;
			background-size: 690rpx 80rpx;
		}
	}
</style>
