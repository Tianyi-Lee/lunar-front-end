import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";

import { createPinia } from "pinia";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";

import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";

import "./assets/css/global.less";

import "./assets/css/font-awesome.min.css";
import "animate.css";

createApp(App)
	.component("Editor", mavonEditor.mavonEditor)
	.use(ElementPlus, {
		locale: zhCn,
	})
	.use(router)
	.use(createPinia())
	.mount("#app");
