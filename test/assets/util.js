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

function isDeeply(actual, expected, message){
	var actual_json = JSON.stringify(actual);
	var expected_json = JSON.stringify(expected);
	if (actual_json != expected_json){
		throw new Error((message ? message + ': ' : '') + 'Expected '+ expected_json + ' but got ' + actual_json);
	}
}

function isntDeeply(actual, unexpected, message){
	var actual_json = JSON.stringify(actual);
	var unexpected_json = JSON.stringify(unexpected);
	if (actual == unexpected){
		throw new Error((message ? message + ': ' : '') + 'Expected anything but '+ unexpected_json);
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