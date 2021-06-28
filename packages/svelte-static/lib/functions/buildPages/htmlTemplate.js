const template = ({ css, head, html }) => `
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <link rel="stylesheet" href="/style.css" />
  ${head}
  <link as="fetch" rel="preload" href="./data.json" crossorigin="anonymous"/>
  <style id="app-style">${css}</style>
</head>
<body>
  <div id="_root">
    ${html}
  </div>
  <script src="/client.js"></script>
</body>
</html>
`;

module.exports = template