<template>
	<view>
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="content">
			<form>
				<view class="form-item">
					<text class="label">游客姓名</text>
					<input class="input" placeholder="请填写游客姓名" v-model="visitor.name" />
				</view>
				<view class="form-item">
					<text class="label">手机号码</text>
					<input class="input" placeholder="请填写游客手机号码" v-model="visitor.phone" />
				</view>
				<view class="form-item">
					<text class="label">身份证号</text>
					<input class="input" placeholder="请填写游客身份证号" v-model="visitor.idCard" />
				</view>
				<view class="form-item">
					<label class="label">设为默认使用</label>
					<switch class="switch" color="#27ba9b" :checked="checked" @change="switchChange" />
				</view>
			</form>
		</view>
		<!-- 提交按钮 -->
		<button class="button" @click="addVisitor">保存并使用</button>
	</view>
</template>

<script>
import { useri } from '../../util/user.js';
import { mapState } from 'vuex';

export default {
	data() {
		return {
			isAdd: 1,
			visitor: {},
			name: '',
			phone: '',
			idCard: '',
			checked: false
		};
	},
	computed: {
		...mapState(['userInfo'])
	},
	onLoad: async function(options) {
		if (options.id != undefined) {
			this.isAdd = 0
			await useri.getVisitorById(options.id).then(resp => {
				this.visitor = resp.data;
				this.checked = this.visitor.isDefault == 1 ? true : false;
			});
		}
		this.visitor.isDefault = 0;
	},
	methods: {
		switchChange: function(e) {
			this.visitor.isDefault = e.detail.value ? 1 : 0;
		},
		async addVisitor() {
			if (this.visitor.userId == undefined) {
				this.visitor.userId = this.userInfo.id;
			}
			if (this.isAdd == 1) {
				await useri.addVisitor(this.visitor).then(resp => {
					if (resp.code == 200) {
						this.$refs.uTips.show({
							title: '已新增游客信息！',
							type: 'success',
							duration: '2000'
						});
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/me/index'
							});
						}, 2000);
					}
				});
			} else {
				await useri.updateVisitor(this.visitor).then(resp => {
					if (resp.code == 200) {
						this.$refs.uTips.show({
							title: '已修改游客信息！',
							type: 'success',
							duration: '2000'
						});
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/me/index'
							});
						}, 2000);
					}
				});
			}
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f4f4f4;
}

.content {
	margin: 20rpx 20rpx 0;
	padding: 0 20rpx;
	border-radius: 10rpx;
	background-color: #fff;

	.form-item,
	.uni-forms-item {
		display: flex;
		align-items: center;
		min-height: 96rpx;
		padding-left: 10px;
		background-color: #fff;
		font-size: 28rpx;
		border-bottom: 1rpx solid #ddd;
		position: relative;
		margin-bottom: 0;

		// 调整 uni-forms 样式
		.uni-forms-item__content {
			display: flex;
		}

		.uni-forms-item__error {
			margin-left: 200rpx;
		}

		&:last-child {
			border: none;
		}

		.label {
			width: 200rpx;
			color: #333;
		}

		.input {
			flex: 1;
			display: block;
			height: 46rpx;
		}

		.switch {
			position: absolute;
			right: -20rpx;
			transform: scale(0.8);
		}

		.picker {
			flex: 1;
		}

		.placeholder {
			color: #808080;
		}
	}
}

.button {
	height: 80rpx;
	margin: 30rpx 20rpx;
	color: #fff;
	border-radius: 80rpx;
	font-size: 30rpx;
	background-color: #27ba9b;
}
</style>
