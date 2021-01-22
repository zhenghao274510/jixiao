import {
	request
} from '@/common/js/request'

export default {
	data() {
		return {}
	},
	methods: {
		/**
		 * navigatorTo跳转页面
		 * @param {String} url
		 * @param {Object} options
		 * @param {Boolean} options.login 是否检测登录  
		 */
		navTo(url, options = {}) {
			this.$util.throttle(() => {
				if (!url) {
					return;
				}
				if (options.login && !uni.getStorageSync('uid')) {
					url = '/pages/author/index';
				}
				uni.navigateTo({
					url
				})
			}, 300)
		},
		redirectTo(url) {
			this.$util.throttle(() => {
				if (!url) {
					return;
				}
				uni.redirectTo({
					url
				})
			}, 300)
		},
		swithTabTo(url) {
			this.$util.throttle(() => {
				if (!url) {
					return;
				}
				uni.switchTab({
					url
				})
			}, 300)
		},
		reLaunch(url) {
			this.$util.throttle(() => {
				if (!url) {
					return;
				}
				uni.reLaunch({
					url
				})
			}, 300)
		},
		showPopup(key){
			this.$util.throttle(()=>{
				this.$refs[key].show();
			}, 200)
		},
		hidePopup(key){
			this.$refs[key].hide();
		},
		setNav(title){
			uni.setNavigationBarTitle({
				title
			})
		},
		$request(url,data = {},options={}) {
			console.log(url,data,options)
			if(options.login && !uni.getStorageSync('uid')){
				if(options.navTo){
					this.reLaunch({
						url:'/pages/author/index.vue'
					})
				}
				return
			}
			return new Promise((resolve, reject) => {
				request(url, data).then(result => {
					this.$refs.confirmBtn && this.$refs.confirmBtn.stop();
					resolve(result);
				}).catch((err) => {
					reject(err);
				})
			})
		},
	},
}
