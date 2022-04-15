<template>
	<view class="model-page">
		<Header :title="'任务详情'"></Header>
		<!-- <view class="navBar">任务详情</view> -->
		<view class="title">任务详情</view>
		<view class="bg">
			<image style="width: 100%;height: 100%;"
				src="https://pro-1310081282.cos.ap-shanghai.myqcloud.com/app-price/bg/task/pageBg.jpg" mode="widthFix">
			</image>
		</view>
		<!-- <text style="color:transparent;">1</text> -->
		<view class="task-page">
			<view class="bg-task-page">
				<image :style="{height:problems[0].tips==1||problems[0].tips==3?'870rpx':'660rpx'}"
					src="../../static/task/task_box.png"></image>
			</view>
			<view class="first">
				{{taskInfo.name || '任务'}}
			</view>

			<!-- 用户信息 -->
			<view class="role-info flex">
				<image class="logo" :src="userInfo.icon" mode=""></image>
				<view class="info-text flex-1">
					<view class="name">{{userInfo.nickname}}</view>
					<view class="role-name">角色：{{mainPageInfo.dSramaActiveRoleDetailDto.roleName}}</view>
				</view>
			</view>

			<!-- 问题列表 -->
			<view class="problems-box" v-for='probItm in problems' :key="probItm.id">
				<view class="problem-item">
					<view class="problem-item-box">
						<view class="problem-item-title problem-img">
							<image src="../../static/task/task_text_q.png" mode="widthFix"></image>
							<view>{{ probItm.problem }}</view>
						</view>
						<!-- 类型 1-选择题 2-判断题 3-问答题 4-图片题 5-视频题 -->
						<!-- 类型 1-选择题 2-判断题 3-问答题 （0，1，2） -->
						<view class="problem-item-info " v-if='probItm.type === 1'>
							<image class="check-q-img" src="../../static/task/task_text_a.png" mode="widthFix"></image>
							<view class="check-q-text">
								<view class="option-item-single" v-for="(option,oindex) in probItm.optionList"
									:key='option.id' @tap='checkItem(probItm,oindex)'>
									<image v-if="oindex===ans" class="select-img"
										src="../../static/task/task_select.png"></image>
									<image v-if="oindex!=ans" class="select-img" src="../../static/task/task_box.png">
									</image>
									{{option.describes}}
								</view>
							</view>
						</view>
						<view class="problem-item-info flex just-C align-center" v-else-if='probItm.type === 2'>
							<view class="option-item-judge" @tap="checkItem(probItm,1)">
								<!-- <view class="option-item-judge" @tap='submit2(probItm, 1)'> -->
								<image
									:src="ans==1 ? '../../static/task/task_judge_yes_1.png' : '../../static/task/task_judge_yes_0.png'"
									mode="widthFix"></image>
							</view>
							<view class="option-item-judge" @tap="checkItem(probItm, 2)">
								<!-- <view class="option-item-judge" @tap='submit2(probItm, 2)'> -->
								<image
									:src="ans==2 ? '../../static/task/task_judge_no_1.png' : '../../static/task/task_judge_no_0.png'"
									mode="widthFix"></image>
							</view>
						</view>
						<view class="problem-item-info " v-if='probItm.type === 3 && probItm.tipsType == 0'>
							<image class="check-q-img" src="../../static/task/task_text_a.png" mode="widthFix"></image>
							<view class="content">
								<textarea class="textarea" v-model="problemsItem.ans" placeholder="请输入答案"
									@input="checkItem(probItm,problemsItem.ans)"></textarea>
							</view>
						</view>
						<view class="problem-item-info tack-photo"
							v-else-if='probItm.type === 3 && probItm.tipsType == 1'>
							<image class="tack-photo-img"
								:src="!!photoSrc ? photoSrc : '../../static/task/task_pic_upload.png'" mode="widthFix"
								@click="handlePhoto(probItm)">
							</image>
							<!-- <view class="photo" @click="handlePhoto(probItm)">
							拍照
						</view> -->
							<!-- <image class="photo-item" v-if='probItm.isPhoto' :src="probItm.answerContext" mode="widthFix">
						</image> -->
							<!-- <textarea v-else v-model="probItm.answerContext" placeholder="请输入答案" /> -->
							<!-- 提交按钮 -->
							<!-- <view class="btn submit text-center" @tap='submit3(probItm)'>
							确认提交
						</view> -->
						</view>
						<view class="problem-item-info tack-photo tack-video"
							v-else-if='probItm.type === 3 && probItm.tipsType == 2'>
							<view class="tips" v-if="!!problems[0].tips && option[0].tips">
								<image class="tips-title" src="../../static/task/task_text_a.png" mode="widthFix">
								</image>
								<view class="tips-img-father">
									<image class="tips-img" :src="probItm.tips" mode="widthFix">
									</image>
								</view>
								<image class="tips-img-play" src="../../static/task/play-button.png" mode="widthFix"
									v-if="problems[0].tipsType == 2"></image>
							</view>
							<view class="answer">
								<image class="answer-title" src="../../static/task/task_text_a.png" mode="widthFix">
								</image>
								<view class="answer-img-father">
									<image class="answer-img" @click="handleVideo(probItm)"
										:src="!!photoSrc ? photoSrc : '../../static/task/task_pic_upload.png'" mode="">
									</image>
								</view>
							</view>
						</view>
						<view class="confirm" @tap="clickConfirm(problemsItem)"
							:style="{top:problems[0].tips==1||problems[0].tips==3?'570rpx':'350rpx'}">
							<image src="../../static/task/task_sub_btn.png" mode="widthFix"></image>
							<view class="confirm-text" v-if='isreview === true'>确认提交</view>
							<view class="review" v-else>
								<image class="review-img" src="../../static/task/clock.png" mode="widthFix"></image>
								<view class="review-text">审核中</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="back-bgc"></view>
	</view>
</template>

<script>
	import upload from '@/common/upload.js'
	import uploadVideo from '@/common/uploadVideo.js'
	export default {
		data() {
			return {
				id: '',
				taskInfo: {},
				problems: [],
				defaultBackImg: 'https://monkeyoss-qa.oss-cn-hangzhou.aliyuncs.com/test/%E8%83%8C%E6%99%AF%E5%9B%BE.png',
				userInfo: uni.getStorageSync('userInfo'),
				mainPageInfo: uni.getStorageSync('mainPageInfo'),
				activityId: uni.getStorageSync('activeId'),
				checked: 0,
				isreview: true,
				ans: -1,
				problemsItem: {},
				photoSrc: ''
			}
		},
		onLoad(opt) {
			this.id = opt.id || 8
			// this.id = 8
			this.getDetail();
		},
		created() {},
		methods: {
			async handlePhoto(item) {
				const res = await upload()
				item.isPhoto = true
				item.answerContext = res
				this.photoSrc = res
			},
			async handleVideo(item) {
				const res = await uploadVideo();
				console.log('视频', res)
				item.isPhoto = true
				item.answerContext = res.data
				this.photoSrc = res.photoSrc
			},
			checkItem(item, ans) {
				this.problemsItem = item
				this.problemsItem.ans = ans
				this.ans = ans
				// console.log(this.problemsItem)
			},
			// 判断题
			submit2(item, ans) {
				this.submit({
					subjectId: item.id,
					answer: ans
				})
			},
			// 问答题
			submit3(item) {
				// if (!item.ans) {
				// 	uni.showToast({
				// 		title: '答案不能为空',
				// 		icon: "error"
				// 	})
				// 	return
				// }
				this.submit({
					subjectId: item.id,
					answer: this.photoSrc
				})
			},
			selectOption(problem, option) {
				// return console.log("selectOption",{
				// 	subjectId: option.id,
				// 	answer: option.ans
				// });
				console.log('option', option);
				this.submit({
					subjectId: problem.id,
					answer: problem.ans
				})
			},
			async submit(param) {
				const res = await this.$api.submitTask({
					activityId: this.activityId,
					taskId: this.id,
					subjectId: param.subjectId,
					answer: param.answer
				})
				// 答过则返回
				if (res.code === 200) {
					uni.showToast({
						title: res.data || "回答完成",
						duration: 1500,
						success() {
							// setTimeout(()=>{
							// 	uni.navigateBack()
							// }, 1500)
						},
						icon: "none"
					})
				} else if (res.code === 400) {
					// setTimeout(()=>{
					// 	uni.navigateBack()
					// }, 1500)
				}
			},
			getDetail() {
				this.$api.getTaskDetail(this.id, this.activityId).then(res => {
					this.taskInfo = res.data;
					// res.data.dramaSubjectDtoList[0].type = 4 // 测试使用
					// res.data.dramaSubjectDtoList[0].tipsType = 2 // 测试使用 tipsType=1
					this.problems = res.data.dramaSubjectDtoList;
					this.isreview = !res.data.done;
					console.log("this.ans", this.ans)
					console.log("this.problems", this.problems)
				})
			},
			clickConfirm(item) {
				console.log('item', item);
				// return;
				if (!this.isreview) {
					uni.showToast({
						title: '问题已提交',
						icon: "error"
					})
					return
				}
				const that = this
				if (item.ans < 0 || this.photoSrc) {
					uni.showToast({
						title: '答案不能为空',
						icon: "error"
					})
					return
				}
				uni.showModal({
					title: '温馨提示',
					content: '是否确认提交问题，提交后将无法修改',
					cancelColor: '#000000',
					confirmColor: '#3F536E',
					success: function(res) {
						if (res.confirm) {
							// console.log('用户点击确定');
							switch (item.type) {
								case 1:
									that.selectOption(item, item.id)
									break
								case 2:
									that.submit2(item, item.ans)
									break
								case 3:
									that.submit3(item)
									break
							}
							// that.problemsItem = {}
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				})
				// this.isreview = true;
				// this.isreview = false;

			}
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		color: transparent;
		font-weight: bold;
		text-align: center;
		font-size: 32rpx;
		margin-top: 10rpx;
		margin-bottom: 54rpx;
	}

	.navBar {
		position: fixed;
		top: 104rpx;
		left: 50%;
		font-size: 34rpx;
		transform: translateX(-50%);
		color: white;
	}

	.bg {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: -3;
	}

	.bg-task-page {
		position: absolute;
		width: 91%;
		height: auto;
		left: 50%;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
		top: 285rpx;
		z-index: -2;

		image {
			width: 100%;
			// height: 870rpx;
		}
	}

	.back-bgc {
		width: 100%;
		height: 100%;
		background-color: black;
	}

	.task-page {
		// height: 860rpx;
		// margin: 180rpx 30rpx 0 30rpx;
		margin: 168rpx 30rpx 0 30rpx;
		padding: 0 4rpx;
	}

	// text1
	.first {
		font-size: 40rpx;
		font-weight: bold;
		color: white;
		padding-left: 43rpx;
		margin-top: 45rpx;
		text-align: center;
	}

	.role-info {
		position: relative;
		height: 130rpx;
		margin: 20rpx 30rpx;
		border-bottom: 4rpx solid #D8D8D8;

		.logo {
			position: absolute;
			width: 120rpx;
			height: 120rpx;
			border-radius: 60rpx;
			top: -22rpx;
			border: 1rpx solid #5D7FD8;
		}

		.info-text {
			margin-top: -30rpx;
			margin-left: 150rpx;

			.name {
				font-size: 30rpx;
				color: white;
				font-weight: 500;
			}

			.role-name {
				margin-top: 10rpx;
				font-size: 24rpx;
				color: #B4B6C1;
			}
		}
	}

	// 问题
	.problems-box {
		position: relative;
		margin: 20rpx 30rpx;
	}

	.problem-img {
		width: 100%;
		height: 60rpx;
		display: flex;

		image {
			width: 110rpx;
			height: auto;
			vertical-align: middle;
		}

		view {
			padding-left: 20rpx;
			padding-top: 7rpx;
			height: 40rpx;
			line-height: 40rpx;
			font-size: 34rpx;
			color: white;
		}
	}

	.check-q-img {
		position: absolute;
		top: 90rpx;
		left: 0;
		width: 120rpx;
	}

	.select-img {
		width: 30rpx;
		height: 30rpx;
		vertical-align: middle;
		margin-right: 16rpx;
	}

	.option-item-judge {
		font-size: 64rpx;
		width: 200rpx;
		height: 200rpx;
	}

	.check-q-text {
		position: absolute;
		top: 94rpx;
		left: 135rpx;

		.option-item-single {
			height: 80rpx;
			font-size: 34rpx;
			color: white;
		}
	}

	.content {
		position: absolute;
		top: 98rpx;
		left: 134rpx;
		width: 400rpx;
		height: 170rpx;
		line-height: 34rpx;
		font-size: 34rpx;
		background-color: transparent;

		.textarea {
			width: 400rpx;
			height: 170rpx;
			font-size: 32rpx;
			color: #fff;
		}
	}

	.photo {
		font-size: 56rpx;
	}

	.photo-item {
		width: 400rpx;
		height: 400rpx;
		margin: 0 auto;
	}

	.choice-q {
		position: absolute;
		left: 143rpx;
		top: 80rpx;
		width: 440rpx;
		height: 440rpx;
		text-align: left;
	}

	.just-C {
		margin-top: 30rpx;
		width: 100%;
		height: 260rpx;
		display: flex;
		padding: 0 80rpx;
		justify-content: space-between;

		image {
			width: 170rpx;
			height: auto;
		}
	}

	.tack-photo {
		position: absolute;
		top: 90rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 400rpx;
		height: 200rpx;

		.tack-photo-img {
			width: 400rpx;
			height: 200rpx !important;
			border-radius: 20rpx !important;
		}
	}

	.confirm {
		position: absolute;
		width: 330rpx;
		height: 80rpx;
		// top: 570rpx;
		left: 50%;
		transform: translateX(-50%);

		image {
			width: 330rpx;
			height: 80rpx;
		}

		.confirm-text {
			text-align: center;
			margin-top: -85rpx;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 30rpx;
			color: white;
		}

		.review {
			display: flex;
			margin-top: -85rpx;

			.review-img {
				width: 40rpx;
				height: auto;
				margin: auto 0;
				color: white;
				margin-left: 100rpx;
				z-index: -1;
			}

			.review-text {
				height: 80rpx;
				line-height: 80rpx;
				font-size: 30rpx;
				color: white;
				margin-left: 16rpx;
			}
		}
	}

	.tack-video {
		// width: ;
		// left: 32%!important;
		width: 100%;
	}

	.tips {
		position: relative;
		// background-color: #ccc;
		width: 600rpx;
		height: 200rpx;
		margin: 0 auto;
		margin-bottom: 40rpx;

		// display: flex;
		// justify-content: flex-start;
		.tips-title {
			width: 110rpx;
			margin-left: -14rpx;
			margin-top: 10rpx;
		}

		.tips-img-father {
			position: absolute;
			left: 50%;
			border-radius: 20rpx;
			overflow: hidden;
			transform: translateX(-50%);
			margin-top: 10rpx;
			top: -4rpx;
			height: 220rpx !important;

			.tips-img {
				width: 400rpx !important;
				height: 180rpx;
				margin-left: 10rpx;
				border-radius: 20rpx;
			}

		}

		.tips-img-play {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			width: 100rpx;
			top: 50rpx;
			height: 200rpx;
		}
	}

	.answer {
		position: relative;
		// background-color: #ccc;
		width: 600rpx;
		height: 200rpx;
		margin: 0 auto;

		// display: flex;
		// justify-content: flex-start;
		.answer-title {
			width: 110rpx;
			margin-left: -14rpx;
			margin-top: 10rpx;
		}

		.answer-img-father {
			height: 220rpx !important;
			border-radius: 20rpx;
			overflow: hidden;
			position: absolute;
			left: 50%;
			top: 8rpx;
			transform: translateX(-50%);

			.answer-img {
				// position: absolute;
				// left: 50%;
				// top: 8rpx;
				// transform: translateX(-50%);
				width: 400rpx !important;
				margin-left: 10rpx;
				height: 200rpx;
				border-radius: 20rpx;
			}
		}

	}
</style>
