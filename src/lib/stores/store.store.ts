import { getDiscounts, getStoreItems } from '$lib/services/store.service';
import type { CartDiscount, Store, StoreItem, Discount, CartItem } from '$lib/types/store.types';
import { Cart } from '$lib/types/store.types';
import { writable } from 'svelte/store';

function createStore() {
	const { set, update, subscribe } = writable<Store>();

	return {
		subscribe,
		init: async () => {
			const [storeItems, discounts] = await Promise.all([getStoreItems(), getDiscounts()]);
			set({ storeItems, discounts, cart: new Cart() });
			return storeItems;
		},
		setDiscounts: (discounts: Discount[]) =>
			update((store) => ({ ...store, discounts: discounts })),
		addToCart: (item: StoreItem, quantity: number) =>
			update((store) => addToCart(store, item, quantity)),
		removeFromCart: (itemId: string) => update((store) => removeFromCart(store, itemId))
	};
}

function addToCart(store: Store, item: StoreItem, quantity: number): Store {
	const newCart = { ...store.cart };
	const itemIndex = newCart.items.findIndex((cartItem) => cartItem.item.id === item.id);
	if (itemIndex !== -1) {
		newCart.items[itemIndex].quantity += quantity;
	} else {
		newCart.items.push({ item, quantity });
	}
	newCart.discounts = _applyDiscounts(newCart.items, store.discounts);
	newCart.total = _calculateTotal(newCart);
	return { ...store, cart: newCart };
}

function removeFromCart(store: Store, itemId: string): Store {
	const newCart = { ...store.cart };
	newCart.items = newCart.items.filter((cartItem) => cartItem.item.id !== itemId);
	newCart.discounts = _applyDiscounts(newCart.items, store.discounts);
	newCart.total = _calculateTotal(newCart);
	return { ...store, cart: newCart };
}

function _applyDiscounts(cartItems: CartItem[], discounts: Discount[]): CartDiscount[] {
	let newDiscounts: CartDiscount[] = [];
	cartItems.forEach((cartItem) => {
		const itemDiscounts = discounts.filter(
			(discount) =>
				discount.productsToApply.includes(cartItem.item.id) &&
				cartItem.quantity >= discount.amountToDiscount
		);
		newDiscounts = [
			...newDiscounts,
			...itemDiscounts.map((itemDiscount) => {
				let discount = cartItem.item.price * cartItem.quantity * itemDiscount.discountPercent;
				if (itemDiscount.needsToBeEven && cartItem.quantity % 2 !== 0) {
					discount = cartItem.item.price * (cartItem.quantity - 1) * itemDiscount.discountPercent;
				}
				return {
					name: itemDiscount.name,
					itemName: cartItem.item.name,
					total: discount
				};
			})
		];
	});
	return newDiscounts;
}

function _calculateTotal(cart: Cart): number {
	const totalDiscounts = cart.discounts.reduce((total, discount) => total + discount.total, 0);
	const totalCart = cart.items.reduce((total, item) => total + item.item.price * item.quantity, 0);
	return totalCart - totalDiscounts;
}

export const store = createStore();
