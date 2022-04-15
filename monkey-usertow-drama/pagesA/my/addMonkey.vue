<template>
	<view class="p-3">
		<view class="headImg" v-if="form.mkType === 1">
			<view class="avatar_z" @tap="chooseAvatar">
				<view class="u_avatar"><u-avatar :src="form.icon" size="136"></u-avatar></view>
				<view class="avatar_z_text">点击编辑头像</view>
			</view>
			<view class="input">
				<u-field v-model="form.realName" label="姓名" label-width="180" placeholder="请输入姓名" :clearable="false" :border-bottom="false" class="u-field"></u-field>
			</view>
			<view class="input">
				<u-field
					v-model="form.wechatNumber"
					label="微信号"
					label-width="180"
					placeholder="请输入微信号"
					:clearable="false"
					:border-bottom="false"
					class="u-field"
				></u-field>
			</view>
			<view class="input">
				<u-field
					v-model="subordinate"
					label="关联的小猴子"
					label-width="180"
					placeholder="请选择关联的小猴子"
					disabled
					right-icon="play-right-fill"
					type="select"
					:clearable="false"
					:border-bottom="false"
					class="u-field"
					@click="selectShow = true"
				></u-field>
			</view>
			<view class="input">
				<u-field v-model="form.callElder" label="小孩子叫TA" label-width="180" placeholder="小孩子叫TA" :clearable="false" :border-bottom="false" class="u-field"></u-field>
			</view>
			<view class="input ">
				<u-field
					v-model="form.birthday"
					label="生日"
					label-width="180"
					placeholder="请选择日期"
					disabled
					right-icon="play-right-fill"
					type="select"
					:clearable="false"
					:border-bottom="false"
					class="u-field"
					@click="show = true"
				></u-field>
			</view>
			<view class="input mb">
				<u-field
				disabled
					v-model="age"
					label="年龄"
					label-width="180"
					placeholder="请输入年龄数字"
					type="number"
					:clearable="false"
					:border-bottom="false"
					class="u-field"
					@input="onNumber"
				></u-field>
			</view>

			<lz-button @click="onSubmit">保存</lz-button>
		</view>

		<view class="headImg" v-if="form.mkType === 0">
			<view class="avatar_z" @tap="chooseAvatar">
				<view class="u_avatar"><u-avatar :src="form.icon" size="136"></u-avatar></view>
				<view class="avatar_z_text">点击编辑头像</view>
			</view>
			<view class="input">
				<u-field v-model="form.realName" label="姓名" label-width="180" placeholder="请输入姓名" :clearable="false" :border-bottom="false" class="u-field"></u-field>
			</view>
			<view class="input">
				<u-field v-model="form.nickname" label="小名" label-width="180" placeholder="请输入小名" :clearable="false" :border-bottom="false" class="u-field"></u-field>
			</view>
			<view class="input">
				<u-field v-model="form.callYounger" disabled @click="callYoungerShow = true" label="是我的*" label-width="180" placeholder="是我的" :clearable="false" :border-bottom="false" class="u-field"></u-field>
			</view>
			<view class="input">
				<u-field
					v-model="form.birthday"
					label="出生日期"
					label-width="180"
					placeholder="请选择出生日期"
					disabled
					right-icon="play-right-fill"
					type="select"
					:clearable="false"
					:border-bottom="false"
					class="u-field"
					@click="show = true"
				></u-field>
			</view>
			<view class="input ">
				<u-field
					v-model="form.idCard"
					label="身份证号"
					label-width="180"
					placeholder="请输入真实的身份证号"
					:clearable="false"
					:border-bottom="false"
					class="u-field"
				></u-field>
			</view>
			<view class="cardTips f20 mb-2">* 身份证号仅用于购买保险，保障宝贝安全</view>
			<view class="input ">
				<u-field
				disabled
					v-model.number="age"
					label="年龄"
					label-width="180"
					placeholder="请输入年龄数字"
					type="number"
					:clearable="false"
					:border-bottom="false"
					class="u-field"
					@input="onNumber"
				></u-field>
			</view>
			<view class="input">
				<u-field v-model="form.school" label="学校" label-width="180" placeholder="请输入学校" :clearable="false" :border-bottom="false" class="u-field"></u-field>
			</view>
			<view class="input mb">
				<u-field v-model="form.currentClass" label="班级" label-width="180" placeholder="请输入班级" :clearable="false" :border-bottom="false" class="u-field"></u-field>
			</view>
			<lz-button @click="onSubmit">保存</lz-button>
		</view>

		<!-- <u-calendar v-model="show" mode="date" @change="setDataTime"></u-calendar> -->
		<u-picker mode="time" v-model="show" :end-year="maxdate" :params="params" @confirm="setDataTime"></u-picker>

		<u-select v-model="selectShow" :list="selectList" value-name="id" label-name="realName" mode="single-column" @confirm="confirm"></u-select>
		<u-select v-model="callYoungerShow" :list="callYoungerList" value-name="value" label-name="label" mode="single-column" @confirm="confirmCallYounger"></u-select>
	</view>
</template>

<script>
import lzButton from '@/components/common/button.vue';
import { baseURL2 } from '@/api/axios.js';
import { formatDate } from '../../components/zzx-calendar/generateDates.js'
import {parseTime} from '../../common/util.js'
export default {
	components: {
		lzButton
	},
	data() {
		return {
			params: {
				year: true,
				month: true,
				day: true,
			},
			date: '', //出生日期
			type: '', // type 0小猴子 1大猴子
			form: {
				icon: 'http://shop666.oss-cn-hangzhou.aliyuncs.com/2021-08/18/5451phpsQ3aT01629219018210818.png', //头像
				realName: '', //姓名
				nickname: '', //小名 (小猴子专用)
				wechatNumber: '', //微信号(大猴子专用)
				callElder: '', //称呼
				callYounger: '', //称呼小猴子
				birth_year: '', //出生年（小猴子）
				birthday: '', //出生日期
				age: '', //年龄
				mkType: '', //0:小猴子 1:大猴子
				familySmallId: '', //大猴子专用(关联小猴子id) 逗号隔开
				school: '', //小猴子专用 （学校）
				currentClass: '', //小猴子专用（几年级）
				idCard: '' ,//小猴纸身份证号
				  // "birthday": "2020-09-11T00:51:03.995Z",
				  // "callElder": "string",
				  // "callYounger": "string",
				  // "carId": "string",
				  // "currentClass": "string",
				  // "gender": 0,
				  // "icon": "string",
				  // "idCard": "string",
				  // "mkType": 0,
				  // "nickname": "string",
				  // "phone": "string",
				  // "realName": "string",
				  // "school": "string",
				  // "sourceType": 0
			},
			icon: 'http://shop666.oss-cn-hangzhou.aliyuncs.com/2021-08/18/5451phpsQ3aT01629219018210818.png', // 临时头像
			subordinate: '', // 关联猴子
			height: 30,
			bgColor: this.$u.color.bgColor,
			marginTop: 30,
			marginBottom: 30,
			show: false,
			selectShow: false,
			callYoungerShow: false,
			selectList: '',
			checkBox: '', // 选择猴子跳转
			is_edit: '',
			is_loading: false,
			callYoungerList: [
				{value: '儿子', label: '儿子'}, 
				{value: '女儿', label: '女儿'},
				{value: '孙子', label: '孙子'},
				{value: '孙女', label: '孙女'},
				{value: '外孙', label: '外孙'},
				{value: '外孙女', label: '外孙女'},
				{value: '弟弟', label: '弟弟'},
				{value: '妹妹', label: '妹妹'},
				{value: '侄子', label: '侄子'},
				{value: '侄女', label: '侄女'},
				{value: '学生', label: '学生'},
				{value: '其他', label: '其他'},
			],
		};
	},
	onLoad(option) {
		if (option.userinfo) {
			const userinfo = JSON.parse(option.userinfo)
			this.form.icon = userinfo.icon || 'http://shop666.oss-cn-hangzhou.aliyuncs.com/2021-08/18/5451phpsQ3aT01629219018210818.png';
			this.form.realName = userinfo.realName || '';
			this.form.nickname = userinfo.nickname || '';
			this.form.wechatNumber = userinfo.wechatNumber || '';
			this.form.callElder = userinfo.callElder || '';
			this.form.callYounger = userinfo.callYounger || '';
			this.form.birth_year = userinfo.birth_year || '';
			this.form.birthday = userinfo.birthday || '';
			this.form.birthday = this.parseTime(this.form.birthday, '{y}-{m}-{d}')
			this.form.age = userinfo.age || '';
			this.form.familySmallId = userinfo.familySmallId || '';
			this.form.school = userinfo.school || '';
			this.form.currentClass = userinfo.currentClass || '';
			this.form.idCard = userinfo.idCard || '';
			this.form.id = userinfo.id;
		}
		this.is_edit = option.is_edit;
		this.my_family_search();
		uni.$on('uAvatarCropper', path => {
			this.icon = path;
			this.form.icon = path;
		});

		this.form.mkType = Number.parseInt(option.type);
		this.checkBox = Number.parseInt(option.checkBox); // 1选择猴子跳转
	},
	computed:{
		maxdate(){
			let date = new Date().getFullYear()
			return date
		},
		age(){
			let nian = new Date().getFullYear()
			// nian - this.form.birthday.split("-").splice(0,1).join('')
			let birthday = new Date(this.form.birthday).getFullYear()
			let newnain = nian - birthday;
			if(newnain == nian)return 0;
			 return newnain
		}
	},
	methods: {
		parseTime,
		setDataTime(date) {
			this.form.birthday = `${date.year}-${date.month}-${date.day}`;
		},
		// 头像裁剪
		chooseAvatar() {
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
		onNumber(e) {
			e = Number(e);
			if (isNaN(e)) {
				setTimeout(() => {
					this.form.age = '';
				}, 0);
			}
			if (e <= 0) {
				setTimeout(() => {
					this.form.age = 0;
				}, 0);
			}
			if (e >= 100) {
				setTimeout(() => {
					this.form.age = 100;
				}, 0);
			}
		},
		// 获取大小猴子
		my_family_search() {
			this.$api.my_family_search().then(res => {
				this.parent = res.data[1];
				this.selectList = res.data[0];
				const selectedChild = this.selectList.find(item=>item.id == this.form.familySmallId) || {}
				this.subordinate = selectedChild.realName
			});
		},
		// 选择小猴子
		confirm(e) {
			this.form.familySmallId = e[0].value;
			this.subordinate = e[0].label;
		},
		confirmCallYounger(e) {
			this.form.callYounger = e[0].value;
		},
		onSubmit() {
			if (this.is_loading) {
				this.showToast('点击太快了～')
				return;
			}
			this.is_loading = true;
			setTimeout(e => {
				this.is_loading = false;
			}, 2000);
			// 可以在此上传到服务端
			if (!this.is_edit == 1) {
				if (this.icon == '') {
					this.showToast('请上传头像！')
					return;
				} else if (this.icon === 'http://shop666.oss-cn-hangzhou.aliyuncs.com/2021-08/18/5451phpsQ3aT01629219018210818.png') {
					this.add_family_search();
					return;
				}
				uni.uploadFile({
					url: baseURL2 + '/api/file/upload',
					filePath: this.icon,
					name: 'file',
					success: res => {
						const data = JSON.parse(res.data);
						if (data.status === 200) {
							this.form.icon = data.data;
							this.add_family_search();
						}
					},
					fail: err => {
						this.showToast(err.errMsg)
					}
				});
			} else {
				this.add_family_search();
			}
		},
		add_family_search() {
			this.form.age = this.age
			const birthday = formatDate(new Date(this.form.birthday), 'yyyy-MM-dd hh:mm:ss')
			const curRequest = this.is_edit ? this.$api.my_family_update : this.$api.my_family_add
			if (this.is_edit == 1) {
				if (this.form.birthday == '') {
					this.showToast('请输入出生日期!')
					return;
				}
				if (this.form.realName == '') {
					this.showToast('请输入名字!')
					return;
				}

				if (this.form.callElder == '' && this.form.callYounger == '') {
					this.showToast('请输入称呼!')
					return;
				}

				if (this.form.idCard == '' && this.form.mkType === 0) {
					this.showToast('请输入身份证号!')
					return;
				}

				if (this.form.age === '') {
					this.showToast('请输入年龄!')
					return;
				}
				curRequest({ ...this.form, id: this.form.id, birthday }).then(res => {
					if (res.status === 200) {
						this.showToast('编辑成功')
						setTimeout(e => {
							uni.navigateBack();
						}, 500);
					}
				});
				return;
			}
			// form: {
			// 	icon: '', //头像
			// 	name: '', //姓名

			// 	birthday: '', //出生日期
			// 	age: '', //年龄
			// 	mkType: '', //1:小猴子 2:大猴子
			// 	familySmallId: '', //大猴子专用(关联小猴子id) 逗号隔开
			// 	school: '', //小猴子专用 （学校）
			// 	currentClass: '', //小猴子专用（几年级）
			// 	idCard:'',//小猴纸身份证号
			// },
			if (this.form.realName == '') {
				this.showToast('请输入名称!')
				return;
			}
			if (this.form.callElder == '' && this.form.callYounger == '') {
				this.showToast('请输入称呼!')
				return;
			}
			if (this.form.birthday == '') {
				this.showToast('请输入出生日期!')
				return;
			}

			if (this.form.age === '') {
				this.showToast('请输入年龄!')
				return;
			}
			
			if (this.form.idCard == '' && this.form.mkType === 0) {
				this.showToast('请输入身份证号!')
				return;
			}
			curRequest({...this.form, birthday}).then(res => {
				if (res.status === 200) {
					this.showToast('添加成功');
					setTimeout(e => {
						uni.navigateBack();
					}, 500);
				}
			});
		},
		showToast(title) {
			uni.showToast({
				title,
				icon: 'none'
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.avatar_z {
	width: 200rpx;
	margin: 40rpx auto;
	text-align: center;

	.avatar_z_text {
		margin-top: 10rpx;
		font-size: 24rpx;
		color: #666666;
	}
}

.headImg {
	text-align: center;

	.img-title {
		margin: 20rpx 0 50rpx 0;
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 24rpx;
	}
}

.input {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 66rpx;
	// padding: 20rpx;
	box-sizing: border-box;
	background: #ffffff;
	border-radius: 44rpx;
	border: 2rpx solid #f0f0f0;

	margin-bottom: 20rpx;
}

.u-field {
	width: 100%;
}

.mb {
	margin-bottom: 120rpx;
}

.button {
	width: 100%;
	height: 54rpx;
	margin: auto;
	text-align: center;
	line-height: 54rpx;
	font-size: 32rpx;
	font-weight: 500;
	color: #ffffff;
}

.bj {
	position: relative;
	background: url(../../static/button.png);
	background-size: 100% 54rpx;
}
.cardTips {
	margin-left: 220rpx;
	text-align: left;
	color: #e03c3c;
}
</style>
