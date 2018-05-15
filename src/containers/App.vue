<template>
	<div id="app">
		<BlockList/>
		<ButtonsWrapper/>
	</div>
</template>

<script>
import BlockList from '../containers/BlockList'
import ButtonsWrapper from './ButtonsWrapper'

export default {
	name: 'app',
	components: {
		BlockList,
		ButtonsWrapper
	}
}
</script>

<style>
@import url('../assets/fontello/fontello.css');

* {
	box-sizing: border-box;
}

#app {
	font-family: 'Helvetica Neue', 'Arial', sans-serif;
	text-align: center;
	padding: 50px 0;
}

body {
	padding: 0;
	margin: 0;
}

@media screen and (max-width: 800px) {
	#app {
		padding-left: 15px;
		padding-right: 15px;
	}
}
</style>
