import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'

describe('Use sinon function', () => {

  beforeEach(() => {
    // do before each it
  })

  afterEach(() => {
    // do after each it done
  })

  it('SPY console.log() should still be called', () => {
    const consoleLogSpy = sinon.spy(console, 'log')
    const message = 'You will see this line of output in the test report'
    console.log(message)
    expect(consoleLogSpy.calledWith(message)).to.be.true
    consoleLogSpy.restore()
  })

  it('STUB console.log() is replaced', () => {
    const consoleLogStub = sinon.stub(console, 'log')
    const message = 'You will NOT see this line of output in the test report'
    console.log(message)
    consoleLogStub.restore()
    expect(consoleLogStub.calledWith(message)).to.be.true
  })
})
