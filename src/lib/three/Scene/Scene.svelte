<script lang="ts">
	import { T, extend, useThrelte, useFrame } from '@threlte/core';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

	extend({ OrbitControls });

	import Car2 from '$lib/assets/car/Car2.svelte';
	import Road from '$lib/assets/road/Road.svelte';
	import { speed, world, tick, sliderTick, isPlaying } from '$lib/stores';
	import type { WorldSnapshotType } from '../../../types';

	let currentData: WorldSnapshotType,
		nextData: WorldSnapshotType,
		elapsed: number = 0,
		firstTime: number;

	sliderTick.subscribe((tick) => {
		if (tick == 0) return;
		$tick = tick;
		try {
			elapsed = $world.snapshots[tick].time - firstTime;
		} catch {
			elapsed = 0;
		}
	});

	if ($world.snapshots.length > 0) {
		currentData = $world.snapshots[0];
		nextData = $world.snapshots[1];
		firstTime = $world.snapshots[0].time;
	}

	useFrame((_, delta) => {
		if ($tick >= $world.snapshots.length - 1) return;
		if (!$isPlaying) return;
		elapsed += delta;

		currentData = $world.snapshots[$tick];
		nextData = $world.snapshots[$tick + 1];

		$speed = (currentData.host.v * 3600) / 1000;

		if (elapsed >= nextData.time - firstTime) {
			$tick += 1;
		}
	});

	const { renderer, invalidate } = useThrelte();
</script>

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
	<T.Mesh position={[object.y, 0.5, object.x]}>
		<T.SphereGeometry args={[1, 32, 32]} />
		<T.MeshStandardMaterial color={$world.object_meta[key].color} />
	</T.Mesh>
{/each}
