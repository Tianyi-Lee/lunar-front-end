import { defineStore } from "pinia";

/**
 * defineStore第一个参数为容器的唯一id
 * 第二个参数为选项对象
 */

export const useUserInfoStore = defineStore("userInfo", {
	/**
	 * 存储全局状态
	 * 注意点:必须是箭头函数,并且返回一个状态对象
	 */
	state: () => {
		return {
			userName: "",
			userAvatar: "",
			userLimit: -1,
		};
	},
	/**
	 * 类似计算属性,有缓存功能
	 */
	getters: {
		getUserInfo(state) {
			return {
				userName: state.userName,
				userAvatar: state.userAvatar,
				userLimit: state.userLimit,
			};
		},
	},

	actions: {
		setUserInfo(userInfo: any) {
			this.userName = userInfo.userName;
			this.userAvatar = userInfo.userAvatar;
			this.userLimit = userInfo.userLimit;
		},
	},
});
