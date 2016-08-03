let eventMaps = {};

// event listener
// on('namespace:eventname[:hook]')
// on('winna:addJS:before')
export const on = (name, fn) => {
	if (typeof fn !== 'function') return;
	if (!eventMaps[name]) {
		eventMaps[name] = [];
	}
	eventMaps[name].push(fn);
}

// remove event listener
export const off = (name, fn) => {
	if (typeof fn !== 'function') {
		delete eventMaps[name];
	} else {
		var fns = eventMaps[name];
		fns.forEach(function(item) {
			if (fn === item) {
				fns.splice(i, 1);
				if (fns.length === 0) {
					delete eventMaps[name];
				}
			}
		});
	}
}

// trigger event listen
export const emit = (name, args) => {
	var fns = eventMaps[name] || [];
	var fn;
	for (var i = 0; i < fns.length; i++) {
		fn = fns[i];
		if (typeof fn === 'function') {
			fn(args);
		}
	}
}