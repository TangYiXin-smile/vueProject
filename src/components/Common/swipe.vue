<template>
    <mt-swipe :auto="4000">
            <mt-swipe-item  v-for="(item,index) in lunbo" :key="index">
                <a :href="item.url">
                    <img :src="item.img">
                </a>
            </mt-swipe-item>
    </mt-swipe>
</template>
<script>
    export default{
        data(){
            return{
                lunbo:[]
            }
        },
        props:['sendUrl'],
        created(){
            this.getLunbo();
        },
        methods:{
            getLunbo(){
                let url = this.sendUrl;
                this.$http.get(url).then(function(res){
                    if(res.body.status == 0){
                        this.lunbo = res.body.message;
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .mint-swipe {
        height:200px;
    }
    .mint-swipe img{
        width:100%;
        height:100%;
    }
</style>
