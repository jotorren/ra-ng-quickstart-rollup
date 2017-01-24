[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/jotorren/ra-ng-quickstart-rollup)
[![Angular Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)
[![Hex.pm](https://img.shields.io/hexpm/l/plug.svg)](https://github.com/jotorren/ra-ng-quickstart-rollup/blob/master/LICENSE)

# ra-ng Quickstart with SystemJS/Rollup

This seed repo serves as an Angular 2 starter for anyone looking to get up and running with Angular 2 and TypeScript.
* Best practices in file and application organization for [Angular 2](https://angular.io/docs/ts/latest/guide/style-guide.html).
* Testing Angular 2 code with [Jasmine](https://jasmine.github.io/) and [Karma](https://karma-runner.github.io/1.0/index.html).
* **Coverage** with [Istanbul](https://github.com/gotwarlost/istanbul/) and [Karma](https://karma-runner.github.io/1.0/index.html).
* End-to-end Angular 2 code using [Protractor](http://www.protractortest.org/).
* Type manager with **@types**.
* Rich UI design with [primeNG](http://www.primefaces.org/primeng/).
* Recommended design patterns and advanced Angular 2 components with [raNG](https://github.com/jotorren/ra-ng).
* Example of **lazy loaded module**. Keep in mind that, once the bundling process is complete, the resulting bundle contains any 'lazy' module.
This means they are loaded when the browser reads the file and therefore they can not longer be considered 'lazy'.
* Fully configured [SystemJS](https://github.com/systemjs/systemjs/) module loader.
* `TypeScript` compiler target set to `ES2015`. Read [John Papa's article](https://johnpapa.net/es5-es2015-typescript/) for further information.
* **Ahead of Time (AoT)** compilation for rapid page loads of your production builds.
* Ready to go build system using [gulp](http://gulpjs.com/) and [Rollup](http://rollupjs.org/). Their integration
is solved through the [Rollup](http://rollupjs.org/) Javascript API (`rollup.config.es5.js`).
* **Tree shaking** to automatically remove unused code from your production bundle.
Here, it's important to use the target `ES2015` together with the module-format `ES2015` because 
[Rollup](http://rollupjs.org/) **can only Tree Shake ES2015 modules** which have `import` and `export` statements.
It's not important that the code itself be written with `ES2015` syntax such as `class` and `const`. What matters is 
that the code uses ES `import` and `export` statements rather than `require` statements.
* **Cache busting” system** through a content hash that suggests to the browser that, when you made a change in your static 
asset, that new file is actually different and should not be retrieved from the cache, but freshly downloaded. This is 
achieved by means of [gulp-rev](https://github.com/sindresorhus/gulp-rev).
* Build-time **gzip** bundles using [gulp-gzip](https://github.com/jstuckey/gulp-gzip).

## Limitations

* With [Rollup](http://rollupjs.org/) a module cannot be lazy loaded: **Angular 2 lazy routing is not supported**. Anyway, 
if you have one static js file for the whole application then it means you don't need lazy loading, because it only makes 
sense when you have several bundles (js files) for your app as per module.

### Quick start
```bash
# clone this repo
# --depth 1 removes all but one .git commit history

git clone --depth 1 https://github.com/jotorren/ra-ng-quickstart-rollup.git my-project

# change directory to your project
cd my-project

# install the dependency with npm
npm install

# install primeNG typescript definitions
typings install

# start the server
npm start
```

Go to [http://0.0.0.0:3000](http://0.0.0.0:3000) or [http://localhost:3000](http://localhost:3000) in your browser

# Table of Contents
* [File Structure](#file-structure)
* [Bootstrap](#bootstrap)
* [Building](#building)
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
 │   │   ├──featureA/                                 * example of lazy loaded module
 │   │   │   ├──featureA.component.[css | html | ts]
 │   │   │   ├──featureA.module.ts
 │   │   │   ├──featureA.routing.module.ts
 │   │   │   └──index.ts
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
 │   │   ├──main.ts
 │   │   ├──welcome.component.spec.ts
 │   │   └──welcome.component.ts                      * dummy component
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
 ├──rollup.config.es5.js
 ├──tsconfig.json
 ├──tsconfig.prod.json
 ├──tsconfig.prod-aot.json
 ├──tslint.json
 └──typings.json
 ```

# Bootstrap
Before starting the Angular 2 application, the configuration service loads a set of properties that depend on the 
**runtime** environment, which is identified using the URL's **hostname**. Doing so, we can use the same artifact on different
environments without having to rebuild it.

Keep in mind that, properties read from the environment always overwrite any potential value defined in the static **Config** 
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
in `environments/localhost.json`; on the other hand if we access `http://myserver:80` (supposing the application is published on
that web server), the configuration service will read the `environments/myserver.json` file.

# Building
You can generate the production bundles by means of:

```
gulp                            * JiT compilation
gulp aot                        * AoT compilation
```

Both `gulp` tasks are for releasing: they do not generate source maps, **inline** all external template/style files used by any angular 
component and include minification. Once the process is complete, you will get:

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
     ├──polyfills-[hash].js     * minified bundle including standard polyfills we require to run Angular applications in most modern browsers: polyfills, zone and reflect-metadata
     ├──polyfills-[hash].js.gz  * compressed version of polyfills-[hash].js
     ├──app-[hash].js           * our application code and its dependencies bundled in one minified file. It is independent of the SystemJS loader entirely.
     ├──app-[hash].js.gz        * compressed version of app-[hash].js
     ├──favicon.ico
     └──index.html              * the application entry point
```

## Build chain

The build process starts by transpiling the `Typescript` code to **ES2015**:

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

The generated classes are then passed to [Rollup](http://rollupjs.org/) in order to create a highly optimized bundle through the process of **tree-shaking**.
```
TS => Typescript compiler => ES2015 => Rollup => Tree Shaking => ES2015 Bundle
```

Finally, to obtain the **ES5** bundle we use [rollup-plugin-babel](https://github.com/rollup/rollup-plugin-babel) and 
[babel-preset-es2015-rollup](https://github.com/rollup/babel-preset-es2015-rollup), so let's add them to the process:
```
TS => Typescript compiler => ES2015 => Rollup => Tree Shaking => Babel => ES5 Bundle
```

## Setting bundle's target environment

Note `main.ts` depends on `process.env` (`nodejs` property containing the user environment). The way that dependency is resolved
varies for each environment:

* **Development** => **SystemJS module**
```js
(systemjs.config.js)

System.set(System.normalizeSync('process'), System.newModule({ env: { ENV: 'development' } }));
```

* **Production** => **global value**
```html
(index.html)

<script>window.process = { env:{ ENV:'production' } };</script>
```

## SystemJS and AoT compilation

**JiT**-compiled applications that use the `SystemJS` loader and component-relative URLs must set the `@Component.moduleId`
property to `module.id`. **The module object is undefined when an AoT-compiled app runs**. The app fails with a null reference 
error unless you assign a global module value in the `index.html` like this:

```html
<script>window.module = 'rollup';</script>
```

As you can read in the Angular documentation ([see](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html)), 
*setting a global module is a temporary expedient*.

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

## Rollup

If you are using `Moment.js` in your application (as this starter does) and you run [Rollup](http://rollupjs.org/), very likely, it will end up with the error: 
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

**NOTE:** in this starter the `gulp default | aot` sequences, include a `call:namespace` task to perform the given replace
action before bundling. 

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