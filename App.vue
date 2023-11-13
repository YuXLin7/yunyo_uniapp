<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	onLaunch() {
		uni.navigateTo({
			url: '/pages/login/login'
		});
	},
	onPageNotFound() {
		uni.navigateTo({
			url: '/pages/404/404'
		});
	}
};
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
</style>
