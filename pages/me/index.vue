<template>
	<view>
		<custom-navbar @safe-height="getHeight"></custom-navbar>
		<view :style="{ marginTop: height + 'px' }">
			<view class="head">
				<image :src="avatarUrl" mode="heightFix" @click="openChooseAvatar"></image>
				<text id="username">{{ nickName }}</text>
				<text id="userid">手机号</text>
			</view>
			<!-- <view class="content">
				
			</view> -->
			<!-- 列表 -->
			<view class="list">
				<button hover-class="none" class="item arrow">我的订单</button>
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

export default {
	data() {
		return {
			height: 0,
			nickName: '微信用户',
			avatarUrl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'
		};
	},
	components: {
		CustomNavbar
	},
	methods: {
		getHeight(safeAreaInsets) {
			this.height = safeAreaInsets - 20;
		},
		openChooseAvatar() {
			wx.chooseImage({
				count: 1, // 最多可以选择的图片张数
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: res => {
					// 选择图片成功，处理选中的图片
					this.avatarUrl = res.tempFilePaths;
				},
				fail: err => {
					console.log(err);
				}
			});
		},
		visitorInfor() {
			uni.navigateTo({
				url: '/pages/visitorInfor/visitorInfor'
			});
		},
		setting() {
			uni.navigateTo({
				url: '/pages/setting/setting'
			});
		},
		lagout() {
			uni.navigateTo({
				url: '/pages/login/login'
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
	}
}

#username {
	margin: 15px 0 0 10px;
	font-size: 20px;
}
#userid {
	margin-top: 50px;
	margin-left: -80px;
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
			content: "";
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
</style>
