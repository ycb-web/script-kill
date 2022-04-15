<template>
	<view class="pop-tip">
			<view class="pop-wrap" @click="jump" v-if='isShowPopTip'>
				<view class="title">
					{{msgInfo.title}}
					<text class="time" v-if='timeLast'>{{timeLast | formatSeconds}}</text>
				</view>
				<u-notice-bar
					v-if="msgInfo.content" :font-size='24'
					mode="horizontal" padding="0" bg-color="transparent" color="#fff"
					:volume-icon="false" :more-icon="false" :close-icon="false" 
					:list="[msgInfo.content]" :speed="100"
					class='pop-bar'
				></u-notice-bar>
			</view>
			<image class="monkey" :src="gif"></image>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	const defaultGif = 'https://monkeyoss-prod.oss-cn-hangzhou.aliyuncs.com/dongtu/%E9%80%9A%E7%94%A8.gif'
	export default {
		name:"popTip",
		data() {
			return {
				timer: null,
			};
		},
		mounted() {
			if(this.timer){
				clearInterval(this.timer)
			}
			// this.getMsg()
		},
		onShow(){
		},
		beforeDestroy(){
			this.setShowPopTip(false)
			clearInterval(this.timer)
		},
		computed: {
			...mapState(['isShowPopTip', 'msgInfo', 'timeLast']),
			gif(){
				return this.isShowPopTip ? this.msgInfo.gifUrl : defaultGif
			}
		},
		methods:{
			...mapMutations(['setShowPopTip', 'setMsgInfo', 'setTimeLast']),
			startCounting(){
				if(this.timer){
					clearInterval(this.timer)
				}
				this.timer = setInterval(()=>{
					if(this.timeLast<=0) {
						clearInterval(this.timer)
						return
					}
					this.setTimeLast(this.timeLast - 1000)
				}, 1000)
			},
			getMsg(){
				const mid = uni.getStorageSync('merchantId')
				this.$api.fetch_pop_msg({type:1,merchantId:mid}).then(res=>{
					// res.status = 200
					if(res.status != 200) return 
					const data = res.data[0] || {}
					this.setMsgInfo(data)
					if(this.msgInfo.id) this.setShowPopTip(true)
					const timeLast = new Date(data.expiredTime) - new Date()
					this.setTimeLast(Math.max(0, timeLast))
					if(this.timeLast > 0){
						this.startCounting()
					}
				})
			},
			jump(){
				this.setShowPopTip(false)
				if(this.msgInfo.clickSendRequest){
					this.$api.setMsgRead({id: this.msgInfo.id})
				}
				if(this.msgInfo.jumpPage){
					clearInterval(this.timer)
					uni.navigateTo({
						url: this.msgInfo.jumpPage
					})
				}
			}
		}

	}
</script>

<style lang="scss" scoped>
.pop-tip{
	position: fixed;
	right: 0;
	bottom: 20px;
	z-index: 9;
	display: flex;
	flex-direction: row;
	
	.pop-wrap{
		width: 120px;
		height: 40px;
		background-image: url(pop.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		overflow: hidden;
		color: #fff;
		font-size: 10px;
		padding: 6px;
		padding-left: 10px;
		.title{
			.time{
				font-size: 12px;
			}
		}
		.content{
			word-break: keep-all;
			white-space: nowrap;
		}
	}
	.monkey{
		height: 47px;
		width: 47px;
	}
}
</style>
