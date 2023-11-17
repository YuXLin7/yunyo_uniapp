<template>
	<view>
		<!-- 基本信息 -->
		<view class="goods">
			<!-- 商品主图 -->
			<view class="preview">
				<swiper style="height: 100%;" @change="swiperChange">
					<swiper-item><image mode="aspectFill" src="https://yanxuan-item.nosdn.127.net/99c83709ca5f9fd5c5bb35d207ad7822.png" /></swiper-item>
					<swiper-item><image mode="aspectFill" src="https://yanxuan-item.nosdn.127.net/f9107d47c08f0b99c097e30055c39e1a.png" /></swiper-item>
					<swiper-item><image mode="aspectFill" src="https://yanxuan-item.nosdn.127.net/754c56785cc8c39f7414752f62d79872.png" /></swiper-item>
					<swiper-item><image mode="aspectFill" src="https://yanxuan-item.nosdn.127.net/ef16f8127610ef56a2a10466d6dae157.jpg" /></swiper-item>
					<swiper-item><image mode="aspectFill" src="https://yanxuan-item.nosdn.127.net/1f0c3f5d32b0e804deb9b3d56ea6c3b2.png" /></swiper-item>
				</swiper>
				<view class="indicator">
					<text class="current">{{ currentIndex + 1 }}</text>
					<text class="split">/</text>
					<text class="total">5</text>
				</view>
			</view>

			<!-- 商品简介 -->
			<view class="meta">
				<view class="price">
					<text style="font-size: 25px;">{{ attractionInfo.name }}</text>
				</view>
			</view>

			<!-- 操作面板 -->
			<view class="action">
				<view class="item arrow">
					<text class="label">景区热线：</text>
					<text>{{ attractionInfo.telephone }}</text>
				</view>
				<view class="item arrow">
					<text class="label">营业时间：</text>
					<text>{{ attractionInfo.openingHours }} - {{ attractionInfo.closingHours }}, {{ attractionInfo.stopEntry }}停止入场</text>
				</view>
				<view class="item arrow">
					<text class="label">景区地址：</text>
					<text>{{ attractionInfo.address }}</text>
				</view>
				<view class="item arrow">
					<text class="label">优惠政策：</text>
					<text>{{ attractionInfo.policy }}</text>
				</view>
				<view class="item arrow">
					<text class="label">景区设施：</text>
					<text>{{ attractionInfo.facilities }}</text>
				</view>
				<view class="item arrow">
					<text class="label">景区介绍：</text>
					<text>{{ attractionInfo.detail }}</text>
				</view>
			</view>

			<!-- 门票列表 -->
			<view class="list">
				<text hover-class="none" class="item arrow">门票</text>
				<view hover-class="none" class="item arrow" v-for="item in ticketList" :key="item">
					{{ item.name }}
					<text class="num">已售129</text>
					<text class="price">
						<text style="font-size: 13px;">￥</text>
						{{ item.price }}
					</text>
					<button size="mini">预定</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { useri } from '../../util/user.js';

export default {
	data() {
		return {
			currentIndex: 0,
			attractionInfo: {},
			ticketList: {}
		};
	},
	onLoad: async function(options) {
		await useri.getAttractionById(options.id).then(resp => {
			this.attractionInfo = resp.data;
		});
		await useri.getTicketById(options.id).then(resp => {
			this.ticketList = resp.data;
		});
	},
	methods: {
		swiperChange(e) {
			this.currentIndex = e.detail.current;
		}
	}
};
</script>

<style lang="scss">
.goods {
	background-color: #fff;
	.preview {
		height: 750rpx;
		position: relative;
		image {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		.indicator {
			height: 40rpx;
			padding: 0 24rpx;
			line-height: 40rpx;
			border-radius: 30rpx;
			color: #fff;
			font-family: Arial, Helvetica, sans-serif;
			background-color: rgba(0, 0, 0, 0.3);
			position: absolute;
			bottom: 30rpx;
			right: 30rpx;
			.current {
				font-size: 26rpx;
			}
			.split {
				font-size: 24rpx;
				margin: 0 1rpx 0 2rpx;
			}
			.total {
				font-size: 24rpx;
			}
		}
	}
	.meta {
		position: relative;
		border-bottom: 1rpx solid #eaeaea;
		.price {
			height: auto;
			color: #fff;
			font-size: 34rpx;
			padding: 10rpx 20rpx;
			box-sizing: border-box;
			background-color: #35c8a9;
			display: flex;
			flex-direction: column;
			justify-content: center;
			text {
				margin: 10rpx 10rpx;
			}
		}
		.brand {
			width: 160rpx;
			height: 80rpx;
			overflow: hidden;
			position: absolute;
			top: 26rpx;
			right: 30rpx;
		}
	}
	.action {
		padding-left: 20rpx;
		.item {
			height: 90rpx;
			padding-right: 60rpx;
			border-bottom: 1rpx solid #eaeaea;
			font-size: 26rpx;
			color: #333;
			position: relative;
			display: flex;
			align-items: center;
			&:last-child {
				border-bottom: 0 none;
			}
		}
		.label {
			width: auto;
			color: #898b94;
			margin: 0 16rpx 0 10rpx;
		}
		.text {
			flex: 1;
			-webkit-line-clamp: 1;
		}
	}
	/* 列表 */
	.list {
		margin: 0 10px;
		padding: 0 20rpx;
		background-color: #f4f4f4;
		margin-bottom: 20rpx;
		border-radius: 10rpx;
		.item {
			line-height: 90rpx;
			padding-left: 10rpx;
			font-size: 17px;
			color: #333;
			border-top: 1rpx solid #ddd;
			position: relative;
			text-align: left;
			border-radius: 0;
			background-color: #f4f4f4;
			&::after {
				width: auto;
				height: auto;
				left: auto;
				border: none;
			}
			&:first-child {
				border: none;
			}
			&::after {
				content: '';
				right: 5rpx;
			}
			.num {
				margin-left: 20rpx;
				font-size: 10px;
			}
			.price {
				position: absolute;
				right: 70px;
				color: red;
			}
			button {
				width: 60px;
				font-size: 10px;
				position: absolute;
				right: 0;
				top: 25%;
				background-color: #ff7d25;
				color: white;
			}
		}
	}
}
</style>
