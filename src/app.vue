<template>
    <div>
        <header class="mui-bar mui-bar-nav">
			<a v-if="isShow" @click="goback" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">我的项目</h1>
		</header>
		<nav class="mui-bar mui-bar-tab">
			<router-link to="/home" class="mui-tab-item">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link to="/member" class="mui-tab-item">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link to="/shopcar" class="mui-tab-item">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge">{{count}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link to="/search" class="mui-tab-item">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
        <router-view></router-view>
    </div>
</template>
<script>
	import vueObj from './config/communication';
    export default{
        data(){
            return {
				isShow:false,
				count:0
            }
		},
		methods:{
			goback(){
				this.$router.back();
			},
			judgeBack(path){
				let arr = ['/home','/member','/shopcar','/search'];
				if(arr.indexOf(path) == -1){
					this.isShow = true;
				}else{
					this.isShow = false;
				}
			}
		},
		created(){
			this.judgeBack(this.$route.path);
			vueObj.$on('getCount',function(count){
				this.count = count;
			});
			
		},
		watch:{
			'$route':function(newValue){
				this.judgeBack(newValue.path);
			}
		}
    }
</script>
<style scoped>
    
</style>