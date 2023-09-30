<script lang="ts">
	import { isSceneDataShown, isRenderStatsShown } from './../stores.ts';
	import { speed, tick, world } from '$lib/stores';
	import Stats from 'stats.js';
	import { onMount } from 'svelte';

	$: speedMetersPerSecond = ($speed * 1000) / 3600;

	let firstTime = $world.snapshots[0].time;

	onMount(() => {
		let stats = new Stats();

		stats.showPanel(0);

		stats.dom.style.top = '80px';

		isRenderStatsShown.subscribe((value) => {
			if (value) {
				stats.dom.style.display = 'block';
			} else {
				stats.dom.style.display = 'none';
			}
		});

		document.body.appendChild(stats.dom);

		function animate() {
			stats.begin();

			stats.end();

			requestAnimationFrame(animate);
		}

		requestAnimationFrame(animate);
	});
</script>

{#if $isSceneDataShown}
	<div class="logger-container">
		<p>{$speed.toFixed(1)} km/h</p>
		<p>{speedMetersPerSecond.toFixed(1)} m/s</p>
		<p>{$tick} tick</p>
		<p>{($world.snapshots[$tick].time - firstTime).toFixed(2)}s time</p>
	</div>
{/if}

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
