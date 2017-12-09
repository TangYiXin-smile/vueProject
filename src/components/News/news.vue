<template>
    <div class="mui-content my-content">
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="(item,index) in newsList" :key="index">
                <router-link v-bind="{'to':'/news/'+item.id}">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <div class="title">{{item.title}}</div>
                        <p class='mui-ellipsis'>
                            <span class="mui-pull-left">发表时间:{{item.add_time | timefmt}}</span> 
                            <span class="mui-pull-right">点击数:{{item.click}}</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div> 
</template>

<script>
    export default{
        data(){
            return {
                newsList:[]
            }
        },
        created:function(){
            var url = "http://vue.studyit.io/api/getnewslist";
            this.$http.get(url).then(function(res){
                if(res.body.status == 0){
                    this.newsList = res.body.message;
                }else{
                    console.log('获取数据失败')
                }
            })
        }
    }
</script>

<style scoped>
    .my-content>.mui-table-view:first-child{
        margin-top:0;
    }
    .my-content .mui-ellipsis{
        color:#0094ff;
        font-size:12px;
    }
    .my-content .mui-media-body{
        font-size:14px;
    }
    .my-content .mui-media-body .title{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .my-content .mui-table-view-cell>a:not(.mui-btn).mui-active{
        background-color:#fff;
    }
</style>

