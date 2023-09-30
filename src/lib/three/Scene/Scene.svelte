<script lang="ts">
	import { T, extend, useThrelte, useFrame } from '@threlte/core';
	import { Environment, interactivity, useInteractivity } from '@threlte/extras';
	import { spring } from 'svelte/motion';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

	extend({ OrbitControls });

	import Car from '$lib/assets/car/Car.svelte';
	import Car2 from '$lib/assets/car/Car2.svelte';
	import Road from '$lib/assets/road/Road.svelte';
	import { speed, world, tick, type WorldSnapshotType, sliderTick, isPlaying } from '$lib/stores';
	import { radian } from '$lib/utils';
	import { GridHelper, SphereGeometry } from 'three';

	let currentData: WorldSnapshotType = world[0],
		nextData: WorldSnapshotType = world[1],
		currentTime: number,
		dataDelta: number,
		elapsed: number = 0;
	const firstTime = world[0].time;

	sliderTick.subscribe((tick) => {
		if (tick == 0) return;
		$tick = tick;
		elapsed = world[tick].time - firstTime;
	});

	useFrame((_, delta) => {
		if ($tick >= world.length - 1) return;
		if (!$isPlaying) return;
		elapsed += delta;

		currentData = world[$tick];
		nextData = world[$tick + 1];

		$speed = (currentData.host.v * 3600) / 1000;

		dataDelta = nextData.time - currentData.time;
		currentTime = currentData.time - firstTime;

		if (elapsed >= nextData.time - firstTime) {
			$tick += 1;
		}
	});

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

<T.Fog attach="fog" args={['#302f2f', 0, 200]} />

<T.GridHelper args={[400, 400, 0x444444, 0x444444]} />

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
<Car2
	rotation.y={currentData.host.yaw}
	position={[currentData.host.y, 0, currentData.host.x]}
	scale={2}
/>

{#each Object.entries(currentData.objects) as [key, object]}
	<T.Mesh position={[object.y - currentData.host.y, 0.5, object.x - currentData.host.x]}>
		<T.SphereGeometry args={[1, 32, 32]} />
		<T.MeshStandardMaterial color="red" />
	</T.Mesh>
{/each}
