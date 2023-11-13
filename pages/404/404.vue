<template>
	<view class="content">
		<text>当前页面不存在！</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			let timer = setTimeout(() => {
				clearTimeout(timer)
				uni.navigateTo({
					url:'/pages/index/index'
				})
			},2000)
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		text-align: center;
	}
</style>
