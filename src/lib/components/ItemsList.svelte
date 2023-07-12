<script lang="ts">
	import type { StoreItem } from '$lib/types/store.types';
	import QuantitySelector from '$lib/components/QuantitySelector.svelte';
	import { store } from '$lib/stores/store.store';

	export let items: StoreItem[];
	let quantities: { [key: string]: number } = {};

	function addToCart(item: StoreItem) {
		store.addToCart(item, quantities[item.id]);
	}

	function onQuantityChange(quantity: number, itemId: string) {
		quantities[itemId] = quantity;
	}
</script>

<ul>
	{#each items as item}
		<li class="list-item">
			<img src={item.image} alt={item.name} />
			<div class="details">
				<h4>{item.name}</h4>
				<div class="add-to-cart">
					<span>{item.price * quantities[item.id] + '€'}</span>
					<QuantitySelector
						bind:quantity={quantities[item.id]}
						on:quantityChange={(quantity) => onQuantityChange(quantity.detail, item.id)}
					/>
					<button on:click={() => addToCart(item)}>Add to cart</button>
				</div>
			</div>
		</li>
	{/each}
</ul>

<style>
	.list-item {
		display: flex;
		gap: 2rem;
		margin: 1rem;
	}

	img {
		max-width: 250px;
		max-height: 250px;
		width: auto;
		height: auto;
		display: block;
	}

	.details {
		display: flex;
		flex-direction: column;
		padding-top: 1rem;
	}

	h4 {
		font-size: 2rem;
		color: lightsalmon;
		margin: 0 0 2rem;
	}

	.add-to-cart {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.add-to-cart > span {
		font-weight: bold;
		font-size: 2rem;
	}

	button {
		background-color: white;
		padding: 0.5rem 1rem;
		cursor: pointer;
	}
</style>
