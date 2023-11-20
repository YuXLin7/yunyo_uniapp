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
					<text style="font-size: 25px;">{{ attractionInfo.name }}</text>
				</view>
			</view>

			<!-- 操作面板 -->
			<view class="action">
				<view class="item arrow">
					<text class="label">景区热线：</text>
					<text>{{ attractionInfo.telephone }}</text>
				</view>
				<view class="item arrow">
					<text class="label">营业时间：</text>
					<text>{{ attractionInfo.openingHours }} - {{ attractionInfo.closingHours }}, {{ attractionInfo.stopEntry }}停止入场</text>
				</view>
				<view class="item arrow">
					<text class="label">景区地址：</text>
					<text>{{ attractionInfo.address }}</text>
				</view>
				<view class="item arrow">
					<text class="label">优惠政策：</text>
					<text>{{ attractionInfo.policy }}</text>
				</view>
				<view class="item arrow">
					<text class="label">景区设施：</text>
					<text>{{ attractionInfo.facilities }}</text>
				</view>
				<view class="item arrow">
					<text class="label">景区介绍：</text>
					<text>{{ attractionInfo.detail }}</text>
				</view>
			</view>

			<!-- 门票列表 -->
			<view class="list">
				<text hover-class="none" class="item arrow">门票</text>
				<!-- :url="'./order?id=' + item.id + '&name=' + attractionInfo.name + item.name" -->
				<view hover-class="none" class="item arrow" v-for="item in ticketList" :key="item">
					{{ item.name }}
					<text class="num">已售129</text>
					<text class="price">{{ item.price }}</text>
					<!-- <button size="mini" @click="addOrder(item.name, item.price)">预定</button> -->
					<button size="mini" @click="addOrder(item.name, item.price)">预定</button>
				</view>
			</view>

			<u-popup v-model="show" mode="bottom" border-radius="14" height="500px">
				<view style="font-size: 20px; text-align: center; margin: 20rpx 0 0 0;">提交订单</view>

				<view class="lis">
					<view class="name">{{ name }}</view>

					<view class="useDate">
						<text>{{ useTime }}</text>
						<button size="mini" @click="show2 = true">选择日期</button>
						<view>
							<u-calendar
								v-model="show2"
								ref="calendar"
								@change="change"
								mode="date"
								:min-date="today"
								:max-date="maxDay"
								range-color="#19be6b"
								range-bg-color="#19be6b"
								active-bg-color="#19be6b"
								btn-type="success"
							></u-calendar>
						</view>
					</view>

					<view class="num">
						<text>选择数量</text>
						<u-number-box v-model="num" @change="valChange" :min="1" :input-width="150" :input-height="60" bg-color="#fff"></u-number-box>
					</view>
				</view>

				<view class="visitorList">
					<text style="font-size: 18px;">游客信息</text>
					<text style="margin-left: 20rpx;" v-if="num == 1">
						须填
						<text style="color: red; margin: 0 10rpx;">1</text>
						位，用于入园身份验证
					</text>
					<text style="margin-left: 20rpx;" v-if="num != 1">
						只须填
						<text style="color: red; margin: 0 10rpx;">1</text>
						位，其余游客信息无需填写
					</text>
					<view class="visitors">
						<u-radio-group v-model="value" @change="radioGroupChange">
							<u-radio v-for="(item, index) in list" :key="index" :name="item.name" :disabled="item.disabled">{{ item.name }}</u-radio>
							<u-button class="more" shape="circle" size="mini">更多</u-button>
						</u-radio-group>
						<view class="info">
							<u-button class="clean" shape="circle" size="mini" style="width: 10px;">✖</u-button>
							<view class="name">名字</view>
							<view class="phone">手机号 18923043691</view>
							<u-button class="edit" shape="circle" size="mini">编辑</u-button>
						</view>
					</view>
				</view>

				<button class="order" type="default" @click="commit">提交订单</button>
			</u-popup>
		</view>
	</view>
</template>

<script>
import { useri } from '../../util/user.js';
import { mapState } from 'vuex';

export default {
	data() {
		return {
			attractionId: 0,
			currentIndex: 0,
			attractionInfo: {},
			ticketList: {},
			show: false,
			name: '',
			price: 0,
			ticketId: 0,
			num: 1,
			show2: false,
			useTime: '选择日期',
			today: '',
			maxDay: '',
			value: 'orange',
			list: [
				{
					name: 'apple',
					disabled: false
				},
				{
					name: 'banner',
					disabled: false
				},
				{
					name: 'orange',
					disabled: false
				}
			]
		};
	},
	onLoad: async function(options) {
		this.attractionId = options.id;
		await useri.getAttractionById(options.id).then(resp => {
			this.attractionInfo = resp.data;
		});
		await useri.getTicketById(options.id).then(resp => {
			this.ticketList = resp.data;
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
	computed: {
		...mapState(['userInfo'])
	},
	methods: {
		swiperChange(e) {
			this.currentIndex = e.detail.current;
		},
		addOrder(ticket, price) {
			this.name = this.attractionInfo.name + '-' + ticket
			this.price = price
			this.show = true
		},
		async commit() {
			this.show = false
			const data = {
				userId: this.userInfo.id,
				goodsType: 1,
				attractionId: this.attractionId,
				name: this.name,
				num: this.num,
				price: this.price,
				useTime: this.useTime + ' 00:00:00',
				state: 1
			};
			console.log(data);
			await useri.addOrder(data).then(resp => {
				if (resp.code == 200) {
					this.$refs.uTips.show({
						title: '预定成功，请及时付款！',
						type: 'success',
						duration: '2000'
					})
				}
			});
		},
		change(e) {
			this.useTime = e.result;
		},
		valChange(e) {
			this.num = e.value;
		},
		radioGroupChange(e) {
			console.log(e);
		}
	}
};
</script>

<style lang="scss">
.goods {
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
			width: auto;
			color: #898b94;
			margin: 0 16rpx 0 10rpx;
		}
		.text {
			flex: 1;
			-webkit-line-clamp: 1;
		}
	}
	/* 列表 */
	.list {
		margin: 0 10px;
		padding: 0 20rpx;
		background-color: #f4f4f4;
		margin-bottom: 20rpx;
		border-radius: 10rpx;
		.item {
			line-height: 90rpx;
			padding-left: 10rpx;
			font-size: 17px;
			color: #333;
			border-top: 1rpx solid #ddd;
			position: relative;
			text-align: left;
			border-radius: 0;
			background-color: #f4f4f4;
			&::after {
				width: auto;
				height: auto;
				left: auto;
				border: none;
			}
			&:first-child {
				border: none;
			}
			&::after {
				content: '';
				right: 5rpx;
			}
			.num {
				margin-left: 20rpx;
				font-size: 10px;
			}
			.price {
				position: absolute;
				right: 70px;
				color: red;

				&::before {
					content: '￥';
					font-size: 80%;
				}
			}
			button {
				width: 60px;
				font-size: 10px;
				position: absolute;
				right: 0;
				top: 25%;
				background-color: #ff7d25;
				color: white;
			}
		}
	}

	/deep/.u-mode-center-box {
		background-color: #28bb9c;
	}

	.lis {
		margin: 0 10px;
		padding: 4rpx 40rpx;
		background-color: #e5e5e5;
		margin-top: 30rpx;
		border-radius: 10rpx;

		.name {
			font-size: 18px;
			margin: 40rpx 0;
		}

		.useDate {
			display: flex;
			font-size: 15px;
			text {
				width: auto;
				margin: auto 0;
			}
			button {
				width: auto;
				color: white;
				background-color: #28bb9c;
				margin-right: 40rpx;
			}
		}

		.num {
			font-size: 15px;
			margin: 40rpx 0;
			text {
				margin: auto 0;
			}
			u-number-box {
				margin-left: 200rpx;
			}
		}
	}

	.visitorList {
		position: relative;
		margin: 0 10px;
		padding: 20rpx 40rpx 5rpx 40rpx;
		background-color: #e5e5e5;
		margin-top: 20rpx;
		border-radius: 10rpx;

		.visitors {
			position: relative;
			margin: 20rpx 0;
			.more {
				position: absolute;
				right: 30rpx;
			}
			.info {
				position: relative;
				margin: 20rpx 0;
				width: 600rpx;
				height: 100rpx;
				border-top: 1px solid #bfbfbf;
				.clean {
					position: absolute;
					left: 0;
					top: 30%;
				}
				.name {
					position: absolute;
					top: 10rpx;
					left: 100rpx;
				}
				.phone {
					position: absolute;
					bottom: 0;
					left: 100rpx;
				}
				.edit {
					position: absolute;
					right: 0;
					top: 30%;
				}
			}
		}
	}

	.order {
		background-color: #28bb9c;
		color: white;
		margin: 20rpx 24rpx 0 24rpx;
	}
}
</style>
