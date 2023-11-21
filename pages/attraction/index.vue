<template>
	<view>
		<!-- 搜索框 -->
		<u-navbar is-back="false" title="" :background="background">
			<view><uni-easyinput suffixIcon="search" placeholder="搜索景区" v-model="search.name" @iconClick="searchAttraction"></uni-easyinput></view>
		</u-navbar>

		<view class="orders">
			<view class="section">
				<view hover-class="none" class="vertical-layout" @click="getAttraction('温泉')">
					<image src="../../static/wq.png" mode="heightFix"></image>
					温泉
				</view>
				<view hover-class="none" class="vertical-layout" @click="getAttraction('游乐园')">
					<image src="../../static/yly.png" mode="heightFix"></image>
					游乐园
				</view>
				<view hover-class="none" class="vertical-layout" @click="getAttraction('度假村')">
					<image src="../../static/djc.png" mode="heightFix"></image>
					度假村
				</view>
				<view hover-class="none" class="vertical-layout" @click="getAttraction('名胜古迹')">
					<image src="../../static/msgj.png" mode="heightFix"></image>
					名胜古迹
				</view>
			</view>
		</view>

		<view class="list" style="height: 31px;">
			<view style="font-size: 14px; margin: auto 0;">{{ location }}</view>
			<button size="mini" @click="getLocation">获取地理位置</button>
		</view>

		<view>
			<navigator :url="'./detail?id=' + item.id" hover-class="none" class="list" v-for="item in list" :key="item">
				<image :src="item.headUrl"></image>
				<view class="info">
					<text style="font-size: 15px;">{{ item.name }}</text>
					<text style="font-size: 12px;">{{ item.telephone }}</text>
					<text style="font-size: 12px;">{{ item.address }}</text>
				</view>
			</navigator>
		</view>
		<view v-if="isBottom"><view style="width: 370rpx; margin: 0 auto;">———— 到底啦！————</view></view>

		<view class="u-demo-area" v-if="list.length == 0" style="height: 400px;"><u-empty mode="search" text="附件暂无景点,请选择其他地方吧!"></u-empty></view>
	</view>
</template>

<script>
import { useri } from '../../util/user.js';

export default {
	data() {
		return {
			page: 1,
			size: 10,
			total: 100,
			isBottom: false,
			background: {
				backgroundColor: '#28bb9c'
			},
			location: '未获取当前位置',
			list: [],
			search: {},
			count: 4,
			value: 2
		};
	},
	onLoad: async function() {
		await useri.getAttractionPage(this.page, this.total, null).then(resp => {
			this.list = resp.data.records;
		});
	},
	async onReachBottom() {
		if (this.total > this.page * this.size) {
			this.page++;
			await useri.getAttractionPage(this.page, this.total, null).then(resp => {
				this.list = this.list.concat(resp.data.records);
			});
		} else {
			this.isBottom = true;
		}
	},
	methods: {
		async searchAttraction() {
			await useri.getAttractionPage(this.page, this.total, this.search).then(resp => {
				this.list = resp.data.records;
			});
		},
		async getAttraction(type) {
			this.search.type = type;
			await useri.getAttractionPage(this.page, this.total, this.search).then(resp => {
				this.list = resp.data.records;
			});
		},
		getLocation() {
			uni.getLocation({
				type: 'gcj02', // 坐标系类型
				success: res => {
					var latitude = res.latitude; // 维度
					var longitude = res.longitude; // 经度
					// 使用逆地理编码获取具体位置信息
					uni.chooseLocation({
						latitude: latitude,
						longitude: longitude,
						success: res => {
							this.location = res.address.split('市')[1];
							this.search.address = res.address.substring(6, 9);
							console.log(this.search);
							useri.getAttractionPage(1, 3, this.search).then(resp => {
								this.list = resp.data.records;
							});
						}
					});
				},
				fail: function(res) {
					console.log('获取定位失败：' + res.errMsg);
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

.orders {
	position: relative;
	z-index: 99;
	padding: 10rpx 30rpx;
	margin: 20rpx 25rpx 20rpx;
	background-color: #fff;
	border-radius: 10rpx;
	box-shadow: 0 4rpx 6rpx rgba(240, 240, 240, 0.6);

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

.list {
	position: relative;
	display: flex;
	margin: 0 10px;
	padding: 0 20rpx;
	background-color: #fff;
	margin-top: 20rpx;
	border-radius: 10rpx;

	image {
		height: 200rpx;
		width: 200rpx;
		margin-left: -20rpx;
		border-radius: 10rpx;
	}

	button {
		position: absolute;
		right: 0;
		width: 115px;
		color: white;
		background-color: #28bb9c;
	}

	.info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text {
			margin: 0 0 15rpx 10rpx;
		}
	}
}

.u-demo-area {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
