
var sharetypeSwitch = function(name,data,sharetype){
    // 分享参数返回 如果少必要参数会导致分享失败
    var json = {}; 
    switch(name){
        case 'weixin_circle':
            //分享到微信朋友圈 
            json['provider'] = 'weixin';
            json['scene']    = 'WXSenceTimeline';
        break;
        case 'weixin_friend':
            //分享微信好友 
            json['provider'] = 'weixin';
            json['scene']    = 'WXSceneSession';
        break;
        case 'weixin_favorite':
            // 微信收藏
            json['provider'] = 'weixin';
            json['scene']    = 'WXSceneFavorite'; 
        break;
        case 'sinaweibo' : 
            json['provider'] = 'sinaweibo';
        break;
    }
    if (data['type']) json['type']                = sharetype ? sharetype : '0';
    if (data['title']) json['title']              = data['title'] ? data['title'] : '';
    if (data['summary']) json['summary']          = data['summary'] ? data['summary'] : '';
    if (data['href']) json['href']                = data['href'] ? data['href'] : '';
    if (data['imageUrl'])  json['imageUrl']       = data['imageUrl'] ? data['imageUrl'] : '';
    if (data['mediaUrl'])  json['mediaUrl']       = data['mediaUrl'] ? data['mediaUrl'] : '';
    if (data['miniProgram'])  json['miniProgram'] = data['miniProgram'] ? data['miniProgram'] : '';
    if (data['success'])  json['success']         = data['success'] ? data['success'] : {} ;
    if (data['fail'])  json['fail']               = data['fail'] ? data['fail'] : {} ;
    return json; 
}

var share = function(name , data ){

    // 分享类型  0图文 1纯文字 2纯图片 3音乐 4视频 5小程序 
    var sharetype = data['sharetype'] ? data['sharetype'] : 0 ; 
    switch (name ){
        case 'copylink':
        if (data.href) {
            // 复制连接
            uni.setClipboardData({
                data : data.href,
                success:function(){
                    uni.showToast({title:"链接复制成功",icon:"none"});
                },
                fail:function(){
                    uni.showToast({title:"链接复制失败",icon:"none"}); 
                }
            })
        }
        break; 
        case 'browser':
            //浏览器打开 目前仅支持APP
            //#ifdef MP-WEIXIN 
            console.log("非APP下不支持浏览器打开")
            return false; 
            //#endif
            //plus.runtime.openURL("weixin://");
            plus.runtime.openURL(data.href);
        break;
        case 'weixin_circle':
            //分享到微信朋友圈 
            var sharejson = sharetypeSwitch(name,data,sharetype);  // 获取分享参数 
            uni.share(sharejson); 
        break;
        case 'weixin_friend' : 
            //分享给微信好友
            var sharejson = sharetypeSwitch(name,data,sharetype);  // 获取分享参数 
            uni.share(sharejson); 
        break;
        case 'sinaweibo':
            // 分享到微博 
            var sharejson = sharetypeSwitch(name,data,sharetype);  // 获取分享参数 
            uni.share(sharejson); 
        break; 
    }
}

module.exports = share;