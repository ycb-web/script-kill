<template>
	<view class="bannerContainer">
		<u-image width="100%" class="image" mode="widthFix" :src="bannerUrl"></u-image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bannerUrl: ''
			}
		},
		onLoad(option) {
			this.bannerUrl = option.bannerUrl;
		}
	}
</script>

<style lang="scss" scoped>
</style>
