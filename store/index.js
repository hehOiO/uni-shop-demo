import Vue from 'vue'
import Vuex from 'vuex'
import cache from '../common/lib/cache'
// import weather from './modules/weather'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        taskBtnText: "接单",
        taskTime : 0,
        addtime : 0,
        taskStatus : false, 
        intervalID : null, 
		forcedLogin:true,  // 是否强制登录 
    },
    mutations: {
        task(state, provider) {
			state.taskStatus  = provider.taskStatus;
			state.taskBtnText = provider.taskBtnText;
			state.taskTime    = provider.taskTime;
			state.addtime     = provider.addtime;
			state.intervalID  = provider.intervalID;
			// #ifdef APP-PLUS
			var app_message_push = cache.get("app_message_push");
			if(app_message_push && app_message_push['wakelock'] == true) {
				plus.device.setWakelock( true ); // 设置设备常亮 
			}
			// #endif
        },
        task_clear(state){
			state.taskStatus = false;
			state.taskBtnText   = "接单";
			state.taskTime   = 0;
			state.addtime    = 0;
			cache.remove("get_task_tips_wait"); 
        },
        task_interval_clear(state){
        	state.intervalID && clearInterval(state.intervalID)
        	state.intervalID = false; 
        }
    }
})

export default store
