<script lang="ts">
	import App from '$lib/three/App.svelte';
</script>

<div>
	<App />
</div>

<style>
	:global(body, html) {
		margin: 0;
	}

	:global(canvas) {
		background-color: #000;
	}

	div {
		position: absolute;
		height: 100%;
		width: 100%;
	}
</style>
