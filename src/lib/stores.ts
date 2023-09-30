import { writable, type Writable } from 'svelte/store';
import type { CalculatedData, Log } from '../types';

export const speed = writable(0);

export const tick = writable(0);

export const sliderTick = writable(0);

export const isPlaying = writable(false);

export const isSceneDataShown = writable(true);

export const isRenderStatsShown = writable(true);

export const isDirectionsShown = writable(true);

export const isCameraLocked = writable(false);

export const logArray: Writable<Log[]> = writable([]);

export const world: Writable<CalculatedData> = writable();

export const backend_url = writable('https://dene.sh/bosch/api');
