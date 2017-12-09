<template>
    <div class="mui-content my-content">
        <div class="scroll">
            <ul class="cateList" :style="ulWidth">
                <li>
                    <a @click.prevent="getData(-1)" href="javascript:;">全部</a>
                </li>
                <li v-for="(item,index) in cateListInfo" :key="index">
                    <a @click.prevent="getData(item.id)" href="javascript:;">{{item.title}}</a>
                </li>
            </ul>
        </div>
        <ul class="imgList">
            <li v-for="(item,index) in imgListInfo" :key="index">
                <router-link v-bind="{'to':'/share/'+item.id}">
                    <img :src="item.img_url" />
                    <p>{{item.zhaiyao}}</p>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                imgListInfo:[],
                cateListInfo:[],
                ulWidth:'width 600px'
            }
        },
        methods:{
            getData(id){
                let url = "http://vue.studyit.io/api/getimages/"+id;
                this.$http.get(url).then(function(res){
                    if(res.body.status == 0){
                        this.imgListInfo = res.body.message;
                    }else{
                        console.log('获取数据失败');
                    }
                });
            },
            getImage(){
                let url2 = "http://vue.studyit.io/api/getimgcategory";
                this.$http.get(url2).then(function(res){
                    if(res.body.status == 0){
                        this.cateListInfo = res.body.message;
                        this.ulWidth = 'width: '+ (66*this.cateListInfo.length+ 40)+'px';
                    }else{
                        console.log('获取数据失败');
                    }
                })
            }
        },
        created:function(){
            this.getData(-1);
            this.getImage();
        }
    }
</script>

<style scoped>
    .mui-content{
        background-color:#fff;
    }
    .my-content ul{
        margin:0;
        padding:0;
        list-style:none;
    }
    .my-content .scroll{
        overflow-x:auto;
        padding:10px;
    }
    .my-content .cateList {
        width:2000px;
        overflow:hidden;
    }
    .my-content .cateList li{
        float:left;
        padding:10px 5px;
    }
    .my-content .cateList li a{
        font-size:14px;
        color:#0094ff;
    }
    .my-content .imgList li{
        width:100%;
    }
    .my-content .imgList li a {
        width:100%;
        display:block;
        position:relative;
    }
    .my-content .imgList img{
        width:100%;
        vertical-align:top;
    }
    .my-content .imgList p{
        background-color:rgba(0, 0, 0, 0.4);
        color:#fff;
        position:absolute;
        bottom:0;
        left:0;
    }
</style>

