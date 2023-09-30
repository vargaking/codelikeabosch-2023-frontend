<script lang="ts">
	import BoschSVG from '$lib/assets/SVG/BoschSVG.svelte';
	import { logArray, world } from '$lib/stores';
	import { textSplitter } from '$lib/utils';
	import { getAllDemoNames, getSingleDemoData, processUserFile } from '../../../api';
	import type { DemoData } from '../../../types';

	let dropdownShowed = false;
	let enteredText = '';
	let datasetServer: DemoData[] = [];
	let datasetArr: DemoData[] = [];
	let files: FileList;

	$: if (enteredText.length > 0) {
		datasetArr = datasetArr.filter((item) =>
			item.name.toLowerCase().includes(enteredText.toLowerCase())
		);
	} else {
		datasetArr = [...datasetServer];
	}

	$: if (files) {
		uploadUserFile(files[0]);
	}

	getNames();

	function currentTime() {
		const now = new Date();
		return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
	}

	async function getNames() {
		datasetServer = await getAllDemoNames();
		datasetArr = [...datasetServer];
	}

	async function selectDemoDetails(selectedDemo: number) {
		$logArray = [
			...$logArray,
			{ message: 'Loading demo data...', time: currentTime(), permanent: true }
		];
		const response = await getSingleDemoData(selectedDemo);
		console.log(response);
		$logArray = [...$logArray, { message: 'Demo loaded', time: currentTime(), permanent: true }];
		world.set(response);
		dropdownShowed = false;
	}

	async function uploadUserFile(file: File) {
		const data = await processUserFile(file);
		world.set(data);
	}
</script>

<nav class="navbar">
	<span class="logo"><BoschSVG /></span>
	<div class="input-container">
		<input
			type="file"
			class="file-input file-input-bordered file-input-accent w-full max-w-xs"
			bind:files
		/>
		<span>OR</span>
		<div
			class="dropdown-container"
			on:click={() => (dropdownShowed = !dropdownShowed)}
			role="presentation"
		>
			<input
				type="text"
				placeholder="Search for calculated results"
				class="input input-bordered input-accent w-full max-w-xs"
				bind:value={enteredText}
			/>
			{#if dropdownShowed}
				<div class="result-container">
					{#each datasetArr as item}
						<button class="item" on:click={() => selectDemoDetails(item.id)}
							>{textSplitter(item.name, 30)}</button
						>
					{/each}

					{#if datasetArr.length == 0}
						<div class="item">No results found</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</nav>

<style lang="scss">
	.navbar {
		position: relative;
		background-color: white;
		top: 0;
		left: 0;
		height: 80px;
		width: calc(100% - 392px);
		display: flex;
		align-items: center;
		padding: 0 20px;
		gap: 80px;
	}

	.input-container {
		gap: 20px;
	}

	.dropdown-container {
		position: relative;
		width: 300px;
	}

	.result-container {
		position: absolute;
		background-color: white;
		border: 1px solid black;
		width: 100%;
		padding: 10px;
		border-radius: 15px;
		z-index: 10000;
	}

	.item {
		color: #000;
		text-align: center;
		font-family: Kanit;
		font-size: 15px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
		padding: 8px 20px;
		margin-bottom: 8px;
		width: 100%;

		border-radius: 10px;
		background: #dfdfdf;
		cursor: pointer;
		transition: 0.3s;

		&:hover {
			filter: brightness(0.9);
		}
	}
</style>
