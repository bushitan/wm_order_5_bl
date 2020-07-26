<template>
	<view class="flex justify-center align-center" style="height:100vh">
		<button class="cu-btn rounde bg-gray ">返回</button>
	</view>
</template>

<script>
	
	export default {
		data(){
			return{
				orderId:"",				
			}
		},
		onLoad(options){
			// debugger
			this.setData({
				orderId : options.orderId || "",
			})
			this.onInit()
		},
		methods:{
			async onInit(){
				var that = this
				uni.showToast({
					title:"支付中",
				})
				
				var orderId = this.$data.orderId
				if( orderId == ""){
					console.log("未传入orderId")
					return
				}
				
				var res = await this.db.paymentCustomer({
					OrderId:orderId
				})
				console.log(res)
				
				
				if(res.code == 0){
					var data = res.data
					var obj = {
						timeStamp: data.timeStamp,
						nonceStr: data.nonceStr,
						package: data.package,
						signType: 'MD5',
						// paySign: data.paySign,		
						paySign: data.subpaySign,																		
						success (res) { 
							console.log(res)
							uni.showModal({
								title:"支付成功",
								success(){
									uni.switchTab({
										url:"/pages/order/current"
									})
								},
							})
						},
						fail (res) { 
							uni.showModal({
								title:"失败，请重新支付",
								success(){
									uni.switchTab({
										url:"/pages/order/current"
									})
								},
							})
						}
					}
					console.log(obj)
					uni.requestPayment(obj)
				}
			},
		},
	}
</script>

<style>
</style>
