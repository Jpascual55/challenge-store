import type { Discount, StoreItem } from '../types/store.types';

export async function getStoreItems(): Promise<StoreItem[]> {
	const items = await fetch('/data/store-items.json');
	return items.json();
}

export async function getDiscounts(): Promise<Discount[]> {
	const items = await fetch('/data/discounts.json');
	return items.json();
}
