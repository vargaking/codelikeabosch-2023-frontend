export interface DemoData {
	name: string;
	id: number;
}

export interface Log {
	time: string;
	message: string;
	permanent?: boolean;
}

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
	events: string[];
};

export type CalculatedData = {
	snapshots: WorldSnapshotType[];
	object_meta: {
		id: {
			color: string;
		};
	};
};
