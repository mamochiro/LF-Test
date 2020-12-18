import { describe, it } from 'mocha'
import { expect } from 'chai'
import sum from '../../src/utils/sum'

describe('Unit Test Utils/sum', () => {
  it('1 + 2 should be 3', () => {
    expect(sum(1, 2)).equal(3)
  })
})
