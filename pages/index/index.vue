<template>
	<view>
		<view class="min-slice" :style="{height:height+'px','background':BgColor}">
		</view>
		<view class="mine-top">
			<image src="/static/img/bg@2x.png" mode="aspectFill" class="bgimg"></image>
			<view class="mine-top-info" :style="{'padding-top':height+'px'}">
				<view class="center align column" style="padding: 0 30upx;">
					<view class="column center align" @tap.click="useroptions">
						<image :src="dataobject.headImg" mode="aspectFill"></image>
						<view class="use-name">
							{{dataobject.name}}
						</view>
					</view>
					<view class="fill use-money" v-if="dataobject.yujijiangjin!=''">
						您的当前考核等级{{dataobject.kaoheLevel==1?'优秀':dataobject.kaoheLevel==2?'称职':
			dataobject.kaoheLevel==3?'基本称职':dataobject.kaoheLevel==4?'不称职':''}},预计奖金:{{dataobject.yujijiangjin}}元。
					</view>
				</view>

			</view>
		</view>
<!-- //考核等次（1：优秀；2：称职；3：基本称职；4：不称职；） -->
		<view class="mine-options-con">
			<mix-list-cell title="所属学校" :tips='dataobject.schoolName'></mix-list-cell>
			<mix-list-cell title="总分" :tips="dataobject.zongfen"></mix-list-cell>
			<mix-list-cell title="名次" :tips="dataobject.mingci"></mix-list-cell>
			<mix-list-cell title="考核等次" :tips="[dataobject.kaoheLevel==1?'优秀':dataobject.kaoheLevel==2?'称职':
			dataobject.kaoheLevel==3?'基本称职':dataobject.kaoheLevel==4?'不称职':'']"></mix-list-cell>
			<mix-list-cell title="距上一名差" :tips='dataobject.topChafen' border=""></mix-list-cell>
		</view>
		<!-- type	是	string	1：德；2：能；3：勤；4：绩；5：其它； -->
		<view class="mine-options-con" style="margin-bottom: 50upx;">
			<mix-list-cell image="/static/img/liebiao.png" title="德" :point='dataobject.deDeifen' 
			@onClick="navTo('/pages/index/de?id=1', {login: true})"></mix-list-cell>
			<mix-list-cell image="/static/img/kapian.png" title="能" :point='dataobject.nengDeifen' 
			@onClick="navTo('/pages/index/de?id=2', {login: true})"></mix-list-cell>
			<mix-list-cell image="/static/img/qiandao.png" title="勤" :point='dataobject.qinDeifen' 
			@onClick="navTo('/pages/index/de?id=3', {login: true})"></mix-list-cell>
			<mix-list-cell image="/static/img/bianji.png" title="绩" :point='dataobject.jiDeifen' 
			@onClick="navTo('/pages/index/de?id=4', {login: true})"></mix-list-cell>
			<mix-list-cell image="/static/img/bangzhu.png" title="其他" :point='dataobject.qitaDeifen' border="" 
			@onClick="navTo('/pages/index/de?id=5', {login: true})"></mix-list-cell>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				BgColor: 'transparent',
				top: uni.getSystemInfoSync()['statusBarHeight'],
				height: uni.getSystemInfoSync()['statusBarHeight'] + 54,
				dataobject: {
					mingci: "", //名次
					zongfen: "", //总分
					headImg: "/static/img/logo.jpg", //头像
					qitaDeifen: "", //其它--得分
					yujijiangjin: "", //预计奖金
					nengDeifen: "", //能--得分
					kaoheLevel: "", //考核等次（1：优秀；2：称职；3：基本称职；4：不称职；）
					topChafen: "", //与上一名差多少分
					jiDeifen: "", //绩--得分
					name: "点击登录", //姓名
					qinDeifen: "", //勤--得分
					deDeifen: "", //德--得分
					schoolName: "" //学校名称
				}
			}
		},
		// onPageScroll(e) {
		// 	e.scrollTop>=this.top?this.BgColor='#fe5f23':this.BgColor='transparent'
		// },
		onLoad() {
			this.loadData()
		},
		methods: {
			useroptions(){
				if(!uni.getStorageSync('uid')){
					this.$util.reLaunch('/pages/author/index')
				}
			},
			async loadData() {
				this.$util.loading();
				const res = await this.$request('myKaohe', {
					uid: uni.getStorageSync('uid')
				}, {
					login: true
				});
				uni.hideLoading();
				if (res && res.result != 0) {
					this.$util.msg(res.resultNote);
					return
				}
				this.dataobject = res;
				console.log(this.dataobject)
			}
		}
	}
</script>
<style scoped lang="scss">
	.use-money {
		color: #FFFFFF;
		font-size: 24upx;
	}

	.mine-options-con {
		width: 96%;
		padding: 20upx 0;
		margin: 20upx auto 0;
		background: #FFFFFF;
		border-radius: 16upx;
	}

	.mine-top-title {
		height: 88upx;
		line-height: 88upx;
		text-align: center;
		font-size: 34upx;
		font-weight: bold;
		color: #FFFFFF;
	}

	.min-slice {
		width: 750upx;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
	}

	.mine-top {
		width: 750upx;
		height:428upx;
		position: relative;

		.bgimg {
			width: 100%;
			height: 100%;
			z-index: -1;
			position: absolute;
			top: 0;
			left: 0;
		}
	}

	.mine-top-info {

		// height: 500upx;
		image {
			width: 140upx;
			height: 140upx;
			border-radius: 50%;
			border:2upx solid #FFFFFF;
		}
	}

	.use-name {
		color: #FFFFFF;
		font-weight: bold;
		padding: 20upx 0;
	}
</style>
