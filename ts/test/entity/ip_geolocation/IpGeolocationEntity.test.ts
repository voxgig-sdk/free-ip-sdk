

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { FreeIpSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('IpGeolocationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FREE_IP_TEST_LIVE=TRUE.
  afterEach(liveDelay('FREE_IP_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FreeIpSDK.test()
    const ent = testsdk.IpGeolocation()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = FreeIpSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.IpGeolocation().load({"ip_address":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FREE_IP_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'ip_geolocation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"ip_geolocation","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/xml/{ipAddress}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"1.1.1.1","k":"param","n":"ip_address","or":"ipAddress","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/xml/{ipAddress}","q":{"exist":["ip_address"]},"r":{"param":{"ipAddress":"ip_address"}},"rs":{"kind":"raw","media":"application/xml"},"s":[{"lit":"api"},{"lit":"xml"},{"var":"ip_address"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/xml","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/xml","q":{},"r":{},"rs":{"kind":"raw","media":"application/xml"},"s":[{"lit":"api"},{"lit":"xml"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"ip_geolocation","name__orig":"ip_geolocation","Name":"IpGeolocation","name_":"ip_geolocation","name-":"ip-geolocation","NAME":"IP_GEOLOCATION","index$":0}, {"active":true,"entity":"ip_geolocation","key$":"BasicIpGeolocationFlow","kind":"basic","name":"BasicIpGeolocationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"ip_geolocation_ref01","srcdatavar":"ip_geolocation_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-ip_geolocation_ref01"}}],"index$":0}]}, 'IpGeolocation', {"GET /api/xml/{ipAddress}":{"protocol":"http","parameters":[{"name":"ipAddress","in":"path","required":true,"description":"IPv4 or IPv6 address to lookup","schema":{"type":"string","example":"1.1.1.1"},"index$":0}]},"GET /api/xml":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let ip_geolocation_ref01_data = Object.values(setup.data.existing.ip_geolocation)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const ip_geolocation_ref01_ent = client.IpGeolocation()


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/ip_geolocation/IpGeolocationTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = FreeIpSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['ip_geolocation01','ip_geolocation02','ip_geolocation03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FREE_IP_TEST_IP_GEOLOCATION_ENTID': idmap,
    'FREE_IP_TEST_LIVE': 'FALSE',
    'FREE_IP_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['FREE_IP_TEST_IP_GEOLOCATION_ENTID']

  const live = 'TRUE' === env.FREE_IP_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FREE_IP_TEST_IP_GEOLOCATION_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new FreeIpSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.FREE_IP_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
