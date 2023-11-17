<template>
	<view>
		<!-- 购物车列表 -->
		<view class="cart-list">
			<!-- 滑动操作分区 -->
			<uni-swipe-action>
				<!-- 滑动操作项 -->
				<uni-swipe-action-item v-for="item in 2" :key="item" class="cart-swipe">
					<!-- 商品信息 -->
					<view class="goods">
						<!-- :url="`/pages/goods/goods?id=1435025`" -->
						<navigator :url="pageUrl" hover-class="none" class="navigator">
							<image mode="aspectFill" class="picture" src="https://yanxuan-item.nosdn.127.net/da7143e0103304f0f3230715003181ee.jpg"></image>
							<view class="meta">
								<view class="name ellipsis">人手必备，儿童轻薄透气防蚊裤73-140cm</view>
								<view class="price">69.00</view>
							</view>
						</navigator>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			pageUrl: './detail'
		};
	},
	methods: {},
	// order页面的onLoad方法中接收参数
	onLoad: function(options) {
		if (options.type == 1) {
			wx.setNavigationBarTitle({
				title: '待付款'
			});
			this.pageUrl = './payment'
		} else if (options.type == 2) {
			wx.setNavigationBarTitle({
				title: '待使用'
			});
		} else if (options.type == 3) {
			wx.setNavigationBarTitle({
				title: '待评论'
			});
		} else {
			wx.setNavigationBarTitle({
				title: '全部订单'
			});
		}
	}
};
</script>

<style lang="scss">
.cart-list {
	.goods {
		display: flex;
		padding: 20rpx 20rpx 20rpx 80rpx;
		border-radius: 10rpx;
		background-color: #fff;
		position: relative;

		.navigator {
			display: flex;
		}

		.picture {
			width: 170rpx;
			height: 170rpx;
		}

		.meta {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 20rpx;
		}

		.name {
			height: 72rpx;
			font-size: 26rpx;
			color: #444;
		}

		.price {
			line-height: 1;
			font-size: 26rpx;
			color: #444;
			margin-bottom: 2rpx;
			color: #cf4444;

			&::before {
				content: '￥';
				font-size: 80%;
			}
		}
	}

	.cart-swipe {
		display: block;
		margin: 20rpx 0;
	}
}
</style>
