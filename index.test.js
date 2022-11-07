import path from 'path'
import postcss from 'postcss'
import prettier from 'prettier'

import tailwind from './index'

let css = String.raw

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

it('should work', () => {
  let input = css`
    @tailwind utilities;

    @layer utilities {
      .css-utility {
        color: red;
      }

      .unused {
        color: blue;
      }
    }
  `

  return run(input, path.resolve(__dirname, './tailwind.config')).then((result) => {
    expect(format(result.css)).toEqual(
      format(css`
        .p-2 {
          padding: 0.5rem;
        }
        .underline {
          text-decoration-line: underline;
        }
        .css-utility {
          color: red;
        }
      `),
    )
  })
})
