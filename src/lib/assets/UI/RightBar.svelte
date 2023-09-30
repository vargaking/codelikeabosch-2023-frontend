<script lang="ts">
	import { isDirectionsShown, isCameraLocked } from '$lib/stores';
	import { isSceneDataShown, isRenderStatsShown } from '$lib/stores';
	import { logArray } from '$lib/stores';
	import { backend_url, isPlaying, tick, world } from '$lib/stores';
	import { onMount } from 'svelte';
	import CheckBox from './CheckBox.svelte';
	import CarHornSound from '../../../assets/car_horn.mp3';

	let audioFile: HTMLAudioElement;
	let playedOnce = false;
	onMount(() => {
		audioFile = new Audio(CarHornSound);
		audioFile.muted = false;
		audioFile.loop = true;
	});

	$: {
		if ($world && $world.snapshots && $world.snapshots[$tick].events.length > 0) {
			for (let i = 0; i < $world.snapshots[$tick].events.length; i++) {
				if($world.snapshots[$tick].events[i].includes("Possible collision with object") && !playedOnce) {
					audioFile.play();
					playedOnce = true;
				}
				$logArray = [
					...$logArray,
					{
						message: $world.snapshots[$tick].events[i],
						time: ($world.snapshots[$tick].time - $world.snapshots[0].time).toFixed(2)
					}
				];
			}
		}
	}
</script>

<nav class="right-container">
	<div class="player buttonContainer">
		<button
			class="btn btn-success startButton"
			on:click={() => {
				$isPlaying = true;
			}}>Play</button
		>
		<button
			class="btn btn-alert stopButton"
			on:click={() => {
				$isPlaying = false;
			}}>Stop</button
		>
	</div>

	<p class="title">Settings</p>
	<input
		type="text"
		placeholder="Backend url"
		bind:value={$backend_url}
		class="input input-bordered w-full max-w-xs mt-2"
	/>
	<div class="group">
		<CheckBox
			checked={$isRenderStatsShown}
			cb={(e) => ($isRenderStatsShown = e.target ? e.target.checked : false)}
			>Show render stats</CheckBox
		>
		<CheckBox
			checked={$isSceneDataShown}
			cb={(e) => ($isSceneDataShown = e.target ? e.target.checked : false)}
			>Show scene data</CheckBox
		>
		<CheckBox
			checked={$isDirectionsShown}
			cb={(e) => ($isDirectionsShown = e.target ? e.target.checked : false)}
			>Show directions</CheckBox
		>
		<CheckBox
			checked={$isCameraLocked}
			cb={(e) => ($isCameraLocked = e.target ? e.target.checked : false)}>Camera locked</CheckBox
		>
	</div>

	<p class="title">Events</p>
	<div class="log">
		{#each $logArray as log}
			<span class="item">
				<span class="time">{log.time}</span>
				<span class="content">{log.message}</span>
			</span>
		{/each}

		{#if $logArray.length == 0}
			<span class="item">
				<span class="content text-center">No logs</span>
			</span>
		{/if}
	</div>
</nav>

<style lang="scss">
	.right-container {
		position: absolute;
		background-color: #d9d9d9;
		width: 392px;
		height: 100%;
		top: 0;
		right: 0;
		padding: 20px;
		display: flex;
		flex-direction: column;
	}

	.title {
		color: #000;
		text-align: center;
		font-family: Kanit;
		font-size: 30px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
		margin-top: 30px;
	}

	.log {
		background-color: #edecec;
		padding: 10px;
		border-radius: 10px;
		margin-top: 5px;
		height: 20rem;
		overflow-y: scroll;
	}

	.item {
		display: flex;
		justify-content: space-between;
		margin-bottom: 5px;
	}

	.startButton {
		padding-left: 2.5rem;
		padding-right: 2.5rem;
		margin-right: 1.5rem;
	}

	.stopButton {
		padding-left: 2.5rem;
		padding-right: 2.5rem;
	}

	.buttonContainer {
		display: flex;
		justify-content: center;
	}
</style>
