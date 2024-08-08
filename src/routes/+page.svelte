<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let products = [];
	let limit = 10;
	let skip = 0;
	let isLoading = false;

	async function loadProducts() {
		try {
			isLoading = true;
			const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
			const data = await response.json();
			products = [...products, ...data.products]; // Append new products
			skip += limit;
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			isLoading = false;
		}
	}

	onMount(() => {
		loadProducts();

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						loadProducts();
					}
				});
			},
			{
				root: null,
				rootMargin: '0px',
				threshold: 1.0
			}
		);

		const sentinel = document.querySelector('#sentinel');
		if (sentinel) {
			observer.observe(sentinel);
		}
	});

	function handleProductClick(productId) {
		goto(`/product/${productId}`);
	}
</script>

<main class="container mx-auto p-4">
	<h1 class="text-2xl font-bold mb-4">Products</h1>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each products as product}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="bg-[#31363F] border border-zinc-900 rounded-lg shadow-lg p-4 cursor-pointer"
				on:click={() => handleProductClick(product.id)}
			>
				<div class="bg-[#31363F]">
					<img
						src={product.thumbnail}
						alt={product.title}
						class="w-full h-48 object-cover mb-4 rounded"
					/>
				</div>
				<h2 class="text-lg font-semibold">{product.title}</h2>
				<p class="text-lg font-bold mt-2">${product.price}</p>
			</div>
		{/each}
	</div>
	<div id="sentinel" class="h-1"></div>
</main>

<style>
	main {
		background-color: transparent;
	}
</style>
