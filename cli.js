#!/usr/bin/env node
'use strict'

const meow = require('meow')
const duo = require('./')

const cli = meow(`
    Usage
      $ duo gen <color1> <color1>

    Options
      --yes, -y  Assume 'yes' as answer to every question

    Examples
      $ duo gen -y

`, {
  alias: {
    y: 'yes'
  }
})

if (cli.input.length === 0) {
  cli.showHelp()
  process.exit(0)
}

if (cli.input[0] === 'gen') {
  const colors = cli.input.slice(1)
  duo.gen(...colors)
}

if (cli.input[0] === 'check') {
  const colors = cli.input.slice(1)
  duo.check(...colors)
}
