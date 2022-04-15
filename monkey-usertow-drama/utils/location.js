export default function getLocation(success, fail) {
	uni.getLocation({
		type: 'wgs84',
		success: function(res) {
			uni.request({
				header: {
					'Content-Type': 'application/json'
				},
				url: `https://restapi.amap.com/v3/geocode/regeo?output=json&location=${res.longitude},${res.latitude}&key=35bb6bfad409069d4944ebdbe7876919&radius=1000&extensions=all`,
				success: res => {
					let city;
					if (res.data.regeocode.addressComponent.city.length) {
						city = res.data.regeocode.addressComponent.city;
					} else {
						city = res.data.regeocode.addressComponent.province
					}
					uni.setStorageSync('cityPosition', city);
					const merchantId = city == '昆明市' ? 43 : 42
					// uni.setStorageSync('merchantId', merchantId)
					console.log('位置查找成功：', res, city, merchantId)
					success && success({city})
				},
				fail: err => {
					console.log('位置查找失败：', err)
					fail && fail()
				}
			});
		},
		fail(e) {
			console.log('位置授权失败：', e)
			fail && fail()
		}
	});
}