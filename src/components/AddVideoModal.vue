<template>
	<div class="add-video-wrapper" :class="{showed: isAddModalOpened}" @click="closeModal($event)">
		<div class="add-video-modal">
			<form v-on:submit.prevent="addVideo">
				<input
					:class="{error: urlError}"
					@keydown="inputChanged()"
					type="text"
					placeholder="http://youtube.com/..."
					v-model="url"
					required />
				<button type="submit" :disabled="urlError">
					<i class="icon-search"></i>
				</button>
			</form>
		</div>
	</div>
</template>

<script>
import store from '../store'
import urlParser from 'js-video-url-parser/lib/base'
import 'js-video-url-parser/lib/provider/youtube'

export default {
	name: 'AddVideoButton',

	data() {
		return {
			url: null,
			urlError: null,
			escListener: null
		}
	},

	computed: {
		isAddModalOpened: () => store.state.isAddModalOpened
	},

	mounted() {
		this.escListener = e => {
			if (e.keyCode === 27) {
				store.commit('toggleVideoModal', false);
			}
		};

		document.body.addEventListener('keyup', this.escListener);
	},

	beforeDestroy() {
		if (this.escListener) {
			document.body.removeEventListener('keyup', this.escListener);
		}
	},

	methods: {
		/**
		 * Закрыть модалку при клике по фону
		 */
		closeModal(e) {
			if ([...(e.target.classList)].includes('add-video-wrapper')) {
				store.commit('toggleVideoModal', false);
			}
		},

		inputChanged() {
			this.urlError = false;
		},

		/**
		 * Добавление видео
		 */
		addVideo() {
			const parsedData = urlParser.parse(this.url || null);

			if (parsedData && parsedData.id) {
				store.commit('addBlock', {
					type: 'video',
					thumbnail: `https://img.youtube.com/vi/${parsedData.id}/0.jpg`,
					url: `https://www.youtube.com/watch?v=${parsedData.id}`
				});

				store.commit('toggleVideoModal', false);
				this.url = null;
			} else {
				this.urlError = true;
			}
		}
	}
}
</script>

<style scoped lang="less">
.add-video-wrapper {
	display: block;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(73, 73, 73, .4);
	transition: .1s linear opacity, .1s visibility;
	opacity: 0;
	visibility: hidden;
	z-index: 10;

	&.showed {
		opacity: 1;
		visibility: visible;
	}

	.add-video-modal {
		position: absolute;
		top: 50%;
		left: 50%;
		max-width: 400px;
		width: 100%;
		transform: translate(-50%, -50%);
		background: #fff;
		display: inline-block;
		padding: 20px 15px;
		border-radius: 5px;
		box-shadow: 0px 4px 13px rgba(73, 73, 73, .2);
		text-align: left;
	}

	form {
		display: flex;
	}

	input {
		display: block;
		width: 100%;
		font-size: 14px;
		padding: 0 10px;
		border: none;
		height: 40px;
		outline: none;
		transition: .1s linear border;

		&.error, &.error::placeholder {
			color: red;
		}
	}

	button {
		background: none;
		border: none;
		font-size: 20px;
		color: #CECECE;
		transition: .1s linear color;
		outline: none;
		cursor: pointer;

		&:hover {
			color: #494949;
		}

		&[disabled] {
			pointer-events: none;
		}
	}
}

@media screen and (max-width: 800px) {
	.add-video-wrapper .add-video-modal {
		width: ~"calc(100% - 30px)";
	}
}
</style>