<template>
	<view>
		<custom-navbar @safe-height="getHeight"></custom-navbar>
		<view :style="{ marginTop: height + 'px' }">
			<text>这是景点模块</text>
		</view>
	</view>
</template>

<script>
import CustomNavbar from '../../components/CustomNavbar.vue';

export default {
	data() {
		return {
			height: '',
		};
	},
	components: {
		CustomNavbar
	},
	methods: {
		getHeight(safeAreaInsets) {
			this.height = safeAreaInsets
		},
	}
};
</script>

<style></style>
