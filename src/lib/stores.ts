import { writable, type Writable } from 'svelte/store';
import Data from '../data/data_2.json';

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
	host: ObjectSnapshotType;
	objects: ObjectSnapshotType[];
};

export type calculatedData = {
	snapshots: WorldSnapshotType[];
	object_meta: {
		id: {
			color: string;
		};
	};
};

export const tick = writable(0);

export const sliderTick = writable(0);

export const isPlaying = writable(false);

export const world: Writable<calculatedData> = writable();

export const backend_url = writable('https://dene.sh/bosch/api');

world.subscribe((value) => {
	console.log(value);
});
