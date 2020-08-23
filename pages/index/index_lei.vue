<template>
		<view class="bg-white">
			
			<!-- <tabbar></tabbar> -->
			
			<!-- 分销的头部信息 -->
			<!-- <view class="bg-white my_score flex align-center padding text-xs" style="height:80px;">
				<image src='/static/images/strong/logo.jpg'				
					class="cu-avatar round  bg-gray margin-right-xs"  
					style="width:28px;height: 28px;"></image>
				<view>
					<view>SN:{{sn}}</view>
					<view>分享积分:{{balance}}</view>
				</view>
			</view> -->
			
			
			<!-- <view class="flex justify-center">
				<image src="../../static/images/strong/1.png" mode="widthFix" style="width: 60vw;"></image>
			</view>
			<view class="flex justify-center">
				<image src="../../static/images/strong/slogan.png" mode="widthFix" style="width: 100vw;"></image>
			</view> -->
			
			
		<!-- 	<view class="flex justify-center padding-lr">
				<image src="../../static/images/strong/banner.jpg" mode="widthFix" style="width:100%"></image>
			</view> -->
			
		<!-- 	<view class="zaiui-view-content">
				<view class="zaiui-swiper-box">
					<swiper class="screen-swiper square-dot c" autoplay circular indicator-dots :current="swiperInfo.index"  @change="swiperChange">
						<swiper-item v-for="(item,index) in swiperInfo.list" :key="index">
							<view class="swiper-padding">
								<image :src="item.swiper" mode="widthFix"/>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view> -->
			<image src="/static/images/strong/header.jpg" mode="widthFix" style="width:750rpx"></image>
			
			
<!-- 			<swiper class="card-swiper square-dot" indicator-dots="true" circular="true" autoplay="true" interval="5000" duration="500"  indicator-color="#8799a3" indicator-active-color="#000000">
				<swiper-item v-for="(item,index) in swiperList.SliderItems" :key="index" 
					:class="cardCur==index?'cur':''" 
					@click="toLink(item.Link)">
					<view class="swiper-item">
						<image :src="item.Picture" mode="aspectFill" class="swiper_image" >
							<view class="swiper_mask text-white text-right padding-tb-xs padding-lr text-bold">{{item.Text}}</view>
						</image>
					</view>
				</swiper-item>
			</swiper>
			 -->
			
			<!-- <view class=" flex justify-around margin-top">
				<view class="flex flex-direction">
					<image src="/static/images/strong/logo.jpg" class="round header_icon"  ></image>
					<view class="text-center text-blue text-bold">烘焙</view>
				</view>
				<view class="flex flex-direction">
					<image src="/static/images/strong/logo.jpg" class="round header_icon"  ></image>
					<view class="text-center text-blue text-bold">培训</view>
				</view>
				<view class="flex flex-direction">
					<image src="/static/images/strong/logo.jpg" class="round header_icon"  ></image>
					<view class="text-center text-blue text-bold">供应链</view>
				</view>
				
			</view> -->
			
			<view class=" bg-white padding-lr margin-top ">
				  <view class='action'>
					<text class='cuIcon-titles text-black '></text>热销
				  </view>
			</view>
			
			<view class="cu-card case no-card" v-for="(item,index) in goodList" @click="toGoodDetal(item.id)">
				<view class="cu-item ">
					<view class="image shadow shadow-warp">
						  <image :src="item.imgs[0].src" mode="aspectFill" style="height: 200px;"></image>
						  <view class="cu-tag bg-red"  >{{item.shortDescription}}</view>
						  <view class="cu-bar bg-shadeBottom">
							<text class="text-cut">{{item.name}}</text>
						  </view>
					</view>
					<view class=" flex justify-between padding" v-if="isDistributor" >
						<view class=" flex-sub">
							<!-- <view class="text-black ">{{item.name}}</view> -->
							<view class="text-gray  text-sm flex justify-between"></view>
							<rich-text :nodes="item.fullDescription"></rich-text>
						</view>
						<view class="action">
							<button class="cu-btn round" @click.stop="getShareQR(index)">获取分享海报</button>
						</view>
					</view>
				</view>			
			</view>		
			
			
			<view class="text-center text-gray margin-top">
				已经到底部
			</view>
			<view class="pg-space-xl"></view>
			<view class="pg-space-xl"></view>
			
			<view class="bg-white cu-list menu" :style="'position: fixed; bottom:0px; left: 0; right: 0;'">
				<view class="cu-item ">
					<view class="action">					
						<text class="line-blue text-bold">{{shopName}}</text>	
					</view>
					<view class="action  text-sm basis-df text-right" @click="selectShop">
						<button class="cu-btn sm line-blue">(切换门店)</button>
					</view>
				</view>
			</view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				sn:"",
				totalFee:"", // 总积分
				balance:"", //当前积分
				
				shopName:"",
				
				title: 'Hello',
				isHost: true,
				isSeller: true,
				daystats: { totalScore: 0, totalPrize:0}, // 今日数据
				
				swiperList:[],
				
				storeList:[
					{name:"康浦店",id:1,url:"/static/images/strong/store_1.png"},
					{name:"盛天地店",id:7,url:"/static/images/strong/store_2.png"},
					{name:"南湖店",id:6,url:"/static/images/strong/store_3.png"},
				],
				store:{},
				orderList:[], //订单列表
				
				isDistributor:false, //是否有分享能力
				goodList:[	], // 产品列表
			}
		},
		onLoad() {
			this.setData({
				shopId:uni.getStorageSync(this.db.KEY_SHOP_ID) || "",
				shopName:uni.getStorageSync(this.db.KEY_SHOP_NAME) || "",
			})
			this.onInit()
			
			
			wx.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline'],
				success(res){
					console.log('success',res)
				},
				fail(res){
					console.log('fail',res)
				}
			})
		},
		onShareTimeline(res){
			return {
				title: "BL烘焙甜点咖啡",
				imageUrl: "/static/images/strong/share.jpg",
				query:"/pages/route/route",
			}
		},
		onShareAppMessage() {
			return {
				title: "BL烘焙甜点咖啡",
				imageUrl: "/static/images/strong/share.jpg",
				path:"/pages/route/route",
			}
		},
		methods: {
			
			async onInit(){		
				// // 获取轮播图
				// var res = await this.db.storeBanner({
				// 	ShopId: uni.getStorageSync(this.db.KEY_SHOP_ID ),
				// 	Location:this.db.BANNER_PRODUCT
				// })
				// this.setData({  swiperList:res.data })
				
				// 获取首页列表
				var res = await this.db.productGetNew()
				console.log(res)
				this.setData({ goodList:res.data })
				
				this.setData({
					sn:uni.getStorageSync(this.db.KEY_SN)
				})
				// 获取用户的积分
				var res = await this.db.customerGetPoint()
				this.setData({
					totalFee:res.data.wallet.totalFee || '0',
					balance:res.data.wallet.balance || '0', 
					isDistributor: uni.getStorageSync(this.db.KEY_IS_DISTRIBUTOR) || false
				})
				
			},
			toMenu(id,name){
				uni.setStorageSync(this.db.KEY_SHOP_ID,id)
				uni.setStorageSync(this.db.KEY_SHOP_NAME,name)
				uni.switchTab({
					url:"/pages/menu/menu"
				})				
			},			
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
			
			
			toLink(url){
				uni.navigateTo({
					url:url
				})
			},
			
			toGoodDetal(id){
				uni.navigateTo({
					url:"/pages/good/good?itemId=" + id
				})
			},
			
			swiperChange(){
				
			},
			
			getShareQR(index){
				uni.navigateTo({
					url:"/pages/good/share?good_index=" + index,
					fail(res){
						console.log(res)
					}
				})
			},
			
			// 选择门店
			selectShop(){
				uni.redirectTo({
					url: '/pages/index/store'
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	
	page{
	    background-color: var(--white)
	}
	
	.header_icon{
		width:60px;
		height:60px
	}
	
	
	.zaiui-view-content {
		// display: none;
		width: 100%;		
		.zaiui-tab-list {
			position: relative;
			width: 100%;
		}
	}
	.zaiui-view-content.welcome {
		/* #ifdef APP-PLUS */
		margin-top: calc(var(--status-bar-height) + 180rpx);
		/* #endif */
		
		/* #ifdef H5 */
		margin-top: calc(var(--status-bar-height) + 220rpx);
		/* #endif */
		
		/* #ifdef MP */
		margin-top: calc(var(--status-bar-height) + 220rpx);
		/* #endif */
		
		transition: all .25s;
	}
	.zaiui-view-content.show {
		display: block;
	}
	
	.my_score{
		// position: fixed;
		// top:0;
		// right:0;
		// left: 0;
	}
	
	.swiper_image{
		position: relative;
	}
	.swiper_mask{
		position: absolute;
		left:0;
		right:0;
		bottom:0;
		background-color: rgba(0,0,0,0.3);
		
	}
	
</style>
