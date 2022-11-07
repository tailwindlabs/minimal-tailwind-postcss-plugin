## Tailwind CSS — Integration

### Installation

```
npm install
```

### Tests

You can run the tests using `npm test` (all tests exist in `./index.test.js`).
These tests showcase some of the important functionality of Tailwind that we should be able to use
in Turbopack.

### Demo

There is a demo that showcases the important parts around watching dependencies that we can
register.

```
npm run demo
```

This will run an artificial webpack demo project that has "tailwind" setup in it.
What you will notice is that we want to trigger a rebuild when:

- The css file changes
- The tailwind.config.js file changes
- Any of the files defined in tailwind.config.js under the `content` section changes.
  - Note: in the real world the `content` section will contain "globs", which means that we want to register globs as a dependency as well.

For demo purposes you should see the following results:
- Save the `index.html` file, this should trigger a new webpack build
- Save the `other.html` file, this should trigger a new webpack build
- Save the `index.css` file, this should trigger a new webpack build
- Save the `tailwind.config.js` file, this should trigger a new webpack build
- Save the `unrelated.html` file, this should **NOT** trigger a new webpack build, because this file is not listed in the `content` section of the `tailwind.config.js` file. 



