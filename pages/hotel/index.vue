<template>
	<view>
		<u-navbar is-back="false" title="" :background="background">
			<view class="slot-wrap"><uni-easyinput suffixIcon="search" placeholder="搜索酒店" v-model="search.name" @iconClick="searchHotel"></uni-easyinput></view>
		</u-navbar>

		<view class="list" style="height: 31px;">
			<view style="font-size: 14px; margin: auto 0;">{{ location }}</view>
			<button size="mini" @click="getLocation">获取地理位置</button>
		</view>

		<view>
			<navigator :url="'./detail?id=' + item.id" hover-class="none" class="list" v-for="item in list" :key="item">
				<image src="../../static/logo.png" mode="heightFix"></image>
				<view class="info">
					<text>{{ item.name }}</text>
					<text style="font-size: 12px;">{{ item.telephone }}</text>
					<text style="font-size: 12px;">{{ item.address }}</text>
				</view>
			</navigator>
		</view>

		<view class="u-demo-area" v-if="list.length == 0" style="height: 400px;"><u-empty mode="search" text="附件暂无酒店,请选择其他地方吧!"></u-empty></view>
	</view>
</template>

<script>
import { useri } from '../../util/user.js';

export default {
	data() {
		return {
			background: {
				backgroundColor: '#28bb9c'
			},
			list: [],
			location: '未获取当前位置',
			search: {}
		};
	},
	onLoad: async function() {
		await useri.getHotelPage(1, 3, null).then(resp => {
			this.list = resp.data.records;
		});
	},
	methods: {
		async searchHotel() {
			await useri.getHotelPage(1, 3, this.search).then(resp => {
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
							this.location = res.address.substring(6, 8) + ', ' + res.name + '附近';
							this.search.address = res.address.substring(6, 9);
							console.log(this.search);
							useri.getHotelPage(1, 3, this.search).then(resp => {
								this.list = resp.data.records;
								console.log(this.list);
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
		margin-left: -20rpx;
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
			margin: 10rpx 0 0 10rpx;
		}
	}
}

.u-demo-area {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
