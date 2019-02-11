var fs = require("fs")
var mockup = require("../dist/index.js").default
var locales = require("./config/locales.json")
var template = require("./config/template.json")

locales.forEach(locale => {
	var prefill = {}
	try {
		prefill = require(`./translations/${locale}.json`)
	} catch (e) {}
	var translate = mockup(template, locale, prefill)
	fs.writeFile(`./translations/${locale}.json`, JSON.stringify(translate, null, 2), (err, data) => {
		if (err)
			console.log(`Failed to write ${locale}.json`, err)
		else
			console.log(`Successfully created ${locale}.json`)
	})
})