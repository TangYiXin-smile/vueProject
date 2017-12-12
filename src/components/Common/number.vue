<template>
    <div class="number">
        <span class="add" @click="addNum">+</span>
        <input type="number" class="inp" :value="count" readonly/>
        <span class="sub" @click="subNum">-</span>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                count:1,
                type:0
            }
        },
        //stock为显示商品详情时的库存量，用于控制能够购买的最大值
        //num为购物车页面传过来的加入了购物车的数量
        props:['stock','num','id'],
        created(){
            this.count = this.num?this.num : 1;
        },
        methods:{
            addNum(){
                if(this.count >= this.stock){
                    this.count = this.stock;
                    this.$toast({
                        message:'没有这么多啦！请联系卖家~',
                        duration:1500
                    });
                    return;
                }
                this.count++;
                this.type = 1;
                this.notify();
            },
            subNum(){
                if(this.count <= 1){
                    this.count = 1;
                    this.$toast({
                        message:'不能再少了哦~',
                        duration:1500
                    });
                    return;
                }
                this.count--;
                this.type = -1;
                this.notify();
            },
            notify(){
                //$emit方法
                //第一个参数为自定义事件的名字
                //第二个参数为事件触发时处理函数中的参数
                this.$emit('numberChange',{count:this.count,id:this.id,type:this.type});

            }
        }
    }
</script>
<style scoped>
    .number{
        display:inline-block;
        overflow:hidden;
    }
    .number span,
    .number input{
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

