<script>
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
		observer.observe(sentinel);
	});
</script>

<main class="container mx-auto p-4">
	<h1 class="text-2xl font-bold mb-4">Products</h1>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each products as product}
			<div class="bg-gray-200 border rounded-lg shadow-lg p-4">
				<div class="bg-gray-100">
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
