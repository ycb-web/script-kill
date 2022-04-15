/**
 * 数字保留对应精度
 * @param {number} num 待处理的数字
 * @param {number} precision 保留的小数位数  
 */
function numberPrecision(num, precision = 1) {
	return parseFloat(num.toFixed(precision));
}

function scanCode(){
	return new Promise((resolve, reject)=>{
		uni.scanCode({
			success: (res) => {
				console.log('条码类型：' + res.scanType);
				console.log('条码内容：' + res.result);
				const resultStr = res.result || {activeId: 1}
				const result = JSON.parse((resultStr))
				resolve(result)
			},
			fail: function(res) {
				uni.showToast({
					title: '扫码失败',
					icon: 'error'
				})
				reject({code: -1})
			}
		});
	})
}

function scanCodeUrl(){
	return new Promise((resolve, reject)=>{
		uni.scanCode({
			success: (res) => {
				console.log('条码类型：' + res.scanType);
				console.log('条码内容：' + res.result);
				const resultStr = res.result || ''
				const result = parseQueryString(resultStr)
				resolve(result)
			},
			fail: function(res) {
				uni.showToast({
					title: '扫码失败',
					icon: 'error'
				})
				reject({code: -1})
			}
		});
	})
}

function translateOptions(options, val) {
	const data = options.filter(item => {
		return item.value === val;
	});
	if (data && data[0]) {
		return data[0].label;
	} else {
		return "-";
	}
}

/**
 * @description 格式化时间
 * @param time
 * @param cFormat
 * @returns {string|null}
 */
function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
	if (date instanceof Date && isNaN(date.getTime())) {
		date = new Date(time.replace(/-/g, "/"));
	}
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  return format.replace(/{([ymdhisa])+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
}

function parseQueryString(url){
	const res = {}
    var str=url.split("?")[1],
    items=str.split("&");
    var arr,name,value;
    for(var i = 0, l = items.length; i < l; i++){
        arr=items[i].split("=");
        name= arr[0];
        value= arr[1];
        res[name]=value;
    }
	return res
}

// 解析小程序onload scene
function parseSceneStr(str){
	if(!str) return {}
	const res = {}
    const items = decodeURIComponent(str).split("&");
    var arr,name,value;
    for(var i = 0, l = items.length; i < l; i++){
        arr=items[i].split("=");
        name= arr[0];
        value= arr[1];
        res[name]=value;
    }
	return res
}

export {
	numberPrecision,
	translateOptions,
	parseTime,
	parseQueryString,
	parseSceneStr,
	scanCode,
	scanCodeUrl
}