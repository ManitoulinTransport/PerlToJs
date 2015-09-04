function fail(message){
	throw new Error(message);
}

function ok(is_ok, message){
	if (!is_ok){
		throw new Error(message);
	}
}

function is(actual, expected, message){
	if (actual !== expected){
		throw new Error((message ? message + ': ' : '') + 'Expected '+ JSON.stringify(expected) + ' but got ' + JSON.stringify(actual));
	}
}

function isnt(actual, unexpected, message){
	if (actual === unexpected){
		throw new Error((message ? message + ': ' : '') + 'Expected anything but '+ JSON.stringify(unexpected));
	}
}

function throws(func, message){
	try {
		func();
	} catch (error){
		return;
	}
	throw new Error((message ? message + ': ' : '') + 'Expected an error');
}