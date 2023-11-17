export const useri = {
	//登录
	login: (data) => {
		return uni.$http.post("/travel/login", data)
	},
	
	//发送短信验证码
	sendMsg: (data) => {
		return uni.$http.get("/travel/sendMsg?phone=" + data)
	},
	
	//发送邮箱验证码
	sendEmail: (data) => {
		return uni.$http.get("/travel/sendEmail?email=" + data)
	},

	//注册
	addUser: (data) => {
		return uni.$http.post("/travel/user/registerUser", data)
	},

	//根据用户id获取信息
	getUserById: (data) => {
		return uni.$http.get("/travel/user/selectUserById/" + data)
	},

	//修改用户信息
	updateUser: (data) => {
		return uni.$http.post("/travel/user/updateUser", data)
	},

	//获取景区列表
	getAttractionPage: (page, limit, data) => {
		return uni.$http.get("/travel/attraction/" + page + "/" + limit, data)
	},

	//根据id获取景区
	getAttractionById: (data) => {
		return uni.$http.get("/travel/attraction/getAttractionById/" + data)
	},

	//根据id获取门票信息
	getTicketById: (data) => {
		return uni.$http.get("/travel/ticket/findTicketById/" + data)
	},

	//	获取酒店列表
	getHotelPage: (page, limit, data) => {
		return uni.$http.get("/travel/hotel/" + page + "/" + limit, data)
	},

	//根据id获取酒店
	getHotelById: (data) => {
		return uni.$http.get("/travel/hotel/getHotelById/" + data)
	},
	
	//根据酒店id获取房型信息
	getRoomByHotelId: (data) => {
		return uni.$http.get("/travel/room/findRoomByHotelId/" + data)
	},

	//根据id获取房型信息
	getRoomById: (data) => {
		return uni.$http.get("/travel/room/findRoomById/" + data)
	},
}
