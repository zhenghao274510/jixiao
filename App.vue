<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			if(uni.getStorageSync('uid')){
				uni.reLaunch({
					url:'/pages/index/index'
				})
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("@/common/css/common.css");
	@import url("@/common/css/icon.css");
	page{
		background: #f6f6f6;
	}
	@font-face {font-family: "iconfont";
	 src: url('./static/iconfont/iconfont.ttf');
	}
	
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size:32upx;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.icon-icon-arrow-bottom2:before {
	  content: "\e666";
	}
	
	.icon-you:before {
	  content: "\e639";
	}
	
	
</style>
