<script lang="ts">
	import { speed } from '$lib/stores';
	import Stats from 'stats.js';
	import { onMount } from 'svelte';

	let speedMetersPerSecond = ($speed * 1000) / 3600;

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
	<p>{$speed} km/h</p>
	<p>{speedMetersPerSecond.toFixed(1)} m/s</p>
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
