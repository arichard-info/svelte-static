const htmlTemplate = require('./htmlTemplate')


function setPageHtml(page, App) {
	const { layout, template } = page;
	if (!layout || !template) {
		page.valid = false;
		return page;
	}
	const {
		html,
		css = {},
		head,
	} = App.render({
		layout: { componentModule: layout.componentModule, props: layout.props || {} },
		template: { componentModule: template.componentModule, props: template.props || {} },
	});
	const htmlContent = htmlTemplate({ html, css: css.code, head });
	page.html = htmlContent;
	return page;
}

function setPageData(page) {
	page.data = JSON.stringify(page);
	return page;
}

module.exports = {
    setPageHtml, 
    setPageData
}