const version    =  new Date().getTime(); //图片缓存标识 
const STATICHOST = 'http://app.static.aisuizhou.cn/'; //图片资源目录 
const APPHOST    = 'http://111.231.82.60/'; // 正式服务器域名根目录
// const APPHOST1 = 'http://cj.vipgz1.idcfengye.com/' //众包用测试
const APPHOST1 = 'http://111.231.82.60:8089/';//众包用正式
// const APPHOST    = 'http://129.211.86.194/'; // 测试服务器域名根目录
const APP_DEBUG  = true; // 是否调试模式  true 则是 false则不是 （提交APP审核时候将该参数设置为false）

var configdata = {
    baseURL : APPHOST+"api/", // api 接口地址
	base1URL :APPHOST1+"api/", //众包
    APPHOST:APPHOST, // 服务器根域名
    STATICHOST:STATICHOST, // 静态资源文件 
    APP_DEBUG : APP_DEBUG, // 是否调试模式 
    appkey : 6284725769, // 密钥
    appsecret : 'GACaILSBdrhFiPyEEgVnyztHpJHZCLxH', // 密钥
    appversion : 'v1.1.0', //当前版本
    appversionv :'0110', // 版本号
    aboutInfo : '亿客拉是一款商家和用户进行互动的手机app，帮你用碎片化的时间，赚取佣金',
    webname :'亿客拉',
    kefuqq : '854060108', 
    imagelist:{
        'defaultAvatar' :APPHOST+'/static/default/images/portrait_bg.png',//?t=1223311
    },
    qiniuconf : {
        region: 'SCN', // 华北区
        uptokenURL: APPHOST+'api/config/getQiniuToken',
        domain: 'http://yjh.static.app.image.darenjishi.cn',
        shouldUseQiniuFileName: true
    },
    qqmap:"QKBBZ-H3KRU-G3ZVU-4OGIU-44CUQ-XBF6T",
    wsSocket:{
        url : 'ws://129.211.120.19:36485', 
        contentType : 'application/json', 
		
    } 
}


import cache from '../../common/lib/cache'
/**
 * 抛出配置
 * @type {Object}
 */
var config = {
    getConfig:function(name){
        var name2 = name.split("."); //字符分割
        var info = null; 
        if (name2.length > 1 ) {
            info = configdata[name2[0]][name2[1]] || null ;
        }else{
            info = configdata[name] || null;
        }
        if (info == null ) {
            let web_config = cache.get("web_config");
            if (web_config) {
                if (name2.length > 1 ) {
                    info = web_config[name2[0]][name2[1]] || null ;
					
                }else{
                    info = web_config[name] || null ;
                }
            }
        }
        return info;
    }
};
module.exports = config;