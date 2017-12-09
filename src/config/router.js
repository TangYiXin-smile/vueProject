import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import home from '../components/Home/home.vue';
import member from '../components/Member/member.vue';
import search from '../components/Search/search.vue';
import shopcar from '../components/Shopcar/shopcar.vue';
import news from '../components/News/news.vue';
import share from '../components/Share/share.vue';
import buy from '../components/Buy/buy.vue';
import newsDetail from '../components/News/newsDetail.vue';
import shareDetail from '../components/Share/shareDetail.vue';
import buyDetail from '../components/Buy/buyDetail.vue';

let router = new VueRouter({
    linkActiveClass:'mui-active',
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:home},
        {path:'/member',component:member},
        {path:'/search',component:search},
        {path:'/shopcar',component:shopcar},
        {path:'/news',component:news},
        {path:'/share',component:share},
        {path:'/buy',component:buy},
        {path:'/news/:id',component:newsDetail,props:true},
        {path:'/share/:id',component:shareDetail,props:true},
        {path:'/buy/:id',component:buyDetail,props:true}
    ]
});
export default router;