
import fahter from './db_order_5.js'
class son extends fahter{	
	
	constructor(){
		super()
	} 
	
	/**
	 * @method 1 获取所有产品列表
	 * @param 
	    "Ids": [
			0
		  ],
		  "SinceId": 0,
		  "Fields": "string",
		  "CreatedAtMin": "2020-02-23T12:56:03.359Z",
		  "CreatedAtMax": "2020-02-23T12:56:03.359Z",
		  "UpdatedAtMin": "2020-02-23T12:56:03.359Z",
		  "UpdatedAtMax": "2020-02-23T12:56:03.359Z",
		  "PublishedStatus": true,
		  "VendorName": "string",
		  "CategoryId": 0
	 */
	productGetList(data) {
		return new Promise((resolve, reject) => {
			this.base({url: this.HOST_URL +  "api/products/getlist/",data: data,}).then(res => {resolve(res.data)}).catch(res => reject(res))
		})
	}
	
	/**
	 * @method 2 获取指定产品详情
	 * @param 
		id
		fields
	 */
	productGetDetail(data) {
		return new Promise((resolve, reject) => {
			this.base({url: this.HOST_URL +  "api/products/getdetail/",data: data,}).then(res => {resolve(res.data)}).catch(res => reject(res))
		})
	}
	
	/**
	 * @method 3 获取该店铺的菜单
	 * @param 
		id
		fields
	 */
	productMenu(data) {
		return new Promise((resolve, reject) => {
			wx.showLoading()
			
			var startTime = new Date().getTime();
			this.base({url: this.HOST_URL +  "api/category/products",data: data,}).then(res => {
				
				wx.hideLoading()
				
				var completeTime = new Date().getTime();
				var dateTime = completeTime - startTime
				// console.log(options.url , completeTime - startTime)
				
				
				if (!res ){
					uni.request({
						url:"https://wm.51zfgx.com/api/log/addlog/",
						method:"POST",
						data:{
							logmsg:"menu,res is null," + res + ":" + dateTime
						}
					})
				}
				if (res.data.code != 0 ){
					uni.request({
						url:"https://wm.51zfgx.com/api/log/addlog/",
						method:"POST",
						data:{
							logmsg:"menu,code is not 0," + res + ":" + dateTime
						}
					})
				}
				if( dateTime > 4000 ) {
					uni.request({
						url:"https://wm.51zfgx.com/api/log/addlog/",
						method:"POST",
						data:{
							logmsg:"menu,timeout," + res  + ":" + dateTime
						}
					})
				}
				
				resolve(res.data)
			}).catch(res => {
				uni.request({
						url:"https://wm.51zfgx.com/api/log/addlog/",
					method:"POST",
					data:{
						logmsg:"menu,fail" + res 
					}
				})
				reject(res)
			})
		})
	}
}
module.exports = son