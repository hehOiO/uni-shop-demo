function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function(n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function(milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function(dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function(number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDay()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	},
	toDateString: function(time, format) {
		var that = this,
			date = new Date(time || new Date()),
			ymd = [
				that.digit(date.getFullYear(), 4), that.digit(date.getMonth() + 1), that.digit(date.getDate())
			],
			hms = [
				that.digit(date.getHours()), that.digit(date.getMinutes()), that.digit(date.getSeconds())
			];

		format = format || 'yyyy-MM-dd HH:mm:ss';

		return format.replace(/yyyy/g, ymd[0])
			.replace(/MM/g, ymd[1])
			.replace(/dd/g, ymd[2])
			.replace(/HH/g, hms[0])
			.replace(/mm/g, hms[1])
			.replace(/ss/g, hms[2]);
	},
	digit: function(num, length) {
			var str = '';
			num = String(num);
			length = length || 2;
			for (var i = num.length; i < length; i++) {
				str += '0';
			}
			return num < Math.pow(10, length) ? str + (num | 0) : num;
		}
		//某个时间在当前时间的多久前
		,
	timeAgo: function(time, onlyDate) {
			var that = this,
				arr = [
					[],
					[]
				],
				stamp = new Date().getTime() - new Date(time).getTime();

			//返回具体日期
			if (stamp > 1000 * 60 * 60 * 24 * 8) {
				stamp = new Date(time);
				arr[0][0] = that.digit(stamp.getFullYear(), 4);
				arr[0][1] = that.digit(stamp.getMonth() + 1);
				arr[0][2] = that.digit(stamp.getDate());

				//是否输出时间
				if (!onlyDate) {
					arr[1][0] = that.digit(stamp.getHours());
					arr[1][1] = that.digit(stamp.getMinutes());
					arr[1][2] = that.digit(stamp.getSeconds());
				}
				return arr[0].join('-') + ' ' + arr[1].join(':');
			}

			//30天以内，返回“多久前”
			if (stamp >= 1000 * 60 * 60 * 24) {
				return ((stamp / 1000 / 60 / 60 / 24) | 0) + '天前';
			} else if (stamp >= 1000 * 60 * 60) {
				return ((stamp / 1000 / 60 / 60) | 0) + '小时前';
			} else if (stamp >= 1000 * 60 * 2) { //2分钟以内为：刚刚
				return ((stamp / 1000 / 60) | 0) + '分钟前';
			} else if (stamp < 0) {
				return '未来';
			} else {
				return '刚刚';
			}
		}
		//倒计时
		,
	countdown: function(endTime, serverTime, callback) {
		var that = this,
			type = typeof serverTime === 'function',
			end = new Date(endTime).getTime(),
			now = new Date((!serverTime || type) ? new Date().getTime() : serverTime).getTime(),
			count = end - now,
			time = [
				Math.floor(count / (1000 * 60 * 60 * 24)) //天
				, Math.floor(count / (1000 * 60 * 60)) % 24 //时
				, Math.floor(count / (1000 * 60)) % 60 //分
				, Math.floor(count / 1000) % 60 //秒
			];

		if (type) callback = serverTime;

		var timer = setTimeout(function() {
			that.countdown(endTime, now + 1000, callback);
		}, 1000);

		callback && callback(count > 0 ? time : [0, 0, 0, 0], serverTime, timer);

		if (count <= 0) clearTimeout(timer);
		return timer;
	}
};


/**
 * 读取字符串中的所有手机号并返回
 * @param  {[string]} str [要读取的字符串]
 * @param  index 索引
 * @return {[bool|obj]}     [读取到则返还数组 反之返回false ]
 */
function GetPhoneToContent(str, index) {
	var reg =
		/((((13[0-9])|(15[^4])|(18[0,1,2,3,5-9])|(19[0,1,2,3,5-9])|(16[0,1,2,3,5-9])|(17[0-8])|(147))\d{8})|((\d3,4\d3,4|\d{3,4}-|\s)?\d{7,14}))?/g;
	var phonelist = str.match(reg);
	if (phonelist != undefined) {
		var phonelistarr = [];
		for (var i = 0; i < phonelist.length; i++) {
			if ((/^1(3|4|5|6|7|8|9)\d{9}$/.test(phonelist[i])) || (/^0\d{2,4}-?\d{5,8}$/.test(phonelist[i]))) {
				phonelistarr.push(phonelist[i]);
			}
		}
		if (phonelistarr.length < 1) {
			return false;
		}
		if (index != undefined) {
			return (phonelistarr[index] == undefined) ? false : phonelistarr[index];
		}
		return phonelistarr;
	} else {
		return false;
	}
}

/**
 * str：字符串，frontLen：前面保留位数，endLen：后面保留位数。
 * @param  {[type]} str      [description]
 * @param  {[type]} frontLen [description]
 * @param  {[type]} endLen   [description]
 * @return {[type]}          [description]
 */
function hide_relname(str, frontLen, endLen) {
	var len = str.length - frontLen - endLen;
	var xing = '';
	for (var i = 0; i < len; i++) {
		xing += '*';
	}
	return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
}

/**
 * 字符串四位数字一组，以空格分割
 * @param {[type]} bank_account [description]
 */
function FormatBankSpace(bank_account) {
	return bank_account.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 "); //四位数字一组，以空格分割
}

module.exports = {
	formatTime: formatTime,
	formatLocation: formatLocation,
	dateUtils: dateUtils,
	GetPhoneToContent: GetPhoneToContent,
	hide_relname: hide_relname,
	FormatBankSpace: FormatBankSpace,
}