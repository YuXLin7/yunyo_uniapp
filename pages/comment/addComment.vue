<template>
	<view class="contain">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="isForm">
			<u-form :model="Cform" ref="Cform">
				<u-form-item label="评分:" prop="intro" borderBottom ref="item3"><u-rate :count="count" v-model="Cform.value"></u-rate></u-form-item>
				<u-form-item prop="intro" borderBottom ref="itemcontent"><textarea v-model="Cform.commentContent" placeholder="评价内容" /></u-form-item>
			</u-form>
			<u-button type="primary" customStyle="margin-top: 50px" @click="submit">发表评论</u-button>
		</view>
	</view>
</template>

<script>
import { useri } from '../../util/user.js';
import { api } from '@/util/comment.js';

export default {
	data() {
		return {
			orderId: 0,
			count: 5,
			Cform: {
				hotelId: 0,
				attractionId: 0,
				commentContent: '',
				value: 0
			}
		};
	},
	onLoad: async function(options) {
		this.orderId = options.id;
		console.log(options);
		console.log(this.orderId);
		if (options.hotelId != null) {
			this.Cform.hotelId = options.hotelId;
			this.Cform.attractionId = null;
		}
		if (options.attractionId != null) {
			this.Cform.hotelId = null;
			this.Cform.attractionId = options.attractionId;
		}
	},
	methods: {
		submit() {
			api.addComment(this.Cform).then(resp => {
				this.$refs.uTips.show({
					title: '评论成功！',
					type: 'success',
					duration: '2000'
				});
				useri.updateOrder({ orderId: this.orderId, state: 4 });
				uni.reLaunch({
					url: '../me/index'
				});
			});
		}
	}
};
</script>

<style lang="scss">
.contain {
	margin: 10px;
}
</style>
