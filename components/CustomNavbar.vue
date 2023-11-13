<template>
	<view>
		<view class="bgc" :style="{ width: systemWidth + 'px', height: safeAreaInsets + 'px' }" mode="widthFix"></view>
		<view class="top"><image src="@/static/head.png" :style="{ width: systemWidth + 'px', paddingTop: safeAreaInsets + 'px' }" mode="widthFix"></image></view>
		<view class="logo_picture"><image src="@/static/logo3.png" :style="{ width: '75px', paddingTop: safeAreaInsets + 'px' }" mode="widthFix"></image></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			systemWidth: 0,
			safeAreaInsets: 0
		};
	},
	mounted() {
		this.systemWidth = uni.getSystemInfoSync().windowWidth
		this.safeAreaInsets = uni.getSystemInfoSync().safeArea.top
		this.$emit('safe-height', this.safeAreaInsets + 110)
	}
};
</script>

<style lang="scss">
.bgc {
	background-color: #28bb9c;
	position: absolute;
	top: 0;
	left: 0;
}
	
.top {
	position: absolute;
	top: 0;
	left: 0;
}

.logo_picture {
	position: absolute;
	top: 60rpx;
	left: 80rpx;
}
</style>