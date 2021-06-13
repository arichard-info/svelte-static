export const getTemplateFromName = async (name) => {  
    const template = await import(`./../../../../src/templates/${name}.svelte`);
    return template.default
}

export const getLayoutFromName = async (name) => {
    const layout = await import(`./../../../../src/layouts/${name}.svelte`);
    return layout.default
}