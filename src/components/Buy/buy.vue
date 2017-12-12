<template>
    <div class="mui-content" ref="muicontent">
        <mt-loadmore :autoFill="false" :bottom-method="loadBottom" 
        :bottom-all-loaded="allLoaded" ref="loadmore"
         @bottom-status-change="statusChange">
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
        </mt-loadmore>
    </div>
</template>
<script>
export default {
  data(){
      return {
          proInfo:[],
          allLoaded:false,
          page:1
      }
  },
  methods:{
      //获取商品列表数据
      getProInfo(page){
        var url = "/api/getgoods?pageindex="+page;
        this.axios.get(url).then((res)=>{
            if(res.status == 200 && res.data.status == 0){
                //成功获取到商品列表数据之后
                if(res.data.message.length == 0){
                    //数据已全部获取完毕，再上拉时不会执行loadBottom
                    this.allLoaded = true;
                    this.$toast('没有更多了！');
                }
                //因为请求是异步执行的，所以需要在数据请求到之后设置
                this.proInfo = this.proInfo.concat(res.data.message);
                //在加载数据之后对组件进行重新定位
                this.$refs.loadmore.onBottomLoaded();
            }
        })
        .catch((err)=>{
            console.error(err);
        })
      },
      //上拉时触发的事件的处理函数
      loadBottom(){
          //上拉时加载更多数据
          this.page++;
          this.getProInfo(this.page);  
          //数据加载完毕之后触发onBottomLoaded()事件重新定位
          //但是获取数据的操作是异步的，所以需要在获取到数据之后重新定位
      },
      //当用户滑动组件时会有三个状态，pull：按下组件，但滑动距离没有达到默认的topDistance（70）
      //，此时松手不会触发method，列表会回到初始位置，
      //drop：按下距离不小于topDistance，此时释放会触发method
      //loading：组件已经释放，method正在执行
      statusChange(status){
        //   console.log(status)
      }
  },
  created(){
      this.getProInfo(1);
      //此时组件的对象创建完毕，但是组件中的元素还未创建，此时不能操作组件中的元素
  },
  //当组件被添加到父元素中时，才能获取组件中的元素进行操作
  mounted(){
      let height = document.documentElement.clientHeight;
      this.$refs.muicontent.style.height = height + 'px';
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
    .mint-loadmore {
        padding-top:44px;
        padding-bottom:50px;
    }
</style>


