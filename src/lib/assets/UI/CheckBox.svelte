<script lang="ts">
	export let checked = false;

	// export function prop
	export let cb: (event: any) => void;
</script>

<div class="form-control mt-2">
	<label class="cursor-pointer label">
		<span class="label-text"><slot /></span>
		<input type="checkbox" {checked} on:change={cb} class="checkbox checkbox-accent" />
	</label>
</div>
