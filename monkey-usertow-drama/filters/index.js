const filter = {
	// 手机号****
	mobile(val) {
		try {
			const num1 = val.substr(0, 3)
			const num2 = val.substr(7, 11)
			return num1 + '****' + num2
		} catch (e) {
			return ''
		}
	},
	// 时间戳转时间
	formatTimes(time) {
		if (time == "" || !time) {
			return ""
		}
		time *= 1000
		let date = new Date(time)
		let year = date.getFullYear();
		let month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
		let day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
		let hour = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
		let minute = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
		let secouds = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
		return year.toString() + "-" + month.toString() + "-" + day.toString()
		// return {
		// 	year,
		// 	month,
		// 	day,
		// 	hour,
		// 	minute,
		// 	secouds,
		// 	formatTime: year.toString() + "-" + month.toString() + "-" + day.toString()
		// }
	},
	orderStatus(status) {
		switch (status) {
			case 1:
				return "待付款";
				break;
			case 2:
				return "待使用";
				break;
			case 3:
				return "待评价";
				break;
			case 4:
				return "已完成";
				break;
			case 6:
				return "已取消";
				break;
			case 7:
				return "已超时";
				break;
			default:
				return "";
				break;
		}
	}
}

export default filter
