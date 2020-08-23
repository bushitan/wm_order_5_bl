<template>
	<view class="flex align-center  box" :style="'background-color:' + bgColor">
		<image class="cover" src="../../static/images/strong/loading.jpg" mode="aspectFill"></image>
		<view class="flex justify-center " style="position: fixed; bottom: 20px;left: 0;right: 0;" >
			<button class="cu-btn line-gray round" @click="clickTo">
				点击进入
			</button>
		</view>
		
	</view>
</template>

<script>
		var app = getApp()
		export default{
			data(){
				return{
					// bgColor:"#fef4ea",
					bgColor:"#535e7c",
					ShopId:"",
					ShopTakeType:"",
					
					// isShare:false,
					// shareGoodID:"",
					// shareUserSN:"",
				}
			},
			onLoad(options){
				console.log(options)
				var ShopId = 
				this.setData({
					ShopId :  options.store_id || 57
				})				
				uni.setStorageSync(this.db.KEY_SHOP_TAKE_TYPE ,options.type || "")				
				uni.setStorageSync(this.db.KEY_SHOP_ID , this.$data.ShopId )
				
				// 获取分销信息
				const scene = decodeURIComponent(options.scene || "") 
				console.log(scene)
				this.checkShareUser(scene)
								
				this.onInit()
				
				// this.testAdd()
			},
			methods:{
				
				// 分销者
				checkShareUser(scene){
					// debugger
					
					app.globalData.isShare = false
					if (scene.length > 1){ //  判断是否为空
					
						var list = scene.split("_")
						app.globalData.isShare = true
						app.globalData.shareGoodID = list[0]
						app.globalData.shareUserSN = list[1]
							
						// this.setData({
						// 	isShare:true,
						// 	shareGoodID:list[0],
						// 	shareUserSN:list[1],
						// })
					}
						
					
				},
				
				
				// async testAdd(){
				// 	var res = await this.db.customerGetPoint()
				// 	console.log(res)
				// 	var res = await this.db.wxOpenGetQRUnlimit({
				// 		path:"pages/route/route",
				// 		query:"shopid=1&shareopenid=1",
				// 		isForce:1,
				// 	})
				// 	console.log(res)
					
				// },
				
				clickTo(){
					uni.redirectTo({
						url: '/pages/index/store'
					});
					
					// uni.switchTab({
					// 	url: '/pages/index/index_lei',
					// 	success(res){console.log(res)},
					// 	fail(res){console.log(res)}
					// });
				},
				
				toGood(){
					uni.redirectTo({			
						url:"/pages/good/good?itemId=" + app.globalData.shareGoodID 
					})
				},
				async onInit(){
					// return
					var res = await this.db.customerGetToken()
					console.log('get token',res)
					if(app.globalData.isShare == true)
						this.toGood()
					else
						this.clickTo()
										
				}
			}
		}
</script>

<style>
	.box {
		/* dis */
		width: 100%;
		height: 100vh;
		/* background-color: #fef4ea; */
	}
	.cover{
		width: 100vw;
		height: 100vh;
		display: block;
		
	}
</style>
