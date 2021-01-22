<template>
	<view class="">
		<view class="author-con">
			<image src="/static/img/logo.jpg" class="logo"></image>
			<view class="isLogin">
				<view class="loginshopImg">
					<view class="textIno">小程序将获取以下权限：</view>
					<view class="textIno">(如未授权，可能无法正常使用该小程序)</view>
				</view>
				<view class="isAgary-con" style="padding-top: 60rpx;">
					<view class="isAgary">
						<text>•</text>
						<view class="textIno">获取你的公开信息(昵称、头像等)</view>
					</view>
				</view>
				<view class="isLoginBtn">
					<button class="loginbtn login_confirm" hover-class="hover-opacity" open-type="getUserInfo" lang="zh_CN"
					 @getuserinfo="bindGetUserInfo">授 权 登 录</button>
					<button class="loginbtn login_cancle" hover-class="hover-opacity" @tap="reLaunch('/pages/index/index')">暂 不 登 录</button>
				</view>
				<!-- <view class="uni-flex d-items-center d-content-center" style="margin-top:10upx;">
					<view class="tips">
						登录代表您已同意
					</view>
					<navigator url="./mineoptions/webView?type=1" class="" style="color:#239FEF;font-size: 24upx;font-weight: 400;">
						《服务协议》
					</navigator>，
					<navigator  url="./mineoptions/webView?type=2" class="" style="color:#239FEF;font-size: 24upx;font-weight: 400;">
						《隐私协议》
					</navigator>
				</view> -->
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				uid: '',
				code: ''
			};
		},
		methods: {
			bindGetUserInfo(e) {
				if (!e.detail.userInfo) {
					return;
				}
				this.$util.loading('登陆中...');
				uni.login({
					success:async  options => {
						const data = {
							code: options.code,
							userInfo: e.detail.userInfo
						}
						const res=await this.$request('authorizationUser', data);
						uni.hideLoading();
						if (res.result==1) {
							this.$util.msg(res.resultNote);
							return;
						}
						if(res.result==2){
							this.$util.reLaunch('/pages/login/index?id=' + JSON.stringify(res))
							return;
						}
						if (res.result ==0) {
							uni.setStorageSync('uid', res.uid);
							this.$util.reLaunch('/pages/index/index');
						}
					}
				})
			}
		}
	};
</script>
<style scoped lang="less">
	.tips {
		font-size: 24upx;
		font-weight: 400;
	}

	.bg-img {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		z-index: -1;
	}

	.author-con {
		position: fixed;
		top: 50%;
		left: 5%;
		width: 90%;
		transform: translateY(-50%);
		// background: #FFFFFF;
		border-radius: 100upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-bottom: 80upx;
	}

	.logo {
		width: 180upx;
		height: 180upx;
		margin:40upx 0;
		border-radius: 50%;
	}

	.isLogin {
		width: 80%;
	}

	.isLoginBtn {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.cancelbtn {
		/* background: #007AFF; */
		width: 100%;
		height: 68repx;
		padding-left: 0rpx;
		padding-right: 0rpx;
		margin-right: 0rpx;
		margin-left: 0rpx;
		font-size: 28rpx;
		margin-top: 20rpx;
		color: #007aff;
	}

	.login_confirm {
		background: #fe5f23;
	}

	.login_cancle {
		background: #cccccc;
	}

	.isLoginBtn .loginbtn {

		width: 100%;
		height: 68repx;
		padding-left: 0rpx;
		padding-right: 0rpx;
		margin-right: 0rpx;
		margin-left: 0rpx;
		font-size: 28rpx;
		margin-top: 50rpx;
		color: #ffffff;
	}

	.loginTitle {
		font-size: 34rpx;
	}

	.loginshopImg {
		height: 80rpx;
		font-size: 26rpx;
		padding: 20rpx 0rpx;
	}

	.isAgary {
		display: flex;
		align-items: center;
		font-size: 24rpx;
		color: #666;
		/* padding: 30upx 0; */
	}

	.textIno {
		margin-right: 20rpx;
		font-size: 12px;
	}
</style>
