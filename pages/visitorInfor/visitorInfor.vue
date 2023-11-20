<template>
	<view class="viewport">
		<u-top-tips ref="uTips"></u-top-tips>
		<!-- 游客信息列表 -->
		<scroll-view class="scroll-view" scroll-y>
			<view class="address">
				<view class="address-list">
					<!-- 游客信息项 -->
					<view class="item" v-for="item in list" :key="item">
						<view class="item-content">
							<view class="user">
								{{ item.name }}
								<text class="contact">{{ item.phone }}</text>
								<text v-if="item.isDefault == 1" class="badge">默认</text>
							</view>
							<view class="locate">{{ item.idCard }}</view>
							<navigator class="edit" :url="`/pages/visitorInfor/addVisitor?id=` + item.id">修改</navigator>
							<view class="delete" @click="showModal(item.id)">删除</view>
						</view>
					</view>
				</view>
			</view>
			<view class="u-demo-area" v-if="list.length == 0" style="height: 400px;"><u-empty mode="data" text="暂无游客信息!"></u-empty></view>
		</scroll-view>
		<u-modal v-model="show" content="确定删除该游客信息？" show-cancel-button="true" @confirm="deleteVisitor"></u-modal>
		<!-- 添加按钮 -->
		<view class="add-btn"><navigator hover-class="none" url="/pages/visitorInfor/addVisitor">新建游客</navigator></view>
	</view>
</template>

<script>
import { useri } from '../../util/user.js';
import { mapState, mapActions } from 'vuex';

export default {
	data() {
		return {
			list: [],
			show: false,
			id: 0
		};
	},
	onLoad: async function(options) {
		await useri.getAllVisitorByUserId(options.id).then(resp => {
			this.list = resp.data;
		});
	},
	computed: {
		...mapState(['userInfo'])
	},
	methods: {
		showModal(value) {
			this.show = true;
			this.id = value;
		},
		async deleteVisitor() {
			await useri.deleteVisitor(this.id).then(resp => {
				if (resp.code == 200) {
					this.$refs.uTips.show({
						title: '已删除游客信息！',
						type: 'success',
						duration: '2000'
					});
				}
			});
		}
	}
};
</script>

<style lang="scss">
page {
	height: 100%;
	overflow: hidden;
}

/* 删除按钮 */
.delete-button {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 50px;
	height: 100%;
	font-size: 28rpx;
	color: #fff;
	border-radius: 0;
	padding: 0;
	background-color: #cf4444;
}

.viewport {
	display: flex;
	flex-direction: column;
	height: 100%;
	background-color: #f4f4f4;

	.scroll-view {
		padding-top: 20rpx;
	}
}

.address {
	padding: 0 20rpx;
	margin: 0 20rpx;
	border-radius: 10rpx;
	background-color: #fff;

	.item-content {
		line-height: 1;
		padding: 40rpx 10rpx 38rpx;
		border-bottom: 1rpx solid #ddd;
		position: relative;

		.edit {
			position: absolute;
			top: 36rpx;
			right: 100rpx;
			padding: 2rpx 0 2rpx 20rpx;
			border-left: 1rpx solid #666;
			font-size: 26rpx;
			color: #666;
			line-height: 1;
		}

		.delete {
			position: absolute;
			top: 36rpx;
			right: 30rpx;
			padding: 2rpx 0 2rpx 20rpx;
			font-size: 26rpx;
			color: #666;
			line-height: 1;
		}
	}

	.item:last-child .item-content {
		border: none;
	}

	.user {
		font-size: 28rpx;
		margin-bottom: 20rpx;
		color: #333;

		.contact {
			color: #666;
			margin-left: 7px;
		}

		.badge {
			display: inline-block;
			padding: 4rpx 10rpx 2rpx 14rpx;
			margin: 2rpx 0 0 10rpx;
			font-size: 26rpx;
			color: #27ba9b;
			border-radius: 6rpx;
			border: 1rpx solid #27ba9b;
		}
	}

	.locate {
		line-height: 1.6;
		font-size: 26rpx;
		color: #333;
	}
}

.blank {
	margin-top: 300rpx;
	text-align: center;
	font-size: 32rpx;
	color: #888;
}

.add-btn {
	height: 80rpx;
	text-align: center;
	line-height: 80rpx;
	margin: 30rpx 20rpx;
	color: #fff;
	border-radius: 80rpx;
	font-size: 30rpx;
	background-color: #27ba9b;
}

.u-demo-area {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
