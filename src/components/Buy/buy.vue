<template>
    <div class="mui-content">
        <ul class="proList">
            <li v-for="(item,index) in proInfo" :key="index">
                <div class="top">
                    <router-link v-bind="{'to':'/buy/'+item.id}"><img :src="item.img_url" /></router-link>
                </div>
                <div class="bottom">
                    <div class="title">{{item.title}}</div>
                    <div class="b">
                        <p><span class="price">￥{{item.sell_price}}</span>
                        <span class="oldprice">￥{{item.market_price}}</span></p>
                        <p class="hot"><span class="mui-pull-left">热卖中</span>
                        <span class="mui-pull-right">剩<i>{{item.stock_quantity}}</i>件</span></p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  data(){
      return {
          proInfo:[]
      }
  },
  methods:{
      getProInfo(page){
        var url = "http://vue.studyit.io/api/getgoods?pageindex="+page;
        this.$http.get(url).then(function(res){
            if(res.body.status == 0){
                this.proInfo = res.body.message;
            }
        })
      }
  },
  created:function(){
      this.getProInfo(1);
  }
}
</script>

<style scoped>
    .proList{
        margin:0;
        padding:5px;
        list-style:none;
        overflow:hidden;
    }
    .proList li{
        width:50%;
        box-shadow:0 0 4px #666;
        float:left;
        margin-bottom:10px;
        height:300px;
        position:relative;
        
        background-color:#fff;
    }
    .proList .top{
        padding:5px;
    }
    .proList .top a{
        display:block;
    }
    .proList .top img{
        vertical-align:top;
        width:100%;
    }
    .proList .bottom{
        background-color:rgba(92,92,92,0.1);
        overflow: hidden;
        position: absolute;
        left: 0;
        bottom:0;
    }
    .proList .b{
        padding:5px;
    }
    .proList .bottom .price{
        font-size:14px;
        color:red;
        margin-right:15px;
    }
    .proList .bottom .oldprice{
        font-size:12px;
        text-decoration:line-through;
    }
    .proList .bottom .hot{
        overflow:hidden;
        margin:0;
        font-size:12px;
    }
    .proList .bottom .hot i{
        font-style:normal;
    }
    .proList .title{
        color:#000;
        font-size:12px;
        line-height:1;
        background-color:#fff;
        padding:0 5px 5px;
    }
</style>


