import { data } from 'ttn'
import { LPPDecoder } from '../../CayenneLPP-Node'
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

// function _Decoder(bytes) {
//   var sTemp = ((bytes[2] << 8) | bytes[3]).toFixed(2)
//   var sHumi = bytes[6].toFixed(2)
//   var aTemp = ((bytes[9] << 8) | bytes[10]).toFixed(2)
//   var aHumi = bytes[13].toFixed(2)
//   var voltage1 = ((bytes[16] << 8) | bytes[17]).toFixed(2)
//   var voltage2 = ((bytes[20] << 8) | bytes[21]).toFixed(2)

//   return {
//     temp_soil: sTemp / 10,
//     humi_soil: sHumi / 2,
//     temp_air: aTemp / 10,
//     humi_air: aHumi / 2,
//     volt_lipo: voltage1 / 100,
//     volt_sola: voltage2 / 100,
//   }
// }
