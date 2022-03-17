import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";

import "./assets/css/global.less";
import "./assets/css/font-awesome.min.css";

createApp(App)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(router)
  .use(createPinia())
  .mount("#app");
