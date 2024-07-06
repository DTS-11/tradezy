<script context="module">
	export async function load({ params }) {
		const { id } = params;
		try {
			const response = await fetch(`https://dummyjson.com/products/${id}`);
			if (!response.ok) {
				throw new Error(`Could not load product with id ${id}`);
			}
			const product = await response.json();
			return { props: { product } };
		} catch (error) {
			console.error('Error loading product:', error);
			return { error: new Error(`Could not load product with id ${id}`) };
		}
	}
</script>

<script>
	import { page } from '$app/stores'; // Import $page store
	import { onMount } from 'svelte';

	let productId;
	let product;

	// Subscribe to $page and update productId when the page changes
	const unsubscribe = page.subscribe(($page) => {
		productId = $page.params.id; // Assuming your URL is like `/products/:id`
	});

	// Fetch product details based on productId
	async function fetchProductDetails(productId) {
		try {
			const response = await fetch(`https://dummyjson.com/products/${productId}`);
			if (!response.ok) {
				throw new Error(`Could not load product with id ${productId}`);
			}
			product = await response.json();
		} catch (error) {
			console.error('Error fetching product details:', error);
		}
	}

	onMount(async () => {
		await fetchProductDetails(productId); // Fetch product details on mount

		// Cleanup function when component unmounts
		return () => {
			unsubscribe();
		};
	});
</script>

<main class="h-screen container mx-auto p-4 flex items-center">
	{#if product}
		<img
			src={product.thumbnail}
			alt={product.title}
			class="w-1/3 mr-5 pr-5 rounded-md bg-[#31363F]"
		/>
		<div class="w-2/3 ml-5 pl-5">
			<h1 class="text-2xl font-bold mb-4">{product.title}</h1>
			<p class="text-gray-300">{product.description}</p>
			<p class="text-lg font-bold mt-2">${product.price}</p>

			<button
				class="bg-tertiary hover:bg-tertiary_hover w-36 h-10 rounded-xl mt-12 flex items-center justify-center space-x-2"
			>
				<svg
					class="w-6 h-6 text-black"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
				>
					<path
						stroke="black"
						stroke-width="2"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
					/>
				</svg>

				<span class="text-black font-semibold">Add to cart</span>
			</button>
		</div>
	{:else}
		<p>Loading product details...</p>
	{/if}
</main>

<style>
	main {
		background-color: transparent;
	}
</style>
