<template>
    <div class="mui-content my-content">
        <div class="mui-media-body">
            <h3>{{detailObj.title}}</h3> 
            <p class='mui-ellipsis'>
                <span class="add_time">{{detailObj.add_time | timefmt}}</span> 
                <span class="click">{{detailObj.click}}次浏览</span>
            </p>
        </div>
        <div class="newsContent">
            <div v-html="detailObj.content"></div>
        </div>
        <!-- 评论  -->
        <comments :id="id"></comments>
    </div>
</template>
<script>
import '../../../statics/css/style.css';

// import { Toast } from 'mint-ui';
import comments from '../Common/comments.vue';
export default {
  props: ["id"],
  data() {
    return {
      detailObj: {}
    };
  },
  created: function() {
    this.getDetail();
  },
  methods:{
      getDetail(){
        let url = "http://vue.studyit.io/api/getnew/" + this.id;
        this.$http.get(url).then(function(res) {
            if (res.body.status == 0) {
                this.detailObj = res.body.message[0];
            } else {
                console.log("获取数据失败");
            }
        });
      }
  },
  components:{
      comments
  }
};
</script>
<style scoped>
.my-content {
  background-color: #fff;
}
.my-content .mui-ellipsis {
  font-size: 12px;
  margin: 0;
}
.my-content .mui-media-body {
  padding: 10px 5px;
  overflow: hidden;
  border-bottom: 2px solid rgba(92, 92, 92, 0.1);
}
.my-content .mui-media-body p {
  margin-top: 10px;
}
.my-content .mui-media-body h3 {
  font-size: 16px;
  color: #0094ff;
}
.my-content .mui-media-body .click {
  margin-left: 10px;
}
.my-content .newsContent {
  padding: 10px 5px;
}
</style>
