
import { data } from 'ttn'
import { config } from '../config/config'
import { measurements } from '../config/measurement'

const Influx = require('influx')

data(config.ttn.appID, config.ttn.accessKey)
  .then(function (client) {

    const influx = new Influx.InfluxDB(config.influx)

    client.on("uplink", function (devID, payload) {
      console.log("Received uplink from ", devID)
      const data = Decoder(payload.payload_raw)
      const influxSet = []
      for (const measurement of Object.keys(measurements)) {
        const query = {
          measurement: measurement,
          tags: { device: devID },
          fields: {},
        }
        for (const measureKey of Object.keys(data)) {
          const parts = measureKey.split('_')
          if (parts[0] == measurements[measurement]) {
            query.fields[parts[1]] = data[measureKey]
          }
        }
        influxSet.push(query)
      }

      influx.writePoints(influxSet).catch(err => {
        console.error(`Error saving data to InfluxDB! ${err.stack}`)
      })
    })
  })
  .catch(function (err) {
    console.error(err)
    process.exit(1)
  })

  function Decoder(bytes) {
    var sTemp = (((bytes[2] << 8) | bytes[3]) ).toFixed(2)
    var sHumi = bytes[6].toFixed(2)
    var aTemp = (((bytes[9] << 8) | bytes[10]) ).toFixed(2)
    var aHumi = bytes[13].toFixed(2)
    var voltage = (((bytes[16] << 8) | bytes[17]) ).toFixed(2)

    return {
      temp_soil : (sTemp/10),
      humi_soil: (sHumi/2),
      temp_air : (aTemp/10),
      humi_air: (aHumi/2),
      meta_voltage: (voltage/100)
    }
  }