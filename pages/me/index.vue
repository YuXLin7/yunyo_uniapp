<template>
	<view>
		<custom-navbar @safe-height="getHeight"></custom-navbar>
		<view :style="{ marginTop: height + 'px' }">
			<view class="head">
				<image :src="userInfo.headUrl" mode="heightFix"></image>
				<text id="nickname">{{ userInfo.nickname }}</text>
				<text id="phone">{{ userInfo.phone }}</text>
			</view>

			<!-- 我的订单 -->
			<view class="orders">
				<view class="title">
					我的订单
					<navigator class="navigator" url="/pages/order/order" hover-class="none">
						查看全部订单
						<text class="icon-right"></text>
					</navigator>
				</view>
				<view class="section">
					<navigator url="../order/order?type=1" hover-class="none" class="vertical-layout">
					  <image src="../../static/payment.png" mode="heightFix"></image>
					  待付款
					</navigator>
					<navigator url="../order/order?type=2" hover-class="none" class="vertical-layout">
						<image src="../../static/use.png" mode="heightFix"></image>
						待使用
					</navigator>
					<navigator url="../order/order?type=3" hover-class="none" class="vertical-layout">
						<image src="../../static/comment.png" mode="heightFix"></image>
						待评论
					</navigator>
					<navigator url="../order/order" hover-class="none" class="vertical-layout">
						<image src="../../static/aftersales.png" mode="heightFix"></image>
						售后
					</navigator>
				</view>
			</view>

			<!-- 列表 -->
			<view class="list">
				<button hover-class="none" class="item arrow" @click="visitorInfor">游客信息</button>
				<button hover-class="none" class="item arrow" @click="setting">设置</button>
			</view>

			<!-- 列表 -->
			<view class="list">
				<button hover-class="none" class="item arrow" open-type="openSetting">授权管理</button>
				<button hover-class="none" class="item arrow" open-type="feedback">问题反馈</button>
				<button hover-class="none" class="item arrow" open-type="contact">联系我们</button>
			</view>
			<!-- 操作按钮 -->
			<view class="action"><view class="button" @click="lagout">退出登录</view></view>
		</view>
	</view>
</template>

<script>
import CustomNavbar from '../../components/CustomNavbar.vue';
import { useri } from '../../util/user.js';
import { mapState, mapActions } from 'vuex';

export default {
	data() {
		return {
			height: 0,
		};
	},
	components: {
		CustomNavbar
	},
	computed: {
		...mapState(['userInfo'])
	},
	methods: {
		...mapActions(['userLogoutAction']),
		getHeight(safeAreaInsets) {
			this.height = safeAreaInsets - 20;
		},
		visitorInfor() {
			uni.navigateTo({
				url: '/pages/visitorInfor/visitorInfor?id=' + this.userInfo.id
			});
		},
		setting() {
			uni.navigateTo({
				url: '/pages/setting/setting?id=' + this.userInfo.id
			});
		},
		lagout() {
			uni.showModal({
				content: '是否退出登录？',
				success: res => {
					if (res.confirm) {
						// 清理用户信息
						uni.setStorageSync('token', null)
						this.userLogoutAction()
						// 返回上一页
						// uni.navigateBack();
						uni.navigateTo({
							url: '/pages/login/login'
						});
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f4f4f4;
}

.head {
	display: flex;
	image {
		height: 70px;
		margin: 10px 0 10px 20px;
		border-radius: 10rpx;
	}
}

#nickname {
	margin: 15px 0 0 10px;
	font-size: 20px;
}
#phone {
	margin-top: 50px;
	margin-left: -100px;
}

.viewport {
	padding: 20rpx;
}

/* 列表 */
.list {
	margin: 0 10px;
	padding: 0 20rpx;
	background-color: #fff;
	margin-bottom: 20rpx;
	border-radius: 10rpx;
	.item {
		line-height: 90rpx;
		padding-left: 10rpx;
		font-size: 30rpx;
		color: #333;
		border-top: 1rpx solid #ddd;
		position: relative;
		text-align: left;
		border-radius: 0;
		background-color: #fff;
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
	}
	.arrow::after {
		content: '>';
		position: absolute;
		top: 50%;
		color: #ccc;
		font-family: 'erabbit' !important;
		font-size: 32rpx;
		transform: translateY(-50%);
	}
}

/* 操作按钮 */
.action {
	text-align: center;
	line-height: 90rpx;
	margin: 40rpx 10px 0;
	font-size: 32rpx;
	color: #333;
	.button {
		background-color: #fff;
		margin-bottom: 20rpx;
		border-radius: 10rpx;
	}
}

.orders {
	position: relative;
	z-index: 99;
	padding: 30rpx;
	margin: 50rpx 25rpx 20rpx;
	background-color: #fff;
	border-radius: 10rpx;
	box-shadow: 0 4rpx 6rpx rgba(240, 240, 240, 0.6);

	.title {
		height: 40rpx;
		line-height: 40rpx;
		font-size: 28rpx;
		color: #1e1e1e;

		.navigator {
			font-size: 24rpx;
			color: #939393;
			float: right;
		}
	}

	.section {
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding-top: 20rpx;
		.vertical-layout {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 24rpx;
			image {
				height: 30px;
			}
		}
	}
}
</style>
