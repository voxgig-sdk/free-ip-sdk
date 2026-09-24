

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"asn":{"a":true,"h":"Asn","n":"asn","r":false,"sh":"Autonomous System Number","t":"`$STRING`","key$":"asn","index$":0},"asnOrganization":{"a":true,"h":"Asn Organization","n":"asnOrganization","r":false,"sh":"Organization associated with the ASN","t":"`$STRING`","key$":"asnOrganization","index$":1},"capital":{"a":true,"h":"Capital","n":"capital","r":false,"sh":"Capital city of the country","t":"`$STRING`","key$":"capital","index$":2},"cityName":{"a":true,"h":"City Name","n":"cityName","r":false,"sh":"City name","t":"`$STRING`","key$":"cityName","index$":3},"code":{"a":true,"h":"Code","n":"code","r":false,"t":"`$STRING`","key$":"code","index$":4},"continent":{"a":true,"h":"Continent","n":"continent","r":false,"sh":"Continent name","t":"`$STRING`","key$":"continent","index$":5},"continentCode":{"a":true,"h":"Continent Code","n":"continentCode","r":false,"sh":"Two-letter continent code","t":"`$STRING`","key$":"continentCode","index$":6},"countryCode":{"a":true,"h":"Country Code","n":"countryCode","r":false,"sh":"ISO 3166-1 alpha-2 country code","t":"`$STRING`","key$":"countryCode","index$":7},"countryName":{"a":true,"h":"Country Name","n":"countryName","r":false,"sh":"Full country name","t":"`$STRING`","key$":"countryName","index$":8},"currencies":{"a":true,"h":"Currencies","n":"currencies","r":false,"sh":"List of currencies used in the country","t":"`$ARRAY`","key$":"currencies","index$":9},"currency":{"a":true,"h":"Currency","n":"currency","r":false,"sh":"Currency information for the country","t":"`$OBJECT`","key$":"currency","index$":10},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":11},"ip":{"a":true,"h":"Ip","n":"ip","r":false,"sh":"IPv4 or IPv6 address to lookup","t":"`$STRING`","key$":"ip","index$":12},"ipAddress":{"a":true,"h":"Ip Address","n":"ipAddress","r":false,"sh":"The IP address that was looked up","t":"`$STRING`","key$":"ipAddress","index$":13},"ipVersion":{"a":true,"h":"Ip Version","n":"ipVersion","r":false,"sh":"IP version (4 for IPv4, 6 for IPv6)","t":"`$INTEGER`","key$":"ipVersion","index$":14},"isProxy":{"a":true,"h":"Is Proxy","n":"isProxy","r":false,"sh":"Whether the IP is detected as a proxy, VPN, or hosting service","t":"`$BOOLEAN`","key$":"isProxy","index$":15},"language":{"a":true,"h":"Language","n":"language","r":false,"sh":"Primary language code","t":"`$STRING`","key$":"language","index$":16},"languages":{"a":true,"h":"Languages","n":"languages","r":false,"sh":"List of languages spoken in the country","t":"`$ARRAY`","key$":"languages","index$":17},"latitude":{"a":true,"fo":"double","h":"Latitude","n":"latitude","r":false,"sh":"Latitude coordinate","t":"`$NUMBER`","key$":"latitude","index$":18},"longitude":{"a":true,"fo":"double","h":"Longitude","n":"longitude","r":false,"sh":"Longitude coordinate","t":"`$NUMBER`","key$":"longitude","index$":19},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":20},"phoneCodes":{"a":true,"h":"Phone Codes","n":"phoneCodes","r":false,"sh":"International dialing codes for the country","t":"`$ARRAY`","key$":"phoneCodes","index$":21},"regionCode":{"a":true,"h":"Region Code","n":"regionCode","r":false,"sh":"Region or state code","t":"`$STRING`","key$":"regionCode","index$":22},"regionName":{"a":true,"h":"Region Name","n":"regionName","r":false,"sh":"Region or state name","t":"`$STRING`","key$":"regionName","index$":23},"timeZone":{"a":true,"h":"Time Zone","n":"timeZone","r":false,"sh":"Timezone offset from UTC","t":"`$STRING`","key$":"timeZone","index$":24},"timeZones":{"a":true,"h":"Time Zones","n":"timeZones","r":false,"sh":"List of timezone identifiers for the location","t":"`$ARRAY`","key$":"timeZones","index$":25},"tlds":{"a":true,"h":"Tlds","n":"tlds","r":false,"sh":"Top-level domains for the country","t":"`$ARRAY`","key$":"tlds","index$":26},"zipCode":{"a":true,"h":"Zip Code","n":"zipCode","r":false,"sh":"Postal/ZIP code","t":"`$STRING`","key$":"zipCode","index$":27}},"id":{"field":"id","name":"id"},"name":"json","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/json","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/json","q":{},"r":{},"s":[{"lit":"api"},{"lit":"json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/json","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/json","q":{},"r":{},"s":[{"lit":"api"},{"lit":"json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/json/{ipAddress}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"193.247.239.168","k":"param","n":"id","or":"ip_address","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/json/{ipAddress}","q":{"exist":["id"]},"r":{"param":{"ipAddress":"id"}},"s":[{"lit":"api"},{"lit":"json"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"json","name__orig":"json","Name":"Json","name_":"json","name-":"json","NAME":"JSON","index$":1}, {"active":true,"entity":"json","key$":"BasicJsonFlow","kind":"basic","name":"BasicJsonFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"json_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"json_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"json_ref01","srcdatavar":"json_ref01_data","suffix":"_dt0"},"m":{"id":"json01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-json_ref01"}}],"index$":2}]}, 'Json', {"POST /api/json":{"protocol":"http","operationId":"postIpInfo","requestBody":{"description":"Optional IP address to lookup","required":false,"content":{"application/json":{"schema":{"type":"object","properties":{"ip":{"type":"string","description":"IPv4 or IPv6 address to lookup","example":"8.8.8.8","key$":"ip"}},"index$":1}}}},"responses":{"200":{"description":"Successful response with IP geolocation information","content":{"application/json":{"schema":{"type":"object","description":"Complete IP geolocation information response","properties":{"ipVersion":{"description":"IP version (4 for IPv4, 6 for IPv6)","example":4,"key$":"ipVersion","type":"integer"},"ipAddress":{"description":"The IP address that was looked up","example":"8.8.8.8","key$":"ipAddress","type":"string"},"latitude":{"description":"Latitude coordinate","example":37.386,"format":"double","key$":"latitude","type":"number"},"longitude":{"description":"Longitude coordinate","example":-122.0838,"format":"double","key$":"longitude","type":"number"},"countryName":{"description":"Full country name","example":"United States","key$":"countryName","type":"string"},"countryCode":{"description":"ISO 3166-1 alpha-2 country code","example":"US","key$":"countryCode","type":"string"},"capital":{"description":"Capital city of the country","example":"Washington","key$":"capital","type":"string"},"phoneCodes":{"description":"International dialing codes for the country","example":["+1"],"items":{"type":"string"},"key$":"phoneCodes","type":"array"},"timeZone":{"description":"Timezone offset from UTC","example":"-08:00","key$":"timeZone","type":"string"},"timeZones":{"description":"List of timezone identifiers for the location","example":["America/Los_Angeles"],"items":{"type":"string"},"key$":"timeZones","type":"array"},"zipCode":{"description":"Postal/ZIP code","example":"94043","key$":"zipCode","type":"string"},"cityName":{"description":"City name","example":"Mountain View","key$":"cityName","type":"string"},"regionName":{"description":"Region or state name","example":"California","key$":"regionName","type":"string"},"regionCode":{"description":"Region or state code","example":"CA","key$":"regionCode","type":"string"},"continent":{"description":"Continent name","example":"North America","key$":"continent","type":"string"},"continentCode":{"description":"Two-letter continent code","example":"NA","key$":"continentCode","type":"string"},"isProxy":{"description":"Whether the IP is detected as a proxy, VPN, or hosting service","example":false,"key$":"isProxy","type":"boolean"},"currency":{"description":"Currency information for the country","key$":"currency","properties":{"code":{"description":"ISO 4217 currency code","example":"USD","type":"string"},"name":{"description":"Currency name","example":"US Dollar","type":"string"}},"type":"object"},"currencies":{"description":"List of currencies used in the country","items":{"properties":{"code":{"type":"string","key$":"code"},"name":{"type":"string","key$":"name"}},"type":"object","index$":0},"key$":"currencies","type":"array"},"language":{"description":"Primary language code","example":"en-US","key$":"language","type":"string"},"languages":{"description":"List of languages spoken in the country","example":["en"],"items":{"type":"string"},"key$":"languages","type":"array"},"asn":{"description":"Autonomous System Number","example":"AS15169","key$":"asn","type":"string"},"asnOrganization":{"description":"Organization associated with the ASN","example":"Google LLC","key$":"asnOrganization","type":"string"},"tlds":{"description":"Top-level domains for the country","example":[".us"],"items":{"type":"string"},"key$":"tlds","type":"array"}},"x-ref":"#/components/schemas/IpGeolocationResponse","index$":0}}}},"400":{"description":"Bad request - invalid IP address format","content":{"application/json":{"schema":{"type":"object","description":"Error response object","properties":{"error":{"type":"boolean","description":"Indicates an error occurred","example":true},"message":{"type":"string","description":"Error message describing what went wrong","example":"Rate limit exceeded"},"code":{"type":"integer","description":"HTTP status code","example":429}},"x-ref":"#/components/schemas/ErrorResponse"}}}},"429":{"description":"Rate limit exceeded (60 requests per minute)","content":{"application/json":{"schema":{"type":"object","description":"Error response object","properties":{"error":{"type":"boolean","description":"Indicates an error occurred","example":true},"message":{"type":"string","description":"Error message describing what went wrong","example":"Rate limit exceeded"},"code":{"type":"integer","description":"HTTP status code","example":429}},"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[],"securitySource":"unspecified"},"GET /api/json":{"protocol":"http","operationId":"getIpInfoCurrent","responses":{"200":{"description":"Successful response with IP geolocation information","content":{"application/json":{"schema":{"type":"object","description":"Complete IP geolocation information response","properties":{"ipVersion":{"description":"IP version (4 for IPv4, 6 for IPv6)","example":4,"key$":"ipVersion","type":"integer"},"ipAddress":{"description":"The IP address that was looked up","example":"8.8.8.8","key$":"ipAddress","type":"string"},"latitude":{"description":"Latitude coordinate","example":37.386,"format":"double","key$":"latitude","type":"number"},"longitude":{"description":"Longitude coordinate","example":-122.0838,"format":"double","key$":"longitude","type":"number"},"countryName":{"description":"Full country name","example":"United States","key$":"countryName","type":"string"},"countryCode":{"description":"ISO 3166-1 alpha-2 country code","example":"US","key$":"countryCode","type":"string"},"capital":{"description":"Capital city of the country","example":"Washington","key$":"capital","type":"string"},"phoneCodes":{"description":"International dialing codes for the country","example":["+1"],"items":{"type":"string"},"key$":"phoneCodes","type":"array"},"timeZone":{"description":"Timezone offset from UTC","example":"-08:00","key$":"timeZone","type":"string"},"timeZones":{"description":"List of timezone identifiers for the location","example":["America/Los_Angeles"],"items":{"type":"string"},"key$":"timeZones","type":"array"},"zipCode":{"description":"Postal/ZIP code","example":"94043","key$":"zipCode","type":"string"},"cityName":{"description":"City name","example":"Mountain View","key$":"cityName","type":"string"},"regionName":{"description":"Region or state name","example":"California","key$":"regionName","type":"string"},"regionCode":{"description":"Region or state code","example":"CA","key$":"regionCode","type":"string"},"continent":{"description":"Continent name","example":"North America","key$":"continent","type":"string"},"continentCode":{"description":"Two-letter continent code","example":"NA","key$":"continentCode","type":"string"},"isProxy":{"description":"Whether the IP is detected as a proxy, VPN, or hosting service","example":false,"key$":"isProxy","type":"boolean"},"currency":{"description":"Currency information for the country","key$":"currency","properties":{"code":{"description":"ISO 4217 currency code","example":"USD","type":"string"},"name":{"description":"Currency name","example":"US Dollar","type":"string"}},"type":"object"},"currencies":{"description":"List of currencies used in the country","items":{"properties":{"code":{"type":"string","key$":"code"},"name":{"type":"string","key$":"name"}},"type":"object","index$":0},"key$":"currencies","type":"array"},"language":{"description":"Primary language code","example":"en-US","key$":"language","type":"string"},"languages":{"description":"List of languages spoken in the country","example":["en"],"items":{"type":"string"},"key$":"languages","type":"array"},"asn":{"description":"Autonomous System Number","example":"AS15169","key$":"asn","type":"string"},"asnOrganization":{"description":"Organization associated with the ASN","example":"Google LLC","key$":"asnOrganization","type":"string"},"tlds":{"description":"Top-level domains for the country","example":[".us"],"items":{"type":"string"},"key$":"tlds","type":"array"}},"x-ref":"#/components/schemas/IpGeolocationResponse"},"example":{"ipVersion":4,"ipAddress":"1.1.1.1","latitude":-37.7,"longitude":145.1833,"countryName":"Australia","countryCode":"AU","timeZone":"+11:00","zipCode":"3000","cityName":"Melbourne","regionName":"Victoria","regionCode":"VIC","continent":"Oceania","continentCode":"OC","isProxy":false,"currency":{"code":"AUD","name":"Australian Dollar"},"language":"en-AU","timeZones":["Australia/Melbourne"],"tlds":[".au"]}}}},"429":{"description":"Rate limit exceeded (60 requests per minute)","content":{"application/json":{"schema":{"type":"object","description":"Error response object","properties":{"error":{"type":"boolean","description":"Indicates an error occurred","example":true},"message":{"type":"string","description":"Error message describing what went wrong","example":"Rate limit exceeded"},"code":{"type":"integer","description":"HTTP status code","example":429}},"x-ref":"#/components/schemas/ErrorResponse"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","description":"Error response object","properties":{"error":{"type":"boolean","description":"Indicates an error occurred","example":true},"message":{"type":"string","description":"Error message describing what went wrong","example":"Rate limit exceeded"},"code":{"type":"integer","description":"HTTP status code","example":429}},"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[],"securitySource":"unspecified"},"GET /api/json/{ipAddress}":{"protocol":"http","operationId":"getIpInfoByAddress","responses":{"200":{"description":"Successful response with IP geolocation information","content":{"application/json":{"schema":{"type":"object","description":"Complete IP geolocation information response","properties":{"ipVersion":{"description":"IP version (4 for IPv4, 6 for IPv6)","example":4,"key$":"ipVersion","type":"integer"},"ipAddress":{"description":"The IP address that was looked up","example":"8.8.8.8","key$":"ipAddress","type":"string"},"latitude":{"description":"Latitude coordinate","example":37.386,"format":"double","key$":"latitude","type":"number"},"longitude":{"description":"Longitude coordinate","example":-122.0838,"format":"double","key$":"longitude","type":"number"},"countryName":{"description":"Full country name","example":"United States","key$":"countryName","type":"string"},"countryCode":{"description":"ISO 3166-1 alpha-2 country code","example":"US","key$":"countryCode","type":"string"},"capital":{"description":"Capital city of the country","example":"Washington","key$":"capital","type":"string"},"phoneCodes":{"description":"International dialing codes for the country","example":["+1"],"items":{"type":"string"},"key$":"phoneCodes","type":"array"},"timeZone":{"description":"Timezone offset from UTC","example":"-08:00","key$":"timeZone","type":"string"},"timeZones":{"description":"List of timezone identifiers for the location","example":["America/Los_Angeles"],"items":{"type":"string"},"key$":"timeZones","type":"array"},"zipCode":{"description":"Postal/ZIP code","example":"94043","key$":"zipCode","type":"string"},"cityName":{"description":"City name","example":"Mountain View","key$":"cityName","type":"string"},"regionName":{"description":"Region or state name","example":"California","key$":"regionName","type":"string"},"regionCode":{"description":"Region or state code","example":"CA","key$":"regionCode","type":"string"},"continent":{"description":"Continent name","example":"North America","key$":"continent","type":"string"},"continentCode":{"description":"Two-letter continent code","example":"NA","key$":"continentCode","type":"string"},"isProxy":{"description":"Whether the IP is detected as a proxy, VPN, or hosting service","example":false,"key$":"isProxy","type":"boolean"},"currency":{"description":"Currency information for the country","key$":"currency","properties":{"code":{"description":"ISO 4217 currency code","example":"USD","type":"string"},"name":{"description":"Currency name","example":"US Dollar","type":"string"}},"type":"object"},"currencies":{"description":"List of currencies used in the country","items":{"properties":{"code":{"type":"string","key$":"code"},"name":{"type":"string","key$":"name"}},"type":"object","index$":0},"key$":"currencies","type":"array"},"language":{"description":"Primary language code","example":"en-US","key$":"language","type":"string"},"languages":{"description":"List of languages spoken in the country","example":["en"],"items":{"type":"string"},"key$":"languages","type":"array"},"asn":{"description":"Autonomous System Number","example":"AS15169","key$":"asn","type":"string"},"asnOrganization":{"description":"Organization associated with the ASN","example":"Google LLC","key$":"asnOrganization","type":"string"},"tlds":{"description":"Top-level domains for the country","example":[".us"],"items":{"type":"string"},"key$":"tlds","type":"array"}},"x-ref":"#/components/schemas/IpGeolocationResponse","index$":0},"example":{"ipVersion":4,"ipAddress":"193.247.239.168","latitude":48.8566,"longitude":2.3522,"countryName":"France","countryCode":"FR","capital":"Paris","phoneCodes":["+33"],"timeZone":"+01:00","zipCode":"75001","cityName":"Paris","regionName":"Île-de-France","regionCode":"IDF","continent":"Europe","continentCode":"EU","isProxy":false,"currency":{"code":"EUR","name":"Euro"},"languages":["fr"],"timeZones":["Europe/Paris"],"asn":"AS12345","asnOrganization":"Example ISP"}}}},"400":{"description":"Bad request - invalid IP address format","content":{"application/json":{"schema":{"type":"object","description":"Error response object","properties":{"error":{"type":"boolean","description":"Indicates an error occurred","example":true},"message":{"type":"string","description":"Error message describing what went wrong","example":"Rate limit exceeded"},"code":{"type":"integer","description":"HTTP status code","example":429}},"x-ref":"#/components/schemas/ErrorResponse"}}}},"404":{"description":"IP address not found in database","content":{"application/json":{"schema":{"type":"object","description":"Error response object","properties":{"error":{"type":"boolean","description":"Indicates an error occurred","example":true},"message":{"type":"string","description":"Error message describing what went wrong","example":"Rate limit exceeded"},"code":{"type":"integer","description":"HTTP status code","example":429}},"x-ref":"#/components/schemas/ErrorResponse"}}}},"429":{"description":"Rate limit exceeded (60 requests per minute)","content":{"application/json":{"schema":{"type":"object","description":"Error response object","properties":{"error":{"type":"boolean","description":"Indicates an error occurred","example":true},"message":{"type":"string","description":"Error message describing what went wrong","example":"Rate limit exceeded"},"code":{"type":"integer","description":"HTTP status code","example":429}},"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"ipAddress","in":"path","required":true,"description":"IPv4 or IPv6 address to lookup","schema":{"type":"string","example":"193.247.239.168"},"index$":0}],"securitySource":"unspecified"}})
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
  
