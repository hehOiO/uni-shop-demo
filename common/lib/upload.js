/**
 * 文件上传扩展 
 */
import config from '../../common/lib/config.js'
const qiniuUploader = require("../../common/lib/qiniuUploader");


		var client_type = "android";
		uni.getSystemInfo({
			success: function(e) {
				if (e['model'].indexOf('iPhone') > -1) {
					client_type = "ios";
				} else {
					client_type = "android";
				}
			}
		})
		
var upload = {
	QiniuUpload : function(options){
		var qiniuconf = config.getConfig("qiniuconf");
		console.log(qiniuconf);
		qiniuUploader.init(qiniuconf); 
		qiniuUploader.upload(options['filePath'],function(res){
			options['success'] && options['success'].call(self,res);  // 上传成功回调 
		},function(err){
			options['error'] && options['error'].call(self,err);  // 上传失败回调 
		},{},function(progress){
			options['progress'] && options['progress'].call(self,progress);  //获取上传进度 
		});
	},
	localUpload:function(options){
		
		if(options['isGroup']==undefined ||options['isGroup']==""){
			if(options['url'] == undefined || options['url'] == ""){
				options['url'] = "upload/qiniu";
			}
			var url = config.getConfig("baseURL") + options['url']
			const uploadTask = uni.uploadFile({
			    url: url, //仅为示例，非真实的接口地址
			    filePath:options['filePath'],
			    name: 'file',
			    formData: options["data"] || {} ,
			    success: (uploadFileRes) => {
					console.log(uploadFileRes); 
					var data = JSON.parse(uploadFileRes.data); 
					if(data.code == 200 ){
						options['success'] && options['success'].call(self,{
							imageURL : data.data.site_url,
						});  // 上传成功回调 
					}else{
						options['error'] && options['error'].call(self,data);  // 上传失败回调 
					}
					
			    },
				fail:(error)=>{
					console.log(error);
					options['error'] && options['error'].call(self,JSON.parse(error));  // 上传失败回调 
				}
			});
			if(options['progress']){
				uploadTask.onProgressUpdate((res) => {
					options['progress'].call(self,res);  //获取上传进度 
				});	
			}
		}else{
			if(options['url'] == undefined || options['url'] == ""){
				options['url'] = "upload/upLoadFiles";
			}
			var url = config.getConfig("baseURL") + options['url']
			var files = [];
			for(let i=0;i<options['files'].length;i++){
				var obj = {
					name:'file['+i+']',
					uri:options['files'][i]
				};
				files.push(obj);
			}
			const uploadTask = uni.uploadFile({
			    url: url, //仅为示例，非真实的接口地址
				files:files,
			    formData: options["data"] || {} ,
			    success: (uploadFileRes) => {
					var data = JSON.parse(uploadFileRes.data); 
					if(data.code == 200 ){
						options['success'] && options['success'].call(self,{
							imageURL : data.data
						});  // 上传成功回调 
					}else{
						options['error'] && options['error'].call(self,data);  // 上传失败回调 
					}
					
			    },
				fail:(error)=>{
					console.log(JSON.stringify(error));
					options['error'] && options['error'].call(self,JSON.parse(error));  // 上传失败回调 
				}
			});
			if(options['progress']){
				uploadTask.onProgressUpdate((res) => {
					options['progress'].call(self,res);  //获取上传进度 
				});	
			}
		}
		
        
	}
	
}
	module.exports = upload.localUpload;  // 要用到什么上传就抛出  //考虑到当前安卓BUG 先由服务器上传 
	
// if(client_type == "android"){
// 	module.exports = upload.localUpload;  // 要用到什么上传就抛出  //考虑到当前安卓BUG 先由服务器上传 
// }else{
// 	module.exports = upload.QiniuUpload;  // 要用到什么上传就抛出 
// }
// 
