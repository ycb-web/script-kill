import {
	request,
	baseURL,
	baseURL2,
	baseURL3,
} from './axios.js'

export default {

	// 获取悬浮窗消息
	fetch_pop_msg(params) {
		return request.get(baseURL2 + '/api/customer/message/getMessage', {
			params
		})
	},

	get_code() {
		return new Promise(resolve => wx.login({
			success({
				code
			}) {
				console.log('api wx.login getCode', code)
				resolve(code)
			},
		}))
	},
	log_save(data) {
		return request.post(baseURL2 + '/api/log/save', data)
	},
	// 微信授权
	// wechat_login(params) {
	// 	return request.post(baseURL + '/api/wechat_login', params)
	// },
	wechat_login(params) {
		return request.post(baseURL2 + '/api/user/wx/login', params)
	},
	// 微信新用户手机号注册登录
	wechat_phone(params) {
		return request.post(baseURL2 + '/api/user/wx/binding/phone', params)
	},
	// 通过appId获取当前的商户信息
	get_store_info(appId) {
		return request.get(baseURL2 + `/api/mer/get/app/${appId}`)
	},
	// 微信解析用户信息
	wechat_analysi(params) {
		return request.get(baseURL + '/api/wechat_analysi', {
			params
		})
	},
	// 将店铺与当前用户进行关联（账户绑定手机后）
	connect_store(params) {
		return request.post(baseURL2 + '/api/mer/connect', params)
	},
	// 微信账号注册
	wechat_register(params) {
		return request.post(baseURL + '/api/wechat_register', params)
	},
	// 获取用户信息
	get_user_info() {
		return request.get(baseURL2 + '/api/user/info')
	},
	// 修改用户信息
	// POST
	// /api/user/modify
	// 更新用户信息
	edit_user_info(params) {
		return request.post(baseURL2 + '/api/user/modify', params)
	},
	// 购买优惠券包
	buy_coupon(params) {
		return request.post(baseURL2 + '/api/coupon/package/submitOrder', params)
	},
	// 优惠券包列表
	coupon_packages(params) {
		return request.get(baseURL2 + '/api/coupon/package/listPage', {
			params
		})
	},
	// 优惠券包页面信息
	coupon_page_info(params) {
		return request.get(baseURL2 + '/api/coupon/package/userCouponInfo', {
			params
		})
	},
	// 优惠券包信息
	// packageId
	coupon_bag_info(params) {
		return request.get(baseURL2 + '/api/coupon/package/info', {
			params
		})
	},

	// 获取我的优惠劵
	// GET
	// /customer/coupon/getMyList{?isExpire,rows,start}
	// 优惠券列表（我的所有）
	get_my_coupons(params) {
		return request.get(baseURL2 + '/customer/coupon/getMyList', {
			params
		})
	},
	get_coupon_product(params) {
		return request.get(baseURL2 + '/customer/getProductByCouid', {
			params
		})
	},
	// 获取我的大小猴子
	my_family_search() {
		return request.get(baseURL2 + '/api/family/all')
	},
	// 新增我的大小猴子
	add_family_search(params) {
		return request.post(baseURL2 + '/api/my_family_add', params)
	},
	// 分销信息
	get_promotion_info(merchantId) {
		return request.get(baseURL3 + `/api/distributor/getAccount?merchantId=${merchantId}`)
	},
	// 账户信息
	get_user_account(merchantId) {
		return request.get(baseURL3 + `/api/distributor/getInfo?merchantId=${merchantId}`)
	},
	// 申请成为分销员
	// /api/distributor/application/distributor{?merchantId}
	postBeDistributor(merchantId) {
		return request.post(baseURL3 + `/api/distributor/application/distributor?merchantId=${merchantId}`)
	},
	// 拼团列表
	spell_group_list(params) {
		return request.get(baseURL + '/api/get_spell_group_list', {
			params
		})
	},
	// 获取商品详情
	get_product_info(params) {
		return request.get(baseURL2 + '/customer/product/getDetail', {
			params
		})
	},
	// 获取商品的全部规格列表
	get_product_sku_customer(params) {
		return request.get(baseURL2 + '/customer/sku/getList', {
			params
		})
	},
	// 获取收货地址列表
	get_Address_info(params) {
		return request.get(baseURL + '/api/shop_user_address_list', {
			params
		})
	},
	//添加地址
	add_Address_info(params) {
		return request.post(baseURL + '/api/shop_user_address_add', params)
	},
	//删除地址
	det_Address_info(params) {
		return request.post(baseURL + '/api/shop_user_address_delete', params)
	},
	//地址详情
	get_Address_Det(params) {
		return request.get(baseURL + '/api/shop_user_address_info', {
			params
		})
	},
	//修改地址
	edit_Address_Det(params) {
		return request.post(baseURL + '/api/shop_user_address_update', params)
	},
	//意见反馈
	add_feedback(params) {
		return request.post(baseURL + '/api/add_feedback', params)
	},
	//获取城市列表
	get_city_list() {
		return request.get(baseURL + '/api/get_city_list')
	},
	//首页轮播
	home_banner(data) {
		return request.post(baseURL2 + '/api/banners/queryBanners', data)
	},
	//猴子活动列表
	get_mix_monkey_active(params) {
		return request.get(baseURL + '/api/get_mix_monkey_active', {
			params
		})
	},
	// 开始下单
	// POST
	// /customer/order/submit
	// 提交订单，返回支付流水号
	submit_pay_order(params) {
		return request.post(baseURL2 + '/customer/order/submit', params)
	},
	// 获取导航栏
	// GET
	// /customer/category/getList{?merchantId}
	// 获取店铺商品分类-找活动
	get_nav_category_list(params) {
		return request.get(baseURL2 + '/customer/category/getList', {
			params
		})
	},
	// GET
	// /customer/category/getHomeList{?merchantId}
	// 首页店铺商品二级分类-首页
	category_getHomeList(params) {
		return request.get(baseURL2 + '/customer/category/getHomeList', {
			params
		})
	},
	// 获取产品列表(首页活动)
	get_product_list(params) {
		return request.get(baseURL2 + '/customer/product/getList', {
			params
		})
		// return request.get(baseURL + '/api/get_product_list', {
		// 	params
		// })
	},
	// 搜索产品列表(首页)
	get_search_product_list(params) {
		return request.get(baseURL2 + '/customer/product/search', {
			params
		})
	},
	// 精选评价
	get_evalutae_selected(params) {
		return request.get(baseURL + '/api/get_evalutae_selected', {
			params
		})
	},
	// 获取秒杀时间段列表
	get_seconds_kill_time_list(params) {
		return request.get(baseURL + '/api/get_seconds_kill_time_list', {
			params
		})
	},
	// 获取秒杀产品列表
	get_seconds_kill_product_list(params) {
		return request.get(baseURL + '/api/get_seconds_kill_product_list', {
			params
		})
	},
	//获取商品对应的评价
	get_evalutae(params) {
		return request.get(baseURL + '/api/get_evalutae', {
			params
		})
	},
	//商品可用优惠券活动列表
	getCouponsInProductDetail(params) {
		return request.get(baseURL2 + '/customer/coupon/getToUseList', {
			params
		})
	},
	//首页优惠券列表/api/
	get_not_received_coupons(params) {
		return request.get(baseURL2 + '/customer/coupon/getMerchantCouponList', {
			params
		})
	},
	//获取活动圈分类
	circle_type(params) {
		return request.get(baseURL + '/api/circle_type', {
			params
		})
	},
	//获取活动圈
	circle_list(params) {
		return request.get(baseURL + '/api/circle_list', {
			params
		})
	},
	//发布活动圈
	add_article(params) {
		return request.post(baseURL + '/api/add_article', {
			...params
		})
	},
	//获取推荐的活动圈的列表
	circle_recommend(params) {
		return request.get(baseURL + '/api/circle_recommend', {
			params
		})
	},
	//获取用户的昵称简介和点赞数
	circle_family_info(params) {
		return request.get(baseURL + '/api/circle_family_info', {
			params
		})
	},
	//获取动态详情
	get_circle_article(params) {
		return request.get(baseURL + '/api/get_circle_article', {
			params
		})
	},
	//获取动态评论
	get_comment(params) {
		return request.get(baseURL + '/api/get_comment', {
			params
		})
	},
	//获取家庭动态列表
	circle_family_article(params) {
		return request.get(baseURL + '/api/circle_family_article', {
			params
		})
	},
	//获取家庭发布动态的时间
	circle_article_date(params) {
		return request.get(baseURL + '/api/circle_article_date', {
			params
		})
	},
	//获取家庭发布动态的时间
	my_picture(params) {
		return request.get(baseURL + '/api/my_picture', {
			params
		})
	},
	//获取家庭成员
	circle_my_family(params) {
		return request.get(baseURL + '/api/circle_my_family', {
			params
		})
	},
	invite_family(params) {
		return request.get(baseURL2 + '/api/family/invite/code', {
			params
		})
	},
	// 使用邀请秘钥
	// /api/family/join{?邀请秘钥}
	join_family(params) {
		return request.get(baseURL2 + '/api/family/join', {
			params
		})
	},
	//获取我的好友
	my_flow(params) {
		return request.get(baseURL + '/api/my_flow', {
			params
		})
	},
	//获取我的点赞
	my_like(params) {
		return request.get(baseURL + '/api/my_like', {
			params
		})
	},
	//获取我的评论
	my_comment(params) {
		return request.get(baseURL + '/api/my_comment', {
			params
		})
	},
	//获取某个活动圈的列表
	circle_article_list(params) {
		return request.get(baseURL + '/api/circle_article_list', {
			params
		})
	},
	//更新个人资料
	edit_profile(params) {
		return request.post(baseURL + '/api/edit_profile', {
			...params
		})
	},
	//更新家庭圈的背景
	upload_back_img(params) {
		return request.post(baseURL + '/api/upload_back_img', {
			...params
		})
	},
	//关注
	add_fans(params) {
		return request.post(baseURL + '/api/behavior_fans', {
			...params
		})
	},
	//点赞
	spot_like(params) {
		return request.post(baseURL + '/api/spot_like', {
			...params
		})
	},
	// 添加评论
	add_comment(params) {
		return request.post(baseURL + '/api/add_comment', {
			...params
		})
	},
	//获取购物车数据
	get_product_cart_list(params) {
		return request.get(baseURL + '/api/get_product_cart_list')
	},
	//购物车数量加减/api/update_cart_number
	update_cart_number(params) {
		return request.post(baseURL + '/api/update_cart_number', params)
	},
	//删除购物车商品/api/empty_product_cart
	empty_product_cart(params) {
		return request.post(baseURL + '/api/empty_product_cart', params)
	},
	//首页优惠券领取/api/manual_coupon_collection
	// GET
	// /customer/coupon/receive{?couponId}
	// 优惠券领取(用户)
	manual_coupon_collection(data) {
		return request.post(baseURL2 + '/customer/coupon/receive', data)
	},
	// 获取商品拼团用户列表
	get_product_spell_list(params) {
		return request.get(baseURL + '/api/get_product_spell_list', {
			params
		})
	},
	// 加入购物车
	add_product_cart(params) {
		return request.post(baseURL + '/api/add_product_cart', params)
	},
	//获取会员吗列表
	get_member_code_list(params) {
		return request.get(baseURL + '/api/get_member_code_list', {
			params
		})
	},
	//获取小猴子为使用的活动
	get_mix_monkey_activity(params) {
		return request.get(baseURL + '/api/get_mix_monkey_activity', {
			params
		})
	},
	//获取当前商品可用优惠券/api/get_product_details_coupons_list
	// GET
	// /customer/coupon/getToUseList{?merchantId,productId}
	// 优惠券列表（购买时商品可使用）
	get_product_details_coupons_list(params) {
		return request.get(baseURL2 + '/customer/coupon/getToUseList', {
			params
		})
	},
	// GET
	// /customer/coupon/getDiscountPrice{?couponId,totalPrice}
	// 优惠券减免金额（购买时）
	get_discount_price(params) {
		return request.get(baseURL2 + '/customer/coupon/getDiscountPrice', {
			params
		})
	},
	//获取个人中心拼团列表/api/get_spell_order_list
	get_spell_order_list(params) {
		return request.get(baseURL + '/api/get_spell_order_list', {
			params
		})
	},
	//获取分销收益详情
	get_profit(params) {
		return request.get(baseURL3 + '/api/distributor/account/listPage', {
			params
		})
	},
	//获取分销用户
	get_profit_ser(params) {
		return request.get(baseURL3 + '/api/distributor/getInfo?merchantId=' + uni.getStorageSync('merchantId'))
	},
	// 获取用户申请提现列表
	get_withdrawal_list(params) {
		return request.get(baseURL3 + '/api/distributor/withdrawalApplication/listPage', {
			params
		})
	},
	// 用户申请提现
	add_withdrawal(withdrawalAmount, code) {
		return request.post(baseURL3 +
			`/api/distributor/apply/withdrawal?withdrawalAmount=${withdrawalAmount}&code=${code}`, {

			})
	},
	//获取个人中心拼团详情/api/get_spell_order_info
	get_spell_order_info(params) {
		return request.get(baseURL + '/api/get_spell_order_info', {
			params
		})
	},
	//获取订单列表/api/get_order_list
	// GET
	// /customer/order/getList{?merchantId,rows,start,status}
	// 订单列表
	get_order_list(params) {
		return request.get(baseURL2 + '/customer/order/getList', {
			params
		})
	},
	//获取我的活动
	my_activity(params) {
		return request.get(baseURL2 + '/customer/order/getList', {
			params
		})
	},
	//获取其他活动
	other_activity(params) {
		return request.get(baseURL + '/api/other_activity', {
			params
		})
	},
	//获取订单详情/api/get_order_detail
	// GET
	// /customer/order/getDetail{?orderNo}
	// 订单详情页
	get_order_detail(params) {
		return request.get(baseURL2 + '/customer/order/getDetail', {
			params
		})
	},
	// 开始支付
	// POST
	// /api/wechat/pay/do/createOrder
	// 创建预支付订单
	submit_pay(params) {
		return request.post(baseURL2 + '/api/wechat/pay/do/createOrder', params)
	},
	// 取消订单
	cancel_order(params) {
		return request.get(baseURL2 + '/customer/order/cancel?orderNo=' + params.id, params)
	},
	// 拼团改变状态
	upd_spell_count_down_status(params) {
		return request.post(baseURL + '/api/upd_spell_count_down_status', params)
	},
	// 热词
	get_hot_word_search_list(params) {
		return request.get(baseURL + '/api/get_hot_word_search_list', params)
	},
	// 秒杀改变状态
	upd_seconds_kill_status(params) {
		return request.post(baseURL + '/api/upd_seconds_kill_status', params)
	},
	// 口令红包
	// GET
	// /customer/coupon/receive{?couponId}
	// 优惠券领取(用户)
	password_exchange_coupon(params) {
		return request.get(baseURL2 + '/customer/coupon/receive', {
			params
		})
	},
	//确认收货/api/user_confirm_the_goods
	user_confirm_the_goods(params) {
		return request.post(baseURL + '/api/user_confirm_the_goods', params)
	},
	//添加评价/api/add_evalutae
	add_evalutae(params) {
		return request.post(baseURL + '/api/add_evalutae', params)
	},
	// 基本信息（提升档案，小猴子）
	dimensional_info() {
		return request.get(baseURL + '/api/dimensional_info')
	},
	// 六维18能得分
	get_score(params) {
		return request.get(baseURL + '/api/get_score', {
			params
		})
	},
	// 六维18能得分
	dimensional_statistics(params) {
		return request.get(baseURL + '/api/dimensional_statistics', {
			params
		})
	},
	// 获取参加的活动
	dimensional_activity(params) {
		return request.get(baseURL + '/api/dimensional_activity', {
			params
		})
	},
	// 编辑大猴小猴
	// POST
	// /api/family/add
	// 添加大猴或小猴
	my_family_add(params) {
		return request.post(baseURL2 + '/api/family/add', {
			...params
		})
		// 分享所需参数
	},
	// POST
	// /api/family/modify
	// 修改家庭成员信息
	my_family_update(params) {
		return request.post(baseURL2 + '/api/family/modify', {
			...params
		})
		// 分享所需参数
	},
	share_score(params) {
		return request.get(baseURL + '/api/share_score', {
			params
		})
	},
	//获取自动获取优惠券列表借口
	user_give_coupons(params) {
		return request.post(baseURL + '/api/user_give_coupons', params)
	},
	//获取分享礼包详情get_coupons_git_list
	get_coupons_git_list(params) {
		return request.get(baseURL + '/api/get_coupons_git_list', {
			params
		})
	},
	//获取分享优惠券详情get_coupons_details
	get_coupons_details(params) {
		return request.get(baseURL + '/api/get_coupons_details', {
			params
		})
	},
	//领取优惠券领教分享/api/receive_coupons_vesige_share
	receive_coupons_vesige_share(params) {
		return request.post(baseURL + '/api/receive_coupons_vesige_share', params)
	},
	//领取优惠券礼包领教分享/api/receive_coupons_git_vesige_share
	receive_coupons_git_vesige_share(params) {
		return request.post(baseURL + '/api/receive_coupons_git_vesige_share', params)
	},
	//大猴子关联user表
	max_monkey_relation(params) {
		return request.post(baseURL + '/api/max_monkey_relation', params)
	},
	// 获取 邀请者头像和名称
	get_code_user_info(params) {
		return request.get(baseURL + '/api/get_code_user_info', {
			params
		})
	},
	// 获取 关注动态
	circle_article_flow(params) {
		return request.get(baseURL + '/api/circle_article_flow', {
			params
		})
	},
	// 获取 点评
	get_evaluate(params) {
		return request.get(baseURL + '/api/get_evaluate', {
			params
		})
	},
	// 获取发布按钮状态
	get_status(params) {
		return request.get(baseURL + '/api/get_status', {
			params
		})
	},
	// 商品收藏
	merchandise_collection(params) {
		return request.get(baseURL2 + '/api/product/collection/do/collect', {
			params
		})
	},
	// 获取我的收藏
	// GET
	// /api/product/collection/product/list{?rows,start}
	// 获取收藏的商品列表
	get_user_product_collection(params) {
		return request.get(baseURL2 + '/api/product/collection/product/list', {
			params
		})
	},
	// 获取企业二维码
	get_service_qr_code(params) {
		return request.get(baseURL + '/api/get_service_qr_code', {
			params
		})
	},
	// 邀请记录
	get_intvitation_log(params) {
		return request.post(baseURL2 + '/api/user/queryinvite', {}, {
			params
		})
	},
	// 获取邀请好友二维码
	// GET
	// /api/user/invite/friend{?merchantId}
	// 邀请好友加入店铺
	user_qr_code(params) {
		return request.get(baseURL2 + '/api/user/invite/friend', {
			params
		})
	},
	// 获取 商品分享时的二维码
	// GET
	// /customer/getInviteProductCode{?productId}
	// 获取当前登录用户的商品的推广二维码
	generate_goods_code(params) {
		return request.get(baseURL2 + '/customer/getInviteProductCode', {
			params
		})
	},
	// 获取商品的分销佣金
	get_money(params) {
		return request.get(baseURL + '/api/get_money', {
			params
		})
	},
	// 获取订单过期时间
	get_config(params) {
		return request.get(baseURL + '/api/get_config', {
			params
		})
	},
	order_expire_change_status(params) {
		return request.post(baseURL + '/api/order_expire_change_status', {
			...params
		})
	},
	// 获取活动专题页数据
	activity_topic(params) {
		return request.get(baseURL + '/api/activity_topic', {
			params
		})
	},
	// 获取活动专题页数据
	coupons_details(params) {
		return request.get(baseURL + '/api/coupons_details', {
			params
		})
	},
	// 已成团活动的查
	query_product_as_done(city_id) {
		return request.post(`${baseURL2}/api/product/groupactivity/selectCustomer?city=${city_id || 0}`)
	},
	// 查询首页数据
	query_homepage_data(data) {
		return request.post(
			`${baseURL2}/api/homepage/homepagedatasqa?userId=${data.userId}&channel=${data.channel}&region=${data.region}`
			)
	},
	// 查询定制图片
	query_commission_img(linkUrl, region) {
		return request.post(`${baseURL2}/api/mer/customized/query?category=cus`, {
			mkCustomized: {
				linkUrl,
				category: "cus",
				region
			},
			MerchantIds: [0]
		});
	},
	getHotSearchData() {
		return request.post(`${baseURL2}/api/hotword/query?channel=mk`, {
			channel: 'monkey'
		})
	},
	getBannerImage(data) {
		return request.post(`${baseURL2}/api/mer/mkcanners/select`, data)
	},
	getAlbumList(params) {
		return request.get(baseURL3 + '/api/figure/bed/diary/listPage', {
			params
		})
	},
	getCurrentViewChild(params) {
		return request.get(baseURL3 + '/api/family/queryfamily', {
			params
		})
	},
	// DM确认队长
	addActiveTeamLeader(params) {
		return request.get(baseURL3 + '/api/drama/activeteam/addleader', {
			params
		})
	},
	// 查询活动开启状态团队列表
	getActiveTeamList(params) {
		return request.get(baseURL3 + '/api/drama/activeteam/teamList', {
			params
		})
	},
	addActiveRole(params) {
		return request.get(baseURL3 + '/api/drama/activeteam/addrole', {
			params
		})
	},
	getActiveRoleList(params) {
		return request.get(`${baseURL3}/api/drama/activeteam/roleList`, {
			params
		})
	},
	getIsUserRoleBind(params) {
		return request.get(`${baseURL3}/api/drama/activerole/isbind`, {
			params
		})
	},
	getIsTeamLeaderBind(params) {
		return request.get(`${baseURL3}/api/drama/activeteam/leaderStatus`, {
			params
		})
	},
	getRoleIndexInfo(params) {
		return request.get(`${baseURL3}/api/drama/activerole/active/roleindex`, {
			params
		})
	},
	getUserPlayingActive(params) {
		return request.get(`${baseURL3}/api/drama/activerole/active`, {
			params
		})
	},
	getRankingAll(params) {
		return request.get(`${baseURL3}/api/drama/activerole/ranking/all`, {
			params
		})
	},
	getRankingTeam(params) {
		return request.get(`${baseURL3}/api/drama/activeteam/ranking/team`, {
			params
		})
	},
	getRankingTeamRole(params) {
		return request.get(`${baseURL3}/api/drama/activerole/ranking/teamrole`, {
			params
		})
	},
	getDramaClues(params) {
		return request.get(`${baseURL3}/api/drama/pack/clueList`, {
			params
		})
	},
	getTaskDetail(id, activityId) {
		return request.get(`${baseURL3}/api/drama/task/${id}?activityId=${activityId}`)
	},
	getTaskActivity(params) {
		return request.get(`${baseURL3}/api/drama/task/activity`, {
			params
		})
	},
	submitTask(data) {
		return request.post(`${baseURL2}/api/drama/task/subject`, data)
	},
	getPointList(params) {
		return request.get(`${baseURL3}/api/drama/point/activity`, {
			params
		})
	},
	getPointDetail(params) {
		return request.get(`${baseURL3}/api/drama/point/${params.pointId}`, {
			params
		})
	},
	submitPoint(data) {
		return request.post(`${baseURL2}/api/drama/point`, data)
	},
	acceptMarry(data) {
		return request.post(`${baseURL2}/api/drama/marry/${data.activityId}?applyId=${data.applyId}`, data)
	},
	getMarryInfo(params) {
		// return request.get(`${baseURL3}/api/drama/marry/${params.activityId}`, {params})
		return request.get(`${baseURL3}/api/drama/marry/${params.activityId}`)
	},

	// 
	getTeamMessage(params) {
		return request.get(`${baseURL3}/api/drama/team/message/`, {
			params
		})
	},

}
