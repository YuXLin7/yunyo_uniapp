<template>
	<view class="viewport">
		<!-- 头像 -->
		<view class="avatar">
			<view class="avatar-content">
				<image class="image" :src="userInfo.headUrl" mode="aspectFill" @click="openChooseAvatar" />
				<text class="text" @click="openChooseAvatar">点击修改头像</text>
			</view>
		</view>
		<!-- 表单 -->
		<view class="form">
			<!-- 表单内容 -->
			<view class="form-content">
				<view class="form-item">
					<text class="label">账号</text>
					<text class="account">{{ userInfo.username }}</text>
				</view>
				<view class="form-item">
					<text class="label">昵称</text>
					<input class="input" type="text" placeholder="请填写昵称" v-model="userInfo.nickname" />
				</view>
				<!-- <view class="form-item">
					<text class="label">性别</text>
					<radio-group>
						<label class="radio">
							<radio value="男" color="#27ba9b" :checked="true" />
							男
						</label>
						<label class="radio">
							<radio value="女" color="#27ba9b" :checked="false" />
							女
						</label>
					</radio-group>
				</view> -->
				<!-- <view class="form-item">
					<text class="label">生日</text>
					<picker class="picker" mode="date" start="1900-01-01" value="2000-01-01">
						<view v-if="false">2000-01-01</view>
						<view class="placeholder" v-else>请选择日期</view>
					</picker>
				</view> -->
				<!-- <view class="form-item">
					<text class="label">城市</text>
					<picker class="picker" mode="region" :value="getAddress" @change="updateAddress">
						<view v-if="userInfo.address != ''">{{ userInfo.address }}</view>
						<view class="placeholder" v-else>请选择城市</view>
					</picker>
				</view> -->
				<view class="form-item">
					<text class="label">姓名</text>
					<input class="input" type="text" placeholder="请填写姓名" v-model="userInfo.name" />
				</view>
				<view class="form-item">
					<text class="label">手机</text>
					<input class="input" type="text" placeholder="请填写手机" v-model="userInfo.phone" />
				</view>
				<view class="form-item">
					<text class="label">邮箱</text>
					<input class="input" type="text" placeholder="请填写邮箱" v-model="userInfo.email" />
				</view>
				<view class="form-item">
					<text class="label">身份证</text>
					<input class="input" type="text" placeholder="请填写身份证" v-model="userInfo.idCard" />
				</view>
			</view>
			<!-- 提交按钮 -->
			<button class="form-button" @click="updateUser">保 存</button>
		</view>
	</view>
</template>

<script>
import { mapActions } from 'vuex';
import { useri } from '../../util/user.js';

export default {
	data() {
		return {
			userInfo: {}
		};
	},
	onLoad: async function(options) {
		await useri.getUserById(options.id).then(resp => {
			this.userInfo = resp.data;
		});
	},
	methods: {
		...mapActions(['updateUserInfo']),
		updateAddress(event) {
			this.userInfo.address = event.detail.value.join(' ');
		},
		openChooseAvatar() {
			wx.chooseImage({
				count: 1, // 最多可以选择的图片张数
				sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
				success: res => {
					// 选择图片成功，处理选中的图片
					this.userInfo.headUrl = res.tempFilePaths[0];
					console.log(this.userInfo.headUrl)
				},
				fail: err => {
					console.log(err);
				}
			});
		},
		async updateUser() {
			await useri.updateUser(this.userInfo).then(resp => {
				uni.showToast({
					title: resp.message,
					icon: 'none',
					duration: 2000
				});
				this.updateUserInfo(this.userInfo)
			});
		}
	},
	computed: {
		getAddress() {
			return this.userInfo.address == null ? '北京市 北京市 东城区' : this.userInfo.address.split(' ');
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f4f4f4;
}

.viewport {
	display: flex;
	flex-direction: column;
	height: 100%;
	background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
	background-size: auto 420rpx;
	background-repeat: no-repeat;
}

// 导航栏
.navbar {
	position: relative;

	.title {
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
		font-weight: 500;
		color: #fff;
	}

	.back {
		position: absolute;
		height: 40px;
		width: 40px;
		left: 0;
		font-size: 20px;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}

// 头像
.avatar {
	text-align: center;
	width: 100%;
	height: 260rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.image {
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
		background-color: #eee;
	}

	.text {
		display: block;
		padding-top: 20rpx;
		line-height: 1;
		font-size: 26rpx;
		color: #fff;
	}
}

// 表单
.form {
	background-color: #f4f4f4;

	&-content {
		margin: 20rpx 20rpx 0;
		padding: 0 20rpx;
		border-radius: 10rpx;
		background-color: #fff;
	}

	&-item {
		display: flex;
		height: 96rpx;
		line-height: 46rpx;
		padding-left: 20rpx;
		align-items: center;
		background-color: #fff;
		font-size: 28rpx;
		border-bottom: 1rpx solid #ddd;

		&:last-child {
			border: none;
		}

		.label {
			width: 180rpx;
			color: #333;
		}

		.account {
			color: #666;
		}

		.input {
			flex: 1;
			display: block;
			height: 46rpx;
		}

		.radio {
			margin-right: 20rpx;
		}

		.picker {
			flex: 1;
		}
		.placeholder {
			color: #808080;
		}
	}

	&-button {
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		margin: 30rpx 20rpx;
		color: #fff;
		border-radius: 80rpx;
		font-size: 30rpx;
		background-color: #27ba9b;
	}
}
</style>
