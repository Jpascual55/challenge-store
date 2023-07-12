<script lang="ts">
	import Cart from './Cart.svelte';
	import { store } from '$lib/stores/store.store';
	import type { Cart as CartType } from '$lib/types/store.types';

	let openCart = false;
	let cart: CartType;
	const unsubscribe = store.subscribe((store) => {
		if (store) cart = store.cart;
	});
</script>

<header>
	<h1>Challenge store</h1>
	<div class="cart">
		<span>{cart?.items.length}</span>
		<button on:click={() => (openCart = true)}>
			<img src="/images/shopping-bag.png" alt="" />
		</button>
	</div>
	<Cart bind:isOpen={openCart} />
</header>

<style>
	header {
		font-family: 'Fasthand', cursive;
		color: lightsalmon;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 2rem;
		margin-bottom: 2rem;
	}

	.cart {
		display: flex;
		align-items: center;
	}

	.cart span {
		font-family: 'Roboto Slab', serif;
		font-size: 2rem;
	}

	h1 {
		font-size: 3rem;
		margin: 0;
	}

	button {
		background: none;
		border: none;
	}

	img {
		width: 50px;
		cursor: pointer;
	}
</style>
