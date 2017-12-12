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
                        <number :num="item.num" :id="item.id" @numberChange="numberChanged"></number>
                        <a href="javascript:;" @click="delGoods(item.id)">删除</a>
                    </div>
                </div>
            </div>
            <div class="total">
                <div class="word">
                    <h4>总计(不含运费)</h4>
                    <div class="info">
                        已经选择商品<span>{{ totalNum }}</span>件，共计￥<span>{{totalPrice}}</span>元
                    </div>
                </div>
                <div class="btn">
                    <button class="mui-btn mui-btn-danger">去结算</button>
                </div>
            </div>
            {{value}}
        </div>
    </div>
</template>

<script>
import number from '../Common/number.vue';
import vueObj from '../../config/communication';
import { getData, updateLocalData, delData } from '../../config/localstorageHelp';
export default {
  data() {
    return {
        value:[],
        productList:[],
        totalPrice:0,
        totalNum:0
    }
  },
  created(){
      this.getGoodsData();
  },
  methods:{
      //获取购物车商品信息列表
      getGoodsData(){
          //从本地存储中取出加入购物车的数据
          let data = getData();
          //如果本地存储中没有数据则不发送请求
          if(data.length == 0){
              return;
          }
          //获取需要传递给请求地址的id
          let ids =data.map(function(item){
              return item.id;
          });
          //为了方便将购买数量挂载到每个商品对象上，先按照id对本地数据排序
          data.sort(function(item1,item2){
              return item1 < item2;
          });
          let url = '/api/goods/getshopcarlist/'+ids.join();
          this.axios.get(url)
            .then((res)=>{
                if(res.status === 200 && res.data.status === 0){
                    this.productList = res.data.message;
                    //为了挂载购买数量并传给number组件显示，先利用相同的规则排序
                    this.productList.sort(function(item1,item2){
                        return item1.id < item2.id;
                    });
                    //在挂载购买数量的同时将switch的默认值放进数组
                    for(let i=0;i<this.productList.length;i++){
                        this.value.push(false);
                        this.productList[i].num = data[i].count;
                    }
                }else{
                    console.log('获取数据失败');
                }
            })
            .catch((err)=>{
                console.error(err);
            })
      },
      numberChanged(obj){
        //当点击number组件的加减号时更改本地存储的信息，更改badge的数量
        updateLocalData(obj.id,obj.type);
        vueObj.$emit('updateBadge');
        this.computTotal();
      },
      computTotal(){
          //计算总价和总件数，从本地缓存中获取总件数计算
          let totalNum = 0;
          let totalPrice = 0;
          let data = getData();
          data.sort(function(item1,item2){
              return item1.id < item2.id;
          });
          this.value.forEach((item,index)=>{
              if(item){
                  totalNum += data[index].count;
                  totalPrice += this.productList[index].sell_price * data[index].count;
              }
          });
          this.totalNum = totalNum;
          this.totalPrice = totalPrice;
      },
      delGoods(id){
          //点击删除按钮，删除本地缓存中的数据，删除productList中的数据，更新badge
            delData(id);
            let index = this.productList.findIndex(function(el){
                return el.id == id;
            });
            this.productList.splice(index,1);
            vueObj.$emit('updateBadge');
      }

  },
  components:{
      number
  },
  watch:{
      'value':function(){
          this.computTotal();
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
        padding-top:30px;
    }
    .item .mid {
        padding:10px 5px 0;
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
        /* line-height:25px; */
        padding-top:5px;
    }
    .sellNum a{
        display:inline-block;
        vertical-align:top;
    }
</style>

