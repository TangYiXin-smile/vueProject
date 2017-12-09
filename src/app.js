import Vue from 'vue';

import app from './app.vue';

import './config/plugins';

import router from './config/router';

import './config/filters';

let vm = new Vue({
    el:'#app',
    router,
    //render:c => c(app)
    render:function(createElement){
        return createElement(app);
    },
    created(){
        this.axios.interceptors.request.use(function (config) {
            // Do something before request is sent
            this.$indicator.open('正在加载中...');
            return config;
          }.bind(this), function (error) {
            // Do something with request error
            return Promise.reject(error);
          });
         
        // Add a response interceptor
        this.axios.interceptors.response.use(function (response) {
            // Do something with response data
            this.$indicator.close();
            return response;
          }.bind(this), function (error) {
            // Do something with response error
            return Promise.reject(error);
          });
    }
})