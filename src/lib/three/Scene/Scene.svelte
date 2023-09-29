<script>
	import { T, extend, useThrelte, useFrame } from '@threlte/core';
	import { Environment, interactivity, useInteractivity } from '@threlte/extras';
	import { spring } from 'svelte/motion';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

	extend({ OrbitControls });

	import Car from '$lib/assets/car/Car.svelte';
	import Car2 from '$lib/assets/car/Car2.svelte';
	import Road from '$lib/assets/road/Road.svelte';
	import { speed } from '$lib/stores';
	import { Fog } from 'three';

	const { renderer, invalidate } = useThrelte();
</script>

<!--
<Environment
	path="/"
	files="rural_asphalt_road_1k.hdr"
	format="hdr"
	groundProjection={{ radius: 200, height: 8, scale: { x: 100, y: 100, z: 100 } }}
/>
-->

<T.Fog attach="fog" args={['#302f2f', 0, 50]} />

<T.PerspectiveCamera
	makeDefault
	let:ref
	position={[0, 5, -15]}
	on:create={({ ref }) => {
		ref.lookAt(0, 0, 0);
	}}
>
	<T.OrbitControls args={[ref, renderer.domElement]} on:change={invalidate} />
</T.PerspectiveCamera>

<T.DirectionalLight position={[0, 5, 0]} intensity={5} castShadow />
<T.DirectionalLight position={[0, 5, -15]} intensity={5} castShadow />
<T.DirectionalLight position={[-3, 0, -1]} intensity={10} />
<T.DirectionalLight position={[3, 0, -1]} intensity={10} />

<Road />
<Car2 rotation.y={0} scale={2} />
