"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mockup(template, locale, current, prefix) {
    if (current === void 0) { current = {}; }
    var mocked = {};
    iterateObject(template, function (value, path) {
        var existValue = readField(current, path);
        if (!existValue) {
            var valueKey = prefix
                ? prefix + "." + path
                : locale + ":" + path;
            if (Array.isArray(value))
                writeField(mocked, path, mockArray(value, valueKey));
            else
                writeField(mocked, path, valueKey);
        }
        else {
            writeField(mocked, path, existValue);
        }
    });
    return mocked;
}
exports.default = mockup;
function mockArray(array, arrayPath) {
    return array.map(function (item, i) {
        var nextPath = arrayPath + "_" + i;
        return Array.isArray(item)
            ? mockArray(item, nextPath)
            : typeof item == "object"
                ? mockup(item, "", {}, nextPath)
                : nextPath;
    });
}
function iterateObject(object, callback, pathPrefix) {
    if (pathPrefix === void 0) { pathPrefix = ""; }
    Object.keys(object).forEach(function (key) {
        var deeperPath = pathPrefix ? pathPrefix + "." + key : key;
        if (typeof object[key] == "object" && !Array.isArray(object[key])) {
            return iterateObject(object[key], callback, deeperPath);
        }
        else {
            return callback(object[key], deeperPath);
        }
    });
}
function readField(object, path) {
    var _a = path.split("."), head = _a[0], tailParts = _a.slice(1);
    var tail = tailParts.join(".");
    if (!tail)
        return object[head] || null;
    if (!object[head])
        return null;
    return readField(object[head], tail);
}
function writeField(object, path, value) {
    var _a = path.split("."), head = _a[0], tailParts = _a.slice(1);
    var tail = tailParts.join(".");
    if (!tail) {
        object[head] = value;
        return;
    }
    if (!object[head])
        object[head] = {};
    return writeField(object[head], tail, value);
}
