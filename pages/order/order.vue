<template>
	<view class="content">
		<navigator :url="'./detail?type=' + type + '&id=' + item.orderId" hover-class="none" class="list" v-for="item in list" :key="item">
			<view>
				<image mode="aspectFill" class="picture" :src="item.imageUrl"></image>
				<view class="meta">
					<view class="name ellipsis">{{ item.name }}</view>
					<view class="attrs">{{ getState(item.state) }}</view>
					<view class="price">{{ item.price }}</view>
				</view>
			</view>
		</navigator>
		<view class="u-demo-area" v-if="isEmpty" style="height: 400px;"><u-empty mode="order" text="暂无订单"></u-empty></view>
		<view v-if="isBottom"><view style="width: 370rpx; margin: 0 auto;">———— 到底啦！————</view></view>
	</view>
</template>

<script>
import { useri } from '../../util/user.js';

export default {
	data() {
		return {
			pageUrl: './detail',
			type: 0,
			isEmpty: false,
			list: [],
			slot: false,
			page: 1,
			size: 10,
			total: 100,
			isBottom: false
		};
	},
	methods: {
		getState(state) {
			if (state == 1) {
				return '待付款';
			} else if (state == 2) {
				return '待使用';
			} else if (state == 3) {
				return '待评论';
			} else if (state == 4) {
				return '已完成';
			}
		}
	},
	// order页面的onLoad方法中接收参数
	onLoad: async function(options) {
		this.type = options.type;
		if (options.type == 1) {
			wx.setNavigationBarTitle({
				title: '待付款'
			});
			await useri.getOrder(this.page, this.size, { state: 1 }).then(resp => {
				this.list = resp.data.records;
				this.total = resp.data.total;
			});
			this.pageUrl = './payment';
		} else if (options.type == 2) {
			wx.setNavigationBarTitle({
				title: '待使用'
			});
			await useri.getOrder(this.page, this.size, { state: 2 }).then(resp => {
				this.list = resp.data.records;
				this.total = resp.data.total;
			});
		} else if (options.type == 3) {
			wx.setNavigationBarTitle({
				title: '待评论'
			});
			await useri.getOrder(this.page, this.size, { state: 3 }).then(resp => {
				this.list = resp.data.records;
				this.total = resp.data.total;
			});
		} else {
			wx.setNavigationBarTitle({
				title: '全部订单'
			});
			await useri.getOrder(this.page, this.size, null).then(resp => {
				this.list = resp.data.records;
				this.total = resp.data.total;
			});
		}

		if (this.list.length == 0) {
			this.isEmpty = true;
		}
	},
	async onReachBottom() {
		if (this.total > this.page * this.size) {
			this.page++;
			await useri.getOrder(this.page, this.size, null).then(resp => {
				this.list = this.list.concat(resp.data.records);
			});
		} else {
			this.isBottom = true;
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f4f4f4;
}

.content {
	padding-bottom: constant(safe-area-inset-bottom); // 兼容 IOS<11.2
	padding-bottom: env(safe-area-inset-bottom); // 兼容 IOS>11.2

	.list {
		position: relative;
		height: 170rpx;
		margin: 20rpx 10px 0;
		padding: 0 20rpx;
		background-color: #fff;
		border-radius: 10rpx;

		.picture {
			width: 170rpx;
			height: 170rpx;
			margin-left: -20rpx;
			border-radius: 10rpx;
		}

		.meta {
			flex-direction: column;
			justify-content: space-between;
		}

		.name {
			position: absolute;
			top: 10rpx;
			left: 200rpx;
			width: 300px;
			height: 72rpx;
			font-size: 26rpx;
			color: #444;
		}

		.attrs {
			position: absolute;
			bottom: 10rpx;
			right: 10rpx;
			width: 50px;
			line-height: 1.8;
			padding: 0 15rpx;
			font-size: 24rpx;
			align-self: flex-start;
			border-radius: 4rpx;
			color: #888;
			background-color: #f7f7f8;
		}

		.price {
			position: absolute;
			bottom: 15rpx;
			left: 200rpx;
			line-height: 1;
			font-size: 26rpx;
			color: #cf4444;

			&::before {
				content: '￥';
				font-size: 80%;
			}
		}

		.u-demo-area {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>
