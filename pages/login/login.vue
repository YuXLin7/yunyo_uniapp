<template>
	<view class="viewport">
		<custom-navbar></custom-navbar>
		<view class="logo"><image src="@/static/logo4.png" mode="heightFix"></image></view>
		<view class="login">
			<view class="username">
				<text style="font-size: 15px; margin: auto 0;">账号：</text>
				<!-- <input v-model="username" type="number" placeholder="请输入您的账号" /> -->
				<!-- <u-input v-model="username" type="number" placeholder="请输入您的账号"></u-input> -->
				<uni-easyinput v-model="username" placeholder="请输入您的账号"></uni-easyinput>
			</view>
			<view class="password">
				<text style="font-size: 15px; margin: auto 0;">密码：</text>
				<!-- <input v-model="password" password type="text" placeholder="请输入您的密码"/> -->
				<!-- <u-input v-model="password" type="password" placeholder="请输入您的密码"></u-input> -->
				<uni-easyinput type="password" v-model="password" placeholder="请输入您的密码"></uni-easyinput>
			</view>
			<button class="button phone" @click="userLogin">登 录</button>
			<view class="extra">
				<view class="caption"><text>其他登录方式</text></view>
				<view class="options">
					<button @click="otherLogin(1)">短信</button>
					<button @click="otherLogin(2)">邮箱</button>
				</view>
			</view>
			<view class="register" @click="register">没有账号？点击前往注册…</view>
			<view class="tips" @click="login">登录/注册即视为你同意《服务条款》和《云游隐私协议》</view>
		</view>
	</view>
</template>

<script>
import CustomNavbar from '../../components/CustomNavbar.vue';
import { useri } from '../../util/user.js';
import { mapActions } from 'vuex';

export default {
	data() {
		return {
			username: '1183928835',
			password: '111111'
		};
	},
	components: {
		CustomNavbar
	},
	onLoad: function(options) {
		if (options.username != null) {
			this.username = options.username;
			uni.showModal({
				content: '请记住你的账号：' + this.username
			});
		}
	},
	methods: {
		...mapActions(['userLoginAction']),
		async userLogin() {
			if (this.username == '' || this.password == '') {
				uni.showToast({
					title: '请输入账号密码！',
					icon: 'none',
					duration: 2000
				});
			} else {
				const data = {
					username: this.username,
					password: this.password
				};
				await useri.login(data).then(resp => {
					if (resp.code == 200) {
						this.userLoginAction(resp.data.user);
						uni.setStorageSync('token', resp.data.token);
						uni.reLaunch({
							url: '/pages/index/index'
						});
					} else {
						uni.showToast({
							title: resp.message,
							icon: 'none',
							duration: 2000
						});
					}
				});
			}
		},
		otherLogin(type) {
			uni.navigateTo({
				url: '/pages/login/otherLogin?type=' + type
			});
		},
		register() {
			uni.navigateTo({
				url: '/pages/register/register'
			});
		}
	}
};
</script>

<style lang="scss">
page {
	height: 100%;
}

.viewport {
	display: flex;
	flex-direction: column;
	height: 100%;
	padding: 20rpx 40rpx;
}

.logo {
	flex: 1;
	text-align: center;
	image {
		height: 220rpx;
		margin-top: 18vh;
	}
}

.login {
	display: flex;
	flex-direction: column;
	height: 60vh;
	padding: 40rpx 20rpx 20rpx;

	.username {
		display: flex;
		text-align: center;

		.input-focus {
			border-color: red;
		}
	}

	.password {
		display: flex;
		margin: 40rpx 0 40rpx 0;
		text-align: center;
	}

	.input {
		width: 100%;
		height: 80rpx;
		font-size: 28rpx;
		border-radius: 72rpx;
		border: 1px solid #ddd;
		padding-left: 30rpx;
		margin-bottom: 20rpx;
	}

	.button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 80rpx;
		font-size: 40rpx;
		border-radius: 72rpx;
		color: #fff;
	}

	.phone {
		background-color: #28bb9c;
	}

	.wechat {
		background-color: #06c05f;
	}

	.extra {
		flex: 1;
		padding: 70rpx 70rpx 0;
		.caption {
			width: 440rpx;
			line-height: 1;
			border-top: 1rpx solid #ddd;
			font-size: 26rpx;
			color: #999;
			position: relative;
			text {
				transform: translate(-40%);
				background-color: #fff;
				position: absolute;
				top: -12rpx;
				left: 50%;
			}
		}

		.options {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 70rpx;
			button {
				font-size: 14px;
				padding: 0;
				background-color: transparent;
				width: 25%;
			}
		}

		.icon {
			font-size: 24rpx;
			color: #444;
			display: flex;
			flex-direction: column;
			align-items: center;

			&::before {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 80rpx;
				height: 80rpx;
				margin-bottom: 6rpx;
				font-size: 40rpx;
				border: 1rpx solid #444;
				border-radius: 50%;
			}
		}
		.icon-weixin::before {
			border-color: #06c05f;
			color: #06c05f;
		}
	}
}

.register {
	position: absolute;
	bottom: 150rpx;
	left: 20rpx;
	right: 20rpx;
	font-size: 30rpx;
	color: #28bb9c;
	text-align: center;
}

.tips {
	position: absolute;
	bottom: 80rpx;
	left: 20rpx;
	right: 20rpx;
	font-size: 22rpx;
	color: #999;
	text-align: center;
}
</style>
