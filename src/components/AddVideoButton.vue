<template>
	<button @click="openModal()"><i class="icon-video"></i></button>
</template>

<script>
import store from '../store'

export default {
	name: 'AddVideoButton',

	methods: {
		openModal: () => store.commit('toggleVideoModal', true)
	}
}
</script>

<style scoped lang="less">
button {
	border: none;
	background: none;
	color: #CECECE;
	font-size: 20px;
	display: inline-block;
	vertical-align: middle;
	padding: 0;
	outline: none;
	cursor: pointer;
	transition: .1s linear color;

	&:hover {
		color: #494949;
	}
}
</style>