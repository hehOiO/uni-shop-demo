 
 /**

   import { mapState, mapActions } from 'vuex'

  var base = require('../../common/lib/base.js');
  export default {
    data: {
      page : 1,
      showFooterLoading:true,
      navlist : [],
      userid : false, 
      userinfo : {} 
    },
      computed: {
        ...mapState('weather', ['weather']),
      },
    methods:{
      ...mapActions('weather', ['getWeather']),

      HomeInit:function(){
        let _self = this; 
        setTimeout(function() {
          _self.getWeather();
        }, 1300);
      }
    },
    onLoad:function(){
      this.HomeInit()
    }
  }
  
  */
const state = {
  location: {
    latitude: '',
    longitude: ''
  },
  weather: {
    basic: {},
    now: {},
    update: {},
    status: ''
  }
}

const mutations = {
  ['SET_LOCATION'] (state, payload) {
    state.location = payload.location
  },
  ['SET_WEATHER'] (state, payload) {
    state.weather = payload.weather
  }
}

const actions = {
  async getWeather({ state, commit }) {
    console.log('getWeather')
    const location = state.location
    const data = {json:1}
    commit('SET_WEATHER', { weather: data.result })
  }
}

export default {
  state,
  mutations,
  actions
}
