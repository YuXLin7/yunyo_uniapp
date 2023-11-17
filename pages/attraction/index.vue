<template>
	<view>
		<custom-navbar @safe-height="getHeight"></custom-navbar>
		<!-- 搜索框 -->
		<view :style="{ marginTop: height + 'px' }">
			<view style="width: 500rpx; margin: 0 auto;"><uni-easyinput prefixIcon="search" placeholder="搜索景区"></uni-easyinput></view>
			<!-- 列表 -->
			<navigator :url="'./detail?id=' + item.id" hover-class="none" class="list" v-for="item in list" :key="item">
				<image src="../../static/logo.png" mode="heightFix" style="height: 200rpx;"></image>
				<view class="info">
					<text>{{ item.name }}</text>
					<text style="font-size: 12px;">{{ item.telephone }}</text>
					<text style="font-size: 12px;">{{ item.address }}</text>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
import CustomNavbar from '../../components/CustomNavbar.vue';
import { useri } from '../../util/user.js';

export default {
	data() {
		return {
			height: '',
			list: []
		};
	},
	onLoad: async function() {
		await useri.getAttractionPage(1, 3, null).then(resp => {
			this.list = resp.data.records
		});
	},
	components: {
		CustomNavbar
	},
	methods: {
		getHeight(safeAreaInsets) {
			this.height = safeAreaInsets;
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f4f4f4;
}

.list {
	display: flex;
	margin: 0 10px;
	padding: 0 20rpx;
	background-color: #fff;
	margin-top: 20rpx;
	border-radius: 10rpx;

	.info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text {
			margin: 10rpx 0 0 10rpx;
		}
	}
}
</style>
