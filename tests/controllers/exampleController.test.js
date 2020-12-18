import { describe, it, afterEach, beforeEach } from 'mocha'
import sinon from 'sinon'
import Model from '../../src/models/Example'
import {
  getExample,
  createExample,
} from '../../src/controllers/exampleController'

describe('Controller Example', () => {
  const sandbox = sinon.createSandbox()
  const expectedResult = {
    id: 1,
    message: 'Hello Example',
  }

  describe('getExample', () => {
    let req = { 
      body: {},
      params: {}
    },
    res = {}

    beforeEach((done) => {
      res = {
        json: sinon.spy(),
        status: sinon.stub().returns({ json: sinon.spy() })
      }
      done()
    })

    afterEach((done) => {
      sandbox.restore()
      done()
    })

    it('Should return status 200 Success and array of Example', async () => {
      sandbox.stub(Model, 'findAll').resolves([expectedResult])
      await getExample(req, res)
      sinon.assert.calledWith(Model.findAll)
      sinon.assert.calledWith(res.status, 200)
      sinon.assert.calledOnce(res.status(200).json)
      sinon.assert.calledWith(res.status(200).json, sinon.match.array)
    })
  
    it('Should return status 500', async () => {
      sandbox.stub(Model, 'findAll').rejects()
      await getExample(req, res)
      sinon.assert.calledWith(Model.findAll)
      sinon.assert.calledWith(res.status, 500)
      sinon.assert.calledOnce(res.status(500).json)
      sinon.assert.calledWith(res.status(500).json, sinon.match.has('message'))
    })
  })

  describe('createExample', () => {
    let req = { 
      body: {
        message: 'Hello Example Test',
      },
      params: {}
    },
    res = {}

    beforeEach((done) => {
      res = {
        json: sinon.spy(),
        status: sinon.stub().returns({ json: sinon.spy() })
      }
      done()
    })

    afterEach((done) => {
      sandbox.restore()
      done()
    })
    
    it('Should return status 201 Created', async () => {
      sandbox.stub(Model, 'create').resolves(req.body)
      await createExample(req, res)
      sinon.assert.calledWith(Model.create, req.body)
      sinon.assert.calledWith(res.status, 201)
      sinon.assert.calledOnce(res.status(201).json)
      sinon.assert.calledWith(res.status(201).json, sinon.match.object)
      sinon.assert.calledWith(res.status(201).json, sinon.match({ message: req.body.message }))
    })
  
    it('Should return status 500', async () => {
      sandbox.stub(Model, 'create').rejects()
      await createExample(req, res)
      sinon.assert.calledWith(Model.create, req.body)
      sinon.assert.calledWith(res.status, 500)
      sinon.assert.calledOnce(res.status(500).json)
      sinon.assert.calledWith(res.status(500).json, sinon.match.has('message'))
    })
  })
})

