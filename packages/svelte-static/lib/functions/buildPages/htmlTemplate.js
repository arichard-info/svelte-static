const template = ({ css = "", head = "", html = "", assets = [] }) => `
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  ${generateAsset('head', assets)}
  ${head}
  <link as="fetch" rel="preload" href="./data.json" crossorigin="anonymous"/>
  <style id="app-style">${css}</style>
</head>
<body>
  <div id="_root">
    ${html}
  </div>
  <script src="/client.js"></script>
  ${generateAsset('bottom', assets)}
</body>
</html>
`;

const generateAsset = (position, assets) => {
  return assets.filter((asset) => asset.position === position && asset.type && asset.path).map(asset => {
    switch (asset.type) {
      case "style": return `<link rel="stylesheet" href="${asset.path}" />`
      default: return "";
    }
  }).join('\n');
}

module.exports = template