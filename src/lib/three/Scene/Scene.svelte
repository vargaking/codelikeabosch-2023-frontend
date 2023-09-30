<script lang="ts">
	import { isCameraLocked } from '$lib/stores';
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

	let cameraPosition: [number, number, number] = [0, 10, -15];
	let cameraPositionExpected: [number, number, number] = [0, 10, -15];

	let cameraYaw: number = 0;

	isCameraLocked.subscribe((value) => {
		$sliderTick = 0;
		$tick = 0;
		elapsed = 0;
		cameraPosition = [0, 10, -15];
		try {
			refCamera.lookAt(currentData.host.y, 0, currentData.host.x);
		} catch {}

		console.log(value);
	});

	let refCamera: any;

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

		if ($isCameraLocked) {
			cameraPositionExpected = [
				currentData.host.y - Math.sin(currentData.host.yaw) * 20,
				10,
				currentData.host.x - Math.cos(currentData.host.yaw) * 20
			];
			cameraPosition = [
				cameraPosition[0] + ((cameraPositionExpected[0] - cameraPosition[0]) * delta) / 1,
				cameraPosition[1] + ((cameraPositionExpected[1] - cameraPosition[1]) * delta) / 1,
				cameraPosition[2] + ((cameraPositionExpected[2] - cameraPosition[2]) * delta) / 1
			];

			cameraYaw = currentData.host.yaw;

			refCamera.lookAt(currentData.host.y, 0, currentData.host.x);
		}

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
	position={cameraPosition}
	refCamera;
	on:create={({ ref }) => {
		console.log('csa');
		ref.lookAt(currentData.host.y, 0, currentData.host.x);
		refCamera = ref;
	}}
>
	<T.OrbitControls
		args={[ref, renderer.domElement]}
		enabled={!$isCameraLocked}
		on:change={invalidate}
	/>
</T.PerspectiveCamera>

<T.DirectionalLight position={[0, 5, 0]} intensity={5} castShadow />
<T.DirectionalLight position={[0, 5, -15]} intensity={5} castShadow />
<T.DirectionalLight position={[-3, 0, -1]} intensity={10} />
<T.DirectionalLight position={[3, 0, -1]} intensity={10} />

<Road />
<Car2
	rotation.y={currentData.host.yaw}
	position={[currentData.host.y, 0, currentData.host.x]}
	scale={1}
/>

{#each Object.entries(currentData.objects) as [key, object]}
	<T.Group>
		<T.Mesh position={[object.y, 0.7, object.x]}>
			<T.SphereGeometry args={[0.5, 32, 32]} />
			<T.MeshStandardMaterial color={object.color} />
		</T.Mesh>
		<T.Mesh position={[object.y, 0.7, object.x]} rotation.y={object.yaw}>
			<T.BoxGeometry args={[1.5, 0.25, 0.25]} />
			<T.MeshStandardMaterial color={object.color} />
		</T.Mesh>
	</T.Group>
{/each}
