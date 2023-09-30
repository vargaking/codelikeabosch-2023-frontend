<script lang="ts">
	import { tick } from '$lib/stores';
	import { radian } from '$lib/utils';
	import { T } from '@threlte/core';
	import { isDirectionsShown, world } from '$lib/stores';

	type RoadDataType = {
		x: number;
		y: number;
		yaw: number;
		distance: number;
		allDistance: number;
	};

	let roadData: RoadDataType[] = [];

	let delta: number,
		distance: number,
		x: number = 0,
		y: number = 0,
		allDistance: number = 0;

	$world.snapshots.forEach((data, index) => {
		if (index === $world.snapshots.length - 1) return;
		delta = $world.snapshots[index + 1].time - data.time;

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

		x = Math.cos(radian(data.host.yaw)) * distance + $world.snapshots[index - 1].host.x;
		y = Math.sin(radian(data.host.yaw)) * distance + $world.snapshots[index - 1].host.y;

		//if (distance <= 0) return;

		delta = roadData.push({
			x,
			y,
			yaw: data.host.yaw,
			distance: distance,
			allDistance: allDistance
		});

		allDistance += distance;
	});
</script>

{#if $isDirectionsShown}
	<T.Group>
		{#each roadData as data, i}
			<T.Mesh position={[data.y, 1, data.x]} rotation={[radian(90), 0, -data.yaw]}>
				<T.BoxGeometry args={[0.2, data.distance + 0.5, 0.2]} />
				<T.MeshStandardMaterial color="#b214b8" />
			</T.Mesh>
		{/each}
	</T.Group>
{/if}

<T.Group>
	{#each roadData.slice(0, $tick) as data, i}
		<T.Mesh position={[data.y, -0.5, data.x]} rotation={[radian(90), 0, -data.yaw]}>
			<T.BoxGeometry args={[4, data.distance + 0.5, 0.9]} />
			<T.MeshStandardMaterial color="#194bff" />
		</T.Mesh>
	{/each}
</T.Group>
<T.Group>
	{#each roadData.slice(0, $tick) as data, i}
		<T.Mesh position={[data.y, -0.5, data.x]} rotation={[radian(90), 0, -data.yaw]}>
			<T.BoxGeometry args={[3.5, data.distance + 0.5, 1]} />
			<T.MeshStandardMaterial color="#686868" />
		</T.Mesh>
	{/each}
</T.Group>
