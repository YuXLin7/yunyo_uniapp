<template>
	<scroll-view scroll-y class="viewport">
		<!-- 商品信息 -->
		<view class="goods">
			<view class="item" hover-class="none">
				<image class="picture" src="https://yanxuan-item.nosdn.127.net/c07edde1047fa1bd0b795bed136c2bb2.jpg" />
				<view class="meta">
					<view class="name ellipsis">{{ info.name }}</view>
					<view class="attrs">{{ info.useTime }}</view>
					<view class="prices">
						<view class="pay-price symbol">{{ info.price }}</view>
						<view class="price symbol">99.00</view>
					</view>
					<view class="count">x{{ info.num }}</view>
				</view>
			</view>
		</view>

		<!-- 配送及支付方式 -->
		<view class="related">
			<view class="item">
				<text class="text">订单备注</text>
				<input class="input" :cursor-spacing="30" placeholder="选题，建议留言前先与商家沟通确认" v-model="buyerMessage" />
			</view>
		</view>

		<!-- 支付金额 -->
		<view class="settlement">
			<view class="item">
				<text class="text">商品总价:</text>
				<text class="number symbol">{{ getPrice }}</text>
			</view>
		</view>
		
		<!-- 吸底工具栏 -->
		<view class="toolbar" v-if="isPayment">
			<view class="total-pay symbol"><text class="number">{{ getPrice }}</text></view>
			<view class="button">付款</view>
		</view>
	</scroll-view>
</template>

<script>
import { useri } from '../../util/user.js';

export default {
	data() {
		return {
			isPayment: false,
			info: {}
		};
	},
	methods: {},
	onLoad: async function(options) {
		if (options.type === '1') {
			this.isPayment = true
		}
		await useri.getOrderById(options.id).then(resp => {
			this.info = resp.data;
		});
	},
	computed: {
		getPrice() {
			return this.info.price * this.info.num;
		}
	}
};
</script>

<style lang="scss">
page {
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow: hidden;
	background-color: #f4f4f4;
}

.symbol::before {
	content: '¥';
	font-size: 80%;
	margin-right: 5rpx;
}

.shipment {
	margin: 20rpx;
	padding: 30rpx 30rpx 30rpx 84rpx;
	font-size: 26rpx;
	border-radius: 10rpx;
	background: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/locate.png) 20rpx center / 50rpx no-repeat #fff;
	position: relative;

	.icon {
		font-size: 36rpx;
		color: #333;
		transform: translateY(-50%);
		position: absolute;
		top: 50%;
		right: 20rpx;
	}

	.user {
		color: #333;
		margin-bottom: 5rpx;
	}

	.address {
		color: #666;
	}
}

.goods {
	margin: 20rpx;
	padding: 0 20rpx;
	border-radius: 10rpx;
	background-color: #fff;

	.item {
		display: flex;
		padding: 30rpx 0;
		border-top: 1rpx solid #eee;

		&:first-child {
			border-top: none;
		}

		.picture {
			width: 170rpx;
			height: 170rpx;
			border-radius: 10rpx;
			margin-right: 20rpx;
		}

		.meta {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			position: relative;
		}

		.name {
			height: 80rpx;
			font-size: 26rpx;
			color: #444;
		}

		.attrs {
			line-height: 1.8;
			padding: 0 15rpx;
			margin-top: 6rpx;
			font-size: 24rpx;
			align-self: flex-start;
			border-radius: 4rpx;
			color: #888;
			background-color: #f7f7f8;
		}

		.prices {
			display: flex;
			align-items: baseline;
			margin-top: 6rpx;
			font-size: 28rpx;

			.pay-price {
				margin-right: 10rpx;
				color: #cf4444;
			}

			.price {
				font-size: 24rpx;
				color: #999;
				text-decoration: line-through;
			}
		}

		.count {
			position: absolute;
			bottom: 0;
			right: 0;
			font-size: 26rpx;
			color: #444;
		}
	}
}

.related {
	margin: 20rpx;
	padding: 0 20rpx;
	border-radius: 10rpx;
	background-color: #fff;

	.item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		min-height: 80rpx;
		font-size: 26rpx;
		color: #333;
	}

	.input {
		flex: 1;
		text-align: right;
		margin: 20rpx 0;
		padding-right: 20rpx;
		font-size: 26rpx;
		color: #999;
	}

	.item .text {
		width: 125rpx;
	}

	.picker {
		color: #666;
	}

	.picker::after {
		content: '\e6c2';
	}
}

/* 结算清单 */
.settlement {
	margin: 20rpx;
	padding: 0 20rpx;
	border-radius: 10rpx;
	background-color: #fff;

	.item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 80rpx;
		font-size: 26rpx;
		color: #333;
	}

	.danger {
		color: #cf4444;
	}
}
/* 吸底工具栏 */
.toolbar {
	position: fixed;
	left: 0;
	right: 0;
	bottom: calc(var(--window-bottom));
	z-index: 1;

	background-color: #fff;
	height: 100rpx;
	padding: 0 20rpx;
	border-top: 1rpx solid #eaeaea;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: content-box;

	.total-pay {
		font-size: 40rpx;
		color: #cf4444;

		.decimal {
			font-size: 75%;
		}
	}

	.button {
		width: 220rpx;
		text-align: center;
		line-height: 72rpx;
		font-size: 26rpx;
		color: #fff;
		border-radius: 72rpx;
		background-color: #27ba9b;
	}

	.disabled {
		opacity: 0.6;
	}
}
</style>
