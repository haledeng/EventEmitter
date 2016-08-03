var rollup = require('rollup');
var package = require('./package.json');
var babel = require('rollup-plugin-babel');
var uglify = require('rollup-plugin-uglify');
var fs = require('fs');

var version = package.version;

var banner =
	'/*!\n' +
	' * event_proxy.js v' + version + '\n' +
	' * (c) ' + new Date().getFullYear() + ' helondeng\n' +
	' * Released under the MIT License.\n' +
	' */'


function getSize(code) {
	return (code.length / 1024).toFixed(2) + 'kb'
}

function blue(str) {
	return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}

function write(dest, code) {
	return new Promise(function(resolve, reject) {
		fs.writeFile(dest, code, function(err) {
			if (err) return reject(err)
			console.log(blue(dest))
			resolve()
		})
	})
}

rollup.rollup({
	entry: 'src/index.js',
	plugins: [
		babel({
			presets: ["es2015-rollup"]
		})
	]
}).then(function(bundle) {
	return write('dist/' + package.name + '.js', bundle.generate({
		format: 'umd',
		moduleName: package.name,
		banner: banner
	}).code);
}).catch(function(e) {
	console.log(e);
});


rollup.rollup({
	entry: 'src/index.js',
	plugins: [
		babel({
			presets: ["es2015-rollup"]
		}),
		uglify()
	]
}).then(function(bundle) {
	var dest = 'dist/' + package.name + '.min.js';
	bundle.write({
		format: 'umd',
		moduleName: package.name,
		sourceMap: true,
		dest: dest
	});
	console.log(blue(dest));
}).catch(function(e) {
	console.log(e);
});