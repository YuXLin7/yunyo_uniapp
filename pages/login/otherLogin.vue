<template>
	<view>
		<custom-navbar @safe-height="getHeight"></custom-navbar>
		<form catchsubmit="formSubmit" catchreset="formReset">
			<view class="input-list" :style="{ paddingTop: height + 'px' }">
				<view class="input-item">
					<text class="input-item-label">{{ phoneOrEmail }}</text>
					<view class="input-item-content">
						<input type="number" v-model="PENumber" :placeholder="'请输入您的' + phoneOrEmail" maxlength="11" bindinput="inputPhone" />
					</view>
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
import CustomNavbar from '../../components/CustomNavbar.vue';

export default {
	data() {
		return {
			height: '',
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
	components: {
		CustomNavbar
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
		getHeight(safeAreaInsets) {
			this.height = safeAreaInsets;
		},
		login() {
			// if(this.sendType === '1') {
			// 	console.log('发送手机验证码')
			// } else {
			// 	console.log('发送邮箱验证码')
			// }
			uni.reLaunch({
				url: '/pages/index/index'
			});
		},
		sendCode() {
			this.disabled = true;
			this.codeMsg = '重新发送(' + this.codeNum + ')';
			let timer = setInterval(() => {
				--this.codeNum;
				this.codeMsg = '重新发送(' + this.codeNum + ')';
			}, 1000);
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
