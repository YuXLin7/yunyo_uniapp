import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		loginState: false,
		userInfo: {}
	},
	mutations: {
		USERLOGIN(state, userInfo) {
			state.loginState = true
			state.userInfo = userInfo
		},
		USERLOGOUT(state) {
			state.loginState = false
			state.userInfo = {}
		},
		UPDATEUSERINFO(state, userInfo) {
			state.userInfo = userInfo
		}
	},
	actions: {
		userLoginAction(context, userInfo) {
			context.commit('USERLOGIN', userInfo)
		},
		userLogoutAction(context) {
			context.commit('USERLOGOUT')
		},
		updateUserInfo(context, userInfo) {
			context.commit('UPDATEUSERINFO', userInfo)
		}
	}
})

export default store
