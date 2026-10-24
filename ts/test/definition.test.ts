import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "ip_geolocation",
    "accessor": "IpGeolocation",
    "op": "load",
    "method": "GET",
    "path": "/api/xml/{ipAddress}",
    "args": [
      {
        "name": "ip_address",
        "wire": "ipAddress",
        "value": "1.1.1.1"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/xml"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "ip_geolocation",
    "accessor": "IpGeolocation",
    "op": "load",
    "method": "GET",
    "path": "/api/xml",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/xml"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "json",
    "accessor": "Json",
    "op": "create",
    "method": "POST",
    "path": "/api/json",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "ipVersion": 4,
      "ipAddress": "8.8.8.8",
      "latitude": 37.386,
      "longitude": -122.0838,
      "countryName": "United States",
      "countryCode": "US",
      "capital": "Washington",
      "phoneCodes": [
        "+1"
      ],
      "timeZone": "-08:00",
      "timeZones": [
        "America/Los_Angeles"
      ],
      "zipCode": "94043",
      "cityName": "Mountain View",
      "regionName": "California",
      "regionCode": "CA",
      "continent": "North America",
      "continentCode": "NA",
      "isProxy": false,
      "currency": {
        "code": "USD",
        "name": "US Dollar"
      },
      "currencies": [
        {
          "code": "x",
          "name": "x"
        }
      ],
      "language": "en-US",
      "languages": [
        "en"
      ],
      "asn": "AS15169",
      "asnOrganization": "Google LLC",
      "tlds": [
        ".us"
      ]
    },
    "idField": "id"
  },
  {
    "entity": "json",
    "accessor": "Json",
    "op": "list",
    "method": "GET",
    "path": "/api/json",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "ipVersion": 4,
      "ipAddress": "1.1.1.1",
      "latitude": -37.7,
      "longitude": 145.1833,
      "countryName": "Australia",
      "countryCode": "AU",
      "timeZone": "+11:00",
      "zipCode": "3000",
      "cityName": "Melbourne",
      "regionName": "Victoria",
      "regionCode": "VIC",
      "continent": "Oceania",
      "continentCode": "OC",
      "isProxy": false,
      "currency": {
        "code": "AUD",
        "name": "Australian Dollar"
      },
      "language": "en-AU",
      "timeZones": [
        "Australia/Melbourne"
      ],
      "tlds": [
        ".au"
      ]
    },
    "idField": "id"
  },
  {
    "entity": "json",
    "accessor": "Json",
    "op": "load",
    "method": "GET",
    "path": "/api/json/{ipAddress}",
    "args": [
      {
        "name": "id",
        "wire": "ipAddress",
        "value": "193.247.239.168"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "ipVersion": 4,
      "ipAddress": "193.247.239.168",
      "latitude": 48.8566,
      "longitude": 2.3522,
      "countryName": "France",
      "countryCode": "FR",
      "capital": "Paris",
      "phoneCodes": [
        "+33"
      ],
      "timeZone": "+01:00",
      "zipCode": "75001",
      "cityName": "Paris",
      "regionName": "Île-de-France",
      "regionCode": "IDF",
      "continent": "Europe",
      "continentCode": "EU",
      "isProxy": false,
      "currency": {
        "code": "EUR",
        "name": "Euro"
      },
      "languages": [
        "fr"
      ],
      "timeZones": [
        "Europe/Paris"
      ],
      "asn": "AS12345",
      "asnOrganization": "Example ISP"
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
