import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import uView from "uview-ui";
Vue.use(uView);

// @escook/request-miniprogram 网络请求
import {
	$http
} from '@escook/request-miniprogram'
// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http
// 请求根路径 <<<<<<<<<<<<<< 记得改一下请求路径
$http.baseUrl = "http://localhost:8088"
// 请求拦截器
$http.beforeRequest = function(options) {
	// 提示加载中
	uni.showLoading({
		title: "数据加载中..."
	})

	// 请求头添加token
	const token = uni.getStorageSync('token');
	if (token) {
		options.header = {
			"token": token
		}
	}
}
// 响应拦截器
$http.afterRequest = function(res) {
	// 关闭提示
	uni.hideLoading();
}

import store from '@/store/index.js'

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
