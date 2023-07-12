export type StoreItem = {
	id: string;
	name: string;
	image: string;
	price: number;
};

export type Discount = {
	id: string;
	name: string;
	discountPercent: number;
	amountToDiscount: number;
	productsToApply: string[];
	needsToBeEven?: boolean;
};

export class Cart {
	items: CartItem[];
	discounts: CartDiscount[];
	total: number;

	constructor() {
		this.items = [];
		this.discounts = [];
		this.total = 0;
	}
}

export type CartDiscount = {
	name: string;
	itemName: string;
	total: number;
};

export type CartItem = {
	item: StoreItem;
	quantity: number;
};

export type Store = {
	cart: Cart;
	discounts: Discount[];
	storeItems: StoreItem[];
};
