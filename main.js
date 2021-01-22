import Vue from 'vue'
import App from './App'
import mixin from './common/mixin/mixin'
import {
	msg,
	isLogin,
	debounce,
	throttle,
	prePage,
	reLaunch,
	loading,
	checkStr 
} from '@/common/js/util'
Vue.mixin(mixin) 
Vue.prototype.$util = {
	msg,
	isLogin,
	debounce,
	throttle,
	prePage,
	reLaunch,
	loading,
	checkStr 
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
