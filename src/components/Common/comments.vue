<template>
    <div>
        <div class="postCom">
            <h4>提交评论</h4>
            <textarea placeholder="请输入评论内容" name="content" v-model="content"></textarea>
            <button class="mui-btn mui-btn-primary" @click="addCom()">发表</button>
        </div>
        <div class="commt">
            <h4>评论列表</h4>
        </div>
        <div class="list" v-for="(item,index) in comList" :key="index">
            <span class="content">{{item.content}}</span>
            <p class="info">
                <span class="name mui-pull-left">{{item.user_name}}</span>
                <span class="time mui-pull-right">
                    {{item.add_time | fmtData('YYYY-MM-DD HH:mm:ss')}}
                </span>
            </p>
        </div>
        <div class="more"> 
            <button class="mui-btn mui-btn-primary mui-btn-outlined" @click.prevent="getMore">
                加载更多
            </button>
        </div>
    </div>
</template>
<script>
import qs from 'qs';
    export default{
        data(){
            return {
                temp:[],
                comList:[],
                page:1,
                content:''
            }
        },
        props:['id'],
        created(){
            this.getComment();
        },
        methods:{
            getComment(){
                let url = "/api/getcomments/"+this.id+"?pageindex="+this.page;
                this.axios.get(url)
                    .then((res)=>{
                        if(res.status === 200 && res.data.status === 0){
                            this.temp = res.data.message;
                            this.temp.forEach(element => {
                                this.comList.push(element);
                            });
                        }else{
                            console.log('获取数据失败');
                        }
                    })
                    .catch((err)=>{
                        cosole.error(err);
                    })
            },
            getMore(){
                this.page++;
                this.getComment();
                this.temp = this.comList;
            },
            addCom(){
                let url = "/api/postcomment/"+this.id;
                let data = {content:this.content};
                data = qs.stringify(data);
                
                //cors请求分为两种
                //简单请求
                //get post head
                //非简单请求
                //当post请求数据编码为application/json  form-data时为非简单的cors请求
                //非简单的cors请求浏览器会先发送一个预检请求，请求类型是options，如果请求的服务
                //器允许Access-Control-Allow-Headers有content-type，就能直接请求，如果没有
                //就需要传递字符串形式的数据
            
                //axios在发送post请求的时候，当发送数据为{}形式时，content-type的编码形式为
                //application/json
                    //当发送数据为字符串形式时，content-type的编码形式为
                    //application/x-www-form-urlencoded
                this.axios.post(url,data)
                .then((res)=>{
                    if(this.content.length == 0){
                        this.$toast('请输入内容');
                        return;
                    }
                    this.page = 1;
                    this.comList = [];
                    this.content = '';
                    this.$toast('评论发表成功');
                    this.getComment();
                })
                .catch((err)=>{
                    console.error(err);
                })
            }
        }
    }
</script>
<style scoped>
/* 评论开始 */
.postCom {
    padding:10px;
}
.postCom h4{
    margin-bottom:10px;
}
.postCom textarea{
    margin:0;
    padding:0;
    margin-bottom:20px;
}
.postCom button{
    width:100%;
}
.commt {
    border-top:1px solid rgba(92,92,92,0.4);
    border-bottom:1px solid rgba(92,92,92,0.4);
    padding:10px 0px;
}
.list{
    padding:5px;
    border-bottom:1px solid rgba(92,92,92,0.4);
}
.list .content{
    font-size:17px;
}
.list .info{
    overflow:hidden;
    margin-top:5px;
    padding:0 5px;
    font-size:15px;
}
.list .name{
    color:skyblue;

}
.more{
    padding:15px;
}
.more button{
    width:100%;
}
</style>

