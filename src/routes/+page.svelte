<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let searchTerm = $state('');

	let filteredVariables = $derived(
		data.variables.filter((v) =>
			v.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
			v.value.toLowerCase().includes(searchTerm.toLowerCase())
		)
	);
</script>

<div class="min-h-screen bg-gray-50 p-8 font-sans">
	<div class="max-w-6xl mx-auto">
		<header class="mb-8">
			<h1 class="text-3xl font-bold text-gray-900 mb-2">Coolify Magic Debugger</h1>
			<p class="text-gray-600">
				Displaying environment variables from the running container.
				<span class="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">Node Adapter</span>
			</p>
		</header>

		<div class="mb-6 relative">
			<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
				<svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
			</div>
			<input 
				type="text" 
				bind:value={searchTerm}
				placeholder="Search variables (key or value)..." 
				class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm transition-all"
			/>
		</div>

		<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
			<div class="overflow-x-auto">
				<table class="w-full text-left border-collapse">
					<thead class="bg-gray-50 border-b border-gray-200">
						<tr>
							<th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/3">Key</th>
							<th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-2/3">Value</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200">
						{#each filteredVariables as { key, value, isMagic }}
							<tr class="hover:bg-gray-50 transition-colors {isMagic ? 'bg-blue-50/40' : ''}">
								<td class="px-6 py-4 text-sm align-top">
									<div class="flex flex-col items-start gap-1">
										<span class="font-mono {isMagic ? 'font-bold text-blue-700' : 'text-gray-900'} break-all">{key}</span>
										{#if isMagic}
											<span class="px-1.5 py-0.5 text-[10px] bg-blue-100 text-blue-700 rounded border border-blue-200 uppercase tracking-wide font-semibold">Magic</span>
										{/if}
									</div>
								</td>
								<td class="px-6 py-4 text-sm text-gray-600 font-mono break-all align-top whitespace-pre-wrap">
									{value}
								</td>
							</tr>
						{/each}
						{#if filteredVariables.length === 0}
							<tr>
								<td colspan="2" class="px-6 py-12 text-center text-gray-500">
									<p class="text-lg font-medium">No variables found</p>
									<p class="text-sm mt-1">Try adjusting your search term "{searchTerm}"</p>
								</td>
							</tr>
						{/if}
					</tbody>
				</table>
			</div>
			<div class="px-6 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex justify-between">
				<span>Total variables: {data.variables.length}</span>
				<span>Showing: {filteredVariables.length}</span>
			</div>
		</div>
	</div>
</div>
