import Vue from 'vue'
import App from './App'

import DB from './db/db.js'

Vue.config.productionTip = false

Vue.prototype.db = DB


import cuCustom from './components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

// 选择框
import tabbar from '@/components/tabbar/tabbar.vue'
Vue.component('tabbar', tabbar)
import Footer from '@/components/footer.vue'
Vue.component('footer', Footer)

import swiperTab from '@/components/swiper-tab/swiper-tab.vue'
Vue.component('swiper-tab', swiperTab)

// // import welcomeTip from '@/components/basics/welcome-tip';
// // import swiperBackground from '@/components/basics/swiper-background';
// import gridMenuList from '@/components/list/grid-menu-list';
// import identifyList from '@/components/list/identify-list';
// import sellQuicklyList from '@/components/list/sell-quickly-list';
// import activityList from '@/components/list/activity-list';
// import goodsList from '@/components/list/goods-list';
// import liveList from '@/components/list/live-list';
// import videoList from '@/components/list/video-list';
// // import footerTabbar from '@/components/footer/footer-tabbar';
// import gridSortList from '@/components/list/grid-sort-list';
// // import modalImg from '@/components/basics/modal-img';
// Vue.component('goods-list', gridSortList)

// import _home_data from '@/static/zaiui/data/home.js';
// Vue.prototype.home_data = _home_data

//分销字段
Vue.prototype.isShare = false
Vue.prototype.shareGoodID = ""
Vue.prototype.shareUserSN = ""


Vue.prototype.Shop = {
	Id:0,
	TakeTypeValue:7,
}
Vue.prototype.customerTakeType = ''


var date = new Date()
const year = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate() 
console.log()
Vue.prototype.today = [year, month, day].join('-') 


function setData(obj){  
	let that = this;  
	let keys = [];  
	let val,data;  
	Object.keys(obj).forEach(function(key){  
		 keys = key.split('.');  
		 val = obj[key];  
		 data = that.$data;  
		 keys.forEach(function(key2,index){  
			 if(index+1 == keys.length){  
				 that.$set(data,key2,val);  
			 }else{  
				 if(!data[key2]){  
					that.$set(data,key2,{});  
				 }  
			 }  
			 data = data[key2];  
		 })  
	});  
}  
Vue.prototype.setData = setData

function GeoDistance (la1, lo1, la2, lo2) {
    var La1 = la1 * Math.PI / 180.0;
    var La2 = la2 * Math.PI / 180.0;
    var La3 = La1 - La2;
    var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
    s = s * 6378.137;//地球半径
    s = Math.round(s * 10000) / 10000;
    // console.log("计算结果", s)
    return s
 }
Vue.prototype.GeoDistance = GeoDistance


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
