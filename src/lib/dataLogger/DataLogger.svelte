<script lang="ts">
	import { speed } from '$lib/stores';
	import Stats from 'stats.js';
	import { onMount } from 'svelte';

	let speedMetersPerSecond = ($speed * 1000) / 3600;

	onMount(() => {
		let stats = new Stats();

		stats.showPanel(0);

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

<div class="container">
	<p>{$speed} km/h</p>
	<p>{speedMetersPerSecond.toFixed(1)} m/s</p>
</div>

<style lang="scss">
	.container {
		position: fixed;
		top: 0;
		right: 0;
		padding: 10px 20px;
		background-color: rgba(0, 0, 0, 0.5);
		color: white;
	}
</style>
