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

	<p class="title">Logger</p>
	<div class="log">
		<span class="item">
			<span class="time">2023.09.23. 13:05</span>
			<span class="content">Server connected</span>
		</span>
		<span class="item">
			<span class="time">2023.09.23. 13:07</span>
			<span class="content">Crash detected</span>
		</span>
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

	.log {
		background-color: #edecec;
		padding: 10px;
		border-radius: 10px;
	}

	.item {
		display: flex;
		justify-content: space-between;
	}
</style>
