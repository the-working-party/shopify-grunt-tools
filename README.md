shopify-grunt-tools
===================

A small set of tools to make building Shopify themes easier


Directory Layout
----------------

```bash
├── lib
│   ├── scss
│   │   ├── display
│   │   ├── setup
│   │   └── custom
│   └── js
│       └── libraries
├── source-assets
│   └── images
└── theme
    ├── assets
    ├── config
    ├── layout
    ├── snippets
    └── themplates
```

- `lib` - contains sass and JS files that will be concatenated (, in case of JS minified) and moved to the shopify theme folder
- `source-assets` contains images that will be minified and moved to the shopify theme folder as well
- `theme` - contains the usual shopify theme structures in which you can run your ```theme watch``` with [this tool](https://github.com/Shopify/shopify_theme)

To see this in action with a framework called ["Timber"](https://github.com/Shopify/Timber) have a look at this [repo](https://github.com/dominikwilkowski/clean-timber)

## File sorting

All files in the ```js``` and ```scss``` folder will sorted by their file names.

* In the ```js``` folder the ```libraries``` folder will take precedence over other files
* The order in the ```scss``` folder is: ```setup```, ```display``` and then ```custom```
