<template>
    <div class="mui-content">
        <swipe :sendUrl="getUrl"></swipe>
        <!-- <mt-swipe :auto="4000">
            <mt-swipe-item>
                <a href="#">
                    <img src="../../../statics/images/01.jpg"/>
                </a>
            </mt-swipe-item>
            <mt-swipe-item>
                <a href="#">
                    <img src="../../../statics/images/01.jpg"/>
                </a>
            </mt-swipe-item>
            <mt-swipe-item>
                <a href="#">
                    <img src="../../../statics/images/01.jpg"/>
                </a>
            </mt-swipe-item>
        </mt-swipe> -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/news">
                    <img src="../../../statics/images/menu1.png" class="menuImg"/>
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/share">
                    <img src="../../../statics/images/menu2.png" class="menuImg"/>
                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/buy">
                    <img src="../../../statics/images/menu3.png" class="menuImg"/>
                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/feedback">
                    <img src="../../../statics/images/menu4.png" class="menuImg"/>
                    <div class="mui-media-body">留言反馈</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/video">
                    <img src="../../../statics/images/menu5.png" class="menuImg"/>
                    <div class="mui-media-body">视频专区</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/contact">
                    <img src="../../../statics/images/menu6.png" class="menuImg"/>
                    <div class="mui-media-body">联系我们</div>
                </router-link>
            </li>
        </ul> 
    </div>
</template>
<script>
    // import Vue from 'vue';
    // import { Swipe, SwipeItem } from 'mint-ui';
    // Vue.component(Swipe.name, Swipe);
    // Vue.component(SwipeItem.name, SwipeItem);
    import swipe from '../Common/swipe.vue';
    export default{
        data(){
            return{
                getUrl:'http://vue.studyit.io/api/getlunbo'
            }
        },
        created(){
            
        },
        methods:{
            
        },
        components:{
            swipe
        }
    }
</script>
<style scoped>
    .mui-content{
        background:#fff;
    }
    .menuImg{
        width:80%;
    }
   .mui-content .mui-grid-view.mui-grid-9{
       background:#fff;
   }
</style>