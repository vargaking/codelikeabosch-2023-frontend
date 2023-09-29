<script lang="ts">
	import CheckBox from './CheckBox.svelte';
</script>

<nav class="right-container">
	<p class="title">Settings</p>

	<div class="group">
		<CheckBox>Show render stats</CheckBox>
		<CheckBox>Show speed</CheckBox>
		<CheckBox>Show directions</CheckBox>
	</div>
</nav>

<style lang="scss">
	.right-container {
		position: absolute;
		background-color: #d9d9d9;
		width: 392px;
		height: 100%;
		top: 0;
		right: 0;
		padding: 20px;
		display: flex;
		flex-direction: column;
	}

	.title {
		color: #000;
		text-align: center;
		font-family: Kanit;
		font-size: 50px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}
</style>
