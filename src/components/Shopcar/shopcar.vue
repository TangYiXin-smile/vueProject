<template>
    <div class="mui-content">
        <div class="main">
            <div class="item" v-for="(item,index) in productList" :key="item.id">
                <div class="left items">
                    <mt-switch v-model="value[index]"></mt-switch>
                </div>
                <div class="mid items">
                    <img :src="item.thumb_path"/>
                </div>
                <div class="right items">
                    <h4 class="title">{{item.title}}</h4>
                    <span class="price">￥{{item.sell_price}}</span>
                    <div class="sellNum">
                        <!-- 购买数量 -->
                        <div class="number">
                            <span class="add" @click="addNum(index)">+</span>
                            <input type="number" class="inp" v-model="num[index]"/>
                            <span class="sub" @click="subNum(index)">-</span>
                        </div>
                        <a href="javascript:;">删除</a>
                    </div>
                </div>
            </div>
            <div class="total">
                <div class="word">
                    <h4>总计(不含运费)</h4>
                    <div class="info">
                        已经选择商品<span>0</span>件，共计￥<span>{{totalPrice}}</span>元
                    </div>
                </div>
                <div class="btn">
                    <button class="mui-btn mui-btn-danger">去结算</button>
                </div>
            </div>
            {{value}}{{num}}
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
        value:[],
        productList:[],
        num:[],
        totalPrice:0
    }
  },
  created(){
      this.getData();
    //   this.getTotal();
  },
  updated(){
    //   this.getTotal();
  },
  watch:{
      value:function(){
          this.getTotal();
      }
  },
  methods:{
      getData(){
          let url = '/api/goods/getshopcarlist/'+'88,87,89';
          this.axios.get(url)
            .then((res)=>{
                if(res.status === 200 && res.data.status === 0){
                    this.productList = res.data.message;
                    for(let i=0;i<this.productList.length;i++){
                        this.value.push(false);
                        this.num.push(1);
                    }
                }else{
                    console.log('获取数据失败');
                }
            })
            .catch((err)=>{
                console.error(err);
            })
      },
      addNum(index){
          this.num = this.num.map(function(el,i){
              if(index === i){
                 return el+1;
              }else{
                  return el;
              }
          });
      },
      subNum(index){
          this.num = this.num.map(function(el,i){
              if(index === i){
                  return el-1;
              }else{
                  return el;
              }
          })
          if(this.num[index] < 0){
              this.num[index] = 0;
          }
      },
      getTotal(){
        //   this.value.forEach
        this.value.forEach((el,i)=>{
            if(el+1 == 2){
                this.totalPrice += this.num[i]*this.productList[i].sell_price;
                console.log(this.totalPrice)
            }
        });
        if(this.value.indexOf(true) == -1){
            this.totalPrice = 0;
        }
      }

  }
};
</script>

<style scoped> 
    .main{
        background-color:#fff;
    }
    .item{
        overflow:hidden;
        display:flex;
        padding:10px;
        background-color:#fff;
        border-bottom:1px solid rgba(1, 1, 1, 0.3);
    }
    .item .items{
        float:left;
    }
    .item .left{
        padding-top:20px;
    }
    .item .mid img{
        width:75px;
        height:75px;
    }
    .item .right{
        flex:1;
    }
    .item .right .title{
        color:#0094ff;
        font-size:16px;
        padding:5px 0;
    }
    .item .right .price{
        font-size:20px;
        color:red;
    }
    .item .right a{
        color:gray;
        font-size:14px;
        margin-left:5px;
    }
    .total{
        background-color:rgba(92, 92, 92, 0.2);
        padding:5px 10px;
        overflow: hidden;
        margin-top:10px;
    }
    .total .word {
        float:left;
    }
    .total .word h4{
        font-size:18px;
    }
    .total .btn{
        float:right;
        margin-top:5px;
    }
    .total .info{
        font-size:14px;
    }
    .sellNum {
        line-height:25px;
    }
    /* 购买数量 */
    .number{
        display:inline;
        overflow:hidden;
        margin-right:5px;
    }
    .number *{
        float:left;
    }
    .number span{
        border:1px solid rgba(92,92,92, 0.3);
        width:30px;
        height: 25px;
        text-align:center;
        line-height:25px;
    }
    .number .inp {
        padding:0;
        margin:0;
        height: 25px;
        width:40px;
        border-top:1px solid rgba(92,92,92, 0.3);
        border-bottom:1px solid rgba(92,92,92, 0.3);
        text-align:center;
        font-size:14px;
    }
</style>

