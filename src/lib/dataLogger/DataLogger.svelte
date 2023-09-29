<script lang="ts">
	import { speed, tick, world } from '$lib/stores';
	import Stats from 'stats.js';
	import { onMount } from 'svelte';

	$: speedMetersPerSecond = ($speed * 1000) / 3600;

	const firstTime = world[0].time;

	onMount(() => {
		let stats = new Stats();

		stats.showPanel(0);

		stats.dom.style.top = '80px';

		document.body.appendChild(stats.dom);

		function animate() {
			stats.begin();

			// monitored code goes here

			stats.end();

			requestAnimationFrame(animate);
		}

		requestAnimationFrame(animate);
	});
</script>

<div class="logger-container">
	<p>{$speed.toFixed(1)} km/h</p>
	<p>{speedMetersPerSecond.toFixed(1)} m/s</p>
	<p>{$tick} tick</p>
	<p>{(world[$tick].time - firstTime).toFixed(2)}s time</p>
</div>

<style lang="scss">
	.logger-container {
		position: fixed;
		top: 80px;
		right: 392px;
		padding: 10px 20px;
		background-color: rgba(0, 0, 0, 0.5);
		color: white;
	}
</style>
