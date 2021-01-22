<template>
	<view class="">
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :back-top="true" v-if="!show">
			<view class="row item_con" @tap.stop="navTo(`/pages/statistical/details?id=${item.teacherId}`)" v-for="(item,index) in dataList" :key='index'>
				<view class="left">
					<image :src="[item.kaoheLevel==1?'/static/img/you.png':item.kaoheLevel==2?'/static/img/liang.png':
					item.kaoheLevel==3?'/static/img/zhong.png':item.kaoheLevel==4?'/static/img/cha.png':'']" mode="aspectFill"></image>
				</view>
				<view class="row align fill right">
					<view :class="[item.kaoheLevel==1?'optimal':item.kaoheLevel==2?'good':item.kaoheLevel==3?'middle':item.kaoheLevel==4?'poor':'']">
						{{index+1}}
					</view>
					<view class="fill use-name">
						{{item.teacherName}}
					</view>
					<view class="right-point">
						{{item.zongfen}}分
					</view>
				</view>
			</view>
		</s-pull-scroll>
		<wx-empty v-if="show"></wx-empty>
	</view>

</template>

<script>
	import sPullScroll from '@/components/s-pull-scroll/index.vue';
	import wxEmpty from "@/components/xw-empty/xw-empty.vue"
	export default {
		components: {
			sPullScroll,
			wxEmpty
		},
		data() {
			return {
				dataList: [],
				show:false
			}
		},
		onLoad() {
			if(uni.getStorageSync('uid')){
				this.refresh();
			}else{
				this.show=true;
			}
			
		},
		methods: {
			refresh() {
				this.$nextTick(() => {
					this.$refs.pullScroll.refresh();
				});
			},
			pullDown(pullScroll) {
				setTimeout(() => {
					this.loadData(pullScroll);
				}, 200)
			},
			async loadData(pullScroll) {
				if (pullScroll.page == 1) {
					this.dataList = [];
				}
				const res = await this.$request('kaoheTongji', {uid:uni.getStorageSync('uid'),pageNo:pullScroll.page}, {
					login: true
				});
				console.log(res)
				if(res.result!=0){
					this.$util.msg(res.resultNote);
					return
				}
				const curList=[];
				res.dataList.length == 0 ? (pullScroll.empty()) :(
				res.dataList.forEach(item => {
						curList.push(item)
					}), this.dataList = this.dataList.concat(curList), pullScroll.page >= res.totalPage ? pullScroll.finish() :
					pullScroll.success()) 
			}
		}
	}
</script>

<style scoped lang="scss">
	.optimal {
		color: #f0a83e;
	}

	.good {
		color: #bbcedf;
	}

	.middle {
		color: #d3ac6b;
	}

	.poor {
		color: #c8c8c8;
	}

	.item_con {
		width: 96%;
		height:90upx;
		padding: 0 20upx;
		border-radius: 10upx;
		margin: 20upx auto 0;
		background: #FFFFFF;
		position: relative;
	}

	.left {
		position: absolute;
		left: 40upx;
		top: 0;
		width: 49upx;
		height:70upx;
		image {
			width: 100%;
			height: 100%;
		}
	}

	.right {
		padding-left: 140upx;
	}

	.use-name {
		text-align: center;
		font-weight: bold;
	}

	.right-point {
		font-size: 26upx;
		color: #666666;
	}
</style>
