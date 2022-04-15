import {baseURL2} from '@/api/axios.js'
export default  function upload(count=1) {
	const _this = this
	return new Promise((resolve, reject) => {
		
		uni.chooseImage({ // 图片上传
			count, //默认1
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			success:  function(res) {
				const tempFilePaths = res.tempFilePaths;
				console.log("本地",tempFilePaths)
				uni.showLoading({
					title: '上传中...'
				})
			    tempFilePaths.forEach(item=>{
					 uni.uploadFile({
						url: baseURL2 + '/api/file/upload', // 后端api接口
						filePath: item, // uni.chooseImage函数调用后获取的本地文件路劲
						name: 'file', //后端通过'file'获取上传的文件对象
						header: {
							Authorization: uni.getStorageSync('token') || ''
						},
						success:(res) => {
							console.log("图片路径",JSON.parse(res.data))
							let data = JSON.parse(res.data);
							console.log(data)
							if (data.status == 200) {
								// _this.imgList.push(data.data)
								uni.hideLoading()
								resolve(data.data);
								// return 
							} else {
								console.log("错误",data);
								reject(data)
								uni.showToast({
									icon:'none',
									title:data.error,
								})
							}
						},
						fail:()=> {
							uni.hideLoading()
						}
					});
				})
			}
		});
	})
}
