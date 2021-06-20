import AppComponent from './../App.svelte';
import { getTemplateFromName, getLayoutFromName } from './../utils';
import { getPageProps } from './utils'

const renderApp = async ({ template = {}, layout = {} }) => {
	const templateComponent = await getTemplateFromName(template.component);
	const layoutComponent = await getLayoutFromName(layout.component);

	return new AppComponent({
		target: document.getElementById('_root'),
		hydrate: false,
		props: {
			layout: { ...layout, componentModule: layoutComponent, props: layout.props || {} },
			template: { ...template, componentModule: templateComponent, props: template.props || {}},
		},
	});
};

let App;
(async () => {
	const props = await getPageProps(window.location.pathname);
	App = await renderApp(props);
})();
