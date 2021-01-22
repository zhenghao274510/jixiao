<template>
	<view class="swiper-content">
		<view class="search-wrapper">
			<view class="swiper-wrapper">
				<swiper class="swiper" circular="true" autoplay="true" :indicator-dots="false" duration="1000" indicator-color="#FFEAAD">
					<swiper-item class="swiper-item" v-for="(item,index) of list" :key="index">
						<img :src="item.img" />
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			}
		}
	}
</script>

<style scoped>
	.swiper-content {
		position: relative;
	}

	.uni-icon-location-filled {
		color: #FFFFFF;
		font-size: 28upx;
	}

	.img {
		width: 50upx;
		height: 50upx;
	}

	.swiper {
		width: 100%;
		height: 406upx;
	}

	.swiper-item {
		width: 100%;
		display: block;
	}

	.swiper-item img {
		width: 100%;
		margin: 0 auto;
		display: block;
		height: 406upx;
	}

	.swiper-item.active {
		z-index: 9;
	}
</style>
