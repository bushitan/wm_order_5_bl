
import fahter from './db_payment_9.js'
class son extends fahter{	
	
	constructor(){
		super()
	} 
	
	/**
	 * @method 1 获取所有产品列表
	 * @param 
	 */
	wxOpenGetQRUnlimit(data) {
		return new Promise((resolve, reject) => {
			this.base({url: this.HOST_URL +  "api/wxa/getwxacodeunlimit/",data: data,}).then(res => {resolve(res.data)}).catch(res => reject(res))
		})
	}
}
module.exports = son