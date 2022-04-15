<template>
	<view>
		<view :style="{height: height+'rpx'}" class="swiper-container" @touchstart="touchStart" @touchend="touchEnd">
			<view class="swiper-item" v-for="(item, index) in list" :key="index"
				:style="{transform: styleList[index].transform, zIndex: styleList[index].zIndex, opacity: styleList[index].opacity,display:styleList[index].display}">
				<view class="wrap" :class="current-1==index?'show-shadow':''">
					<image @click="itemClick(index)" class="image" :src="item.image"></image>
					<view class="title" v-if="current-1==index">{{item.title}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			/**
			 * 图片url列表
			 */
			list: {
				type: Array,
				default: []
			},
			/**
			 * swiper高度
			 */
			height: {
				type: Number,
				default: 690
			}
		},
		data() {
			return {
				/**
				 * 开始触摸点坐标
				 */
				start: {
					x: 0,
					y: 0
				},
				/**
				 * 每个item样式列表
				 */
				styleList: [],
				current: 1
			};
		},
		created() {
			this.list.forEach((item, index) => {
				this.styleList.push(this.addStyle(index))
			})
		},
		watch: {
			styleList: {
				handler(newName, oldName) {
					// 		console.log(this.styleList)
					// for (var i = 0; i < this.styleList.length; i++)
					// 	if (this.styleList[i].zIndex == 9999) { {
					// 		console.log(this.styleList[i])
					// 		this.$emit('change', this.styleList[i].index);
					// 	}
					// }
				},
				immediate: true
			}
		},
		methods: {
			/**
			 * 计算每个item样式
			 * @param {Object} idx
			 */
			addStyle(idx) {
				const len = this.list.length;
				if (idx > len / 2) {
					//这里是数组后一半的item放在左边,平移位置由远到近，例如共6个，后2个处理在这里
					var left = len - idx
					return {
						transform: 'scale(' + (1 - left / 10) + ') translate(-' + (left * 14) + '%,0px)',
						zIndex: 9999 - left,
						opacity: 0.8 / left,
						display: idx == len - 1 ? "block" : "none",
						index: idx
						// height: '420rpx',
					}
				} else {
					//这里是数组前一半item放在右边，平移位置由近到远，例如共6个，前4个处理在这里，这里第一个元素始终放在中间位置
					return {
						transform: 'scale(' + (1 - idx / 10) + ') translate(' + (idx * 14) + '%,0px)',
						zIndex: 9999 - idx,
						opacity: 0.8 / (idx === 0 ? 0.8 : idx),
						display: idx > 1 ? "none" : "block",
						index: idx
						// height: '420rpx',
					}
				}
			},
			/**
			 * 触摸开始
			 * @param {Object} e
			 */
			touchStart(e) {
				this.start.x = e.changedTouches[0] ? e.changedTouches[0].pageX : 0;
				this.start.y = e.changedTouches[0] ? e.changedTouches[0].pageY : 0;
			},
			/**
			 * 触摸结束
			 * @param {Object} e
			 */
			touchEnd(e) {
				var newStyleList = JSON.parse(JSON.stringify(this.styleList))
				let tx = e.changedTouches[0].pageX - this.start.x
				let ty = e.changedTouches[0].pageY - this.start.y
				if (Math.abs(tx) > Math.abs(ty)) {
					//左右方向滑动
					if (tx < 0) {
						// 向左滑动
						var last = [newStyleList.pop()]
						newStyleList = last.concat(newStyleList)
						this.$emit('swip', 'left')
						// console.log('左滑动touch')
						this.count('add')
					} else if (tx > 0) {
						// 向右滑动
						newStyleList.push(newStyleList[0])
						newStyleList.splice(0, 1)
						this.$emit('swip', 'right')
						// console.log('右滑动touch')
						this.count('decrease')
					}
				} else {
					//这里就不处理上下方向的事件了，有此需求的同仁可以在这里写逻辑
					//上下方向滑动
					if (ty < 0) {
						// 向上滑动
					} else if (ty > 0) {
						// 向下滑动
					}
				}
				this.styleList = newStyleList
			},
			swip(type) {
				if (type === 'right') {
					this.count('add')
					this.styleList.unshift(this.styleList.pop())
					// console.log('click-right')
				} else {
					this.count('decrease')
					this.styleList.push(this.styleList.shift())
					// console.log('click-left')
				}
			},
			/**
			 * 当前item点击返回索引下标
			 * @param {Object} idx
			 */
			itemClick(idx) {
				console.log(idx)
				this.$emit('click', idx);
			},
			count(type) {
				if (type == 'add') {
					// console.log('点击前current', this.current)
					this.current = (this.current + 1) > (this.list.length) ? 1 : this.current + 1
					// console.log('点击后current', this.current)
					// console.log('当前list长度', this.list.length)
				}
				if (type == 'decrease') {
					// console.log('点击前current', this.current)
					this.current = (this.current - 1) < 1 ? this.list.length : this.current - 1
					// console.log('点击后current', this.current)
					// console.log('当前list长度', this.list.length)
				}
			}
		}
	}
</script>

<style lang="scss">
	.swiper-container {
		box-sizing: border-box;
		height: 690rpx;
		width: 100%;
		// overflow: hidden;
		position: relative;

		.swiper-item {
			height: 100%;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			transition: all .5s;

			.wrap {
				position: relative;
				height: 100%;
				width: 500rpx;
				margin: 2rpx auto;
				border-radius: 20rpx;
				&.show-shadow{
					box-shadow: 0px 0px 15px 0px rgba(57, 211, 255, 0.3);
				}
				.image {
					height: 100%;
					width: 100%;
					border-radius: 20rpx;

					// box-shadow: 0 0 10rpx #333;//加阴影的话去掉注释即可
				}

				.title {
					position: absolute;
					min-width: 172rpx;
					padding: 0 16rpx;
					height: 68rpx;
					width: auto !important;
					background-image: linear-gradient(#FFFAE1, #FFCA7C);
					border-radius: 30rpx !important;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 36rpx !important;
					left: auto !important;
					right: 55rpx;
					bottom: -40rpx !important;
					z-index: 10000;
					color: black !important;
				}
			}
		}
	}
</style>
