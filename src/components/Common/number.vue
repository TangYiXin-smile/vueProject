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
                count:1
            }
        },
        props:['stock'],
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
                this.notify();
            },
            notify(){
                //$emit方法
                //第一个参数为自定义事件的名字
                //第二个参数为事件触发时处理函数中的参数
                this.$emit('numberChange',this.count);
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

