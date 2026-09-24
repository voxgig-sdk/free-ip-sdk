
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { FreeIpSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = FreeIpSDK.test()
    equal(testsdk instanceof FreeIpSDK, true,
      'FreeIpSDK.test() must return a client synchronously')
  })

})
