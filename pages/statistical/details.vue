<template>
	<view class="">
		<view class="mine-options row between align ">
			<view class="row-left row align">
				<image :src="dataobject.headImg" mode="aspectFill" class="row-left-i"></image>
				<view class="row-top-title">
					{{dataobject.name}}
				</view>
			</view>
			<view class="row-right">
				{{dataobject.schoolName}}
			</view>
		</view>
		<view class="mine-options-con">
			<mix-list-cell image="/static/img/liebiao.png" @onClick="navTo(`/pages/statistical/itemdetails?type=1&id=${id}`, {login: true})" title="德" :point='dataobject.deDeifen'></mix-list-cell>
			<mix-list-cell image="/static/img/kapian.png" @onClick="navTo(`/pages/statistical/itemdetails?type=2&id=${id}`, {login: true})" title="能" :point='dataobject.nengDeifen'></mix-list-cell>
			<mix-list-cell image="/static/img/qiandao.png" @onClick="navTo(`/pages/statistical/itemdetails?type=3&id=${id}`, {login: true})" title="勤" :point='dataobject.qinDeifen'></mix-list-cell>
			<mix-list-cell image="/static/img/bianji.png" @onClick="navTo(`/pages/statistical/itemdetails?type=4&id=${id}`, {login: true})" title="绩" :point='dataobject.jiDeifen'></mix-list-cell>
			<mix-list-cell image="/static/img/bangzhu.png" @onClick="navTo(`/pages/statistical/itemdetails?type=5&id=${id}`, {login: true})" title="其他" :point='dataobject.qitaDeifen' border=""></mix-list-cell>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				dataobject: {
					name: "", //姓名
					headImg: "", //头像
					schoolName: "", //学校名称
					teacherId: "", //教师id
					qitaDeifen: "", //其它--得分
					nengDeifen: "", //能--得分
					jiDeifen: "", //绩--得分
					qinDeifen: "", //勤--得分
					deDeifen: "" //德--得分
				}
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.loadData();
		},
		methods: {
			async loadData() {
				this.$util.loading();
				const data = {
					teacherId: this.id
				};
				const res = await this.$request('tongjiDetails', data, {
					login: true
				});
				uni.hideLoading();
				if (res.result != 0) {
					this.$util.msg(res.resultNote);
					return
				}
				this.dataobject = res
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

	.mine-options {
		width: 96%;
		padding: 20upx;
		margin: 20upx auto 0;
		background: #FFFFFF;
		border-radius: 16upx;
	}

	.row-left-i {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		margin-right: 30upx;
	}

	.row-right {
		font-size: 26upx;
		color: #666666;
	}

	.row-top-title {
		font-size: 30upx;
		font-weight: bold;
	}
</style>
