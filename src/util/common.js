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
        const ua = navigator.userAgent.toLowerCase();
    
        if (ua.includes('micromessenger')) return '微信浏览器';
        if (ua.includes('alipayclient')) return '支付宝浏览器';
        if (ua.includes('dingtalk')) return '钉钉浏览器';
    
        if (ua.includes('qqbrowser')) return 'QQ浏览器';
        if (ua.includes('2345explorer')) return '2345浏览器';
        if (ua.includes('metasr') || ua.includes('sogou')) return '搜狗浏览器';
        if (ua.includes('maxthon')) return '傲游浏览器';
        if (ua.includes('taobrowser')) return '淘宝浏览器';
        if (ua.includes('ubrowser')) return 'UC浏览器';
        if (ua.includes('bidubrowser')) return '百度浏览器';
        if (ua.includes('lbbrowser')) return '猎豹浏览器';
        if (ua.includes('theworld')) return '世界之窗浏览器';
        if (ua.includes('coolnovo')) return '枫叶浏览器';
        if (ua.includes('greenbrowser')) return '绿色浏览器';
        if (ua.includes('opera') || ua.includes('opr')) return 'Opera浏览器';
        if (ua.includes('safari') && !ua.includes('chrome') && !ua.includes('chromium')) {
            return 'Safari浏览器';
        }
    
        const is360 = () => {
            const mimeTypes = navigator.mimeTypes;
            for (let mt in mimeTypes) {
                if (/360se|360chrome/.test(mimeTypes[mt].type)) {
                    return true;
                }
            }
            if (typeof window.chrome !== 'undefined') {
                if (navigator.plugins.length > 0) {
                    const plugin = navigator.plugins[navigator.plugins.length - 1].name;
                    if (plugin.includes('360') || plugin.includes('Qihu')) return true;
                }
            }
            return false;
        };
        if (is360()) return '360浏览器';
        if (ua.includes('chrome')) return 'Chrome浏览器';
        if (ua.includes('firefox')) return 'Firefox浏览器';
    
        return '未知浏览器';
    }
}