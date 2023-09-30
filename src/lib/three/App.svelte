<script>
	import TopBar from '$lib/assets/UI/TopBar.svelte';
	import { Canvas } from '@threlte/core';
	import Scene from './Scene/Scene.svelte';
	import DataLogger from '$lib/dataLogger/DataLogger.svelte';
	import { world } from '$lib/stores';
	import RightBar from '$lib/assets/UI/RightBar.svelte';
	import Slider from '$lib/assets/UI/Slider.svelte';
</script>

<TopBar />
<div class="canvas-container">
	{#if $world != undefined}
		<Canvas>
			<Scene />
		</Canvas>
	{:else}
		<div class="waiter">
			<p class="loading" />
			<p class="error">Please load a file</p>
		</div>
	{/if}
</div>
{#if $world != undefined}
	<Slider />
	<DataLogger />
{/if}
<RightBar />

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@400&display=swap');

	:global(html) {
		font-family: 'Kanit', sans-serif;
	}

	.canvas-container {
		position: relative;
		height: calc(100% - 80px) !important;
		width: calc(100% - 392px) !important;
	}

	.waiter {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
