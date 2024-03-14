export default {
    getAssetsImg(url){
        return new URL(`../assets/image/${url}`,import.meta.url).href
    },
    convertTimeToHumanReadable(dateTime) {
        let minute = 1000 * 60;
        let hour = minute * 60;
        let day = hour * 24;
        let week = day * 7;
        let month = day * 30;
        let timestamp_current = new Date().getTime();        // 获取当前时间并转换为时间戳，方便计算
        let _date = new Date(dateTime);        // 将传入的时间格式字符串解析为Date对象
        let timestamp_input = _date.getTime();        // 将Date对象转换为时间戳，方便计算
        let timestamp_diff = timestamp_current - timestamp_input;        // 计算当前时间与传入的时间之间相差的时间戳
        let minC = timestamp_diff / minute;        // 计算时间差共有多少个分钟
        let hourC = timestamp_diff / hour;        // 计算时间差共有多少个小时
        let dayC = timestamp_diff / day;        // 计算时间差共有多少个天
        let weekC = timestamp_diff / week;        // 计算时间差共有多少个周
        let monthC = timestamp_diff / month;        // 计算时间差共有多少个月
        if (monthC >= 1 && monthC < 4) {
            return parseInt(monthC) + "月前";
        } else if (weekC >= 1 && weekC < 4) {
            return parseInt(weekC) + "周前";
        } else if (dayC >= 1 && dayC < 7) {
            return parseInt(dayC) + "天前";
        } else if (hourC >= 1 && hourC < 24) {
            return parseInt(hourC) + "小时前";
        } else if (minC >= 1 && minC < 60) {
            return parseInt(minC) + "分钟前";
        } else if ((timestamp_diff >= 0) && (timestamp_diff <= minute)) {
            return "刚刚";            // 时间差大于0并且小于1分钟
        } else {
            return _date.getFullYear() + "年" + _date.getMonth() + "月" + _date.getDate() + "日";
        }
    },
    browserType() {
        var ua = navigator.userAgent.toLocaleLowerCase();
        if (ua.indexOf('green') > -1) return '绿色浏览器';
        if (ua.indexOf('qq') > -1) return 'QQ浏览器';
        if (ua.indexOf('bidu') > -1) return '百度浏览器';
        if (ua.indexOf('lb') > -1) return '猎豹浏览器';
        if (ua.indexOf('world') > -1) return '世界之窗浏览器';
        if (ua.indexOf('2345') > -1) return '2345浏览器';
        if (ua.indexOf('maxthon') > -1) return '傲游浏览器';
        if (ua.indexOf('tao') > -1) return '淘宝浏览器';
        if (ua.indexOf('ubrowser') > -1) return 'UC浏览器';
        if (ua.indexOf('coolnovo') > -1) return '枫叶浏览器';
        if (ua.indexOf('opr') > -1) return 'opera浏览器';
        if (ua.indexOf('se') > -1) return '搜狗浏览器';
        if (ua.indexOf('firefox') > -1) return 'firefox浏览器';
        if (ua.indexOf('safari') > -1 && ua.indexOf("version") > -1) return ('safari浏览器');
        if (window.navigator.mimeTypes[40] || !window.navigator.mimeTypes.length) return '360浏览器';
        if (ua.indexOf("chrome") > -1 && window.chrome) return ('chrome浏览器');
        return '未记录浏览器';
    }
}