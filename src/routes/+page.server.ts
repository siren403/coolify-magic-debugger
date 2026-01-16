import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const env = process.env;
	const variables = Object.entries(env)
		.map(([key, value]) => {
			const isMagic =
				key.startsWith('COOLIFY_') ||
				key.startsWith('SOURCE_') ||
				key.startsWith('GIT_') ||
				key.startsWith('NIXPACKS_') ||
				['PORT', 'NODE_ENV', 'HOST'].includes(key);
			return { key, value: value || '', isMagic };
		})
		.sort((a, b) => {
			if (a.isMagic && !b.isMagic) return -1;
			if (!a.isMagic && b.isMagic) return 1;
			return a.key.localeCompare(b.key);
		});

	return { variables };
};
