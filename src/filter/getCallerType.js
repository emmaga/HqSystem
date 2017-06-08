import Vue from 'vue'
// 叫号器类型转化为中文
Vue.filter('getCallerType', function(value) {
    let flag;
    if (value === 'physic') {
    	flag = '物理叫号器'
    } else if (value === 'soft') {
    	flag = '虚拟叫号器'
    }
    return flag
})
