import Vue from 'vue'
// 字符串获取
Vue.filter('stringSlice', function(...rest) {
    let flag;
    flag = rest[0].slice(rest[1], rest[2])
    return flag
})
