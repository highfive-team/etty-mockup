# Mockup your `etty` translation templates easily :)

Basically, the [etty](https://github.com/firelivecompany/etty) is targeted to separate static translations from the client bundle. Strict typing will grant you a comfortable coding, but if you have an empty translation file delivered, it will cause errors like `Cannot read property X of undefined` in your application during render.

That is not a big problem! Here is `etty-mockup`!

## Usage
1. Install it
```
npm install etty-mockup
```

2. Use it  

- `template.json`:
```json
{
    "field_1": "",
    "field_2": {
        "sub_1": "",
        "sub_2": ["", ""]
    }
}
```

- Usage
```typescript
import mockup from "etty-mockup"
import * as template from "src/config/template.json"

["en", "de", "ru"].forEach(locale => {
    console.log(mockup(template, locale))
})
```

- The result (console output)
```
{
    field_1: "en:field_1",
    field_2: {
        sub_1: "en:field_2.sub_1",
        sub_2: ["en:field_2.sub_2_0", "en:field_2.sub_2_1"]
    }
}

{
    field_1: "de:field_1",
    field_2: {
        sub_1: "de:field_2.sub_1",
        sub_2: ["de:field_2.sub_2_0", "de:field_2.sub_2_1"]
    }
}

{
    field_1: "ru:field_1",
    field_2: {
        sub_1: "ru:field_2.sub_1",
        sub_2: ["ru:field_2.sub_2_0", "ru:field_2.sub_2_1"]
    }
}
```

## API
```typescript
import mockup from "etty-mockup"
```
`mockup<T>(template: T, locale: string, prefill?: any) => T`  
### `@params`
Name | Type | Required | Description
---- | ---- | -------- | -----------
`template` | `T` (defined by user) | yes | A template from which to create a translation JSON
`locale` | `string` | yes | A locale for which the translation JSON will be created.
`prefill` | `any` (but preferrable `T` to avoid losing data) | no | If you already filled your translation JSON with some real data, just pass it as the third parameter. `etty-mockup` will save filled translation JSON fields if it possible (if the scheme of JSON is pretty the same as in `template`). 

### `@returns`
A filled template with mockup data in format 
```
{locale}:{field path}_{index, if field is an array}
```

## Notes
For TypeScript users it is possible to make *typed call* of the function:
```typescript
import * as template from "src/config/template.json"
import mockup from "etty-mockup"

mockup<typeof template>(template, "en")
```

It is not necessary, because TypeScript will catch the type of `template` in first parameter, and you will see, that `mockup` will return the `typeof template` event without *typed call*:

```typescript
import * as template from "src/config/template.json"
import mockup from "etty-mockup"

mockup(template, "en") // mockup is anyway of type `typeof template` here
```

## Simple real life example
`etty-mockup` helps you with generating translation JSON files. Once you have a list of locales and the translation template JSON, you can easily create a translation file for each of it.

For example, you have a template stored in `src/config/template.json`
```json
{
    "Homepage": {
        "title": "",
        "description": ""
    }
}
```

and you have a list of locales in `src/config/locales.json`
```json
["en-US", "en-GB", "de", "ru"]
```

So, you want to create a translation JSON for each locale and place this files to `src/translations` folder.
Creating some `src/makeTranslations.js`
```javascript
var fs = require("fs")
var template = require("./config/template.json")
var locales = require("./config/locales.json")
var mockup = require("etty-mockup").default

locales.forEach(locale => {
    var path = `./translations/${locale}.json`
    var prefill = {}
    try {
        prefill = require(path)
    } catch (e) {}
    var translate = mockup(template, locale, prefill)
    fs.writeFile(path, JSON.stringify(translate, null, 2), (err, data) => {
        if (err)
            console.log(`Failed to write ${locale}.json`, err)
        else
            console.log(`Successfully created ${locale}.json`)
    })
})
```

Thats it! Now just run 
```
node makeTranslations
``` 
and voila! Mocked files are being appeared in your `src/translations` folder. Now you can place some real data to your generated JSON files - this data won't be lost after further generations **(if you will not change your exist template scheme)**. The only thing you have to do by yourself is to serve this files with some API to make XHR requests :)

Working example provided in the `example` folder of this repo. Fill free to make suggestions on how to improve it :)

