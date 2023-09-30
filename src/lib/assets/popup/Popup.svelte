<script lang="ts">
	import { onMount } from 'svelte';

	const tutorial = [
		{
			title: 'Welcome to the tutorial!',
			content: 'This tutorial will guide you through our data visualizer',
			position: [50, 50]
		},
		{
			title: 'Load your assets',
			content: 'You can upload a new .csv file or load a previously saved one.',
			position: [40, 20]
		},
		{
			title: 'Play or pause the simulation',
			content: 'This one is pretty self-explanatory',
			position: [80, 20]
		},
		{
			title: 'Settings',
			content: 'These are pretty cool to play with',
			position: [70, 30]
		},
		{
			title: 'Check out these events',
			content: 'Here you can get alerts about dangerous events',
			position: [80, 60]
		}
	];

	let current = 0;
	let showModal = false;

	onMount(() => {
		if (localStorage.getItem('tutorial') == 'true') return;
		showModal = true;
	});
</script>

{#if showModal}
	<div
		class="popup"
		style:top="{tutorial[current].position[1]}%"
		style:left="{tutorial[current].position[0]}%"
	>
		<h3 class="font-bold text-lg">{tutorial[current].title}</h3>
		<p class="py-4">{tutorial[current].content}</p>
		<button
			class="btn"
			on:click={() => {
				current++;
				if (current == tutorial.length) {
					showModal = false;
					localStorage.setItem('tutorial', 'true');
				}
			}}>Next</button
		>
	</div>
{/if}

<style lang="scss">
	.popup {
		width: 400px;
		height: fit-content;
		position: fixed;
		transform: translate(-50%, -50%);
		z-index: 10000;
		background-color: white;
		border: 1px solid black;
		border-radius: 15px;
		padding: 10px;

		.btn {
			background: rgb(197, 196, 196);
		}
	}
</style>
