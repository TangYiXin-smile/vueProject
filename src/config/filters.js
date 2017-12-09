import Vue from 'vue';
import moment from 'moment';
Vue.filter('timefmt',function(value){
    value = new Date(value);
    let year = value.getFullYear();
    let month = value.getMonth()+1;
    let day = value.getDate();
    return year+'-'+month+'-'+day;
})
Vue.filter('timeFmt',function(value){
    value = new Date(value);
    let year = changeNum(value.getFullYear());
    let month = changeNum(value.getMonth()+1);
    let day = changeNum(value.getDate());
    let hour = changeNum(value.getHours());
    let minute = changeNum(value.getMinutes());
    let seconds = changeNum(value.getSeconds());

    return year+'-'+month+'-'+day+' '+hour+':'+minute+':'+seconds;
})
Vue.filter('fmtData',(value,str)=>{
    return moment(value).format(str);
})
function changeNum(num){
    return num < 10 ?"0"+num:num;
}