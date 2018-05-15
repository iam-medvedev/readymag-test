<template>
	<div class="result">
		<div v-for="(block, index) in blocks" :key="index">
			<Block
				:index="index"
				:type='block.type'
				:thumbnail='block.thumbnail'
				:url='block.url'
			/>
		</div>
	</div>
</template>

<script>
import store from '../store'
import Block from '../components/Block'

export default {
	name: 'BlockList',
	computed: {
		blocks: () => store.state.blocks
	},
	components: {
		Block
	}
}
</script>

<style scoped>
.result {
	width: 100%;
	max-width: 800px;
	margin: 0 auto;
}
</style>
