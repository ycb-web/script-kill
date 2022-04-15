<template>
	<view class="app ">
		<Header title="个人资料"></Header>
		<view class="ul">
			<view class="li avatar" style="margin-bottom: 30rpx;margin-top: 200rpx;">
				<view class="avatar_z" @tap="chooseAvatar">
					<view class="u_avatar">
						<u-avatar :src="form.icon" size="136"></u-avatar>
					</view>
					<view class="avatar_z_text">点击编辑头像</view>
				</view>
			</view>
			<view class="li flex">
				<view class="title">用户名</view>
				<view class="user flex">
					<view class="subText"><input class="subText" input-align="right"
							v-model="form.nickname" placeholder="请输入"></input></view>
				</view>
			</view>
			<view class="li flex" @click="Gender_show = true">
				<view class="title">性别</view>
				<view class="user flex">
					<u-select v-if="Gender_show" @confirm="Gender_determine" @cancel="Gender_cancel" @
						v-model="Gender_show" :list="Gender_list"></u-select>
					<view class="subText">{{translateOptions(Gender_list, form.gender)}}</view>
				</view>
			</view>
			<view class="li flex" @click="show_addr_picker = true">
				<view class="title">常驻城市</view>
				<view class="user flex">
					<!-- 地区插件 -->
					<w-picker :visible.sync="show_addr_picker" mode="region" :value="addr_code" default-type="value"
						:hide-area="false" @confirm="onConfirm($event, 'region')" @cancel="onCancel" ref="region">
					</w-picker>
					<view class="subText">{{ address || '请选择城市' }}</view>
				</view>
			</view>
			<view class="li flex">
				<view class="title">绑定手机号</view>
				<view class="user flex">
					<view class="subText">{{ form.phone }}</view>
				</view>
			</view>
			<view class="li flex">
				<view class="title">车牌号</view>
				<view class="user flex">
					<view class="subText">
						<u-input class="subText" input-align="right" v-model="form.carId" placeholder="请输入" style="color: #FFFFFF;"></u-input>
					</view>
				</view>
			</view>
		</view>
		<view class="btn" @click="onSubmit">
			<image class="btn_img" src="../../static/personal/submit.png" mode="widthFix"></image>
			<view class="btn_text">确认提交</view>
		</view>
	</view>
</template>

<script>
	import provinces from 'uview-ui/libs/util/province.js';
	import citys from 'uview-ui/libs/util/city.js';
	import areas from 'uview-ui/libs/util/area.js';
	import wPicker from '@/pagesA/Address/w-picker/w-picker.vue';
	import {
		baseURL2
	} from '@/api/axios.js';
	import {
		translateOptions
	} from "../../common/util";
	export default {
		components: {
			wPicker
		},
		data() {
			return {
				form: {
					nickname: '',
					icon: '',
					gender: '',
					phone: '',
					carId: '',
					province_id: '',
					city_id: '',
					area_id: '',
					synopsis: '',
				},

				avatar: '', // 临时头像
				height: 30,
				bgColor: this.$u.color.bgColor,
				marginTop: 30,
				marginBottom: 30,
				show_addr_picker: false, //地区选择的显示和隐藏
				addr_code: '', //选择地区结果(id)
				address: '', //选择地区结果(文字)
				Gender_show: false,
				Gender_list: [ //性别列表
					{
						value: 0,
						label: '保密'
					}, {
						value: 1,
						label: '男'
					}, {
						value: 2,
						label: '女'
					}
				]
			};
		},
		onShow() {
			this.getUsetInfo();
		},
		created() {
			// 监听从裁剪页发布的事件，获得裁剪结果
			uni.$on('uAvatarCropper', path => {
				this.avatar = path;
			});
		},
		methods: {
			translateOptions,
			cityChange(e) {
				this.city_val = e.province.label + '-' + e.city.label + '-' + e.area.label;
			},
			// 头像裁剪
			chooseAvatar() {
				console.log(this.$u);
				// 此为uView的跳转方法，详见"文档-JS"部分，也可以用uni的uni.navigateTo
				this.$u.route({
					// 关于此路径，请见下方"注意事项"
					url: 'pagesA/my/components/u-avatar-cropper/u-avatar-cropper',
					// 内部已设置以下默认参数值，可不传这些参数
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 300,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 200,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'jpg'
					}
				});
			},
			// 地区选择确定
			onConfirm(e, type) {
				console.log(e);
				this.form.province_id = e.value[0];
				this.form.city_id = e.value[1];
				this.form.area_id = e.value[2];
				if (type == 'region') {
					this.address = e.result;
				}
			},
			// 地区选择取消
			onCancel() {
				this.show_addr_picker = false;
			},
			//选择性别点击确定的事件
			Gender_determine(e) {
				console.log(e);
				this.form.gender = e[0].value;
			},
			//选择性别点击取消的事件
			Gender_cancel(e) {
				this.Gender_show = false
			},
			// 跳往绑定手机号
			navToBindingMobile() {
				uni.navigateTo({
					url: '/pagesA/my/BindingMobile'
				});
			},
			// 获取个人信息
			getUsetInfo() {
				const userInfo = uni.getStorageSync('userInfo');
				console.log('userInfo', userInfo)
				this.form = {
					...userInfo
				};
				this.address = userInfo.address;
				this.form.icon = this.avatar || this.form.icon;
			},
			// 获取用户信息
			getUsetInfoApi() {
				this.$api.get_user_info().then(res => {
					uni.setStorageSync('userInfo', res.data);
				});
			},
			// 提交
			onSubmit() {
				// 可以在此上传到服务端
				if (this.avatar) {
					uni.uploadFile({
						url: baseURL2 + '/api/file/upload',
						filePath: this.avatar,
						name: 'file',
						success: res => {
							const data = JSON.parse(res.data);
							if (data.status === 200) {
								this.form.icon = data.data;
								this.edit_user_info()
							}
						}
					});
				} else {
					this.edit_user_info()
				}

			},
			edit_user_info() {
				if (this.form.icon == '') {
					uni.showToast({
						title: "请上传头像！"
					})
					return
				}
				this.form.address = this.address
				this.$api.edit_user_info(this.form).then(res => {
					if (res.status === 200) {
						uni.showToast({
							title: '信息修改成功',
							icon: 'none'
						});
						this.getUsetInfoApi()
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.app {
		background-size: 100% 100%;
		background: linear-gradient(0deg, #1F113F 3%, #1F113F 3%, #121632 100%, #121632 100%);
	}

	.textarea {
		min-height: 160rpx;
		width: 690rpx;
		margin: 30rpx auto;
		padding: 20rpx 20rpx;

		textarea {
			line-height: 40rpx;
			width: 100%;
			font-size: 28rpx;
		}
	}

	/deep/.u-avatar__img {
		width: 144rpx;
		height: 144rpx;
		border: 1px solid #FFFFFF;
	}
	/deep/.u-input__input {
		color: #FFFFFF!important;
	}
	.ul {
		width: 690rpx;
		margin: auto;
		padding: 20rpx 20rpx 0 20rpx;
		box-sizing: border-box;
		box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.07);
		border-radius: 20px;


		.li:first-child {
			border: none;
		}
		.li:last-child {
			border: none;
		}
		.li {
			padding: 20rpx;
			box-sizing: border-box;
			border-bottom: 2rpx solid #F3F3F3;
			color: #FFFFFF !important;

			.avatar_z {
				width: 200rpx;
				margin: 0 auto;
				text-align: center;

				.avatar_z_text {
					margin-top: 10rpx;
					font-family: PingFangSC-Medium;
					font-size: 20rpx;
					font-weight: 500;
					line-height: 32rpx;
					color: #FFFFFF;
				}
			}

			.title {
				flex: 2;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 40rpx;
			}

			.user {
				text-align: right;

				.subText {
					flex: 1 1 200rpx;
					color: #FFFFFF;
				}
			}
		}
	}
	/deep/ .subText {
		color: #FFFFFF;
	}
	.btn {
		position: relative;
		margin-top: 100rpx;

		.btn_img {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 622rpx;
			height: 80rpx;
		}

		.btn_text {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			font-family: PingFangSC-Medium;
			font-size: 32rpx;
			font-weight: 500;
			line-height: 40rpx;
			color: #FFFFFF;
		}
	}

	.btn-wrap {
		margin: 100rpx 30rpx;
	}
</style>
