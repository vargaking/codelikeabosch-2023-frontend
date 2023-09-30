<script lang="ts">
	import { backend_url, isPlaying, tick, world } from '$lib/stores';
	import type { Log } from '../../../types';
	import CheckBox from './CheckBox.svelte';	
	
	const logs:Log[] = [];

	
	$: if ($world && $world.snapshots && $world.snapshots[$tick].events.length > 0) {
		for(let i = 0; i < $world.snapshots[$tick].events.length; i++){
			logs.push({
				message: $world.snapshots[$tick].events[i],
				time: $world.snapshots[$tick].time.toFixed(0)
			});
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
		<CheckBox>Show render stats</CheckBox>
		<CheckBox>Show speed</CheckBox>
		<CheckBox>Show directions</CheckBox>
	</div>

	<p class="title">Logger</p>
	<div class="log">
		{#each logs as log}
			<span class="item">
				<span class="time">${log.time}</span>
				<span class="content">{log.message}</span>
			</span>
		{/each}

			{#if logs.length == 0}
				<span class="item">
					<span class="time">00:00</span>
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
