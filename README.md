[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/jotorren/ra-ng-quickstart-rollup)
[![Angular Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)
[![Hex.pm](https://img.shields.io/hexpm/l/plug.svg)](https://github.com/jotorren/ra-ng-quickstart-rollup/blob/master/LICENSE)

# ra-ng Quickstart with SystemJS/Rollup

This seed repo serves as an Angular 2 starter for anyone looking to get up and running with Angular 2 and TypeScript.
* Best practices in file and application organization for [Angular 2](https://angular.io/docs/ts/latest/guide/style-guide.html).
* Testing Angular 2 code with [Jasmine](https://jasmine.github.io/) and [Karma](https://karma-runner.github.io/1.0/index.html).
* **Coverage** with [Istanbul](https://github.com/gotwarlost/istanbul/) and Karma
* End-to-end Angular 2 code using [Protractor](http://www.protractortest.org/).
* Type manager with **@types**
* Rich UI design with [primeNG](http://www.primefaces.org/primeng/)
* Recommended design patterns and advanced Angular 2 components with [raNG](https://github.com/jotorren/ra-ng)
* Fully configured [SystemJS](https://github.com/systemjs/systemjs/) module loader.
* Ready to go build system using gulp and [Rollup](http://rollupjs.org/).
* **Ahead of Time (AoT)** compilation for rapid page loads of your production builds.
* **Tree shaking** with [Rollup](http://rollupjs.org/) to automatically remove unused code from your production bundle.

### Quick start
```bash
# clone this repo
# --depth 1 removes all but one .git commit history

git clone --depth 1 https://github.com/jotorren/ra-ng-quickstart-rollup.git my-project

# change directory to your project
cd my-project

# install the dependency with npm
npm install

# install typescript definitions
typings install

# start the server
npm start
```

go to [http://0.0.0.0:3000](http://0.0.0.0:3000) or [http://localhost:3000](http://localhost:3000) in your browser

# Table of Contents
* [File Structure](#file-structure)
* [Bootstrap](#bootstrap)
* [Building](#building)
  * [AoT](#aot)
* [Contributors](#contributors)
* [Support, Questions, or Feedback](#support-questions-or-feedback)
* [License](#license)

# File Structure
This starter uses the component approach. This is the new standard for developing Angular apps and a great way to ensure 
maintainable code by encapsulation of our behavior logic. A component is basically a self contained app usually in a single 
file or a folder with each concern as a file: style, template, specs, e2e, and component class. Here's how it looks:
```
my-project/
 ├──dist/
 ├──doc/
 ├──e2e/
 ├──node_modules/                       
 ├──typings/                       
 ├──src/
 │   ├──api/
 │   ├──environments/
 │   │   └──localhost.json
 │   ├──app/
 │   │   ├──core/
 │   │   │   ├──core.module.ts
 │   │   │   └──index.ts
 │   │   │ 
 │   │   ├──layout/
 │   │   │   ├──aside.component.  [css | html | ts]
 │   │   │   ├──footer.component. [css | html | ts]
 │   │   │   ├──header.component. [css | html | ts]
 │   │   │   ├──sidebar.component.[css | html | ts]
 │   │   │   ├──topnav.component. [css | html | ts]
 │   │   │   ├──index.ts
 │   │   │   └──layout.module.ts
 │   │   │
 │   │   ├──shared/
 │   │   │   ├──config/
 │   │   │   │   ├──cache.json
 │   │   │   │   ├──log.json
 │   │   │   │   └──config.ts
 │   │   │   │ 
 │   │   │   ├──i18n/
 │   │   │   │   ├──lang_en.json
 │   │   │   │   └──lang_es.json
 │   │   │   │
 │   │   │   ├──constants.ts
 │   │   │   ├──index.ts
 │   │   │   └──shared.module.ts
 │   │   │
 │   │   ├──app.component.css
 │   │   ├──app.component.html
 │   │   ├──app.component.ts
 │   │   ├──app.module.ts
 │   │   ├──app.routing.module.ts
 │   │   ├──main-aot.ts
 │   │   └──main.ts
 │   │
 │   ├──assets/
 │   │   ├──css/
 │   │   ├──font-awesome-4.6.3/
 │   │   ├──img/
 │   │   └──js/ 
 │   │
 |   ├──favicon.ico
 |   ├──index.html
 |   ├──index-public.html
 |   └──systemjs.config.js
 │   
 ├──.babelrc
 ├──gulpfile.js
 ├──karma.conf.js
 ├──karma-systemjs.js
 ├──karma-test-shim.js
 ├──LICENSE
 ├──liteserver.json
 ├──package.json
 ├──protractor.config.js
 ├──README.md
 ├──rollup.config.js
 ├──tsconfig.json
 ├──tsconfig.prod.json
 ├──tsconfig.prod-aot.json
 ├──tslint.json
 └──typings.json
 ```

# Bootstrap
Before starting the Angular 2 application, the configuration service also loads a set of properties that depend on the 
**runtime** environment, which is identified using the **hostname**. Doing so, we can use the same artifact on different
environments without having to rebuild it.

Keep in mind that properties read from the environment always overwrite any potential value defined in the static **Config** 
object literal.

```ts
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ConfigurationLoaderService, LoggerFactory, Logger } from 'ra-ng';

import { Config } from './shared';
import { AppModule } from './app.module';
import * as process from 'process';

let selector = location.hostname;
console.log(JSON.stringify({
  logger: 'console',
  message: 'Using configuration selector: [' + selector + ']'
}));

console.log(JSON.stringify({
  logger: 'console',
  message: 'Starting environment: [' + process.env.ENV + ']'
}));
if (process.env.ENV === 'production') {
  enableProdMode();
}

ConfigurationLoaderService.bootstrap(selector, Config).subscribe(
  (loaded) => {
    LoggerFactory.configure(Config);
    const LOG: Logger = LoggerFactory.getLogger('root');

    LOG.info('Imported JSON configuration for modules: ' + loaded);

    // Compile and launch the module
    platformBrowserDynamic().bootstrapModule(AppModule);
  },
  (err) => {
    console.error('Error loading configuration before launching Angular 2 bootstrap: ', err);
  });

```

For example, if we navigate to `http://localhost:3000`, the configuration service will try to load the properties set
in `environments/localhost.json`, but if we go to `http://myserver:80` (suposing the application is published on
that web server), now the configuration service will look for the `environments/myserver.json` file.

Note `main.ts` depends on `process.env` (`nodejs` property containing the user environment). The way that dependency is resolved
varies for each environment:

* **Development**/local => **SystemJS**
```js
(systemjs.config.js)

System.set(System.normalizeSync('process'), System.newModule({ env: { ENV: 'development' } }));
```

* **Production**/server => **global value**
```html
(index.html)

<script>window.process = { env:{ ENV:'production' } };</script>
```


# Building
When building the bundle for production, we transpile source code to **ES2015**:

```
{
  "compilerOptions": {
    "target": "es2015",
    "module": "es2015",
    "lib": ["dom","es2015"],
    ...
  }
  ...
}
```

The generated classes are then passed to `Rollup` in order to create highly optimized bundles through the process of **tree-shaking**.
```
TS => Typescript => ES2015 => Rollup => Tree Shaking => ES2015 Bundle
```

Finally, to obtain the **ES5** bundle we use the plugin `rollup-plugin-babel/babel-preset-es2015-rollup`,
so let's add it to the process:
```
TS => Typescript => ES2015 => Rollup => Tree Shaking => Babel => ES5 Bundle
```
This process results in a highly optimized bundle.

There's a default gulp task that coordinates all required steps: it does not generate source maps, **inlines** all external 
template/style files used by any angular component and includes minification.

Depending on the build parameters (**prod**, **aot**) `rollup` will generate:
```
dist/
 ├──src/                        * folder containing all compiled javascript and AoT (ngfactory, ngsummary) files
 ├──node_modules/               * folder containing AoT json files (ngsummary) for external libraries
 └──public/
     ├──environments/           * runtime configuration json files
     ├──app/                    * i18n and static configuration json files
     ├──assets/                 * static resources (images, fonts, css, js...)
     │   ├──css/                
     │   ├──font-awesome-4.6.3/                
     │   ├──img/                
     │   └──js/                 
     │
     ├──polyfills.js            * minified bundle including standard polyfills we require to run Angular applications in most modern browsers: polyfills, zone and reflect-metadata
     ├──app.js                  * our application code and its dependencies bundled in one minified file. It is independent of the SystemJS loader entirely.
     ├──favicon.ico
     └──index.html              * the application entry point

```

If we look at the `index.html` content:
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <base href='/' >
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1"> 
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
        <title>ra-ng quickstart rollup</title>

        <link rel="stylesheet" type="text/css" href="./assets/font-awesome-4.6.3/css/font-awesome.min.css" />
        <link rel="stylesheet" type="text/css" href="./assets/css/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="./assets/css/primeui-redmond-theme.css" />
        <link rel="stylesheet" type="text/css" href="./assets/css/primeui-ng-all.min.css" />
        <link rel="stylesheet" type="text/css" href="./assets/css/quill.snow.css" />
        <link rel="stylesheet" type="text/css" href="./assets/css/quill.bubble.css" />

        <!-- 1. Load polyfills -->
        <script src="./polyfills.js"></script>
        <!-- 2. Load the application and its dependencies -->
        <script>window.module = 'rollup'; window.process = { env:{ ENV:'production' } };</script>
        <script src="./app.js"></script>
	</head>
  
  <!-- 3. Display the application -->
  <body>
    <app-qs>Loading...</app-qs>
  </body>   
</html>
```

**JiT**-compiled applications that use the `SystemJS` loader and component-relative URLs must set the `@Component.moduleId`
property to `module.id`. **The module object is undefined when an AoT-compiled app runs**. The app fails with a null reference 
error unless you assign a global module value in the `index.html` like this:

```html
<script>window.module = 'aot';</script>
```

As you can read in the Angular documentation ([see](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html)), 
*setting a global module is a temporary expedient*.

## AoT

If you are using `Moment.js` in your application and you run rollup, very likely, it will end up with the 
error: 
```diff
- Cannot call a namespace ('moment')
```

To solve that problem, you need to use 
```ts
import moment from 'moment'
```
instead of
```ts
import * as moment from 'moment';
```

And to avoid the resulting compile error:
```diff
- External module ''moment'' has no default export
```
try changing the `node_modules/moment/moment-node.d.ts` from 
```ts
export = moment;
``` 
to 
```ts
export default moment;
``` 
This will expose any missing files. (Then change it back.)

# Contributors

| Name               | GitHub                                  | Twitter                                   |
| ------------------ | --------------------------------------- | ----------------------------------------- |
| **Jordi Torrente** | [jotorren](https://github.com/jotorren) | [@esrafiki](https://twitter.com/esrafiki) |

I'll accept pretty much everything so feel free to open a Pull-Request

# Support, Questions, or Feedback

> Contact us anytime for anything about this repo 

[![Join the chat at https://gitter.im/ra-ng/general](https://badges.gitter.im/ra-ng/general.svg)](https://gitter.im/ra-ng/general?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# License

Code licensed under an [Apache License](https://github.com/jotorren/ra-ng-quickstart-rollup/blob/master/LICENSE). Documentation licensed under [CC BY 4.0](http://creativecommons.org/licenses/by/4.0/).

**[Back to top](#table-of-contents)**