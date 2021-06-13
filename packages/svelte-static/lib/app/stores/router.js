import { writable } from 'svelte/store';
import { getLayoutFromName, getTemplateFromName } from '../utils'
import { getPageProps } from './../client/utils'

export const initRouterStore = ({ layout, template }) => {
	const { subscribe, update } = writable({ layout, template });

	const updateRouterFromPath = async (path) => {
		const newProps = await getPageProps(path);

		const templateComponent = await getTemplateFromName(newProps.template.component);
		const layoutComponent = await getLayoutFromName(newProps.layout.component);

		update(($router) => ({
			...$router,
			template: { ...newProps.template, componentModule: templateComponent },
			layout: { ...newProps.layout, componentModule: layoutComponent },
		}));
	};

	if (typeof window !== 'undefined') {
		window.addEventListener('popstate', () => {
			const path = window.location.href.replace(/^(?:\/\/|[^/]+)*\//, '');
			updateRouterFromPath(path);
		});
	}

	const navigate = async (path) => {
		await updateRouterFromPath(path);
		window.history.pushState({}, '', path);
	};

	return { subscribe, navigate };
};
