<template>
    <div class="mui-content">
        <div class="main">
            <div class="item">
                <div class="left items">
                    <mt-switch v-model="value"></mt-switch>
                </div>
                <div class="mid items">
                    <img src="../../../statics/images/phone.jpg"/>
                </div>
                <div class="right items">
                    <h4 class="title">华为（HUAWEI）荣耀6Plus 16G双4G版</h4>
                    <span class="price">￥2195</span>
                    <div>
                        <a href="javascript:;">删除</a>
                    </div>
                </div>
            </div>
            <div class="total">
                <div class="word">
                    <h4>总计(不含运费)</h4>
                    <div class="info">
                        已经选择商品<span>0</span>件，共计￥<span>0</span>元
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
import Vue from 'vue';
import { Switch } from 'mint-ui';

Vue.component(Switch.name, Switch);
export default {
  data() {
    return {
        value:''
    };
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
</style>

