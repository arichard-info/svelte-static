export const getTemplateFromName = async (name) => {  
    const template = await import(`@templates/${name}.svelte`);
    return template.default
}

export const getLayoutFromName = async (name) => {
    const layout = await import(`@layouts/${name}.svelte`);
    return layout.default
}