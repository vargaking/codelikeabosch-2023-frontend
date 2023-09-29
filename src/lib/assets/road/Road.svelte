<script lang="ts">
	import { radian } from '$lib/utils';
	import { T } from '@threlte/core';
	import { Group, PlaneGeometry } from 'three';
	import { world } from '$lib/stores';

	let roadData = [];

	const firstTime = world[0].time;

	let delta: number,
		distance: number,
		allDistance: number = 0;

	world.forEach((data, index) => {
		if (index === world.length - 1) return;
		delta = world[index + 1].time - data.time;
		distance = data.host.v * delta;

		if (distance <= 0) return;

		delta = roadData.push({
			distance,
			yaw: data.host.yaw,
			allDistance: allDistance
		});

		allDistance += distance;
	});

	console.log(roadData);
</script>

<T.Group>
	{#each roadData as data}
		<T.Mesh position={[0, -0.5, data.allDistance]} rotation={[radian(90), 0, -data.yaw]}>
			<T.BoxGeometry args={[8, data.distance, 1]} />
			<T.MeshStandardMaterial color="#686868" />
		</T.Mesh>
	{/each}
	<!--
	<T.Mesh position={[-4.125, -0.5, 15]} rotation={[radian(90), 0, 0]}>
		<T.BoxGeometry args={[0.25, 50, 1]} />
		<T.MeshBasicMaterial color="#3b6feb" />
	</T.Mesh>
	<T.Mesh position={[4.125, -0.5, 15]} rotation={[radian(90), 0, 0]}>
		<T.BoxGeometry args={[0.25, 50, 1]} />
		<T.MeshBasicMaterial color="#3b6feb" />
	</T.Mesh>
-->
</T.Group>
