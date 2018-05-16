<template>
	<section>
		<div
			class="block"
			:class="{'resize-free': type == 'video', 'resize-locked': type == 'photo'}"
			:id="'thumbnail-' + index"
			>

			<!-- image -->
			<img :src="thumbnail" alt="">

			<!-- video url -->
			<a :href="url" target="_blank" rel="nofollow noopener" v-if="type == 'video'">
				<span class="icon-video"></span>
			</a>

			<!-- handles -->
			<div class="handle handle-nw"></div>
			<div class="handle handle-ne"></div>
			<div class="handle handle-sw"></div>
			<div class="handle handle-se"></div>
		</div>
	</section>
</template>

<script>
import interact from 'interactjs'

export default {
	name: 'Block',
	props: ['thumbnail', 'url', 'type', 'index'],

	mounted() {
		interact(`#thumbnail-${this.index}`)
			.draggable({
				onmove: this.dragMoveListener,
				restrict: {
					restriction: 'parent',
					elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
				}
			})
			.resizable({
				preserveAspectRatio: this.type == 'photo', // сохраняем пропорции только для фото, для видео - свободные пропорции
				edges: { left: true, right: true, bottom: true, top: true },
				restrictEdges: {
					outer: 'parent',
					endOnly: true
				},
				restrictSize: {
					min: { width: 100, height: 100 }
				},
				onend: this.resizeEndListener
			})
			.on('resizemove', this.resizeListener);
	},

	methods: {
		/**
		 * Колбэк драга
		 */
		dragMoveListener(event) {
			const target = event.target;
			let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
			let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

			this.setElPosition(target, x, y);
		},

		/**
		 * Колбэк ресайза
		 */
		resizeListener(event)  {
			const target = event.target;
			let x = (parseFloat(target.getAttribute('data-x')) || 0);
			let y = (parseFloat(target.getAttribute('data-y')) || 0);

			target.style.width  = `${event.rect.width}px`;
			target.style.height = `${event.rect.height}px`;

			x += event.deltaRect.left;
			y += event.deltaRect.top;

			this.setElPosition(target, x, y);
		},

		/**
		 * Колбэк после ресайза
		 * p.s. отрабатывает только после ресайза с preserveAspectRatio=true
		 */
		resizeEndListener(event) {
			if (event.interactable.options.resize.preserveAspectRatio) {
				const target = event.target;
				const { relativePos, aspectRatio, parent } = this.getBlockData(target);

				if (relativePos.top < 0) {
					this.setElPosition(target, relativePos.left, 0);
					this.resizeEndListener(event);
				}

				if (relativePos.top + target.clientHeight > parent.clientHeight) {
					const rest = Math.abs(parent.clientHeight - (relativePos.top + target.clientHeight));
					target.style.height = `${parseFloat(target.style.height) - rest}px`;
					target.style.width = `${parseFloat(target.style.height) * aspectRatio}px`;
				}
			}
		},

		/**
		 * Установка позиции элемента
		 * @param target Element
		 * @param x Number
		 * @param y Number
		 */
		setElPosition(target, x, y) {
			target.style.webkitTransform = target.style.transform = `translate(${x}px, ${y}px)`;

			target.setAttribute('data-x', x);
			target.setAttribute('data-y', y);
		},

		/**
		 * Получение необходимых данных о блоке
		 * @return relativePos Object - позиция блока относительно родителя
		 * @return aspectRatio Number - соотношение сторон изображения
		 * @return parent Element - parentNode
		 */
		getBlockData(target) {
			const parent = target.parentNode;
			const parentPos = parent.getBoundingClientRect();
			const childrenPos = target.getBoundingClientRect();
			const img = target.querySelector('img');
			const aspectRatio = img.clientWidth / img.clientHeight;

			let relativePos = {
				top: childrenPos.top - parentPos.top,
				right: childrenPos.right - parentPos.right,
				bottom: childrenPos.bottom - parentPos.bottom,
				left: childrenPos.left - parentPos.left
			};

			return {
				relativePos,
				aspectRatio,
				parent
			}
		}
	}
}
</script>

<style scoped lang="less">
section {
	background: #f8f8f8;
	max-width: 800px;
	margin: 0 auto 50px;
	width: 100%;
	height: 500px;
	position: relative;
	overflow: hidden;
}

.block {
	position: relative;
	display: block;

	&.resize-free {
		width: 200px;
		height: 200px;

		img {
			display: block;
			height: 100%;
			width: 100%;
		}
	}

	&.resize-locked {
		width: 200px;

		img {
			display: block;
			height: auto;
			width: 100%;
		}
	}

	&:hover .handle {
		opacity: 1;
	}

	.handle {
		position: absolute;
		z-index: 5;
		width: 10px;
		height: 10px;
		border: 1px solid #CECECE;
		background: #fff;
		opacity: 0;
		transition: .1s linear border, .1s linear opacity;

		&:hover {
			border-color: #494949;
		}

		&.handle-nw {
			top: 0;
			left: 0;
		}

		&.handle-ne {
			top: 0;
			right: 0;
		}

		&.handle-sw {
			bottom: 0;
			left: 0;
		}

		&.handle-se {
			bottom: 0;
			right: 0;
		}
	}

	a {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: rgba(255, 255, 255, .5);
		border-radius: 50%;
		width: 40px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		font-size: 15px;
		transition: .1s linear color, .1s linear background;
		cursor: pointer;
		box-shadow: 0px 4px 13px rgba(73, 73, 73, .2);
		color: #CECECE;

		&:hover {
			color: #494949;
			background: #fff;
		}
	}
}
</style>