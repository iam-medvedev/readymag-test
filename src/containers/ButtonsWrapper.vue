<template>
	<div class="buttons">
		<AddPhotoButton />
		<AddVideoButton />
		<AddVideoModal />
	</div>
</template>

<script>
import AddPhotoButton from '../components/AddPhotoButton'
import AddVideoButton from '../components/AddVideoButton'
import AddVideoModal from '../components/AddVideoModal'

export default {
	name: 'ButtonsWrapper',
	components: {
		AddPhotoButton,
		AddVideoButton,
		AddVideoModal
	}
}
</script>

<style scoped lang="less">
.buttons {
	display: inline-block;
	margin: 0 auto;
	padding: 10px 13px;
	border-radius: 10px;
	background: #fff;
	box-shadow: 0px 4px 13px rgba(73, 73, 73, .2);

	label, button {
		margin: 0 5px;
	}
}
</style>
