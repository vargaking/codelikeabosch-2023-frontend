<script lang="ts">
	import BoschSVG from '$lib/assets/SVG/BoschSVG.svelte';

	let dropdownShowed = false;
</script>

<nav class="navbar">
	<span class="logo"><BoschSVG /></span>
	<div class="input-container">
		<input type="file" class="file-input file-input-bordered file-input-accent w-full max-w-xs" />
		<span>OR</span>
		<div class="dropdown-container">
			<input
				type="text"
				placeholder="Search for calculated results"
				class="input input-bordered input-accent w-full max-w-xs"
				on:focusin={() => (dropdownShowed = true)}
				on:focusout={() => (dropdownShowed = false)}
			/>
			{#if dropdownShowed}
				<div class="result-container">
					<div class="item">Dataset_1</div>
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
		width: 250px;
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
		font-size: 20px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
		padding: 8px 20px;
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
