

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


describe('JsonEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FREE_IP_TEST_LIVE=TRUE.
  afterEach(liveDelay('FREE_IP_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FreeIpSDK.test()
    const ent = testsdk.Json()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FREE_IP_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'json.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"asn","req":false,"short":"Autonomous System Number","type":"`$STRING`","index$":0},{"active":true,"name":"asnOrganization","req":false,"short":"Organization associated with the ASN","type":"`$STRING`","index$":1},{"active":true,"name":"capital","req":false,"short":"Capital city of the country","type":"`$STRING`","index$":2},{"active":true,"name":"cityName","req":false,"short":"City name","type":"`$STRING`","index$":3},{"active":true,"name":"code","req":false,"type":"`$STRING`","index$":4},{"active":true,"name":"continent","req":false,"short":"Continent name","type":"`$STRING`","index$":5},{"active":true,"name":"continentCode","req":false,"short":"Two-letter continent code","type":"`$STRING`","index$":6},{"active":true,"name":"countryCode","req":false,"short":"ISO 3166-1 alpha-2 country code","type":"`$STRING`","index$":7},{"active":true,"name":"countryName","req":false,"short":"Full country name","type":"`$STRING`","index$":8},{"active":true,"name":"currencies","req":false,"short":"List of currencies used in the country","type":"`$ARRAY`","index$":9},{"active":true,"name":"currency","req":false,"short":"Currency information for the country","type":"`$OBJECT`","index$":10},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":11},{"active":true,"name":"ip","req":false,"short":"IPv4 or IPv6 address to lookup","type":"`$STRING`","index$":12},{"active":true,"name":"ipAddress","req":false,"short":"The IP address that was looked up","type":"`$STRING`","index$":13},{"active":true,"name":"ipVersion","req":false,"short":"IP version (4 for IPv4, 6 for IPv6)","type":"`$INTEGER`","index$":14},{"active":true,"name":"isProxy","req":false,"short":"Whether the IP is detected as a proxy, VPN, or hosting service","type":"`$BOOLEAN`","index$":15},{"active":true,"name":"language","req":false,"short":"Primary language code","type":"`$STRING`","index$":16},{"active":true,"name":"languages","req":false,"short":"List of languages spoken in the country","type":"`$ARRAY`","index$":17},{"active":true,"format":"double","name":"latitude","req":false,"short":"Latitude coordinate","type":"`$NUMBER`","index$":18},{"active":true,"format":"double","name":"longitude","req":false,"short":"Longitude coordinate","type":"`$NUMBER`","index$":19},{"active":true,"name":"name","req":false,"type":"`$STRING`","index$":20},{"active":true,"name":"phoneCodes","req":false,"short":"International dialing codes for the country","type":"`$ARRAY`","index$":21},{"active":true,"name":"regionCode","req":false,"short":"Region or state code","type":"`$STRING`","index$":22},{"active":true,"name":"regionName","req":false,"short":"Region or state name","type":"`$STRING`","index$":23},{"active":true,"name":"timeZone","req":false,"short":"Timezone offset from UTC","type":"`$STRING`","index$":24},{"active":true,"name":"timeZones","req":false,"short":"List of timezone identifiers for the location","type":"`$ARRAY`","index$":25},{"active":true,"name":"tlds","req":false,"short":"Top-level domains for the country","type":"`$ARRAY`","index$":26},{"active":true,"name":"zipCode","req":false,"short":"Postal/ZIP code","type":"`$STRING`","index$":27}],"id":{"field":"id","name":"id"},"name":"json","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /api/json","json":"{\"operationId\":\"postIpInfo\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"ip\":{\"description\":\"IPv4 or IPv6 address to lookup\",\"example\":\"8.8.8.8\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Optional IP address to lookup\",\"required\":false},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Complete IP geolocation information response\",\"properties\":{\"asn\":{\"description\":\"Autonomous System Number\",\"example\":\"AS15169\",\"type\":\"string\"},\"asnOrganization\":{\"description\":\"Organization associated with the ASN\",\"example\":\"Google LLC\",\"type\":\"string\"},\"capital\":{\"description\":\"Capital city of the country\",\"example\":\"Washington\",\"type\":\"string\"},\"cityName\":{\"description\":\"City name\",\"example\":\"Mountain View\",\"type\":\"string\"},\"continent\":{\"description\":\"Continent name\",\"example\":\"North America\",\"type\":\"string\"},\"continentCode\":{\"description\":\"Two-letter continent code\",\"example\":\"NA\",\"type\":\"string\"},\"countryCode\":{\"description\":\"ISO 3166-1 alpha-2 country code\",\"example\":\"US\",\"type\":\"string\"},\"countryName\":{\"description\":\"Full country name\",\"example\":\"United States\",\"type\":\"string\"},\"currencies\":{\"description\":\"List of currencies used in the country\",\"items\":{\"properties\":{\"code\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"currency\":{\"description\":\"Currency information for the country\",\"properties\":{\"code\":{\"description\":\"ISO 4217 currency code\",\"example\":\"USD\",\"type\":\"string\"},\"name\":{\"description\":\"Currency name\",\"example\":\"US Dollar\",\"type\":\"string\"}},\"type\":\"object\"},\"ipAddress\":{\"description\":\"The IP address that was looked up\",\"example\":\"8.8.8.8\",\"type\":\"string\"},\"ipVersion\":{\"description\":\"IP version (4 for IPv4, 6 for IPv6)\",\"example\":4,\"type\":\"integer\"},\"isProxy\":{\"description\":\"Whether the IP is detected as a proxy, VPN, or hosting service\",\"example\":false,\"type\":\"boolean\"},\"language\":{\"description\":\"Primary language code\",\"example\":\"en-US\",\"type\":\"string\"},\"languages\":{\"description\":\"List of languages spoken in the country\",\"example\":[\"en\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"example\":37.386,\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"example\":-122.0838,\"format\":\"double\",\"type\":\"number\"},\"phoneCodes\":{\"description\":\"International dialing codes for the country\",\"example\":[\"+1\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"regionCode\":{\"description\":\"Region or state code\",\"example\":\"CA\",\"type\":\"string\"},\"regionName\":{\"description\":\"Region or state name\",\"example\":\"California\",\"type\":\"string\"},\"timeZone\":{\"description\":\"Timezone offset from UTC\",\"example\":\"-08:00\",\"type\":\"string\"},\"timeZones\":{\"description\":\"List of timezone identifiers for the location\",\"example\":[\"America/Los_Angeles\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"tlds\":{\"description\":\"Top-level domains for the country\",\"example\":[\".us\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"zipCode\":{\"description\":\"Postal/ZIP code\",\"example\":\"94043\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with IP geolocation information\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response object\",\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"example\":429,\"type\":\"integer\"},\"error\":{\"description\":\"Indicates an error occurred\",\"example\":true,\"type\":\"boolean\"},\"message\":{\"description\":\"Error message describing what went wrong\",\"example\":\"Rate limit exceeded\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid IP address format\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response object\",\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"example\":429,\"type\":\"integer\"},\"error\":{\"description\":\"Indicates an error occurred\",\"example\":true,\"type\":\"boolean\"},\"message\":{\"description\":\"Error message describing what went wrong\",\"example\":\"Rate limit exceeded\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded (60 requests per minute)\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/api/json","segments":[{"lit":"api"},{"lit":"json"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /api/json","json":"{\"operationId\":\"getIpInfoCurrent\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"cityName\":\"Melbourne\",\"continent\":\"Oceania\",\"continentCode\":\"OC\",\"countryCode\":\"AU\",\"countryName\":\"Australia\",\"currency\":{\"code\":\"AUD\",\"name\":\"Australian Dollar\"},\"ipAddress\":\"1.1.1.1\",\"ipVersion\":4,\"isProxy\":false,\"language\":\"en-AU\",\"latitude\":-37.7,\"longitude\":145.1833,\"regionCode\":\"VIC\",\"regionName\":\"Victoria\",\"timeZone\":\"+11:00\",\"timeZones\":[\"Australia/Melbourne\"],\"tlds\":[\".au\"],\"zipCode\":\"3000\"},\"schema\":{\"description\":\"Complete IP geolocation information response\",\"properties\":{\"asn\":{\"description\":\"Autonomous System Number\",\"example\":\"AS15169\",\"type\":\"string\"},\"asnOrganization\":{\"description\":\"Organization associated with the ASN\",\"example\":\"Google LLC\",\"type\":\"string\"},\"capital\":{\"description\":\"Capital city of the country\",\"example\":\"Washington\",\"type\":\"string\"},\"cityName\":{\"description\":\"City name\",\"example\":\"Mountain View\",\"type\":\"string\"},\"continent\":{\"description\":\"Continent name\",\"example\":\"North America\",\"type\":\"string\"},\"continentCode\":{\"description\":\"Two-letter continent code\",\"example\":\"NA\",\"type\":\"string\"},\"countryCode\":{\"description\":\"ISO 3166-1 alpha-2 country code\",\"example\":\"US\",\"type\":\"string\"},\"countryName\":{\"description\":\"Full country name\",\"example\":\"United States\",\"type\":\"string\"},\"currencies\":{\"description\":\"List of currencies used in the country\",\"items\":{\"properties\":{\"code\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"currency\":{\"description\":\"Currency information for the country\",\"properties\":{\"code\":{\"description\":\"ISO 4217 currency code\",\"example\":\"USD\",\"type\":\"string\"},\"name\":{\"description\":\"Currency name\",\"example\":\"US Dollar\",\"type\":\"string\"}},\"type\":\"object\"},\"ipAddress\":{\"description\":\"The IP address that was looked up\",\"example\":\"8.8.8.8\",\"type\":\"string\"},\"ipVersion\":{\"description\":\"IP version (4 for IPv4, 6 for IPv6)\",\"example\":4,\"type\":\"integer\"},\"isProxy\":{\"description\":\"Whether the IP is detected as a proxy, VPN, or hosting service\",\"example\":false,\"type\":\"boolean\"},\"language\":{\"description\":\"Primary language code\",\"example\":\"en-US\",\"type\":\"string\"},\"languages\":{\"description\":\"List of languages spoken in the country\",\"example\":[\"en\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"example\":37.386,\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"example\":-122.0838,\"format\":\"double\",\"type\":\"number\"},\"phoneCodes\":{\"description\":\"International dialing codes for the country\",\"example\":[\"+1\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"regionCode\":{\"description\":\"Region or state code\",\"example\":\"CA\",\"type\":\"string\"},\"regionName\":{\"description\":\"Region or state name\",\"example\":\"California\",\"type\":\"string\"},\"timeZone\":{\"description\":\"Timezone offset from UTC\",\"example\":\"-08:00\",\"type\":\"string\"},\"timeZones\":{\"description\":\"List of timezone identifiers for the location\",\"example\":[\"America/Los_Angeles\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"tlds\":{\"description\":\"Top-level domains for the country\",\"example\":[\".us\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"zipCode\":{\"description\":\"Postal/ZIP code\",\"example\":\"94043\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with IP geolocation information\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response object\",\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"example\":429,\"type\":\"integer\"},\"error\":{\"description\":\"Indicates an error occurred\",\"example\":true,\"type\":\"boolean\"},\"message\":{\"description\":\"Error message describing what went wrong\",\"example\":\"Rate limit exceeded\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded (60 requests per minute)\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response object\",\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"example\":429,\"type\":\"integer\"},\"error\":{\"description\":\"Indicates an error occurred\",\"example\":true,\"type\":\"boolean\"},\"message\":{\"description\":\"Error message describing what went wrong\",\"example\":\"Rate limit exceeded\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/json","segments":[{"lit":"api"},{"lit":"json"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"193.247.239.168","kind":"param","name":"id","orig":"ip_address","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /api/json/{ipAddress}","json":"{\"operationId\":\"getIpInfoByAddress\",\"parameters\":[{\"description\":\"IPv4 or IPv6 address to lookup\",\"in\":\"path\",\"name\":\"ipAddress\",\"required\":true,\"schema\":{\"example\":\"193.247.239.168\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"asn\":\"AS12345\",\"asnOrganization\":\"Example ISP\",\"capital\":\"Paris\",\"cityName\":\"Paris\",\"continent\":\"Europe\",\"continentCode\":\"EU\",\"countryCode\":\"FR\",\"countryName\":\"France\",\"currency\":{\"code\":\"EUR\",\"name\":\"Euro\"},\"ipAddress\":\"193.247.239.168\",\"ipVersion\":4,\"isProxy\":false,\"languages\":[\"fr\"],\"latitude\":48.8566,\"longitude\":2.3522,\"phoneCodes\":[\"+33\"],\"regionCode\":\"IDF\",\"regionName\":\"Île-de-France\",\"timeZone\":\"+01:00\",\"timeZones\":[\"Europe/Paris\"],\"zipCode\":\"75001\"},\"schema\":{\"description\":\"Complete IP geolocation information response\",\"properties\":{\"asn\":{\"description\":\"Autonomous System Number\",\"example\":\"AS15169\",\"type\":\"string\"},\"asnOrganization\":{\"description\":\"Organization associated with the ASN\",\"example\":\"Google LLC\",\"type\":\"string\"},\"capital\":{\"description\":\"Capital city of the country\",\"example\":\"Washington\",\"type\":\"string\"},\"cityName\":{\"description\":\"City name\",\"example\":\"Mountain View\",\"type\":\"string\"},\"continent\":{\"description\":\"Continent name\",\"example\":\"North America\",\"type\":\"string\"},\"continentCode\":{\"description\":\"Two-letter continent code\",\"example\":\"NA\",\"type\":\"string\"},\"countryCode\":{\"description\":\"ISO 3166-1 alpha-2 country code\",\"example\":\"US\",\"type\":\"string\"},\"countryName\":{\"description\":\"Full country name\",\"example\":\"United States\",\"type\":\"string\"},\"currencies\":{\"description\":\"List of currencies used in the country\",\"items\":{\"properties\":{\"code\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"currency\":{\"description\":\"Currency information for the country\",\"properties\":{\"code\":{\"description\":\"ISO 4217 currency code\",\"example\":\"USD\",\"type\":\"string\"},\"name\":{\"description\":\"Currency name\",\"example\":\"US Dollar\",\"type\":\"string\"}},\"type\":\"object\"},\"ipAddress\":{\"description\":\"The IP address that was looked up\",\"example\":\"8.8.8.8\",\"type\":\"string\"},\"ipVersion\":{\"description\":\"IP version (4 for IPv4, 6 for IPv6)\",\"example\":4,\"type\":\"integer\"},\"isProxy\":{\"description\":\"Whether the IP is detected as a proxy, VPN, or hosting service\",\"example\":false,\"type\":\"boolean\"},\"language\":{\"description\":\"Primary language code\",\"example\":\"en-US\",\"type\":\"string\"},\"languages\":{\"description\":\"List of languages spoken in the country\",\"example\":[\"en\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"example\":37.386,\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"example\":-122.0838,\"format\":\"double\",\"type\":\"number\"},\"phoneCodes\":{\"description\":\"International dialing codes for the country\",\"example\":[\"+1\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"regionCode\":{\"description\":\"Region or state code\",\"example\":\"CA\",\"type\":\"string\"},\"regionName\":{\"description\":\"Region or state name\",\"example\":\"California\",\"type\":\"string\"},\"timeZone\":{\"description\":\"Timezone offset from UTC\",\"example\":\"-08:00\",\"type\":\"string\"},\"timeZones\":{\"description\":\"List of timezone identifiers for the location\",\"example\":[\"America/Los_Angeles\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"tlds\":{\"description\":\"Top-level domains for the country\",\"example\":[\".us\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"zipCode\":{\"description\":\"Postal/ZIP code\",\"example\":\"94043\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with IP geolocation information\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response object\",\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"example\":429,\"type\":\"integer\"},\"error\":{\"description\":\"Indicates an error occurred\",\"example\":true,\"type\":\"boolean\"},\"message\":{\"description\":\"Error message describing what went wrong\",\"example\":\"Rate limit exceeded\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid IP address format\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response object\",\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"example\":429,\"type\":\"integer\"},\"error\":{\"description\":\"Indicates an error occurred\",\"example\":true,\"type\":\"boolean\"},\"message\":{\"description\":\"Error message describing what went wrong\",\"example\":\"Rate limit exceeded\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"IP address not found in database\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response object\",\"properties\":{\"code\":{\"description\":\"HTTP status code\",\"example\":429,\"type\":\"integer\"},\"error\":{\"description\":\"Indicates an error occurred\",\"example\":true,\"type\":\"boolean\"},\"message\":{\"description\":\"Error message describing what went wrong\",\"example\":\"Rate limit exceeded\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded (60 requests per minute)\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/json/{ipAddress}","rename":{"param":{"ipAddress":"id"}},"segments":[{"lit":"api"},{"lit":"json"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"json","name__orig":"json","Name":"Json","name_":"json","name-":"json","NAME":"JSON","index$":1}, {"active":true,"entity":"json","key$":"BasicJsonFlow","kind":"basic","name":"BasicJsonFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"json_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"json_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"json_ref01","srcdatavar":"json_ref01_data","suffix":"_dt0"},"match":{"id":"json01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-json_ref01"}}],"index$":2}]}, 'Json')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const json_ref01_ent = client.Json()
    let json_ref01_data = setup.data.new.json['json_ref01']

    json_ref01_data = (await json_ref01_ent.create(json_ref01_data)).data()
    assert(null != json_ref01_data.id)


    // LIST
    const json_ref01_match: any = {}

    const json_ref01_list = (await json_ref01_ent.list(json_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(json_ref01_list, { id: json_ref01_data.id })))


    // LOAD
    const json_ref01_match_dt0: any = {}
    json_ref01_match_dt0.id = json_ref01_data.id
    const json_ref01_data_dt0 = (await json_ref01_ent.load(json_ref01_match_dt0)).data()
    assert(json_ref01_data_dt0.id === json_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/json/JsonTestData.json')

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
    ['json01','json02','json03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FREE_IP_TEST_JSON_ENTID': idmap,
    'FREE_IP_TEST_LIVE': 'FALSE',
    'FREE_IP_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['FREE_IP_TEST_JSON_ENTID']

  const live = 'TRUE' === env.FREE_IP_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FREE_IP_TEST_JSON_ENTID']
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
  
