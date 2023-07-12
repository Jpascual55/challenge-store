<script lang="ts">
	import { fly } from 'svelte/transition';
	import { onDestroy } from 'svelte';
	import { store } from '$lib/stores/store.store';
	import type { Cart } from '$lib/types/store.types';

	export let isOpen = false;
	let cart: Cart;
	const closeCart = () => (isOpen = false);
	const unsubscribe = store.subscribe((store) => {
		if (store) cart = store.cart;
	});

	onDestroy(unsubscribe);

	function removeItem(itemId: string) {
		store.removeFromCart(itemId);
	}
</script>

{#if isOpen}
	<div class="cart" transition:fly={{ x: '100%', duration: 300 }}>
		<div class="cart-header">
			<h1>Carrito</h1>
			<button on:click={closeCart}>X</button>
		</div>
		<div class="cart-content">
			{#if cart?.items.length}
				<section>
					<h2>Products</h2>
					<ul>
						{#each cart.items as cartItem}
							<li>
								<div class="details">
									<span>{cartItem.quantity}</span>
									<span>{cartItem.item.name}</span>
								</div>
								<div>
									<span>{cartItem.item.price * cartItem.quantity + ' €'}</span>
									<button on:click={() => removeItem(cartItem.item.id)}>X</button>
								</div>
							</li>
						{/each}
					</ul>
				</section>
				{#if cart?.discounts.length}
					<section>
						<h2>Discounts</h2>
						<ul>
							{#each cart.discounts as discount}
								<li>
									<div class="details">
										<span>{discount.name}</span>
										<span>{discount.itemName}</span>
									</div>
									<div>
										<span>{discount.total * -1 + ' €'}</span>
									</div>
								</li>
							{/each}
						</ul>
					</section>
				{/if}
				<section class="total">
					<span>TOTAL: </span>
					<span>{cart.total + ' €'}</span>
				</section>
			{:else}
				<p>No hay ningun producto añadido</p>
			{/if}
		</div>
	</div>
{/if}

<style>
	.cart {
		width: 50%;
		min-width: 500px;
		height: 100%;
		background-color: #f0e4e4;
		position: fixed;
		right: 0;
		top: 0;
		padding: 2rem;
		font-family: 'Roboto Slab', serif;
	}

	.cart-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 1.5rem;
		margin-bottom: 50px;
	}

	h1 {
		margin: 0;
	}

	button {
		background: none;
		border: none;
		font-size: 3rem;
		cursor: pointer;
	}

	section {
		border-top: 1px solid lightgray;
		margin-right: 50px;
	}

	li {
		list-style: none;
		display: flex;
		gap: 4rem;
		margin-bottom: 20px;
		align-items: center;
		justify-content: space-between;
	}

	li .details span {
		margin-right: 20px;
	}

	li button {
		cursor: pointer;
		font-size: 15px;
		margin-left: 20px;
	}

	.total {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 1.5rem;
		padding-top: 30px;
		font-weight: bold;
	}
</style>
