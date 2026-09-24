

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"ip_geolocation","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/xml/{ipAddress}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"1.1.1.1","k":"param","n":"ip_address","or":"ip_address","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/xml/{ipAddress}","q":{"exist":["ip_address"]},"r":{"param":{"ipAddress":"ip_address"}},"s":[{"lit":"api"},{"lit":"xml"},{"var":"ip_address"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/xml","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/xml","q":{},"r":{},"s":[{"lit":"api"},{"lit":"xml"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"ip_geolocation","name__orig":"ip_geolocation","Name":"IpGeolocation","name_":"ip_geolocation","name-":"ip-geolocation","NAME":"IP_GEOLOCATION","index$":0}, {"active":true,"entity":"ip_geolocation","key$":"BasicIpGeolocationFlow","kind":"basic","name":"BasicIpGeolocationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"ip_geolocation_ref01","srcdatavar":"ip_geolocation_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-ip_geolocation_ref01"}}],"index$":0}]}, 'IpGeolocation', {"GET /api/xml/{ipAddress}":{"protocol":"http","operationId":"getIpInfoByAddressXml","responses":{"200":{"description":"Successful response with IP geolocation information in XML format","content":{"application/xml":{"schema":{"type":"object","description":"Complete IP geolocation information response","properties":{"ipVersion":{"description":"IP version (4 for IPv4, 6 for IPv6)","example":4,"key$":"ipVersion","type":"integer"},"ipAddress":{"description":"The IP address that was looked up","example":"8.8.8.8","key$":"ipAddress","type":"string"},"latitude":{"description":"Latitude coordinate","example":37.386,"format":"double","key$":"latitude","type":"number"},"longitude":{"description":"Longitude coordinate","example":-122.0838,"format":"double","key$":"longitude","type":"number"},"countryName":{"description":"Full country name","example":"United States","key$":"countryName","type":"string"},"countryCode":{"description":"ISO 3166-1 alpha-2 country code","example":"US","key$":"countryCode","type":"string"},"capital":{"description":"Capital city of the country","example":"Washington","key$":"capital","type":"string"},"phoneCodes":{"description":"International dialing codes for the country","example":["+1"],"items":{"type":"string"},"key$":"phoneCodes","type":"array"},"timeZone":{"description":"Timezone offset from UTC","example":"-08:00","key$":"timeZone","type":"string"},"timeZones":{"description":"List of timezone identifiers for the location","example":["America/Los_Angeles"],"items":{"type":"string"},"key$":"timeZones","type":"array"},"zipCode":{"description":"Postal/ZIP code","example":"94043","key$":"zipCode","type":"string"},"cityName":{"description":"City name","example":"Mountain View","key$":"cityName","type":"string"},"regionName":{"description":"Region or state name","example":"California","key$":"regionName","type":"string"},"regionCode":{"description":"Region or state code","example":"CA","key$":"regionCode","type":"string"},"continent":{"description":"Continent name","example":"North America","key$":"continent","type":"string"},"continentCode":{"description":"Two-letter continent code","example":"NA","key$":"continentCode","type":"string"},"isProxy":{"description":"Whether the IP is detected as a proxy, VPN, or hosting service","example":false,"key$":"isProxy","type":"boolean"},"currency":{"description":"Currency information for the country","key$":"currency","properties":{"code":{"description":"ISO 4217 currency code","example":"USD","type":"string"},"name":{"description":"Currency name","example":"US Dollar","type":"string"}},"type":"object"},"currencies":{"description":"List of currencies used in the country","items":{"properties":{"code":{"type":"string","key$":"code"},"name":{"type":"string","key$":"name"}},"type":"object","index$":0},"key$":"currencies","type":"array"},"language":{"description":"Primary language code","example":"en-US","key$":"language","type":"string"},"languages":{"description":"List of languages spoken in the country","example":["en"],"items":{"type":"string"},"key$":"languages","type":"array"},"asn":{"description":"Autonomous System Number","example":"AS15169","key$":"asn","type":"string"},"asnOrganization":{"description":"Organization associated with the ASN","example":"Google LLC","key$":"asnOrganization","type":"string"},"tlds":{"description":"Top-level domains for the country","example":[".us"],"items":{"type":"string"},"key$":"tlds","type":"array"}},"x-ref":"#/components/schemas/IpGeolocationResponse"}}}},"400":{"description":"Bad request - invalid IP address format","content":{"application/xml":{"schema":{"type":"object","description":"Error response object","properties":{"error":{"type":"boolean","description":"Indicates an error occurred","example":true},"message":{"type":"string","description":"Error message describing what went wrong","example":"Rate limit exceeded"},"code":{"type":"integer","description":"HTTP status code","example":429}},"x-ref":"#/components/schemas/ErrorResponse"}}}},"429":{"description":"Rate limit exceeded (60 requests per minute)","content":{"application/xml":{"schema":{"type":"object","description":"Error response object","properties":{"error":{"type":"boolean","description":"Indicates an error occurred","example":true},"message":{"type":"string","description":"Error message describing what went wrong","example":"Rate limit exceeded"},"code":{"type":"integer","description":"HTTP status code","example":429}},"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"ipAddress","in":"path","required":true,"description":"IPv4 or IPv6 address to lookup","schema":{"type":"string","example":"1.1.1.1"},"index$":0}],"securitySource":"unspecified"},"GET /api/xml":{"protocol":"http","operationId":"getIpInfoCurrentXml","responses":{"200":{"description":"Successful response with IP geolocation information in XML format","content":{"application/xml":{"schema":{"type":"object","description":"Complete IP geolocation information response","properties":{"ipVersion":{"description":"IP version (4 for IPv4, 6 for IPv6)","example":4,"key$":"ipVersion","type":"integer"},"ipAddress":{"description":"The IP address that was looked up","example":"8.8.8.8","key$":"ipAddress","type":"string"},"latitude":{"description":"Latitude coordinate","example":37.386,"format":"double","key$":"latitude","type":"number"},"longitude":{"description":"Longitude coordinate","example":-122.0838,"format":"double","key$":"longitude","type":"number"},"countryName":{"description":"Full country name","example":"United States","key$":"countryName","type":"string"},"countryCode":{"description":"ISO 3166-1 alpha-2 country code","example":"US","key$":"countryCode","type":"string"},"capital":{"description":"Capital city of the country","example":"Washington","key$":"capital","type":"string"},"phoneCodes":{"description":"International dialing codes for the country","example":["+1"],"items":{"type":"string"},"key$":"phoneCodes","type":"array"},"timeZone":{"description":"Timezone offset from UTC","example":"-08:00","key$":"timeZone","type":"string"},"timeZones":{"description":"List of timezone identifiers for the location","example":["America/Los_Angeles"],"items":{"type":"string"},"key$":"timeZones","type":"array"},"zipCode":{"description":"Postal/ZIP code","example":"94043","key$":"zipCode","type":"string"},"cityName":{"description":"City name","example":"Mountain View","key$":"cityName","type":"string"},"regionName":{"description":"Region or state name","example":"California","key$":"regionName","type":"string"},"regionCode":{"description":"Region or state code","example":"CA","key$":"regionCode","type":"string"},"continent":{"description":"Continent name","example":"North America","key$":"continent","type":"string"},"continentCode":{"description":"Two-letter continent code","example":"NA","key$":"continentCode","type":"string"},"isProxy":{"description":"Whether the IP is detected as a proxy, VPN, or hosting service","example":false,"key$":"isProxy","type":"boolean"},"currency":{"description":"Currency information for the country","key$":"currency","properties":{"code":{"description":"ISO 4217 currency code","example":"USD","type":"string"},"name":{"description":"Currency name","example":"US Dollar","type":"string"}},"type":"object"},"currencies":{"description":"List of currencies used in the country","items":{"properties":{"code":{"type":"string","key$":"code"},"name":{"type":"string","key$":"name"}},"type":"object","index$":0},"key$":"currencies","type":"array"},"language":{"description":"Primary language code","example":"en-US","key$":"language","type":"string"},"languages":{"description":"List of languages spoken in the country","example":["en"],"items":{"type":"string"},"key$":"languages","type":"array"},"asn":{"description":"Autonomous System Number","example":"AS15169","key$":"asn","type":"string"},"asnOrganization":{"description":"Organization associated with the ASN","example":"Google LLC","key$":"asnOrganization","type":"string"},"tlds":{"description":"Top-level domains for the country","example":[".us"],"items":{"type":"string"},"key$":"tlds","type":"array"}},"x-ref":"#/components/schemas/IpGeolocationResponse"}}}},"429":{"description":"Rate limit exceeded (60 requests per minute)","content":{"application/xml":{"schema":{"type":"object","description":"Error response object","properties":{"error":{"type":"boolean","description":"Indicates an error occurred","example":true},"message":{"type":"string","description":"Error message describing what went wrong","example":"Rate limit exceeded"},"code":{"type":"integer","description":"HTTP status code","example":429}},"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[],"securitySource":"unspecified"}})
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
  
