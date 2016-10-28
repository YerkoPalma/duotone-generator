const chroma = require('chroma-js')
const execa = require('execa')
const Confirm = require('prompt-confirm')
// const style = require('ansi-styles')

// minimum contrast constants
const AA = 4.5
const AA_LARGE = 3
const AAA = 7
const AAA_LARGE = 4.5
// base repo for the theme
const REPO = 'https://github.com/simurai/duotone-syntax.git'

const gen = (color1, color2) => {
  
}

const check = (color1, color2) => {
  const minimum = AA
  const contrast = chroma.contrast(color1, color2)
  // const errorColor = chroma('pink').rgb
  // const successColor = chroma('green').rgb

  if (contrast < minimum) {
    // console.log(`${style.color.ansi256.grb(...errorColor)} Contrast too low ${style.color.close}`)
    console.log(`contrast too low ${contrast}`)
    process.exit(1)
  } else {

    const confirm = new Confirm({
      name: 'generate',
      message: 'Your colors are fine, would you like to generate a duotone theme now?'
    })
    
    confirm.ask(function(answer) {
      if (!answer) process.exit(0)

      execa('git', ['clone', REPO]).then(result => {
        
      })
    })
    // console.log(`${style.color.ansi256.grb(...successColor)} Nice contrast! ${style.color.close}`)
  }
}

module.exports = {
  gen,
  check
}
