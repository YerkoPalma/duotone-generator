import test from 'ava'
import duotoneGenerator from './'

test('duo check', t => {
  t.plan(5)

  // test arguments
  // check should throw if there is less or more than two parameters
  t.throws(() => { duotoneGenerator.check() })
  t.throws(() => { duotoneGenerator.check(45) })
  // parameters must be integers between 0 and 360
  t.throws(() => { duotoneGenerator.check('56', 'black') })
  t.throws(() => { duotoneGenerator.check(10, 500) })

  // default minimum should be AA
  // opts can change minimum
  // low contrast do not allow to generate theme
  // after cloning repo, there must be a folder with the name of the project
  t.notThrows(() => {
    duotoneGenerator.check(10, 300)
  })
  // theme/styles/colors.less must have user hues
})

test('duo gen', t => {
  // test arguments
  // gen should work 0 to 2 arguments
  // if no arguments, two hues are generated with maximum contrast difference
  // if one argument, a second hue is generated with maximum contrast difference

  // default minimum should be AA
  // opts can change minimum
  // opts can change theme name
  // after cloning repo, there must be a folder with the name of the project
  // theme/styles/colors.less must have user hues
})
