<template>
	<view>
		<view>
			<canvas canvas-id="mini_poster" :style="{ width: canvasW + 'px', height: canvasH + 'px' }"></canvas>
		</view>
		<image :src="qrImage" style="width: 100rpx;" mode="widthFix"></image>
		<view style="height: 106rpx;"></view>
		<view class="footer">
			<view  style="height: 106rpx; align-items: center; background-color: #333333;">
				<button class="text-white" 
				style="background: transparent; height: 106rpx; line-height: 106rpx;" @tap="toSaveImage" >保存海报</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mpWxQr: "https://as.datianshi.com/media/mp/2/wx/qr.PNG",
				canvasW: 0,
				canvasH: 0,
				invest_areas: [{id: 1, name: "儿童教育"}, {id: 1, name: "少儿编程"}, {id: 1, name: "生物智能"}, {id: 1, name: "万物相连"}, {id: 1, name: "大数据"}],
				nickname: "热豆Wakary",
				avatar: "https://as.datianshi.com/media/9/tmp_f9fdf9ee13548fa97fb1e7c8d0be7e30ee02ed1b533d39e7.jpg",
				company: "热豆科技",
				phone: "17610998099",
				email: "redoume@163.com",
				location: "北京",
				finished: false,
				
				
				qrImage:"",
				goodID : "",
				sn : "",
			}
		},
		onLoad(option) {
			console.log(option.good_id)
			
			this.setData({
				goodID :option.good_id　|| 1230,
				sn: uni.getStorageSync(this.db.KEY_SN)
			})
			
			console.log( this.$data.goodID , this.$data.sn)
			// this.canvasW = uni.getSystemInfoSync().windowWidth
			// this.canvasH = this.calculateCanvasHeight()
			// this.toDrawCanvas()
			this.getQR()
		},
		
		methods:{
			
			// onInit(){
			// 	this.getQR()
			// },
			
			async getQR(){
				// var query = "good_id=" + this.$data.goodID + "&share_sn=" + this.$data.sn
				var query =  this.$data.goodID + "_" + this.$data.sn
				
				console.log(query)
				var res = await this.db.wxOpenGetQRUnlimit({
					path:"pages/route/route",
					query:query,
					isForce:1,
				})
				console.log(res)
				this.setData({
					qrImage: res.data.url
				})
			},
			
			
			toSaveImage() {
				if (!this.finished) {
					uni.showToast({
						title: '正在生成图片，稍后再试',
						icon: 'none'
					})
					return
				}
				const that = this
				uni.canvasToTempFilePath({
					canvasId: 'mini_poster',
					success: (res) => {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: () => {
								uni.showToast({
									title: '保存成功'
								})
							},
							fail() {
								uni.showToast({
									icon: 'none',
									title: '保存名片码失败'
								})
							}
						})
					},
					fail() {
						uni.showToast({
							icon: 'none',
							title: '保存名片码失败'
						})
					}
				})
			},
			downloadImage(url) {
				return new Promise((resolve, reject) => {
					uni.downloadFile({
						url: url,
						success: (res) => {
							return resolve(res)
						},
						fail: (err) => {
							return reject(err)
						}
					})
				})
			}
		}
	}
</script>

<style>
	.footer {
		position: fixed;
		width: 100%;
		left: 0;
		bottom: 0;
		box-shadow: none;
		border-top: 1px solid #E2E2E2;
	}
</style>
