export default function mockup<T>(template: T, locale: string, current: any = {}): T {
	var mocked = {} as T
	iterateObject(template, (value, path) => {
		var existValue = readField(current, path)
		if (!existValue) {
			if (Array.isArray(value))
				writeField(mocked, path, value.map((_, i) => `${locale}:${path}_${i}`))
			else
				writeField(mocked, path, `${locale}:${path}`)
		} else {
			writeField(mocked, path, existValue)
		}
	})
	return mocked
}

function iterateObject(
	object: any, 
	callback: (value: string | string[], path: string) => void, 
	pathPrefix: string = ""
): void {
	Object.keys(object).forEach(key => {
		var deeperPath = pathPrefix ? `${pathPrefix}.${key}` : key
		if (typeof object[key] == "object" && !Array.isArray(object[key])) {
			return iterateObject(object[key], callback, deeperPath)
		} else {
			return callback(object[key], deeperPath)
		}
	})
}

function readField(object: any, path: string): string | string[] | null {
	var [head, ...tailParts] = path.split(".")
	var tail = tailParts.join(".")
	if (!tail)
		return object[head] || null
	if (!object[head])
		return null
	return readField(object[head], tail)
}

function writeField(object: any, path: string, value: string | string[]): void {
	var [head, ...tailParts] = path.split(".")
	var tail = tailParts.join(".")
	if (!tail) {
		object[head] = value
		return
	}
	if (!object[head])
		object[head] = {}
	return writeField(object[head], tail, value)
}