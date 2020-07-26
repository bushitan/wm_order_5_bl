<template>
	<view class="zaiui-home-box show">
		
		<view class="zaiui-swiper-background-box show" :class="[show?'show':'',welcome?'welcome':'']">
			<block v-for="(item,index) in list_data" :key="index">
				<!-- <view class="swiper-background" :style="[{backgroundImage:'url('+ item.background +')'}]"
				:class="index == indexs?'show':''"></view> -->
				<image 
					class="swiper-background" 
					:class="index == indexs?'show':''" 
					:src="item.background"></image>
			</block>
		</view>
				
		
		
		<view class="zaiui-head-search-box" :class="headInfo.Class" :style="[{backgroundColor:'rgba(229, 77, 66,'+ headInfo.opacity +')'}]">
			
			<!--小程序端的标题-->
			<!-- #ifdef MP -->
			<view class="text-center text-white zaiui-small-routine-title">首页</view>
			<!-- #endif -->
			
			<!--搜索框-->
			<view class="cu-bar search zaiui-search-box">
				<view class="search-form round" @tap="searchTap">
					<text class="cuIcon-search"/>
					<text>口罩</text>
				</view>
				<view class="action text-white">领现金</view>
			</view>
			
			<!--选项卡-->
			<view class="zaiui-flex-tab show">
				<view class="flex text-white">
					<view class="basis-xxl">
						<scroll-view scroll-x class="nav z" scroll-with-animation :scroll-left="headTab.scrollLeft">
							<block v-for="(item,index) in headTab.list" :key="index">
								
								<view class="cu-item" :class="index==headTab.TabCur?'select':''" @tap="tabSelect" :data-id="index">
									<view>{{item}}</view>
									<view class="tab-dot bg-white" v-if="index==headTab.TabCur"/>
								</view>
							</block>
						</scroll-view>
					</view>
					<view class="basis-xxs">
						<view class="sort-icon" @tap="sortVueTap">
							<text class="cuIcon-sort"/>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="zaiui-view-content">
			<view class="zaiui-swiper-box">
				<swiper class="screen-swiper square-dot c" autoplay circular indicator-dots :current="swiperInfo.index"  @change="swiperChange">
					<swiper-item v-for="(item,index) in swiperInfo.list" :key="index">
						<view class="swiper-padding">
							<image :src="item.swiper" mode="widthFix"/>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list_data:[
					{
						swiper: '/static/images/home/swiper/swiper-1.png',
						background: '/static/images/home/swiper/swiper-background-1.png',
					},
					{
						swiper: '/static/images/home/swiper/swiper-2.png',
						background: '/static/images/home/swiper/swiper-background-2.png',
					},
					{
						swiper: '/static/images/home/swiper/swiper-3.png',
						background: '/static/images/home/swiper/swiper-background-3.png',
					}
				],
				indexs:0,
				show:true,
				welcome:!true,
				
				swiperInfo: {index: 0, show: true, welcome: true, 
					list: [
						
							{
								swiper: '/static/images/home/swiper/swiper-1.png',
								background: '/static/images/home/swiper/swiper-background-1.png',
							},
							{
								swiper: '/static/images/home/swiper/swiper-2.png',
								background: '/static/images/home/swiper/swiper-background-2.png',
							},
							{
								swiper: '/static/images/home/swiper/swiper-3.png',
								background: '/static/images/home/swiper/swiper-background-3.png',
							}
					]},
				
				
				
				
				headTab: {TabCur: 0, scrollLeft: 0, list: [
					'首页','服装鞋帽','交通工具','家电','家居家具','珠宝配饰','美妆个护','运动户外','母婴用品','玩具乐器','手机','数码','电脑办公'
				]},
				// headTab:['首页','服装鞋帽','交通工具','家电','家居家具','珠宝配饰','美妆个护','运动户外','母婴用品','玩具乐器','手机','数码','电脑办公'],
				 headInfo: {Class: "", opacity: 0,}
			}
		},
		// onLoad() {
		// 	// this.onInit()
		// },
		// onShareAppMessage() {
			
		// },
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
			},
			
		}
	}
	
	
</script>


<style lang="scss" scoped>
	
	page{
	    // background-color: var(--ghostWhite)
	    background-color: #f1f1f1
	}
	.zaiui-swiper-background-box {
			position: absolute;
			height: 348rpx;
			width: 100%;
			top: 0;
			display: none;
			transition: 0s;
			.swiper-background {
				position: absolute;
				height: 100%;
				width: 100%;
				opacity: 0;
				top: 0;
				background-size: cover;
				transition: opacity .25s;
			}
			.swiper-background.show {
				opacity: 1;
				transition: opacity .25s;
			}
		}
		.zaiui-swiper-background-box.show {
			display: block;
			transition: 0s;
		}
		.zaiui-swiper-background-box.welcome {
			top: calc(var(--status-bar-height) + 101rpx);
			transition: top .25s;
		}
		
			.zaiui-swiper-box {
				width: 100%;
				.screen-swiper {
					height: 230rpx;
					min-height: 230rpx;
					.swiper-padding {
						padding: 0 25rpx;
					}
				}
			}
	
		.zaiui-view-content {
			// display: none;
			width: 100%;
			
			/* #ifdef APP-PLUS */
			margin-top: calc(var(--status-bar-height) + 30rpx);
			/* #endif */
			
			/* #ifdef H5 */
			margin-top: calc(var(--status-bar-height) + 35rpx);
			/* #endif */
			
			/* #ifdef MP */
			margin-top: calc(var(--status-bar-height) + 85rpx);
			/* #endif */
			
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
		
		
		.zaiui-flex-tab {
			position: relative;
			transition: opacity .25s;
			.flex {
				.basis-xxl {
					flex-basis: 90%;
					width: 90%;
					z-index: 1;
				}
				.basis-xxs {
					flex-basis: 10%;
					z-index: 1;
					width: 10%;
				}
				.sort-icon {
					font-size: 55rpx;
					height: 64rpx;
					line-height: 64rpx;
					text-align: center;
				}
			}
		}
		
		
			.tab-dot{
				position: absolute;
				height: 4px;
				border-radius: 10px;
				bottom: 0;
				left: 0;
				right: 0;
				width: 20px;
				margin: auto;
			}
</style>

