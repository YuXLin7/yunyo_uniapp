<template>
	<view>
		<form catchsubmit="formSubmit" catchreset="formReset">
			<view class="input-list">
				<view class="input-item">
					<text class="input-item-label">{{ phoneOrEmail }}</text>
					<view class="input-item-content"><input type="number" v-model="PENumber" :placeholder="'请输入您的' + phoneOrEmail" bindinput="inputPhone" /></view>
				</view>

				<view class="input-item">
					<text class="input-item-label">验证码</text>
					<view class="input-item-content"><input type="number" v-model="inputCode" auto-focus placeholder="请输入验证码" maxlength="6" bindinput="inputName" /></view>
					<text style="color: red; font-size: 12px; margin-left: 7px;">{{ codeErrMsg }}</text>
					<button class="sendCode" @click="sendCode" :disabled="disabled">{{ codeMsg }}</button>
				</view>
			</view>
			<view class="btn-submit"><button type="primary" style="background-color: #28bb9c;" @click="login">登录</button></view>
		</form>
	</view>
</template>

<script>
import { useri } from '../../util/user.js';
import { mapActions } from 'vuex';

export default {
	data() {
		return {
			phoneOrEmail: '手机号',
			codeNum: 10,
			codeMsg: '发送验证码',
			disabled: false,
			sendType: '1',
			PENumber: '',
			inputCode: '',
			codeErrMsg: ''
		};
	},
	mounted() {
		this.sendType = this.$root.$mp.query.type;
		if (this.sendType === '1') {
			this.phoneOrEmail = '手机号';
		} else {
			this.phoneOrEmail = '邮箱';
		}
	},
	methods: {
		...mapActions(['userLoginAction']),
		getHeight(safeAreaInsets) {
			this.height = safeAreaInsets;
		},
		async login() {
			var data = {};

			if (this.sendType === '1') {
				data = {
					phone: this.PENumber,
					code: this.inputCode
				};
			} else {
				data = {
					email: this.PENumber,
					code: this.inputCode
				};
			}

			await useri.login(data).then(resp => {
				if (resp.code == 200) {
					this.userLoginAction(resp.data.user);
					uni.setStorageSync('token', resp.data.token);
					uni.reLaunch({
						url: '/pages/index/index'
					});
				}
			});
		},
		async sendCode() {
			this.disabled = true;
			this.codeMsg = '重新发送(' + this.codeNum + ')';

			let timer = setInterval(() => {
				--this.codeNum;
				this.codeMsg = '重新发送(' + this.codeNum + ')';
			}, 1000);

			if (this.sendType === '1') {
				await useri.sendMsg(this.PENumber).then(resp => {
					console.log(resp);
				});
			} else {
				await useri.sendEmail(this.PENumber).then(resp => {
					console.log(resp);
				});
			}

			setTimeout(() => {
				clearInterval(timer);
				this.codeNum = 10;
				this.disabled = false;
				this.codeMsg = '重新发送';
			}, 10000);
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
