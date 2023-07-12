<script lang="ts">
	const maxQuantity = 99;
	const minQuantity = 1;

	export let quantity = 1;

	function increment() {
		if (quantity < maxQuantity) {
			quantity += 1;
		}
	}

	function decrement() {
		if (quantity > minQuantity) {
			quantity -= 1;
		}
	}
</script>

<div class="quantity-selector">
	<button on:click={decrement}>-</button>
	<input type="number" bind:value={quantity} min={minQuantity} max={maxQuantity} />
	<button on:click={increment}>+</button>
</div>

<style>
	.quantity-selector {
		display: flex;
		align-items: center;
		padding: 10px;
	}

	button {
		margin: 0 0.25rem;
		font-size: 1rem;
		background: none;
		border: none;
	}

	input {
		padding: 0rem;
		width: 2rem;
		text-align: center;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		appearance: none;
		margin: 0;
	}
</style>
