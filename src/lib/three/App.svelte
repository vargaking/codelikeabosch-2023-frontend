<script>
	import { Canvas } from '@threlte/core';
	import Scene from './Scene/Scene.svelte';
	import DataLogger from '$lib/dataLogger/DataLogger.svelte';
	import { speed } from '$lib/stores';

	$speed = 5;
</script>

<Canvas>
	<Scene />
</Canvas>
<DataLogger />
