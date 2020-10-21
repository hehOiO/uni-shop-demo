module.exports =  {
	"maxError" : 0,  //当前题目最大错误数 
	"data": [
		{
			"index" : 0,
			"title" : "战斗力是什么?",
			"type" : "choose",
			"list" : [
				{"value":0,"name":"A,战斗力是你这个预估赚的零花钱！"},
				{"value":1,"name":"B,战斗力是游戏战斗力"},
				{"value":2,"name":"C,一台手机只能注册一个帐号，但登录后其他帐号无法在该手机登录！"},
			],
			"answer" : 0 , // 答案的INDEX 
			"checked" : -1, //用户选中的答案 
		},
		{
			"index" : 1,
			"title" : "战斗力怎么上涨？",
			"type" : "choose",
			"list" : [
				{"value":0,"name":"A,邀请朋友即可以增加战斗力!"},
				{"value":1,"name":"B,战斗力自动会涨"},
				{"value":2,"name":"C,战斗力邀请好友不会涨"},
			],
			"answer" : 0 , // 答案的INDEX 
			"checked" : -1, //用户选中的答案 
		},
		{
			"index" : 2,
			"title" : "如何接单赚佣金？",
			"type" : "choose",
			"list" : [
				{"value":0,"name":"A,注册即可接单"},
				{"value":1,"name":"B,系统自动派单子"},
				{"value":2,"name":"C,绑定帐号 做完新手任务后 点击接单 即可开始接任务！"},
			],
			"answer" : 2 , // 答案的INDEX 
			"checked" : -1, //用户选中的答案 
		},
		{
			"index" : 3,
			"title" : "每个月可以接多少单？",
			"type" : "choose",
			"list" : [
				{"value":0,"name":"A,不限量"},
				{"value":1,"name":"B,每个帐号每个月可以接50单垫付单，浏览单2000单！"},
				{"value":2,"name":"C,每个账号每个月可以接6单垫付单，浏览单1500单！"},
			],
			"answer" : 2 , // 答案的INDEX 
			"checked" : -1, //用户选中的答案 
		},
		{
			"index" : 4,
			"title" : "每个月可以赚多少钱？",
			"type" : "choose",
			"list" : [
				{"value":0,"name":"A,如：邀请到了100个人，然后微信组群 让他们做单，带着他们教他们做单，每个月即可以赚到60000以上的零花钱。"},
				{"value":1,"name":"B,每个月1000块"},
				{"value":2,"name":"C,每个月500块"},
			],
			"answer" : 0 , // 答案的INDEX 
			"checked" : -1, //用户选中的答案 
		},
		{
			"index" : 5,
			"title" : "提现多久到账？",
			"type" : "choose",
			"list" : [
				{"value":0,"name":"A,立刻到账"},
				{"value":1,"name":"B,一般提现2个工作日内审核，具体到账时间根据银行不同，到账时间不同！"},
				{"value":2,"name":"C,一般2天到账"},
			],
			"answer" : 1 , // 答案的INDEX 
			"checked" : -1, //用户选中的答案 
		},
		{
			"index" : 6,
			"title" : "一个身份证可以绑定几个小蚂蚁账号",
			"type" : "choose",
			"list" : [
				{"value":0,"name":"A,一个身份证可以绑定1个小蚂蚁账号"},
				{"value":1,"name":"B,一个身份证可以绑定3个小蚂蚁账号"},
				{"value":2,"name":"C,一个身份证可以绑定10个账号  "},
			],
			"answer" : 1 , // 答案的INDEX 
			"checked" : -1, //用户选中的答案 
		}
	]
}