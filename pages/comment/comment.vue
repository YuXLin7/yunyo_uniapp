<template>
	<view>
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="all">
			<block v-for="(item, index) in commentList" :key="index">
				<view class="u-page">
					<view class="u-demo-block">
						<u-row customStyle="margin-bottom: 10px">
							<u-col span="2">
								<view>
									<u-image src="https://yanxuan-item.nosdn.127.net/da7143e0103304f0f3230715003181ee.jpg" width="40px" height="40px" shape="circle"></u-image>
								</view>
							</u-col>
							<u-col span="10">
								<view class="righttop">
									<text size="12">{{ item.name }}</text>
									<text size="12" align="right">{{ item.createTime }}</text>
								</view>
								<view><u-rate :count="count" v-model="item.likeLevel" disabled="true"></u-rate></view>
							</u-col>
						</u-row>
					</view>
				</view>
				<view class="comnetcontent">
					<text :lines="item.contentline" @click="seeall(item)">{{ item.commentContent }}</text>
					<view class="right">
						<view class="num">{{ item.likeSum }}</view>
						<u-icon class="like" v-if="item.likeByMe" name="thumb-up-fill" color="#ff0000" size="30" @click="islike(item)"></u-icon>
						<u-icon class="like" v-else name="thumb-up" size="30" @click="islike(item)"></u-icon>
					</view>
				</view>
			</block>
			<view v-if="isBottom"><view style="width: 370rpx; margin: 0 auto;">———— 到底啦！————</view></view>
		</view>
		<view class="u-demo-area" v-if="commentList.length == 0" style="height: 400px;"><u-empty mode="search" text="暂无评价"></u-empty></view>
	</view>
</template>

<script>
import { api } from '@/util/comment.js';
export default {
	data() {
		return {
			count: 5,
			page: 1,
			size: 10,
			total: 100,
			contentline: 2,
			commentList: [],
			pageObject: {
				commentContent: '',
				hotelId: '',
				attractionId: ''
			},
			isBottom: false
		};
	},
	onLoad: async function(options) {
		if (options.hotelId != undefined) {
			this.pageObject.hotelId = options.hotelId;
		}
		if (options.attractionId != undefined) {
			this.pageObject.attractionId = options.attractionId;
		}
		await api.getCommentPage(this.page, this.size, this.pageObject).then(resp => {
			this.commentList = resp.data.records;
			this.total = resp.data.total;
		});
	},
	methods: {
		async seeall(item) {
			item.contentline = 20;
		},
		async islike(item) {
			item.likeByMe = !item.likeByMe;
			if (item.likeByMe) {
				item.likeSum++;
			} else {
				item.likeSum--;
			}
			api.fellGood(item.likeSum, item.commentId).then(resp => {
				if (resp.code == 200) {
					if (item.likeByMe) {
						this.$refs.uTips.show({
							title: '点赞成功！',
							type: 'success',
							duration: '2000'
						});
					} else {
						this.$refs.uTips.show({
							title: '取消点赞！',
							type: 'warning',
							duration: '2000'
						});
					}
				}
			});
		}
	},
	async onReachBottom() {
		if (this.total > this.page * this.size) {
			this.page++;
			await api.getCommentPage(this.page, this.size, this.pageObject).then(resp => {
				this.commentList = this.commentList.concat(resp.data.records);
			});
		} else {
			this.isBottom = true;
		}
	}
};
</script>

<style lang="scss">
.all {
	padding-bottom: constant(safe-area-inset-bottom); // 兼容 IOS<11.2
	padding-bottom: env(safe-area-inset-bottom); // 兼容 IOS>11.2
	background-color: #fff;
	margin: 20rpx 20rpx;

	.righttop {
		display: flex;
		justify-content: space-between;
	}

	.comnetcontent {
		margin-bottom: 40rpx;
		border-bottom: 1px solid #d0d0d0;
		.right {
			margin-bottom: 10rpx;
			display: flex;
			font-size: 20rpx;
			align-items: center;
			justify-content: flex-end;
			color: #9a9a9a;
			.like {
				margin-left: 6rpx;
			}
			.num {
				font-size: 26rpx;
				color: #9a9a9a;
			}
		}
	}
}
.u-demo-area {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
