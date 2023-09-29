import { writable } from 'svelte/store';
import Data from '../data/data.json';

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

export const tick = writable(0);

export const world: WorldSnapshotType[] = Data;
