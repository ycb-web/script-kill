import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		// 订单支付
		orederPay: {
			coupons_id: '', // 优惠券ID
			type: '', // 活动类型1:秒杀2:拼团3:无活动
			product_id: '', // 规格产品ID（商品详情下单时必传）
			parent_product_id: '', // 主产品ID（商品详情时必传）
			pay_type: '1', // 支付方式:1：微信2：支付宝
			product_type: '', // 商品类型：1:活动2:实物3:门票（购物车下单时默认为2）
			order_type: '', // 订单类型：1：商品详情下单2:购物车下单
			number: '', // 下单数量（商品详情下单时必传）
			cart_id_string: '', // 购物车ID逗号拼接，商品详情时必传
			remark: '', // 买家留言
			minor_ids: '', // 未成年人ID，逗号拼接（活动订单必传）
			adult_ids: '', // 成年人ID，逗号拼接（活动订单必传）
			contact_mobile: '', // 联系人电话（活动订单必传）
			contact_name: '', // 联系人名称（活动订单必传）
			province_id: '', // 省ID（实物商品必传）
			city_id: '', // 市ID（实物商品必传）
			area_id: '', // 区ID（实物商品必传）
			location: '' ,// 具体地址（实物商品必传
			supplement_time: '' ,// 时间
			group_id:'', // 拼团id
			activity_id:'', //一般活动，秒杀和拼团必传
		},
		// 商品详情
		goodsInfo:{},
		// 选择的猴子
		monkey:{
			minor: [],
			adult: [],
		},
		// 选择的地址
		address:'',
		
		//选择活动圈的数据
		ActivityCircle:[],
		user_info:{
			
		},
		currentViewChild: {},
		currDetail:{}
	},
	mutations: {
		// 删除所有的圈子
		AllDelActivityCircle(state,data){
			state.ActivityCircle = data
		},
		// 删除活动圈的数据
		delActivityCircle(state,index){
			console.log(index)
			state.ActivityCircle.splice(index,1)
		},
		// 选择活动圈的数据
		setActivityCircle(state,ActivityCircleitem){
			state.ActivityCircle.push(ActivityCircleitem)
		},
		// 缓存弹窗数据
		setMsgInfo(state, data){
			state.msgInfo = data || {}
		},
		// 订单支付
		setOrederPay(state, pay){
			state.orederPay = {...state.orederPay,...pay}
			console.log(state.orederPay,'1---------', pay);
		},
		// 订单详情
		setGoodsInfo(state, goodsInfo){
			state.goodsInfo = {...state.goodsInfo,...goodsInfo}
			console.log(state.goodsInfo,"----------------------state.goodsInfo")
		},
		// 写猴子
		setMonkey(state, monkey){
			state.monkey = {...state.monkey,...monkey}
			console.log(state.monkey,'state.monkeystate.monkeystate.monkey');
		},
		// 写地址
		setAddress(state, address){
			state.address = {...state.address,...address}
		},
		setCurrentViewChild(state, obj){
			state.currentViewChild = {...state.currentViewChild,...obj}
		},
		setCurrDetail(state, obj){
			state.currDetail = {...state.currDetail,...obj}
		}
	},
	actions: {

	},
})
export default store
