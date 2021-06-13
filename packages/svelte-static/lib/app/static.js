import AppComponent from './App.svelte';
import { getTemplateFromName, getLayoutFromName } from './utils';

export const App = AppComponent;

export const getPages = async ({ datasources, createPages }) => {

	let pages = [];
	const createPage = (url = '', config) => {
		if (url && !pages[url]) pages[url] = config;
	};
	await createPages({ createPage, ...datasources });

	return Promise.all(
		Object.keys(pages).map(async (path) => {
			const page = pages[path];
			return getPage(path, page)
		})
	);
};

export const getPage = (path, page) => {
	const getTemplate = () => page.template.component && getTemplateFromName(page.template.component);
			const getLayout = () => page.layout.component && getLayoutFromName(page.layout.component);
			return {
				...page,
				path,
				template: { ...page.template, getModule: getTemplate },
				layout: { ...page.layout, getModule: getLayout },
			};
}