<template>
	<view>
		<u-top-tips ref="uTips"></u-top-tips>
		<!-- 基本信息 -->
		<view class="goods">
			<!-- 商品主图 -->
			<view class="preview">
				<swiper style="height: 100%;" @change="swiperChange">
					<swiper-item><image mode="aspectFill" src="https://yanxuan-item.nosdn.127.net/99c83709ca5f9fd5c5bb35d207ad7822.png" /></swiper-item>
					<swiper-item><image mode="aspectFill" src="https://yanxuan-item.nosdn.127.net/f9107d47c08f0b99c097e30055c39e1a.png" /></swiper-item>
					<swiper-item><image mode="aspectFill" src="https://yanxuan-item.nosdn.127.net/754c56785cc8c39f7414752f62d79872.png" /></swiper-item>
					<swiper-item><image mode="aspectFill" src="https://yanxuan-item.nosdn.127.net/ef16f8127610ef56a2a10466d6dae157.jpg" /></swiper-item>
					<swiper-item><image mode="aspectFill" src="https://yanxuan-item.nosdn.127.net/1f0c3f5d32b0e804deb9b3d56ea6c3b2.png" /></swiper-item>
				</swiper>
				<view class="indicator">
					<text class="current">{{ currentIndex + 1 }}</text>
					<text class="split">/</text>
					<text class="total">5</text>
				</view>
			</view>

			<!-- 商品简介 -->
			<view class="meta">
				<view class="price">
					<text style="font-size: 25px;">{{ roomInfo.name }}</text>
				</view>
			</view>

			<!-- 操作面板 -->
			<view class="action">
				<view class="item arrow">
					<text class="label">床型：</text>
					<text>{{ roomInfo.bedType }}</text>
				</view>
				<view class="item arrow">
					<text class="label">人数：</text>
					<text>可住{{ roomInfo.peopleNum }}名成年人</text>
				</view>
				<view class="item arrow">
					<text class="label">房间大小：</text>
					<text>{{ roomInfo.area }}㎡</text>
				</view>
				<view class="item arrow">
					<text class="label">详细介绍：</text>
					<text>{{ roomInfo.detail }}</text>
				</view>
			</view>

			<view class="lis">
				<view class="useDate">
					<text>入住日期</text>
					<button class="date" size="mini" @click="show = true">选择日期</button>
					<view>
						<u-calendar
							v-model="show"
							ref="calendar"
							@change="change"
							mode="range"
							:start-text="startText"
							:end-text="endText"
							:range-color="rangeColor"
							:range-bg-color="rangeBgColor"
							:active-bg-color="activeBgColor"
							:btn-type="btnType"
							:min-date="today"
							:max-date="maxDay"
						></u-calendar>
					</view>
				</view>

				<view class="num">
					<text>房间数量</text>
					<u-number-box v-model="num" @change="valChange" :min="1" :input-width="150" :input-height="60" bg-color="#fff"></u-number-box>
				</view>
			</view>

			<view class="visitorList">
				<text style="font-size: 18px;">住客信息</text>
				<text style="margin-left: 20rpx;">
					须填
					<text style="color: red; margin: 0 10rpx;">{{ num }}</text>
					位，用于入住身份验证
				</text>
				<view class="visitors">
					<view class="phone">
						<text style="font-size: 18px; margin: auto 0;">联系手机：</text>
						<uni-easyinput v-model="vPhone" placeholder="请输入联系手机"></uni-easyinput>
					</view>
					<view class="info" v-for="(item, index) in num" :key="index">
						<view class="name">
							<text style="font-size: 18px; margin: auto 0;">住客姓名：</text>
							<uni-easyinput v-model="vName" placeholder="每间只填1人, 姓名不可重复"></uni-easyinput>
						</view>
					</view>
				</view>
			</view>

			<button type="default" @click="commit">立即订购</button>
		</view>
	</view>
</template>

<script>
import { useri } from '../../util/user.js';
import { mapState } from 'vuex';

export default {
	data() {
		return {
			currentIndex: 0,
			roomInfo: {},
			hotelId: 0,
			hotelName: '',
			num: 1,
			price: 0,
			show: false,
			show3: false,
			show4: false,
			result: '请选择日期',
			startText: '住店',
			endText: '离店',
			activeBgColor: '#35c8a9',
			rangeColor: '#35c8a9',
			rangeBgColor: '#35c8a9',
			btnType: 'success',
			today: '',
			maxDay: '',
			list: [],
			vName: '',
			vPhone: '',
			selectedItem: '',
			selectedList: []
		};
	},
	onLoad: async function(options) {
		const data = JSON.parse(decodeURIComponent(options.data));
		this.hotelId = data.hotelId;
		this.hotelName = data.hotelName;
		this.price = data.price;

		await useri.getRoomById(data.roomId).then(resp => {
			this.roomInfo = resp.data;
		});
		await useri.getAllVisitorByUserId(this.userInfo.id).then(resp => {
			resp.data.forEach(item => {
				this.selectedList.push({ label: item.name, value: item.phone });
			});
		});
		await useri.getVisitorByUserId(1, 3, this.userInfo.id).then(resp => {
			this.list = resp.data.records;
		});

		const today = new Date();
		const year = today.getFullYear();
		const month = today.getMonth() + 1;
		const day = today.getDate();
		this.today = year + '-' + month + '-' + day;

		const maxDate = new Date(today);
		maxDate.setDate(day + 14);
		const maxYear = maxDate.getFullYear();
		const maxMonth = maxDate.getMonth() + 1;
		const maxDay = maxDate.getDate();
		this.maxDay = maxYear + '-' + maxMonth + '-' + maxDay;
	},
	methods: {
		swiperChange(e) {
			this.currentIndex = e.detail.current;
		},
		change(e) {
			this.result = e.startDate + '入住,' + e.endDate + '离店';
		},
		valChange(e) {
			this.num = e.value;
		},
		async commit() {
			this.show = false;
			const data = {
				userId: this.userInfo.id,
				goodsType: 2,
				hotelId: this.hotelId,
				name: this.hotelName,
				num: this.num,
				price: this.price * this.num,
				useTime: this.result.substring(0, 10) + ' 00:00:00',
				state: 1
			};
			console.log(data);
			await useri.addOrder(data).then(resp => {
				if (resp.code == 200) {
					this.$refs.uTips.show({
						title: '预定成功，请及时付款！',
						type: 'success',
						duration: '2000'
					});
				}
			});
		},
		radioChange(name, phone) {
			this.vName = name;
			this.vPhone = phone;
		},
		clearSelection() {
			this.selectedItem = '';
			this.vName = '';
			this.vPhone = '';
		},
		async more() {
			this.show3 = true;
		},
		selectVisitor(e) {
			e.map((val, index) => {
				this.selectedItem = val.label;
				this.vName = val.label;
				this.vPhone = val.value;
			});
		}
	},
	computed: {
		...mapState(['userInfo']),
		pickerValue: {
			get() {
				return this.selectedValue;
			},
			set(val) {
				this.selectedValue = val;
				console.log(this.selectedValue);
				if (val) {
					this.show = true; // 当 selectedValue 有值时，show为true
				} else {
					this.show = false; // 当 selectedValue 为空时，show为false
				}
			}
		}
	}
};
</script>

<style lang="scss">
.goods {
	width: 100%;
	height: 100%;
	padding-bottom: constant(safe-area-inset-bottom); // 兼容 IOS<11.2
	padding-bottom: env(safe-area-inset-bottom); // 兼容 IOS>11.2
	background-color: #fff;
	.preview {
		height: 750rpx;
		position: relative;
		image {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		.indicator {
			height: 40rpx;
			padding: 0 24rpx;
			line-height: 40rpx;
			border-radius: 30rpx;
			color: #fff;
			font-family: Arial, Helvetica, sans-serif;
			background-color: rgba(0, 0, 0, 0.3);
			position: absolute;
			bottom: 30rpx;
			right: 30rpx;
			.current {
				font-size: 26rpx;
			}
			.split {
				font-size: 24rpx;
				margin: 0 1rpx 0 2rpx;
			}
			.total {
				font-size: 24rpx;
			}
		}
	}
	.meta {
		position: relative;
		border-bottom: 1rpx solid #eaeaea;
		.price {
			height: auto;
			color: #fff;
			font-size: 34rpx;
			padding: 10rpx 20rpx;
			box-sizing: border-box;
			background-color: #35c8a9;
			display: flex;
			flex-direction: column;
			justify-content: center;
			text {
				margin: 10rpx 10rpx;
			}
		}
		.brand {
			width: 160rpx;
			height: 80rpx;
			overflow: hidden;
			position: absolute;
			top: 26rpx;
			right: 30rpx;
		}
	}
	.action {
		padding-left: 20rpx;
		.item {
			height: 90rpx;
			padding-right: 60rpx;
			border-bottom: 1rpx solid #eaeaea;
			font-size: 26rpx;
			color: #333;
			position: relative;
			display: flex;
			align-items: center;
			&:last-child {
				border-bottom: 0 none;
			}
		}
		.label {
			width: 57px;
			color: #898b94;
			margin: 0 16rpx 0 10rpx;
		}
		.text {
			flex: 1;
			-webkit-line-clamp: 1;
		}
	}
	.lis {
		margin: 0 10px;
		padding: 4rpx 40rpx;
		background-color: #e5e5e5;
		margin-top: 30rpx;
		border-radius: 10rpx;

		.useDate {
			position: relative;
			margin: 30rpx 0;
			display: flex;
			font-size: 15px;
			text {
				width: auto;
				margin: auto 0;
			}
			.date {
				position: absolute;
				width: auto;
				color: white;
				background-color: #28bb9c;
				right: 80rpx;
				top: -8rpx;
			}
		}

		.num {
			font-size: 15px;
			margin: 30rpx 0;
			text {
				margin: auto 0;
			}
			u-number-box {
				margin-left: 200rpx;
			}
		}
	}

	.visitorList {
		margin: 20rpx 10px;
		padding: 20rpx 40rpx 5rpx 40rpx;
		background-color: #e5e5e5;
		margin-top: 20rpx;
		border-radius: 10rpx;

		.visitors {
			margin: 20rpx 0;
			.phone {
				display: flex;
				margin: 0 50rpx 0 20rpx;
			}
			.info {
				margin: 20rpx 0;
				width: 600rpx;
				height: 100rpx;
				border-top: 1px solid #bfbfbf;
				.name {
					display: flex;
					margin: 20rpx 20rpx;
				}
			}
		}
	}
	button {
		margin: 0 auto;
		background-color: #28bb9c;
		color: white;
		width: 300px;
	}
}
</style>
