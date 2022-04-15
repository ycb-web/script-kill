import {
	baseURL2
} from '@/api//axios.js'
export default function upload(count = 1) {
	const _this = this
	return new Promise((resolve, reject) => {

		uni.chooseVideo({
			count: 1,
			sourceType: ['camera', 'album'],
			success: function(res) {
				console.log("选择视频成功", res)
				uni.uploadFile({
					url: baseURL2 + '/api/file/upload', // 后端api接口
					filePath: res.tempFilePath,
					name: 'file',
					header: {
						Authorization: uni.getStorageSync('token') || ''
					},
					success: (uploadFileRes) => {
						let bold = JSON.parse(uploadFileRes.data);
						bold.photoSrc = res.thumbTempFilePath;
						if (bold.status == 200) {
							// _this.imgList.push(data.data)
							uni.hideLoading()
							resolve(bold);
							// return 
						} else {
							console.log("错误",bold);
							reject(bold)
							uni.showToast({
								icon:'none',
								title:bold.error,
							})
						}
					},

				});
			}
		});
	})
}
