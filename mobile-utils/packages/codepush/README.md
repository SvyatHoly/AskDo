## Installation

1. Add package `yarn add file:./mobile-utils/packages/codepush`

2. Add `.codepush` folder in `.gitignore`

3. Create `bundle.json` next to your setup file from the second step

> Note: It is a stub json file that is empty for releases. This file is replaced with custom config by codepush script. It allows us to add custom parameters for codepush releases.

4. Call `setupSwcCodepush` in the root file:
```ts
// utils/codepush/index.ts file
import { setupSwcCodepush } from '@mobile-utils/codepush'

import config from './bundle.json'

interface Config {
  isDevMenuEnabled?: boolean
}

export const CodepushInfo = setupSwcCodepush<Config>(config)
// root file
import 'utils/codepush'
// ... other imports
```

5. Run script to deploy the codepush bundle
```js
const { getConfig, extractArg, codepush } = require('../mobile-utils/packages/codepush/scripts')

codepush(
  getConfig({
    entryFile: 'index.js',
    bundleJsPath: 'js/utils/codepush/bundle.json', // path to your bundle.json file
    platform: 'ios', // 'android'
    app: 'your_app_id', //see Check https://learn.microsoft.com/en-us/appcenter/api-docs/#find-your-app-center-app-name-and-owner-name
    baseline: 'main', // the baseline branch for which you want to build diff of assets (Usually it is the previous release)
    bugsnagApiKey: '...', // the api key to upload source maps
  })
)
```
