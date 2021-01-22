<template>
	<view class="">
		<view class="header-bg">
			<banner-list :list="dataList"></banner-list>
		</view>
		<view class="header-info">
			<evan-form class="" :hide-required-asterisk="true" label-position="left" ref="form" :labelStyle="labelStyle" :model="userInfo">
				<evan-from-item prop="" label="姓名">
					<view class="input-con fill">
						<input type="text" value="" v-model="userInfo.name" placeholder-class="placeholder" placeholder="请输入您的姓名" class="input" />
					</view>
				</evan-from-item>
				<evan-from-item label="身份证" prop="idCard">
					<view class="input-con fill">
						<input type="text" value="" placeholder="请输入身份证" placeholder-class="placeholder" v-model="userInfo.idCard" class="input" />
					</view>
				</evan-from-item>
				<evan-from-item label="手机号" prop="phone">
					<view class="input-con fill">
						<input type="text" value="" v-model="userInfo.phone" placeholder-class="placeholder" placeholder="请输入您的手机号" class="input" />
					</view>
				</evan-from-item>
				<evan-from-item label="学校" prop="schoolName">
					<view class="input-con fill row align" @tap.stop="pickershow" style="padding-right: 20upx;">
						<input disabled="true" placeholder="请选择学校" placeholder-class="placeholder" v-model="userInfo.schoolName" class="input" />
						<view class="">
							<image src="/static/img/down.png" class="icon-img"></image>
						</view>
					</view>
				</evan-from-item>
			</evan-form>
		</view>
		<view class="btn" hover-class="hover-opacity" @click="userOptions">
			确认
		</view>
		<lb-picker :list="schollList" model='multiSelector' level='1' ref="picker" :props="myProps" @confirm="pickerconfirm"></lb-picker>
	</view>
</template>

<script>
	import evanFrom from "@/components/evan-form/evan-form.vue"
	import evanFromItem from "@/components/evan-form-item/evan-form-item.vue"
	import bannerList from "@/components/swiper.vue"
	import lbPicker from "@/components/lb-picker/index.vue"
	export default {
		components: {
			evanFrom,
			evanFromItem,
			bannerList,
			lbPicker
		},
		data() {
			return {
				labelStyle: {
					"font-size": '30upx',
					"font-weight": "bold",
					"width": "16%",
					"color": "#333333"
				},
				myProps: {
					label: 'schoolName',
					value: 'schoolId'
				},
				dataobject: {},
				schollList: [], //  学校列表
				dataList: [], //  轮播图
				userInfo: {
					name: '',
					phone: '',
					idCard: '',
					schoolId: '',
					schoolName: ''
				},
				rules: {
					name: {
						required: true,
						message: '请输入您的姓名'
					},
					idCard: [{
							required: true,
							message: '请输入您的身份证号'
						}
					],
					schoolName: {
						required: true,
						message: '请选择学校'
					},
					phone: [{
							required: true,
							message: '请输入您的手机号'
						},
						{
							pattern: '^[1][3456789]\\d{9}$',
							message: '手机号格式错误,请确认!'
						}
					]
				},
			}
		},
		onLoad(options) {
			this.dataobject = JSON.parse(options.id);
			this.getAdList();
			this.getSchollList();
			this.$nextTick(() => {
				this.$refs.form.setRules(this.rules);
			})
		},
		methods: {
			async getAdList() {
				const res = await this.$request('getShuffling');
				res.result == 0 ? this.dataList = res.dataList : this.$util.msg(res.resultNote)
			},
			async getSchollList() {
				const res = await this.$request('getSchools');
				res.result == 0 ? this.schollList = res.dataList : this.$util.msg(res.resultNote)
			},
			pickershow() {
				this.showPopup('picker');
			},
			pickerconfirm(e) {
				console.log(e)
				this.userInfo.schoolName = e.item[0].schoolName;
				this.userInfo.schoolId = e.item[0].schoolId;
				this.hidePopup('picker');
			},
			async userSub(){
				this.$util.loading('提交中...');
				const data = {
					idCard: this.userInfo.idCard,
					name: this.userInfo.name,
					phone: this.userInfo.phone,
					schoolId: this.userInfo.schoolId,
					openId: this.dataobject.openId,
					headImg: this.dataobject.headImg
				};
				const res = await this.$request('perfectInfo', data);
				uni.hideLoading();
				if (res.result != 0) {
					this.$util.msg(res.resultNote);
					return
				}
				uni.setStorageSync('uid', res.uid);
				this.$util.reLaunch('/pages/index/index');
			},
			userOptions() {
				if(!this.$util.checkStr(this.userInfo.idCard,'card')){
					this.$util.msg('身份证号格式错误,请确认!')
					return
				}
				this.$refs.form.validate((result) => {
					if (result) {
						let _this=this
						uni.requestSubscribeMessage({
							tmplIds: ['ZqFv9cvZkVX-5J63RVM0xkeCHspZU6Qno-seegaNFZA'],
							complete(){
								_this.userSub();
							}
						});
						
						
						
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.icon-img{
		width: 32upx;
		height: 32upx;
	}
	.header-info {
		width: 94%;
		margin:30upx auto;
		background: #FFFFFF;
		box-shadow: 0px 0px 84upx 0px rgba(204, 204, 204, 0.39);
		border-radius: 30upx;
		padding:30upx 20upx;
		box-sizing: border-box;
		z-index: 99999;
	}

	.input-con {
		height:80upx;
		background: #EEEEEE;
		border-radius: 16upx;
		padding-left: 20upx;
		box-sizing: border-box;
		margin-bottom: 30upx;
	}

	.input {
		height:80upx;
		line-height:80upx;
		flex: 1;
	}

	.input-icon {
		width: 34upx;
		height: 34upx;
		margin-right: 30upx;
	}

	.btn {
		line-height: 80upx;
		text-align: center;
		background: #fe5f23;
		border-radius: 16upx;
		font-size: 32upx;
		color: #EEFFFB;
		position: fixed;
		bottom: 100upx;
		width: 80%;
		left: 10%;
	}
</style>
