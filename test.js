const intcoder = require('../intcoder')
const chai = require('chai')

chai.should()

const params = [
  [0, [0]],
  [1, [1]],
  [255, [255]],
  [256, [1, 0]],
  [257, [1, 1]],
  [511, [1, 255]],
  [512, [2, 0]],
  [65535, [255, 255]],
  [65536, [1, 0, 0]],
  [65537, [1, 0, 1]]
]

describe('intcoder', () => {
  params.forEach((param) => {
    const integer = param[0]
    const array = param[1]
    it(`should encode ${integer} to [${array}]`, () => {
      intcoder.encode(integer).should.deep.equal(array)
    })
    it(`should decode [${array}] to ${integer}`, () => {
      intcoder.decode(new Uint8Array(array)).should.deep.equal(integer)
    })
  })
})
