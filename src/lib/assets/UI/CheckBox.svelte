<script lang="ts">
	let checked = false;
	export let cb = {};
</script>

<div class="form-control">
	<label class="cursor-pointer label">
		<span class="label-text"><slot /></span>
		<input type="checkbox" bind:checked class="checkbox checkbox-accent" />
	</label>
</div>
