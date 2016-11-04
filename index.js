'use strict'

const chroma = require('chroma-js')
const execa = require('execa')
const Confirm = require('prompt-confirm')
const path = require('path')
const fs = require('fs')
const assert = require('assert')
const style = require('./ansi-styles')

// minimum contrast constants
const minimums = {
  AA: 4.5,
  AAA: 7
}

// base repo for the theme
const REPO = 'https://github.com/simurai/duotone-syntax.git'
let themeName = 'duotone-syntax'
const errorColor = chroma('red').brighten().rgb()
const successColor = chroma('lightgreen').rgb()

function previewTheme (uno, duo) {
  // generate the 8 shades
  const uno1 = chroma.hsl(uno, 0.99, 0.96).rgb()
  const uno2 = chroma.hsl(uno, 0.88, 0.84).rgb()
  const uno3 = chroma.hsl(uno, 0.66, 0.74).rgb()
  const uno4 = chroma.hsl(uno, 0.22, 0.48).rgb()
  const uno5 = chroma.hsl(uno, 0.11, 0.34).rgb()

  const duo1 = chroma.hsl(duo, 0.99, 0.78).rgb()
  const duo2 = chroma.hsl(duo, 0.44, 0.48).rgb()
  const duo3 = chroma.hsl(duo, 0.22, 0.38).rgb()

  const bg = chroma.hsl(uno, 0.14, 0.18).rgb()
  // show them
  console.log(`${style.bgColor.ansi256.rgb(...bg)}
  ${style.color.ansi256.rgb(...uno1)}uno-1       ${chroma(...uno1, 'rgb').hex()}${style.color.close}
  ${style.color.ansi256.rgb(...uno2)}uno-2       ${chroma(...uno2, 'rgb').hex()}${style.color.close}
  ${style.color.ansi256.rgb(...uno3)}uno-3       ${chroma(...uno3, 'rgb').hex()}${style.color.close}
  ${style.color.ansi256.rgb(...uno4)}uno-4       ${chroma(...uno4, 'rgb').hex()}${style.color.close}
  ${style.color.ansi256.rgb(...uno5)}uno-5       ${chroma(...uno5, 'rgb').hex()}${style.color.close}

  ${style.color.ansi256.rgb(...duo1)}duo-1       ${chroma(...duo1, 'rgb').hex()}${style.color.close}
  ${style.color.ansi256.rgb(...duo2)}duo-2       ${chroma(...duo2, 'rgb').hex()}${style.color.close}
  ${style.color.ansi256.rgb(...duo3)}duo-3       ${chroma(...duo3, 'rgb').hex()}${style.color.close}${style.bgColor.close}
  `)
}

function generate (hueUno, hueDuo) {
  execa('git', ['clone', REPO, themeName]).then(result => {
    // the colors.less file from the original repo
    const colors = path.resolve(process.cwd(), path.join(themeName, 'styles', 'colors.less'))
    fs.readFile(colors, 'utf8', (err, data) => {
      if (err) {
        return console.error(err)
      }
      let result = data.replace(/@syntax-uno:\s*\d*;/g, `@syntax-uno:    ${hueUno};`)
      result = result.replace(/@syntax-duo:\s*\d*;/g, `@syntax-duo:    ${hueDuo};`)

      fs.writeFile(colors, result, 'utf8', err => {
        if (err) return console.error(err)
        console.log(`Your new theme ${style.color.ansi256.rgb(...successColor)}${themeName}${style.color.close} has been generated`)
      })
    })
  }).catch(err => {
    console.log(`${style.color.ansi256.rgb(...errorColor)}Failed to clone in ${process.cwd()} ${style.color.close}.
    [Error]: ${err}`)
  })
}

function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

const gen = (hueUno, hueDuo, options) => {
  if (typeof hueUno === 'object') options = hueUno
  options = options || {}

  if (!hueUno || (typeof hueUno !== 'number' && typeof hueUno !== 'number')) {
    hueUno = getRandomInt(0, 360) // random Hue
    hueDuo = getRandomInt(0, 360) // random Hue
  }
  if (!hueDuo || (typeof hueDuo !== 'number' && typeof hueDuo !== 'number')) {
    hueDuo = getRandomInt(0, 360) // random Hue
  }

  if (typeof options.name === 'string') themeName = options.name
  generate(hueUno, hueDuo)
  previewTheme(hueUno, hueDuo)
}

const check = (hueUno, hueDuo, options) => {
  options = options || {}
  assert.ok(hueUno, '[duo check]: hueUno not provided')
  assert.ok(hueDuo, '[duo check]: hueDuo not provided')
  assert.equal(typeof hueUno, 'number', '[duo check]: hueUno must be a number')
  assert.equal(typeof hueDuo, 'number', '[duo check]: hueDuo must be a number')
  assert(hueUno > 0 && hueUno <= 360, '[duo check]: Hue values must be between 0 and 360')
  assert(hueDuo > 0 && hueDuo <= 360, '[duo check]: Hue values must be between 0 and 360')

  const minimum = options.minimum
                  ? (options.minimum === 'AA' || options.minimum === 'AAA' ? minimums[options.minimum] : minimums['AA'])
                  : minimums['AA']
  if (typeof options.name === 'string') themeName = options.name
  const colorUno = chroma.hsl(hueUno, 0.99, 0.96)
  const colorDuo = chroma.hsl(hueDuo, 0.99, 0.77)
  const bgColor = chroma.hsl(hueUno, 0.12, 0.18)

  const contrastUno = chroma.contrast(colorUno, bgColor)
  const contrastDuo = chroma.contrast(colorDuo, bgColor)

  if (contrastUno < minimum || contrastDuo < minimum) {
    console.log(`${style.color.ansi256.grb(...errorColor)} Contrast too low ${style.color.close}`)
    // console.log(`contrast too low contrast uno: ${contrastUno}; contrast duo: ${contrastDuo}`)
    process.exit(1)
  } else {
    previewTheme(hueUno, hueDuo)
    const confirmGeneration = new Confirm({
      name: 'generate',
      message: 'Your colors are fine, would you like to generate a duotone theme now?'
    })

    confirmGeneration.ask(answer => {
      if (!answer) process.exit(0)

      // duo gen::
      generate(hueUno, hueDuo)
      // ::duo gen
    })
  }
}

module.exports = {
  gen,
  check
}
