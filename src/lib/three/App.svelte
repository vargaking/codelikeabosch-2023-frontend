<script>
	import TopBar from '$lib/assets/UI/TopBar.svelte';
	import { Canvas } from '@threlte/core';
	import Scene from './Scene/Scene.svelte';
	import DataLogger from '$lib/dataLogger/DataLogger.svelte';
	import { speed } from '$lib/stores';
	import RightBar from '$lib/assets/UI/RightBar.svelte';

	$speed = 5;
</script>

<TopBar />
<div class="canvas-container">
	<Canvas>
		<Scene />
	</Canvas>
</div>

<DataLogger />
<RightBar />

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@400&display=swap');

	:global(html) {
		font-family: 'Kanit', sans-serif;
	}

	.canvas-container {
		height: calc(100% - 80px) !important;
		width: calc(100% - 392px) !important;
	}
</style>
