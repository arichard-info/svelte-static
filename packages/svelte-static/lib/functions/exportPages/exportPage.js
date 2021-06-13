const fs = require('fs-extra')
const path = require('path')

async function exportPage(page) {
    let outputPath = path.resolve("dist");
    const route = page.path.replace(/\/$/, "");

    if(route) outputPath = `${outputPath}${route}`

    if(outputPath) await fs.mkdir(outputPath, {recursive: true})
    await fs.writeFile( `${outputPath}/index.html`, page.html, {} )
    await fs.writeFile( `${outputPath}/data.json`, page.data, {} )
    return page
}

module.exports = exportPage