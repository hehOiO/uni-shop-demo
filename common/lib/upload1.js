/**
 * 文件上传扩展 
 */
import config from '../../common/lib/config.js'


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
	localUpload:function(options){
		if(options['isGroup']==undefined ||options['isGroup']==""){
			if(options['url'] == undefined || options['url'] == ""){
				options['url'] = "upload";
			}
			var url = config.getConfig("base1URL") + options['url'];
			var token = "";
			
			uni.getStorage({
			    key: 'zbdata',
			    success: function (res) {
					token = JSON.parse(res.data).token;
			    }
			});
			let uploadTask = uni.uploadFile({
			    url: url, //仅为示例，非真实的接口地址
				header:{
					// "content-type": "multipart/form-data",
					"token":token
				},
			    filePath:options['filePath'],
			    name: 'upload',
			    formData: options["data"] || {} ,
			    success: (uploadFileRes) => {
					var data = JSON.parse(uploadFileRes.data); 
					if(data.code == 1 ){
						options['success'] && options['success'].call(self,{
							imageURL : data.data.Site_url,
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
				options['url'] = "multi_upload";
			}
			var url = config.getConfig("base1URL") + options['url'];
			var token = "";
			uni.getStorage({
			    key: 'zbdata',
			    success: function (res) {
					token = JSON.parse(res.data).token;
			    }
			});
			let files = [];
			for(let i=0;i<options['files'].length;i++){
				let obj = {
					name:"upload["+i+"]",
					uri:options['files'][i]
				}
				files.push(obj)
			}
			console.log(files);
			let num = files.length;
			let uploadTask = uni.uploadFile({
			    url: url, //仅为示例，非真实的接口地址
				header:{
					"token":token,
					"content-type": "multipart/form-data"

				},
			    files:files,
			    formData: options["data"] || {
					num:num
				},
			    success: (uploadFileRes) => {
					var data = JSON.parse(uploadFileRes.data); 
					if(data.code == 1 ){
						options['success'] && options['success'].call(self,data);  // 上传成功回调 
					}else{
						options['error'] && options['error'].call(self,data);  // 上传失败回调 
					}
					
			    },
				fail:(error)=>{
					console.log(error);
					// options['error'] && options['error'].call(self,JSON.parse(error));  // 上传失败回调 
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
