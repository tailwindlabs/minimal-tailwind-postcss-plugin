import fs from 'fs'
import path from 'path'
import postcss from 'postcss'
import prettier from 'prettier'

import tailwind from './index'

// TODO:
// - [x] find an at-rule and replace it with generated nodes
// - [x] generate css using values from the tailwind config
// - [x] user defined JavaScript plugins that can generate css
// - [x] user defined plugins in the css file that can generate css
// - [x] read content files from the tailwind config
// - [ ] regenerate the css when the config file changes
// - [ ] regenerate the css when the css file changes
// - [ ] regenerate the css when any template file changes

it('should generate css using values from your config file', () => {
  let input = readFile('./test-fixtures/colors/index.css')
  let config = file('./test-fixtures/colors/tailwind.config.js')

  return run(input, config).then((result) => {
    expect(format(result.css)).toEqual(
      format(css`
        .text-primary {
          color: #0088cc;
        }
      `),
    )
  })
})

describe('plugins', () => {
  it('should generate css, using built-in plugins', () => {
    let input = readFile('./test-fixtures/basic/index.css')
    let config = file('./test-fixtures/basic/tailwind.config.js')

    return run(input, config).then((result) => {
      expect(format(result.css)).toEqual(
        format(css`
          .built-in-utility {
            color: red;
          }
        `),
      )
    })
  })

  it('should generate css, using static plugins defined in your css', () => {
    let input = readFile('./test-fixtures/css-plugin/index.css')
    let config = file('./test-fixtures/css-plugin/tailwind.config.js')

    return run(input, config).then((result) => {
      expect(format(result.css)).toEqual(
        format(css`
          .css-utility {
            color: blue;
          }
        `),
      )
    })
  })

  it('should generate css, using external plugins defined in your tailwind.config.js file', () => {
    let input = readFile('./test-fixtures/external-plugin/index.css')
    let config = file('./test-fixtures/external-plugin/tailwind.config.js')

    return run(input, config).then((result) => {
      expect(format(result.css)).toEqual(
        format(css`
          .plugin-utility {
            color: green;
          }
        `),
      )
    })
  })

  it('should generate css, using built-in, css and external plugins', () => {
    let input = readFile('./test-fixtures/combined-plugins/index.css')
    let config = file('./test-fixtures/combined-plugins/tailwind.config.js')

    return run(input, config).then((result) => {
      expect(format(result.css)).toEqual(
        format(css`
          .built-in-utility {
            color: red;
          }
          .plugin-utility {
            color: green;
          }
          .css-utility {
            color: blue;
          }
        `),
      )
    })
  })
})

// ---

// Ignore below, just some helper functions
let css = String.raw

function file(filePath) {
  return path.resolve(__dirname, filePath)
}

function readFile(filePath) {
  return fs.readFileSync(file(filePath), 'utf8')
}

function run(input, config, plugin = tailwind) {
  let { currentTestName } = expect.getState()

  return postcss(plugin(config)).process(input, {
    from: `${path.resolve(__filename)}?test=${currentTestName}`,
  })
}

// Just for a bit nicer diffs in the tests, nothing related to Tailwind itself.
function format(styles) {
  return prettier.format(styles, { parser: 'css' })
}
