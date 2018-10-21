# with-temp-file

[![Build Status](https://travis-ci.org/fabiosantoscode/with-temp-file.svg?branch=master)](https://travis-ci.org/fabiosantoscode/with-temp-file)

Call a function with a temporary file, and clean up when the function returns!

## usage

```javascript
const withTempFile = require('with-temp-file')

async function main () {
    const result = await withTempFile((ws, filename) => {
        ws.write(fileContents())
        ws.end()

        return fs.readFileSync(filename) + ''
    })

    console.log(result)
}
```
