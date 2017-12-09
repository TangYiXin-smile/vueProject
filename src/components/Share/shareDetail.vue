<template>
    <div class="mui-content my-content">
        <div class="mui-media-body">
            <h3>{{detailObj.title}}</h3> 
            <p class='mui-ellipsis'>
                <span class="add_time">{{detailObj.add_time | timefmt}}</span> 
                <span class="click">{{detailObj.click}}次浏览</span>
            </p>
        </div>
        <div class="imgContent">
            <div class="mui-content-padded my-imgContent">
                <ul class="showImg">
                    <li v-for="(item,index) in imgArr" :key="index">
                        <img :src="item.src" data-preview-src="" data-preview-group="1" />
                    </li>
                </ul>
            </div>
        </div>
        <div class="imgDesc" v-html="detailObj.content"></div>
        <!-- 评论 -->
        <comments :id="id"></comments>
    </div>
</template>
<script>
import comments from '../Common/comments.vue';
export default {
  props: ["id"],
  data() {
    return {
      detailObj: {},
      imgArr: []
    };
  },
  methods:{
    getDetail(){
      let url1 = "/api/getimageInfo/" + this.id;
      this.axios.get(url1).then((res)=>{
        if (res.status == 200 && res.data.status==0) {
          if(res.data.message.length > 0){
            this.detailObj = res.data.message[0];
          }
        } else {
          console.log("获取数据失败");
        }
      })
      .catch((err)=>{
        console.error(err);
      });
    },
    getImage(){
      let url2 = "/api/getthumimages/" + this.id;
      this.axios.get(url2).then((res)=>{
        if (res.status == 200 && res.data.status == 0) {
          this.imgArr = res.data.message;
        } else {
          console.log("获取数据失败");
        }
      })
      .catch((err)=>{
        console.error(err);
      });
    }
  },
  created: function() {
    this.getDetail();
    this.getImage();
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
.imgContent .showImg {
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
  width: 100%;
}
.imgContent .showImg li {
  width: 33.333%;
  float: left;
  padding: 0 5px 5px;
}
.imgContent .showImg img {
  width: 100%;
  vertical-align: top;
}
.my-imgContent {
  margin: 0;
}
.my-content .imgDesc {
  font-size: 14px;
  color: #8f8f94;
  padding: 10px 5px;
}
.mui-preview-image.mui-fullscreen {
  position: fixed;
  z-index: 20;
  background-color: #000;
}

.mui-preview-header,
.mui-preview-footer {
  position: absolute;
  width: 100%;
  left: 0;
  z-index: 10;
}

.mui-preview-header {
  height: 44px;
  top: 0;
}

.mui-preview-footer {
  height: 50px;
  bottom: 0px;
}

.mui-preview-header .mui-preview-indicator {
  display: block;
  line-height: 25px;
  color: #fff;
  text-align: center;
  margin: 15px auto 4;
  width: 70px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  font-size: 16px;
}

.mui-preview-image {
  display: none;
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.mui-preview-image.mui-preview-in {
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
}

.mui-preview-image.mui-preview-out {
  background: none;
  -webkit-animation-name: fadeOut;
  animation-name: fadeOut;
}

.mui-preview-image.mui-preview-out .mui-preview-header,
.mui-preview-image.mui-preview-out .mui-preview-footer {
  display: none;
}

.mui-zoom-scroller {
  position: absolute;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  -webkit-backface-visibility: hidden;
}

.mui-zoom {
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

.mui-slider .mui-slider-group .mui-slider-item img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

.mui-android-4-1 .mui-slider .mui-slider-group .mui-slider-item img {
  width: 100%;
}

.mui-android-4-1
  .mui-slider.mui-preview-image
  .mui-slider-group
  .mui-slider-item {
  display: inline-table;
}

.mui-android-4-1 .mui-slider.mui-preview-image .mui-zoom-scroller img {
  display: table-cell;
  vertical-align: middle;
}

.mui-preview-loading {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: none;
}

.mui-preview-loading.mui-active {
  display: block;
}

.mui-preview-loading .mui-spinner-white {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -25px;
  margin-top: -25px;
  height: 50px;
  width: 50px;
}

.mui-preview-image img.mui-transitioning {
  -webkit-transition: -webkit-transform 0.5s ease, opacity 0.5s ease;
  transition: transform 0.5s ease, opacity 0.5s ease;
}

@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
