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
import goodsComment from '../components/Buy/goodsComment.vue';
import goodsDesc from '../components/Buy/desc.vue';

let router = new VueRouter({
    linkActiveClass:'mui-active',
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:home,meta:{title:'首页'}},
        {path:'/member',component:member,meta:{title:'会员中心'}},
        {path:'/search',component:search,meta:{title:'搜索'}},
        {path:'/shopcar',component:shopcar,meta:{title:'购物车'}},
        {path:'/news',component:news},
        {path:'/share',component:share},
        {path:'/buy',component:buy},
        {path:'/news/:id',component:newsDetail,props:true},
        {path:'/share/:id',component:shareDetail,props:true},
        {path:'/buy/:id',component:buyDetail,props:true},
        {name:'goodsComment',path:'/buy/comment/:id',component:goodsComment,props:true},
        {name:'goodsDesc',path:'/buy/desc/:id',component:goodsDesc,props:true}
    ]
});

//在路由跳转之后执行,给页面添加标题
router.afterEach((to,from)=>{
    if(to.meta.title){
        document.title = to.meta.title;
    }else{
        let num = to.path.lastIndexOf('/');
        document.title = to.path.slice(1,num);
    }
})
export default router;