<template>
    <mt-swipe :auto="4000">
            <mt-swipe-item  v-for="(item,index) in lunbo" :key="index">
                <a :href="item.url">
                    <img :src="item.img" alt="轮播图" />
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
                this.axios.get(url).then((res)=>{
                    if(res.status === 200 && res.data.status == 0){
                        this.lunbo = res.data.message;
                    }else{
                        console.log('服务器内部错误');
                    }
                })
                .catch((err)=>{
                    console.error(err);
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
