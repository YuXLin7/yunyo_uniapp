<template>
	<view>
		<view class="content">
			<form>
				<!-- 表单内容 -->
				<view class="form-item">
					<text class="label">游客姓名</text>
					<input class="input" placeholder="请填写游客姓名" value="" />
				</view>
				<view class="form-item">
					<text class="label">手机号码</text>
					<input class="input" placeholder="请填写游客手机号码" value="" />
				</view>
				<view class="form-item">
					<text class="label">身份证号</text>
					<input class="input" placeholder="请填写游客身份证号" value="" />
				</view>
				<view class="form-item">
					<label class="label">设为默认使用</label>
					<switch class="switch" color="#27ba9b" :checked="true" />
				</view>
			</form>
		</view>
		<!-- 提交按钮 -->
		<button class="button">保存并使用</button>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
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
