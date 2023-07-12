<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';
	import ItemsList from '$lib/components/ItemsList.svelte';
	import { store } from '$lib/stores/store.store';
</script>

<Header />
<main>
	{#await store.init()}
		<Loader />
	{:then storeItems}
		<ItemsList items={storeItems} />
	{:catch error}
		<ErrorMessage message={error.message} />
	{/await}
</main>

<style>
	main {
		font-family: 'Roboto Slab', serif;
	}
</style>
