import Vue from 'vue';
//导入axios模块
import axios from 'axios';
Vue.prototype.axios = axios;
axios.defaults.baseURL = "http://vue.studyit.io";

//全局引用mint-ui
import Mint from 'mint-ui';
Vue.use(Mint);

import 'mint-ui/lib/style.css';

//引入mui
import '../../statics/css/mui.min.css';
import '../../statics/css/icons-extra.css';
//引入vue-resource
import VueResource from 'vue-resource';
Vue.use(VueResource);