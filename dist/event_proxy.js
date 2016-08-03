/*!
 * event_proxy.js v1.0.0
 * (c) 2016 helondeng
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.event_proxy = global.event_proxy || {})));
}(this, function (exports) { 'use strict';

	var eventMaps = {};

	// event listener
	// on('namespace:eventname[:hook]')
	// on('winna:addJS:before')
	var on = function on(name, fn) {
		if (typeof fn !== 'function') return;
		if (!eventMaps[name]) {
			eventMaps[name] = [];
		}
		eventMaps[name].push(fn);
	};

	// remove event listener
	var off = function off(name, fn) {
		if (typeof fn !== 'function') {
			delete eventMaps[name];
		} else {
			var fns = eventMaps[name];
			fns.forEach(function (item) {
				if (fn === item) {
					fns.splice(i, 1);
					if (fns.length === 0) {
						delete eventMaps[name];
					}
				}
			});
		}
	};

	// trigger event listen
	var emit = function emit(name, args) {
		var fns = eventMaps[name] || [];
		var fn;
		for (var i = 0; i < fns.length; i++) {
			fn = fns[i];
			if (typeof fn === 'function') {
				fn(args);
			}
		}
	};

	exports.on = on;
	exports.off = off;
	exports.emit = emit;

	Object.defineProperty(exports, '__esModule', { value: true });

}));