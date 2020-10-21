let IS_WX = false; 
//#ifdef MP-WEIXIN	
IS_WX = true 
//#endif

var appauth = {
	appsetting : function(){
		// 打开设置页面 
		if (IS_WX) {
			console.log("err：微信暂不支持"); 
			return true; // 微信环境的设置 
		}
		var os =  plus.os.name;
		// 打开设置页面
		if (os == "iOS") {
			var UIApplication = plus.ios.import("UIApplication");
			var NSURL = plus.ios.import("NSURL");
			var setting = NSURL.URLWithString("app-settings:");
			var application = UIApplication.sharedApplication();
			application.openURL(setting);
			plus.ios.deleteObject(setting);
			plus.ios.deleteObject(application);
		}else{
			var main = plus.android.runtimeMainActivity(); //获取activity
			var Intent = plus.android.importClass('android.content.Intent');
			var Settings = plus.android.importClass('android.provider.Settings');
			var intent = new Intent(Settings.ACTION_APPLICATION_SETTINGS);//可设置表中所有Action字段
			main.startActivity(intent);
		}
	},
	wxscanqrcode:function(succ){
		// 外部调用微信扫一扫  
		if (IS_WX) {
			uni.scanCode({
				success:function(e){
					succ && succ.call(self,e)
				}
			});  
			return true; // 微信环境的设置 
		}
		plus.runtime.openURL("weixin://scanqrcode",function(e){
			succ && succ.call(self,e)
		});
	}
}

module.exports = appauth