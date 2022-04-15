<template>
	<view class="uni-load-more">
		<view class="uni-load-more__img" v-show="status === 'loading' && showIcon">
	<!-- 		<view class="load1">
				<view :style="{background:color}"></view>
				<view :style="{background:color}"></view>
				<view :style="{background:color}"></view>
				<view :style="{background:color}"></view>
			</view>
			<view class="load2">
				<view :style="{background:color}"></view>
				<view :style="{background:color}"></view>
				<view :style="{background:color}"></view>
				<view :style="{background:color}"></view>
			</view>
			<view class="load3">
				<view :style="{background:color}"></view>
				<view :style="{background:color}"></view>
				<view :style="{background:color}"></view>
				<view :style="{background:color}"></view>
			</view> -->
			
			<view class="mix-loading-icon">
				<block v-if="icon=='cat'">
					<image src="https://shop666.oss-cn-hangzhou.aliyuncs.com/front/dongtai.gif" mode="widthFix"></image>
				</block>	
				<block v-else>
					<image src="https://shop666.oss-cn-hangzhou.aliyuncs.com/front/dongtai.gif" mode="widthFix"></image>
				</block>
				
			</view>
			
		</view>
		<text class="uni-load-more__text" :style="{color:color}">
		{{status === 'more' ? contentText.contentdown : (status === 'loading' ? contentText.contentrefresh : contentText.contentnomore)}}</text>
	</view>
</template>

<script>
	export default {
		name: "uni-load-more",
		props: {
			status: {
				//上拉的状态：more  -loading前；loading    -loading中；noMore   -没有更多了
				type: String,
				default: 'more'
			},
			showIcon: {
				type: Boolean,
				default: true
			},
			color: {
				type: String,
				default: "#777777"
			},
			icon:{
				default:Math.random()>0.5?'cat':'dog'
			},
			contentText: {
				type: Object,
				default () {
					return {
						contentdown: "上拉显示更多",
						contentrefresh: "",
						contentnomore: "没有更多数据了"
					};
				}
			}
		},
		data() {
			return {}
		}
	}
</script>

<style>
	@charset "UTF-8";

	.uni-load-more {
		border: none;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
		height: 120upx;
		align-items: center;
		justify-content: center
	}

	.uni-load-more__text {
		font-size: 28upx;
		color: #999
	}

		.uni-load-more__img {
			/* height: 120upx; */
			width: 120upx;
			margin-right: 10px;
			display: flex;
			justify-content: center;
			align-items: center;
			/* animation: loading .5s ease-in infinite both alternate; */
		}
		.uni-load-more__img image{
			/* height: 120upx; */
			width: 120upx;
		}

	.uni-load-more__img>view {
		position: absolute
	}

	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		/* animation: load 1.56s ease infinite */
	}
	


	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}

	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}

	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}

	.load2 {
		transform: rotate(30deg)
	}

	.load3 {
		transform: rotate(60deg)
	}

	.load1 view:nth-child(1) {
		animation-delay: 0s
	}

	.load2 view:nth-child(1) {
		animation-delay: .13s
	}

	.load3 view:nth-child(1) {
		animation-delay: .26s
	}

	.load1 view:nth-child(2) {
		animation-delay: .39s
	}

	.load2 view:nth-child(2) {
		animation-delay: .52s
	}

	.load3 view:nth-child(2) {
		animation-delay: .65s
	}

	.load1 view:nth-child(3) {
		animation-delay: .78s
	}

	.load2 view:nth-child(3) {
		animation-delay: .91s
	}

	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}

	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}

	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}

	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}

	@-webkit-keyframes load {
		0% {
			opacity: 1
		}

		100% {
			opacity: .2
		}
	}
		.mix-loading-icon{
			width: 100upx;
			height: 100upx;
			transition: .3s;
			margin-top: 40upx;
		}
		
		.mix-loading-icon image{
			height: auto;
		}
		
		/* @keyframes loading {
			0% {
				transform: translateY(-20upx) scaleX(1);
			}
			100% {
				transform: translateY(4upx)  scaleX(1.3);
			}
		}
		@-webkit-keyframes load {
			0% {
				opacity: 1
			}
		
			100% {
				opacity: .2
			}
		} */
</style>