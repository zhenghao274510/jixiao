<template>
	<view class="">
		<view class="mine-options-con">
			<view class="row between align row-top b-b">
				<view class="row-title">
					考核名称
				</view>
				<view class="row-title">
					得分
				</view>
			</view>
			<block v-for="(item,index) in dataobject.dataList" :key="index">
				<mix-list-cell :title="item.name" :tips='item.deifen' :border="[index==len?'':'b-b']"></mix-list-cell>
			</block>
		</view>
		<view class="row-bottom row between align">
			<view class="row-tips">
				小计
			</view>
			<view class="row-r-tips">
				{{dataobject.xiaoji}}
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				dataobject: {
					xiaoji:'',
					dataList:[]
				},
				type: 0,
				len:0,
				uid:''
			}
		},
		onLoad(options) {
			this.type = options.type;
			options.type==1?this.setNav('德'):options.type==2?this.setNav('能'):options.type==3?this.setNav('勤'):options.type==4?this.setNav('绩'):this.setNav('其它');
			this.uid=options.id;
			console.log(options.id)
			this.loadData()
		},
		methods: {
			async loadData() {
				const data = {
					uid: this.uid,
					type: this.type
				}
				this.$util.loading();
				const res = await this.$request('kaoheDetails', data, {
					login: true
				});
				uni.hideLoading();
				if (res.result != 0) {
					this.$util.msg(res.resultNote);
					return
				}
				this.dataobject = res;
				this.len=res.dataList.length-1;
				console.log(this.dataobject)
			}
		}
	}
</script>

<style scoped>
	.mine-options-con {
		width: 96%;
		padding: 20upx 0;
		margin: 20upx auto 0;
		background: #FFFFFF;
		border-radius: 16upx;
	}

	.row-top {
		height: 96rpx;
		padding: 0 24rpx;
	}

	.row-title {
		font-size: 30upx;
		font-weight: bold;
	}

	.row-bottom {
		width: 96%;
		padding: 20upx 24rpx;
		margin: 20upx auto;
	}

	.row-r-tips {
		color: #ff0000;
		font-weight: bold;
		font-size: 26upx;
	}
</style>
