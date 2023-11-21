export const api = {

	//点赞
	fellGood: (likeSum, CId) => {
		return uni.$http.get("/travel/comment/fellGood/" + likeSum + "/" + CId)
	},


	//修改评论信息
	updateComment: (data) => {
		return uni.$http.post("/travel/comment/updateComment", data)
	},

	//获取分页评论列表
	getCommentPage: (page, limit, data) => {
		return uni.$http.get("/travel/comment/" + page + "/" + limit, data)
	},

	//添加评论
	addComment: (data) => {
		return uni.$http.post("/travel/comment/addComment/", data)
	},

	//删除评论
	getTicketById: (data) => {
		return uni.$http.delete("/travel/comment/removeCommentById/${data}")
	}

}