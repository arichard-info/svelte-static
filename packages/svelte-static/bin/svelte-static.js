#!/usr/bin/env node

init().catch((e) => {
	console.trace(e);
	process.exit(1);
});

function init() {
	const pkg = require('../../../package.json');
	const argv = require('minimist')(process.argv.slice(2));

	const commands = argv._;
	const help = argv.help || argv.h || argv.H;
	const options = {
		configPath: argv.config || argv.c || argv.C,
		debug: argv.debug || argv.d || argv.D,
    port: argv.port || argv.p || argv.P,
		isCLI: true,
	};

	if (commands[0] === 'export') {
		return exportFn(options, help);
	}
	if (commands[0] === 'bundle') {
		return bundle(options, help);
	}
	if (commands[0] === 'build') {
		return build(options, help);
	}
  if (commands[0] === 'dev') {
		return dev(options, help);
	}

	console.log(`
React Static - ${pkg.description}
Version: ${pkg.name}@${pkg.version}
Usage: svelte-static <command> [options]
Options:
  -h, --help     output usage information for any given command
Commands:
  start          start the development server
  build          build (bundle + export) site for production
  bundle         bundle webpack assets
  export         export html from bundled assets
  help [cmd]     display help for [cmd]
Examples:
  $ svelte-static start
  $ svelte-static build
  $ svelte-static bundle
  $ svelte-static export
  `);

	return Promise.resolve();
}

function exportFn(options, help) {
	if (help) {
		console.log(`
Description: Exports a pre-bundled React Static project to a static site.
  
Options:
  -c, --config <path>   The path to a custom static.config.js
Examples:
  svelte-static export
  svelte-static export --config=path/to/my/static.config.js
  svelte-static export -c path/to/my/static.config.js
`);
		return;
	}
	return require('../lib/commands/export')(options);
}

function bundle(options, help) {
	if (help) {
		console.log(`
Description: Bundles a React Static project and prepares it for export
Options:
  -c, --config <path>   The path to a custom static.config.js
Examples:
  svelte-static bundle
  svelte-static bundle --config=path/to/my/static.config.js
  svelte-static bundle -c path/to/my/static.config.js
`);
		return;
	}

	return require('../lib/commands/bundle')(options);
}

function build(options, help) {
	if (help) {
		console.log(`
Description:
  - Bundles a Svelte Static project
  - Exports the bundled React Static project to a static site.
  
Options:
  -c, --config <path>   The path to a custom static.config.js
Examples:
  svelte-static build
  svelte-static build --config=path/to/my/static.config.js
  svelte-static build -c path/to/my/static.config.js
`);
		return;
	}
	return require('../lib/commands/build')(options);
}

function dev(options, help) {
	if (help) {
		console.log(`
Description: 
  - Bundles a Svelte Static project
  - Exports the bundled React Static project to a static site.
  - Serve the static site and watch changes
  
Options:
  -c, --config <path>   The path to a custom static.config.js
Examples:
  svelte-static dev
  svelte-static dev --config=path/to/my/static.config.js
  svelte-static dev -c path/to/my/static.config.js
`);
		return;
	}
	return require('../lib/commands/dev')(options);
}
