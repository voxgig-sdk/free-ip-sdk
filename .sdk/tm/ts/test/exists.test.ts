
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { FreeIpSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await FreeIpSDK.test()
    equal(null !== testsdk, true)
  })

})
