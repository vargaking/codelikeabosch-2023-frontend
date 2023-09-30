<script lang="ts">
	import { isSceneDataShown, isRenderStatsShown } from './../../stores.ts';
	import { logArray } from '$lib/stores';
	import { backend_url, isPlaying, tick, world } from '$lib/stores';
	import CheckBox from './CheckBox.svelte';

	$: {
		if ($world && $world.snapshots && $world.snapshots[$tick].events.length > 0) {
			for (let i = 0; i < $world.snapshots[$tick].events.length; i++) {
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
	<div class="player">
		<button
			class="btn btn-success"
			on:click={() => {
				$isPlaying = true;
			}}>Play</button
		>
		<button
			class="btn btn-alert"
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
		class="input input-bordered w-full max-w-xs"
	/>
	<div class="group">
		<CheckBox checked={$isRenderStatsShown} cb={(e) => ($isRenderStatsShown = e.target ? e.target.checked : false)}
			>Show render stats</CheckBox
		>
		<CheckBox checked={$isSceneDataShown} cb={(e) => ($isSceneDataShown = e.target ? e.target.checked : false)}
			>Show scene data</CheckBox
		>
		<CheckBox>Show directions</CheckBox>
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
				<span class="content">No logs</span>
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
		font-size: 50px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}

	.log {
		background-color: #edecec;
		padding: 10px;
		border-radius: 10px;
	}

	.item {
		display: flex;
		justify-content: space-between;
	}
</style>
