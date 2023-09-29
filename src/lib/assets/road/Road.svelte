<script lang="ts">
	import { radian } from '$lib/utils';
	import { T } from '@threlte/core';
	import { Group, PlaneGeometry } from 'three';
</script>

<T.Group>
	<T.Mesh position={[0, -0.5, 15]} rotation={[radian(90), 0, 0]} receiveShadow>
		<T.BoxGeometry args={[8, 50, 1]} />
		<T.MeshStandardMaterial color="#686868" />
	</T.Mesh>
	<T.Mesh position={[-4.125, -0.5, 15]} rotation={[radian(90), 0, 0]}>
		<T.BoxGeometry args={[0.25, 50, 1]} />
		<T.MeshBasicMaterial color="#3b6feb" />
	</T.Mesh>
	<T.Mesh position={[4.125, -0.5, 15]} rotation={[radian(90), 0, 0]}>
		<T.BoxGeometry args={[0.25, 50, 1]} />
		<T.MeshBasicMaterial color="#3b6feb" />
	</T.Mesh>
</T.Group>
