export const getTemplateFromName = async (name) => {  
    const template = await import(`./../../../../../svelte-static-example/src/templates/${name}.svelte`);

    return template.default
}

export const getLayoutFromName = async (name) => {
    const layout = await import(`./../../../../../svelte-static-example/src/layouts/${name}.svelte`);
    return layout.default
}