import fetchTool from '../../common/lib/fetchTool'
const USERS_KEY = 'users_local_info';

const getUsers = function(openid){
	let user = fetchTool.cache.get(USERS_KEY); // 获取本地缓存的用户信息
	if (!user) {
		return {};
	}
	if (openid == undefined) {
		return user;
	}
	if (user['userlist'].length < 0 ) {
		console.log("getUsers：获取登录会员数据不合法");
		return {}; 
	}
	let userinoLimit = fetchTool.formatDataInfo(user['userlist'],openid,"openid");
	if (userinoLimit && userinoLimit['data']) {
		return userinoLimit['data'];
	}
	/*
	user = {
		openid : '***',
		userlist : [{},{}]
	}
	*/
	return false;
}

/**
 * 相同的openid 只获取一次 
 * @param {[type]} userInfo [description]
 */
const addUser = function (userInfo) {
    let users = getUsers();
    let userlist = users['userlist'];
    if (userlist == undefined || !userlist) {
    	userlist = []; 
    }
    let userinoLimit = fetchTool.formatDataInfo(userlist,userInfo['openid'],"openid");
    if (userinoLimit) {
    	userlist.splice(userinoLimit['index'],1);
    }
    userlist.push(userInfo);
	users['openid']   = userInfo['openid'];
	users['userlist'] = userlist;
    fetchTool.cache.put(USERS_KEY, users);
    return true; 
}

const LoginInfo = function(key) {
	key = key ? key : 'all'; 
	let user = fetchTool.cache.get(USERS_KEY); // 获取本地缓存的用户信息
	if (!user || !user['openid'] || !user['userlist'] ) {
		return false;
	}
	let info = fetchTool.formatDataInfo(user['userlist'],user['openid'],"openid");//获取当前登录人的信息
	if (info['data'] && info['data']['openid'] == user['openid']) {
		let newinfo = info['data'];
		try{
			if (key == "all") {
				return newinfo;
			}else{
				return newinfo[key] ? newinfo[key] : false ;
			}
		}catch(e){
			return false;
		}
	}else{
		return false
	}
}

const openid = function(){
	return LoginInfo("openid"); 
}

/**
 * 退出或删除指定 用户 并刷新缓存 
 */
const loginout = function(getopenid){
	if (getopenid == undefined) {
		getopenid = openid();
	}
	if (!getopenid) {
		return false;
	}
	// 退出当前账号 
    let users = getUsers();
    let userlist = users['userlist'];
    if (userlist == undefined || !userlist) {
    	userlist = []; 
    }

    let userinoLimit = fetchTool.formatDataInfo(userlist,getopenid,"openid");
    if (userinoLimit) {
    	userlist.splice(userinoLimit['index'],1);
    }
    users['openid'] = null;
    users['userlist'] = userlist;
        // console.log(JSON.stringify(users))
    fetchTool.cache.put(USERS_KEY, users);
    return true; 
}

/**
    刷新本地登录缓存
    base.user.save({nickname:"我叫张三"},"tRnNrs/OV3Yg1iYG9mMQjjlZwLbFvK87bzoGDQW2M/IxbNk");  // 指定刷新某用户 
	base.user.save({nickname : "车展上下二"});  // 刷新当前登录用户

 */
const saveInfo = function(data , openid ){
	if (data == undefined || typeof(data) == "string" || typeof(data) != "object") {
		console.error("save User Info：data参数应该是object ")
		return false; 
	}
	openid = (openid == undefined || openid == "" ) ? LoginInfo("openid") : openid; 
	var info = getUsers(openid );  // 获取用户信息 	
	var newinfo =  Object.assign(info, data );  // 合并数据 
	return addUser(newinfo); // 刷新登录缓存 
}

export default {
    getUsers,
    addUser,
    get:LoginInfo,
    save:saveInfo,
    openid:openid,
    loginout:loginout
}
