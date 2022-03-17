import { defineStore } from "pinia";

/**
 * defineStore第一个参数为容器的唯一id
 * 第二个参数为选项对象
 */
export const useInfoStore = defineStore("userInfo", {
  /**
   * 存储全局状态
   * 注意点:必须是箭头函数,并且返回一个状态对象
   */
  state: () => {
    return {
      name: "skyo",
      age: 0,
    };
  },
  /**
   * 类似计算属性,有缓存功能
   */
  getters: {
    gothrough8(state) {
      return state.age + 8;
    },
  },
  /**
   * 封装修改state的方法
   */
  actions: {
    /**
     * 定义actions不能用箭头函数,this的指向问题(箭头函数没有this!!!)
     */
    birthday(year: Number) {
      this.$patch((state) => {
        this.age = this.age + year.valueOf();
      });
    },
  },
});
