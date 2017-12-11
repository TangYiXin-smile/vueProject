<template>
    <div class="mui-content">
        <div class="main">
            <div class="item">
                <swipe :send-url="imgUrl"></swipe>
            </div>
            <div class="sell item">
                <h4 class="title">{{detailInfo.title}}</h4>
                <div class="p">市场价：<span class="oldprice">￥{{detailInfo.market_price}}</span>    
                销售价：<span class="price">￥{{detailInfo.sell_price}}</span></div>
                <div class="buynum">
                    <span class="word">购买数量: </span>
                    <number :stock="detailInfo.stock_quantity"
                    @numberChange="numberChanged"></number>
                </div>
                <div class="btns">
                    <button class="mui-btn mui-btn-primary">立即购买</button>
                    <button class="mui-btn mui-btn-danger" @click="addcart">加入购物车</button>
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
                <button class="mui-btn mui-btn-primary mui-btn-outlined" @click="toDesc">图文介绍</button>
                <button class="mui-btn mui-btn-danger mui-btn-outlined" @click="toComment">商品评论</button>
            </div>
        </div>
    </div>
</template>
<script>
    import vueObj from '../../config/communication';
    import number from '../Common/number.vue';
    import swipe from '../Common/swipe.vue';
    export default{
        props:['id'],
        data(){
            return {
                detailInfo:{},
                imgUrl:"/api/getthumimages/"+this.id,
                count:1
            }
        },
        methods:{
            getInfo:function(){
                let url = "/api/goods/getinfo/"+this.id;
                this.axios.get(url).then((res)=>{
                    if(res.status == 200 && res.data.status == 0){
                        if(res.data.message.length > 0){
                            this.detailInfo = res.data.message[0];
                        }
                    }else{
                        console.log('服务器内部出错');
                    }
                })
                .catch((err)=>{
                    console.error(err);
                });
            },
            numberChanged(count){
                this.count = count;
            },
            addcart(){
                //点击加入购物车时，应该将number组件的值传给app.vue用来显示商品数量
                //利用$emit和$on来传递this.count
                vueObj.$emit('getCount',this.count);
            },
            toComment(){
                this.$router.push({name:'goodsComment',params:{id:this.id}});
            },
            toDesc(){
                this.$router.push({name:'goodsDesc',params:{id:this.id}});
            }
        },
        created:function(){
            this.getInfo();
        },
        components:{
            swipe,
            number
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
    .sell .buynum {
        padding:0 10px;
    }
    .sell .buynum .word{
        display:inline-block;
        vertical-align: top;
        padding-top:10px;
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
