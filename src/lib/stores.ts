import { writable } from 'svelte/store';

export const speed = writable(0);

export type ObjectSnapshotType = {
	x: number;
	y: number;
	vx: number;
	vy: number;
	v: number;
	yaw: number;
};

export type WorldSnapshotType = {
	tick: number;
	time: number;
	objects: ObjectSnapshotType[];
};

export const world: WorldSnapshotType[] = [
	{
		tick: 0,
		time: 33.241503657,
		objects: [
			{
				x: 0,
				y: 0,
				vx: 0,
				vy: 0,
				v: 0,
				yaw: 0
			}
		]
	},
	{
		tick: 1,
		time: 33.335959518,
		objects: []
	},
	{
		tick: 2,
		time: 33.429725329,
		objects: []
	}
];
