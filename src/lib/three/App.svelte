<script>
	import TopBar from '$lib/assets/UI/TopBar.svelte';
	import { Canvas } from '@threlte/core';
	import Scene from './Scene/Scene.svelte';
	import DataLogger from '$lib/dataLogger/DataLogger.svelte';
	import { speed, tick, world } from '$lib/stores';
	import RightBar from '$lib/assets/UI/RightBar.svelte';
	import { onMount } from 'svelte';
	import Slider from '$lib/assets/UI/Slider.svelte';

	let delta;

	onMount(() => {
		console.log(world[$tick + 1].time - world[$tick].time);
		delta = world[$tick + 1].time - world[$tick].time;
	});
</script>

<TopBar />
<div class="canvas-container">
	<Canvas>
		<Scene />
	</Canvas>
</div>
<Slider />
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
