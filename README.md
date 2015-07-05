# Gulp-BackstopJS

## Motivation

Currently there is no way to configure the path where BackstopJS will generate its tests and reference images. Normally it will be generated under *./bower_components/backstopjs* or *./node_modules/backstopjs*. There is a [github issue](https://github.com/garris/BackstopJS/issues/50) regarding this topic. But AFAIK this is not solved yet.

There is a cool Grunt plugin ([grunt-backstop](https://github.com/ddluc/grunt-backstop)) developed by [ddluc](https://github.com/ddluc) which is targeted to solve this problem and I find it really useful. Unfortunately I couldn't find the same for Gulp. So the motivation for this project is to provide a Gulp configuration example that works with the same principles as ddluc's project does.

## Principle

What this does is basically try to keep synchronized your custom folder (where you want to have you references and test images) with the default bakstopjs folder (under *./bower_components/backstopjs* or *./node_modules/backstopjs*). This is done by simply copying the files in both directions.

## Configuration

In the gulpfile.js is where both: the default backstopjs and your custom folder, are defined:

```javascript
var backstop_path = './node_modules/backstopjs',
    test_path = './tests';
```

After that; there are several gulp tasks. The main tasks are:

1. **backstopjs-configure**: task to execute *npm install* in the default backstopjs folder to retrieve all its dependencies. This should be run the first time yo synchronize the project or every time *node_modules* folder is deleted
1. **backstopjs-genConfig**: task to execute *gulp genConfig* in the default backstopjs folder to generate a backstop,json file with a default configuration.
1. **backstopjs-reference**: task to generate a reference of your project in the default backstopjs (*./bower_components/backstopjs/bitmaps_reference* or *./node_modules/backstopjs/bitmaps_reference*) folder and also on your custom folder.
1. **backstopjs-test**: task to generate a test of your project in the default backstopjs folder (*./bower_components/backstopjs/bitmaps_test* or *./node_modules/backstopjs/bitmaps_test*) and also on your custom folder.
1. **backstopjs-setup**: task to copy the reference of your custom folder into the backstopjs default folder. Normally you will do this every time you synchronize if you work with other people, so that backstopjs is always updated with the latest changes.
1. **backstopjs-clean-tests**: task to delete the test files of your project in the default backstopjs (*./bower_components/backstopjs/bitmaps_reference* or *./node_modules/backstopjs/bitmaps_reference*) folder and also on your custom folder.

## Example

This project contains an example with the following config in backstop.json:

```javascript
{
  "viewports": [
    {
      "name": "phone",
      "width": 320,
      "height": 480
    },
    {
      "name": "tablet_v",
      "width": 568,
      "height": 1024
    }
  ],
  "scenarios": [
    {
      "label": "http://getbootstrap.com",
      "url": "http://getbootstrap.com",
      "hideSelectors": [],
      "removeSelectors": [
        "#carbonads-container"
      ],
      "selectors": [
        "header",
        "main"
      ],
      "readyEvent": null,
      "delay": 500,
      "misMatchThreshold" : 0.1
    }
  ]
}
```

It also includes the reference images generated in the custom folder *tests* so that you can play with the different tasks. Have fun!