<template>
    <div class="mui-content my-content">
        <div class="mui-media-body">
            <h3>{{detailObj.title}}</h3>
        </div>
        <div class="newsContent">
            <div v-html="detailObj.content"></div>
        </div>
    </div>
</template>
<script>
    import '../../../statics/css/style.css';
    export default{
        data(){
            return {
                detailObj:{}
            }
        },
        props:['id'],
        methods:{
            getDetail(){
                let url = "/api/goods/getdesc/"+this.id;
                this.axios.get(url)
                .then((res)=>{
                    if(res.status === 200 && res.data.status === 0){
                        if(res.data.message.length > 0){
                            this.detailObj = res.data.message[0];
                        }
                    }else{
                        console.log('服务器内部错误');
                    }
                })
                .catch((err)=>{
                    console.error(err);
                });
            }
        },
        created(){
            this.getDetail();
        }
    }
</script>
<style scoped>
.my-content {
  background-color: #fff;
}
.my-content .mui-media-body {
  padding: 10px 5px;
  overflow: hidden;
  border-bottom: 2px solid rgba(92, 92, 92, 0.1);
}
.my-content .mui-media-body h3 {
  color: #0094ff;
}
.my-content .newsContent {
  padding: 10px 5px;
}
</style>

