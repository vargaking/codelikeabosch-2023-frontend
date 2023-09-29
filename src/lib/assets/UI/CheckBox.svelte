<script lang="ts">
	export let checked = false;
</script>

<div class="form-control">
	<label class="cursor-pointer label">
		<span class="label-text"><slot /></span>
		<input type="checkbox" {checked} class="checkbox checkbox-accent" />
	</label>
</div>
