<script lang="ts">
	import { sliderTick, tick, world, isPlaying, logArray } from '$lib/stores';

	sliderTick.subscribe((tick) => {
		if (tick == 0) value = 0;
		console.log(tick);
	});

	$: value = (($world.snapshots[$tick].time - $world.snapshots[0].time) / maxTime) * 100;

	let maxTime = $world.snapshots[$world.snapshots.length - 1].time - $world.snapshots[0].time;

	function handleChange(event: Event) {
		let target = event.target as HTMLInputElement;
		if (!target) return;

		let time = (parseInt(target.value) / 100) * maxTime;

		for (let i = 0; i < $world.snapshots.length; i++) {
			if ($world.snapshots[i].time > time + $world.snapshots[0].time) {
				$sliderTick = i;
				break;
			}
		}

		// keep only elements with permanent true
		$logArray = $logArray.filter((item) => item.permanent);

		for (let i = 0; i < $sliderTick; i++) {
			if ($world.snapshots[i].events.length > 0) {
				// push to logarray store
				for (let j = 0; j < $world.snapshots[i].events.length; j++) {
					$logArray = [
						...$logArray,
						{
							message: $world.snapshots[i].events[j],
							time: ($world.snapshots[i].time - $world.snapshots[0].time).toFixed(2)
						}
					];
				}
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
