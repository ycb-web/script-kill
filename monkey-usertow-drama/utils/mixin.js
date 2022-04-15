import {
	baseURL2
} from '../api/axios.js'
let mixin = {
	UploadPictures(mg_list){
		const url = `${baseURL2}/`
		return new Promise((resolve) => {
			if(mg_list.length==0){
				resolve([])
			}
			let images = []
			mg_list.forEach(v => {
				uni.uploadFile({
					url: url + '/api/file/upload',
					filePath: v,
					method: 'post',
					name: 'file',
					success: (ress) => {
						let data = JSON.parse(ress.data).data
						images.push(data)
						if (images.length == mg_list.length) {
							resolve(images)
						}
					},
					fail(err) {
						console.log(err);
					}
				})
			})
		})
	}
}
export default mixin;