<script lang="ts">
	import { radian } from '$lib/utils';
	import { T } from '@threlte/core';
	import { PlaneGeometry } from 'three';
</script>

<T.Mesh position={[0, -0.5, 15]} rotation={[radian(90), 0, 0]}>
	<T.BoxGeometry args={[25, 50, 1]} />
	<T.MeshBasicMaterial color="#686868" />
</T.Mesh>
