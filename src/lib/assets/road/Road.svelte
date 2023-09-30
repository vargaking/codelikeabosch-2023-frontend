<script lang="ts">
	import { radian } from '$lib/utils';
	import { T } from '@threlte/core';
	import { Group, PlaneGeometry } from 'three';
	import { world } from '$lib/stores';

	type RoadDataType = {
		x: number;
		y: number;
		yaw: number;
		distance: number;
		allDistance: number;
	};

	let roadData: RoadDataType[] = [];

	const firstTime = world[0].time;

	let delta: number,
		distance: number,
		x: number = 0,
		y: number = 0,
		allDistance: number = 0;

	world.forEach((data, index) => {
		if (index === world.length - 1) return;
		delta = world[index + 1].time - data.time;

		if (index === 0) {
			roadData.push({
				x: 0,
				y: 0,
				yaw: data.host.yaw,
				distance: 0,
				allDistance: 0
			});
			return;
		}

		distance = data.host.v * delta;

		x = Math.cos(radian(data.host.yaw)) * distance + world[index - 1].host.x;
		y = Math.sin(radian(data.host.yaw)) * distance + world[index - 1].host.y;

		if (distance <= 0) return;
		/*if (index === world.length - 2) {
			distance = 20;
			x += (Math.cos(radian(data.host.yaw)) * distance) / 2;
			y += (Math.sin(radian(data.host.yaw)) * distance) / 2;
		}*/

		delta = roadData.push({
			x,
			y,
			yaw: data.host.yaw,
			distance: distance,
			allDistance: allDistance
		});

		allDistance += distance;
	});

	console.log(roadData);
</script>

<T.Group>
	{#each roadData as data, i}
		<T.Mesh position={[data.y, -0.5, data.x]} rotation={[radian(90), 0, -data.yaw]}>
			<T.BoxGeometry args={[8, data.distance + 0.5, 1]} />
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
