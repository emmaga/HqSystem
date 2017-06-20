import Vue from 'vue'

Vue.filter('getOnlineStatus', function(value) {
    let flag;
    if (value === 'online') {
    	flag = '在线'
    } else if (value === 'offline') {
    	flag = '离线'
    }
    return flag
})
