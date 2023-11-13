<template>
	<view>
		<custom-navbar @safe-height="getHeight"></custom-navbar>
		<form catchsubmit="formSubmit" catchreset="formReset">
			<view class="input-list" :style="{ paddingTop: height + 'px' }">
				<view class="input-item">
					<text class="input-item-label">用户名</text>
					<view class="input-item-content"><input type="text" v-model="username" placeholder="请输入您的用户名" /></view>
				</view>

				<view class="input-item">
					<text class="input-item-label">密码</text>
					<view class="input-item-content"><input type="password" v-model="password" auto-focus placeholder="请输入您的密码" /></view>
				</view>

				<view class="input-item">
					<text class="input-item-label">确认密码</text>
					<view class="input-item-content"><input type="password" v-model="surePwd" @blur="isPasswordSame" auto-focus placeholder="请再次输入密码" /></view>
					<text style="color: red; font-size: 12px; margin-left: 7px;">{{ errMsg }}</text>
				</view>
			</view>
			<view class="btn-submit"><button type="primary" style="background-color: #28bb9c;" @click="register">注册</button></view>
		</form>
	</view>
</template>

<script>
import CustomNavbar from '../../components/CustomNavbar.vue';

export default {
	data() {
		return {
			height: '',
			username: '',
			password: '',
			surePwd: '',
			errMsg: ''
		};
	},
	components: {
		CustomNavbar
	},
	methods: {
		getHeight(safeAreaInsets) {
			this.height = safeAreaInsets
		},
		isPasswordSame() {
			if (!(this.password == this.surePwd) && !(this.surePwd == null)) {
				this.errMsg = '两次密码不一致！';
			} else {
				this.errMsg = '';
			}
		},
		register() {
			uni.reLaunch({
				url: '/pages/index/index'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.input-list {
	padding: 0 20rpx;
	margin: 20rpx 0;
	background: #fff;
	border-top: 1rpx solid #ddd;
	border-bottom: 1rpx solid #ddd;
}

.input-list .input-item {
	padding: 20rpx;
	line-height: 2;
	display: flex;
	font-size: 30rpx;
	border-top: 1rpx solid #e8e8e8;
	.sendCode {
		height: auto;
		width: auto;
		font-size: 12px;
		margin-top: -3px;
	}
}

.input-list .input-item:first-child {
	border-top: 0;
}

.input-item-label {
	display: block;
	width: 5em;
	color: #666;
}

.input-item-content {
	color: #333;
	flex: 1;
	button {
		font-size: 12px;
		width: auto;
		height: 30px;
	}
}

.btn-submit {
	padding: 20rpx;
}

.btn-weixin {
	background-color: limegreen;
	color: white;
}
.logo {
	height: 300rpx;
	width: 400rpx;
	margin: 0 auto;
}
</style>
