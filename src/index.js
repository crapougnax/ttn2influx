import { data } from 'ttn'
import { LPPDecoder } from '@crapougnax/cayennelpp'
import { ttnConfig } from '../config'
import { influxWriter } from './writers'

data(ttnConfig.appID, ttnConfig.accessKey)
  .then((client) => {
    console.log(Date.now(), 'Connected to TTN MQTT server')
    const decoder = new LPPDecoder()
    client.on('uplink', (devID, payload) => {
      console.log(Date.now(), 'Received uplink from ', devID)
      decoder.decode(payload.payload_raw)
      influxWriter(decoder, devID)
    })
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
