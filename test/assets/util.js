function fail(message) {
    throw new Error(message);
}

function ok(is_ok, message) {
    message = message ? message + ' - ' : '';
    if (!is_ok) {
        throw new Error(message);
    }
}

function is(actual, expected, message) {
    message = message ? message + ' - ' : '';
    if (actual !== expected) {
        throw new Error(message + 'Expected ' + JSON.stringify(expected) + ' but got ' + JSON.stringify(actual));
    }
}

function isnt(actual, unexpected, message) {
    message = message ? message + ' - ' : '';
    if (actual === unexpected) {
        throw new Error(message + 'Expected anything but ' + JSON.stringify(unexpected));
    }
}

function isDeeply(actual, expected, message) {
    message = message ? message + ' - ' : '';
    var actual_json = JSON.stringify(actual);
    var expected_json = JSON.stringify(expected);
    if (actual_json != expected_json) {
        throw new Error(message + 'Expected ' + expected_json + ' but got ' + actual_json);
    }
}

function isntDeeply(actual, unexpected, message) {
    message = message ? message + ' - ' : '';
    var actual_json = JSON.stringify(actual);
    var unexpected_json = JSON.stringify(unexpected);
    if (actual == unexpected) {
        throw new Error(message + 'Expected anything but ' + unexpected_json);
    }
}

function throws(func, message) {
    message = message ? message + ' - ' : '';
    var error = null;
    try {
        func();
    } catch (_error) {
        error = _error;
    }
    if (!error) {
        throw new Error(message + 'Expected an error');
    }
}
