

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { FreeIpSDK, BaseFeature, stdutil } from '../../..'

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FREE_IP_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'ip_geolocation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"ip_geolocation","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"1.1.1.1","kind":"param","name":"ip_address","orig":"ip_address","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/xml/{ipAddress}","json":"{\"operationId\":\"getIpInfoByAddressXml\",\"parameters\":[{\"description\":\"IPv4 or IPv6 address to lookup\",\"in\":\"path\",\"name\":\"ipAddress\",\"required\":true,\"schema\":{\"example\":\"1.1.1.1\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/xml\":{\"schema\":{\"description\":\"Complete IP geolocation information response\",\"properties\":{\"asn\":{\"description\":\"Autonomous System Number\",\"example\":\"AS15169\",\"type\":\"string\"},\"asnOrganization\":{\"description\":\"Organization associated with the ASN\",\"example\":\"Google LLC\",\"type\":\"string\"},\"capital\":{\"description\":\"Capital city of the country\",\"example\":\"Washington\",\"type\":\"string\"},\"cityName\":{\"description\":\"City name\",\"example\":\"Mountain View\",\"type\":\"string\"},\"continent\":{\"description\":\"Continent name\",\"example\":\"North America\",\"type\":\"string\"},\"continentCode\":{\"description\":\"Two-letter continent code\",\"example\":\"NA\",\"type\":\"string\"},\"countryCode\":{\"description\":\"ISO 3166-1 alpha-2 country code\",\"example\":\"US\",\"type\":\"string\"},\"countryName\":{\"description\":\"Full country name\",\"example\":\"United States\",\"type\":\"string\"},\"currencies\":{\"description\":\"List of currencies used in the country\",\"items\":{\"properties\":{\"code\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"currency\":{\"description\":\"Currency information for the country\",\"properties\":{\"code\":{\"description\":\"ISO 4217 currency code\",\"example\":\"USD\",\"type\":\"string\"},\"name\":{\"description\":\"Currency name\",\"example\":\"US Dollar\",\"type\":\"string\"}},\"type\":\"object\"},\"ipAddress\":{\"description\":\"The IP address that was looked up\",\"example\":\"8.8.8.8\",\"type\":\"string\"},\"ipVersion\":{\"description\":\"IP version (4 for IPv4, 6 for IPv6)\",\"example\":4,\"type\":\"integer\"},\"isProxy\":{\"description\":\"Whether the IP is detected as a proxy, VPN, or hosting service\",\"example\":false,\"type\":\"boolean\"},\"language\":{\"description\":\"Primary language code\",\"example\":\"en-US\",\"type\":\"string\"},\"languages\":{\"description\":\"List of languages spoken in the country\",\"example\":[\"en\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"example\":37.386,\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"example\":-122.0838,\"format\":\"double\",\"type\":\"number\"},\"phoneCodes\":{\"description\":\"International dialing codes for the country\",\"example\":[\"+1\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"regionCode\":{\"description\":\"Region or state code\",\"example\":\"CA\",\"type\":\"string\"},\"regionName\":{\"description\":\"Region or state name\",\"example\":\"California\",\"type\":\"string\"},\"timeZone\":{\"description\":\"Timezone offset from UTC\",\"example\":\"-08:00\",\"type\":\"string\"},\"timeZones\":{\"description\":\"List of timezone identifiers for the location\",\"example\":[\"America/Los_Angeles\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"tlds\":{\"description\":\"Top-level domains for the country\",\"example\":[\".us\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"zipCode\":{\"description\":\"Postal/ZIP code\",\"example\":\"94043\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with IP geolocation information in XML format\"},\"400\":{\"content\":{\"application/xml\":{\"schema\":{\"description\":\"Error response object\",\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"example\":429,\"type\":\"integer\"},\"error\":{\"description\":\"Indicates an error occurred\",\"example\":true,\"type\":\"boolean\"},\"message\":{\"description\":\"Error message describing what went wrong\",\"example\":\"Rate limit exceeded\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid IP address format\"},\"429\":{\"content\":{\"application/xml\":{\"schema\":{\"description\":\"Error response object\",\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"example\":429,\"type\":\"integer\"},\"error\":{\"description\":\"Indicates an error occurred\",\"example\":true,\"type\":\"boolean\"},\"message\":{\"description\":\"Error message describing what went wrong\",\"example\":\"Rate limit exceeded\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded (60 requests per minute)\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/xml/{ipAddress}","rename":{"param":{"ipAddress":"ip_address"}},"segments":[{"lit":"api"},{"lit":"xml"},{"var":"ip_address"}],"select":{"exist":["ip_address"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{},"contract":{"id":"GET /api/xml","json":"{\"operationId\":\"getIpInfoCurrentXml\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/xml\":{\"schema\":{\"description\":\"Complete IP geolocation information response\",\"properties\":{\"asn\":{\"description\":\"Autonomous System Number\",\"example\":\"AS15169\",\"type\":\"string\"},\"asnOrganization\":{\"description\":\"Organization associated with the ASN\",\"example\":\"Google LLC\",\"type\":\"string\"},\"capital\":{\"description\":\"Capital city of the country\",\"example\":\"Washington\",\"type\":\"string\"},\"cityName\":{\"description\":\"City name\",\"example\":\"Mountain View\",\"type\":\"string\"},\"continent\":{\"description\":\"Continent name\",\"example\":\"North America\",\"type\":\"string\"},\"continentCode\":{\"description\":\"Two-letter continent code\",\"example\":\"NA\",\"type\":\"string\"},\"countryCode\":{\"description\":\"ISO 3166-1 alpha-2 country code\",\"example\":\"US\",\"type\":\"string\"},\"countryName\":{\"description\":\"Full country name\",\"example\":\"United States\",\"type\":\"string\"},\"currencies\":{\"description\":\"List of currencies used in the country\",\"items\":{\"properties\":{\"code\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"currency\":{\"description\":\"Currency information for the country\",\"properties\":{\"code\":{\"description\":\"ISO 4217 currency code\",\"example\":\"USD\",\"type\":\"string\"},\"name\":{\"description\":\"Currency name\",\"example\":\"US Dollar\",\"type\":\"string\"}},\"type\":\"object\"},\"ipAddress\":{\"description\":\"The IP address that was looked up\",\"example\":\"8.8.8.8\",\"type\":\"string\"},\"ipVersion\":{\"description\":\"IP version (4 for IPv4, 6 for IPv6)\",\"example\":4,\"type\":\"integer\"},\"isProxy\":{\"description\":\"Whether the IP is detected as a proxy, VPN, or hosting service\",\"example\":false,\"type\":\"boolean\"},\"language\":{\"description\":\"Primary language code\",\"example\":\"en-US\",\"type\":\"string\"},\"languages\":{\"description\":\"List of languages spoken in the country\",\"example\":[\"en\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"example\":37.386,\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"example\":-122.0838,\"format\":\"double\",\"type\":\"number\"},\"phoneCodes\":{\"description\":\"International dialing codes for the country\",\"example\":[\"+1\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"regionCode\":{\"description\":\"Region or state code\",\"example\":\"CA\",\"type\":\"string\"},\"regionName\":{\"description\":\"Region or state name\",\"example\":\"California\",\"type\":\"string\"},\"timeZone\":{\"description\":\"Timezone offset from UTC\",\"example\":\"-08:00\",\"type\":\"string\"},\"timeZones\":{\"description\":\"List of timezone identifiers for the location\",\"example\":[\"America/Los_Angeles\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"tlds\":{\"description\":\"Top-level domains for the country\",\"example\":[\".us\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"zipCode\":{\"description\":\"Postal/ZIP code\",\"example\":\"94043\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with IP geolocation information in XML format\"},\"429\":{\"content\":{\"application/xml\":{\"schema\":{\"description\":\"Error response object\",\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"example\":429,\"type\":\"integer\"},\"error\":{\"description\":\"Indicates an error occurred\",\"example\":true,\"type\":\"boolean\"},\"message\":{\"description\":\"Error message describing what went wrong\",\"example\":\"Rate limit exceeded\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded (60 requests per minute)\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/xml","segments":[{"lit":"api"},{"lit":"xml"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[["xml"]]},"key$":"ip_geolocation","name__orig":"ip_geolocation","Name":"IpGeolocation","name_":"ip_geolocation","name-":"ip-geolocation","NAME":"IP_GEOLOCATION","index$":0}, {"active":true,"entity":"ip_geolocation","key$":"BasicIpGeolocationFlow","kind":"basic","name":"BasicIpGeolocationFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"ip_geolocation_ref01","srcdatavar":"ip_geolocation_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-ip_geolocation_ref01"}}],"index$":0}]}, 'IpGeolocation')
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
    ['ip_geolocation01','ip_geolocation02','ip_geolocation03','xml01','xml02','xml03'],
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
  
