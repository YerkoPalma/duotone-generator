# duotone-generator [![npm version](https://img.shields.io/npm/v/duotone-generator.svg?style=flat-square)](https://www.npmjs.com/package/duotone-generator) [![Build Status](https://img.shields.io/travis/YerkoPalma/duotone-generator/master.svg?style=flat-square)](https://travis-ci.org/YerkoPalma/duotone-generator) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)

> generate duotone atom themes with contrast checker

![cli](https://cloud.githubusercontent.com/assets/5105812/20016542/b2978dae-a29e-11e6-8407-21e9410c60fa.png)

## Installation

```bash
npm install --save duotone-generator
```

## Usage

### Check two hues

```bash
$ duo check 20 190
```

If contrast is good between each color and the background ([according to WCAG](https://www.w3.org/TR/WCAG20/#visual-audio-contrast)) it will ask if you want to generate a theme.

### Generate a theme

```bash
$ duo gen 99 210
```

It generate the theme withouth checking contrast.

## CLI

```bash
$ duo --help

  Usage
    duo  <command> [<hue> <hue>]

  Commands
    check              Check the contrast between the main two colors generated by two hues
    gen                Generate a duotone theme. If one or the two hues are omited it automatically generate  the rest

  Options
    --name, -n         The name of your theme. (Default: '')
    --minimum, -m      The minimum contrast to validate when checking. (Default: 'AA')
    --username, -u     Github username. Add it if you want to also update the docs in the cloned theme

  Examples
    duo gen
    duo gen 22
    duo gen 22 300
    duo gen 22 300 --name duotone-awesome-theme

    duo check 22 300
    duo check 22 300 -m AAA
```

## License

[MIT](/license)

Crafted by Yerko ([@yerko_palma](https://twitter.com/yerko_palma))
