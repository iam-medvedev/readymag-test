<template>
	<label class="image-loader">
		<i class="icon-photo"></i>
		<input type="file" name="image" @change="addPhoto($event.target.files)" accept="image/*">
	</label>
</template>

<script>
import store from '../store'

export default {
	name: 'AddPhotoButton',

	methods: {
		/**
		 * Добавление фото
		 */
		addPhoto(files) {
			if (!files.length) return;
			const file = files[0];
			store.dispatch('addPhoto', file);
		}
	}
}
</script>

<style scoped lang="less">
label {
	color: #CECECE;
	font-size: 20px;
	display: inline-block;
	vertical-align: middle;
	cursor: pointer;
	transition: .1s linear color;

	&:hover {
		color: #494949;
	}

	input {
		display: none;
	}
}
</style>