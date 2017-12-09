<template>
    <div class="mui-content">
        <div class="main">
            <div class="item">
                <mt-swipe :auto="4000">
                    <mt-swipe-item>
                        <a href="#">
                            轮播图
                        </a>
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <a href="#">
                            轮播图
                        </a>
                    </mt-swipe-item>
                </mt-swipe>
            </div>
            <div class="sell item">
                <h4 class="title">{{detailInfo.title}}</h4>
                <div class="p">市场价：<span class="oldprice">￥{{detailInfo.market_price}}</span>    
                销售价：<span class="price">￥{{detailInfo.sell_price}}</span></div>
                <div class="buynum">
                    购买数量: 
                </div>
                <div class="btns">
                    <button class="mui-btn mui-btn-primary">立即购买</button>
                    <button class="mui-btn mui-btn-danger">加入购物车</button>
                </div>
            </div>
            <div class="info item">
                <h5>商品参数</h5>
                <div>
                    <p>商品编号：{{detailInfo.goods_no}}</p>
                    <p>库存情况：{{detailInfo.stock_quantity}}件</p>
                    <p>上架时间：{{detailInfo.add_time | timeFmt}}</p>
                </div>
            </div>
            <div class="butt item">
                <button class="mui-btn mui-btn-primary mui-btn-outlined">图文介绍</button>
                <button class="mui-btn mui-btn-danger mui-btn-outlined">商品评论</button>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import { Swipe, SwipeItem } from 'mint-ui';
    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);
    export default{
        props:['id'],
        data(){
            return {
                lunboInfo:[],
                detailInfo:{},
            }
        },
        methods:{
            getInfo:function(){
                let url = "http://vue.studyit.io/api/goods/getinfo/"+this.id;
                this.$http.get(url).then(function(res){
                    if(res.body.status == 0){
                        this.detailInfo = res.body.message[0];
                    }
                })
            }
        },
        created:function(){
            this.getInfo();
        }
    }
</script>
<style scoped>
    .mint-swipe {
       height:238px;
    }
    .main{
        padding:0 5px;
        background-color:#fff;
        overflow:hidden;
    }
    .main .item{
        border:1px solid rgba(92, 92, 92, 0.8);
        border-radius:3px;
        margin-top:5px;
        padding:10px;
    }
    .sell{
        font-size:14px;
    }
    .sell .title{
        color:#0094ff;
        border-bottom:1px solid rgba(92, 92, 92, 0.3);
        padding-bottom:10px;
    }
    .sell div{
        padding:5px 10px;
    }
    .sell .oldprice{
        text-decoration:line-through;
        margin-right:10px;
    }
    .sell .price{
        font-size:18px;
        color:red;
    }
    .info h5{
        font-weight:bold;
        border-bottom:1px solid rgba(92, 92, 92, 0.3);
        padding-bottom:10px;
        margin-bottom:10px;
    }
    .info div{
        padding-left:30px;
    }
    .info p{
        /* text-align:center; */
        margin-bottom:0;
    }
    .butt button{
        width:100%;
    }
    .butt button:first-child{
        margin-bottom:10px;
    }
</style>
