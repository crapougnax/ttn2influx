import { influxConfig, measurements } from '../../config'

export const influxWriter = (decoder, devID) => {
  console.log(decoder)
  const Influx = require('influx')
  const influx = new Influx.InfluxDB(influxConfig)
  const influxSet = []
  const config = measurements['influx']
  for (const measurement of Object.keys(config)) {
    const configPart = config[measurement]
    const query = {
      measurement: configPart.key || measurement,
      tags: { device: devID },
      fields: {},
    }
    for (const channel of Object.keys(configPart.channels)) {
      query.fields[configPart.channels[channel]] = decoder.getChannelData(
        channel,
        measurement
      )
    }
    console.log(query)
    influxSet.push(query)
  }

  influx.writePoints(influxSet).catch((err) => {
    console.error(`Error saving data to InfluxDB! ${err.stack}`)
  })
}
