<template>
	<view >
		<view class="flex   box" style="background-color:#535e7c; position: fixed; width: ;">
			<image class="cover" src="/static/images/strong/loading.jpg" mode="widthFix" ></image>
			<!-- <view class="flex justify-center " style="position: fixed; bottom: 20px;left: 0;right: 0;" >
				<button class="cu-btn line-gray round" @click="clickTo">
					点击进入
				</button>
			</view> -->
			
		</view>
		<view style="height: 20vh;"></view>
		<swiper class="card-swiper height-swiper square-dot" 
		indicator-dots="true" circular="true" autoplay="true" 
		interval="5000" duration="500" 
		bindchange="cardSwiper" indicator-color="#ffffff" indicator-active-color="#ffffff"
		style="height: calc(100vh - 20vh) !important;"
		>
		  <swiper-item v-for="(item,index) in storeList" v-bind:key="index" :class="[cardCur==index?'cur':'']">
		    <view class="swiper-item padding">
				<view class=" bg-white   shadow shadow-warp  padding-tb-xl" 
				style="border-radius: 10px; ">
					<view class="flex justify-center  ">
						<image :src="item.Logo" mode="widthFix" style="width: 128px;" ></image>
					</view>
					<view style="min-height: 20vh;"></view>
					<view class="text-center margin-top">
						<button class="cu-btn round line-blue " @click="toMenu(item.Id,item.CompanyName)">去点单</button>
					</view>
					<view class="text-center text-lg margin-top">{{item.Name}}</view>
				</view>
				<view class="text-center  margin-top text-white ">{{item.CompanyAddress}}</view>
				
					
				
		    <!--  <video :src="item.url" autoplay loop muted show-play-btn="false" controls="false" objectFit="cover" v-if="item.type=='video'"></video>
		      <image :src="item.url" mode="aspectFill" v-else></image> -->
		    </view>
		  </swiper-item>
		</swiper>
		
		<!--
		<view class=" flex justify-center margin-top">
		    <button class=" cu-btn round bg-darkGray text-gray text-sm"  type="" open-type="contact">联系Strong客服</button>
		</view>
		
		 <view class=" padding-xs flex align-center  margin-top-sm">
		    <view class="flex-sub text-center">
		        <view class=" text-df ">
		            <text class="text-gray text-sm">Copyright © 2020 索骏科技提供技术支持</text>
		        </view>           
		    </view>
		</view>
		<view class="pg-space-xxl"></view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgColor:"#fef4ea",
				title: 'Hello',
				isHost: true,
				isSeller: true,
				daystats: { totalScore: 0, totalPrize:0}, // 今日数据
					swiperList:[
						"/static/images/strong/swiper1_lg.jpg",
						"/static/images/strong/swiper2_lg.jpg",
					],
				storeList:[
				// 	{
				// 		name:"Seeking Coffee【鲤湾店】",id:14,
				// 		url:"/static/images/strong/logo.jpg",
				// 		address:"青秀区鲤湾路1-5-15号",
				// 	},
				// 	{
				// 		name:"Seeking Coffee【金源店】",id:4,
				// 		url:"/static/images/strong/logo.jpg",
				// 		address:"金湖路63号金源现代城103号F105号商铺",
				// 	},
				// 	{
				// 		name:"Seeking Coffee【万象城店】",id:13,
				// 		url:"/static/images/strong/logo.jpg",
				// 		address:"民族大道万象城6层食间",
				// 	},
				// 	{
				// 		name:"Seeking Coffee【桃源店】",id:15,
				// 		url:"/static/images/strong/logo.jpg",
				// 		address:"桃源路62号",
				// 	},
				],
				store:{},
				orderList:[], //订单列表
			}
		},
		onLoad() {
			this.onInit()
		},
		onShareAppMessage(){
			return  {
				// title:"O.CT COFFEE",
				path:"/pages/route/route",
				imageUrl:"/static/images/strong/share.jpg",
			}
		},
		methods: {
			
			async onInit(){		
				var res = await this.db.orderGetList({
					Page:1,
					Limit:15,				
					CreatedAtMin: this.today,
					
				})	
				this.setData({
					orderList:res.data
				})
				
				// 获取门店列表
				var res = await this.db.storeGetList()
				var storeList = res.data	
				console.log(storeList)
				this.setData({
					storeList:storeList
				})
			},
			toMenu(id,name){
				uni.setStorageSync(this.db.KEY_SHOP_ID,id)
				uni.setStorageSync(this.db.KEY_SHOP_NAME,name)
				uni.switchTab({
					url:"/pages/index/index_lei"
				})	
			},
			// 	uni.switchTab({
			// 		url:"/pages/menu/menu"
			// 	})	
			// },
			
			// toMenu(id,name){
			// 	uni.setStorageSync(this.db.KEY_SHOP_ID,id)
			// 	uni.setStorageSync(this.db.KEY_SHOP_NAME,name)
			// 	uni.switchTab({
			// 		url:"/pages/menu/menu"
			// 	})				
			// },			
			toOrder(){
				uni.navigateTo({
					url:"/pages/order/list"
				})
			},
			toDetail(){
				var shop = this.$data.storeList[0]				
				uni.setStorageSync(this.db.KEY_SHOP_ID,shop.id)
				uni.setStorageSync(this.db.KEY_SHOP_NAME,shop.name)
				uni.switchTab({
					url:"/pages/order/current"
				})
				
			},
		}
	}
</script>

<style>
	.box {
		width: 100%;
		height: 100vh;
	}
	.cover{
		width: 100%;
		display: block;
		
	}
	page{
	    background-color: var(--ghostWhite)
	}
	
	.height-swiper{
		height: 300px !important;
	}
	
	.shop-icon{
		width: 72px;
		height: 72px;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
