<script lang="ts">
	import { sliderTick, tick, world, isPlaying } from '$lib/stores';

	$: value = (($world[$tick].time - $world[0].time) / maxTime) * 100;

	let maxTime = $world[$world.length - 1].time - $world[0].time;

	function handleChange(event: Event) {
		let target = event.target as HTMLInputElement;
		if (!target) return;

		let time = (parseInt(target.value) / 100) * maxTime;

		for (let i = 0; i < $world.length; i++) {
			if ($world[i].time > time + $world[0].time) {
				$sliderTick = i;
				break;
			}
		}
	}
</script>

<input
	type="range"
	min="0"
	max="100"
	{value}
	on:change={handleChange}
	on:mousedown={() => {
		$isPlaying = false;
	}}
	on:mouseup={() => {
		$isPlaying = true;
	}}
	class="range range-success"
/>

<style lang="scss">
	input {
		width: calc(100% - 392px);
		position: fixed;
		bottom: 0;
		z-index: 1000;
		background-color: rgb(71, 84, 255);
		border-radius: 0;
	}
</style>
