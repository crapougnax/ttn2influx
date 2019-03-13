import { influxConfig, measurements } from '../../config'

export const influxWriter = (decoder, devID) => {
  const Influx = require('influx')
  const influx = new Influx.InfluxDB(influxConfig)
  const influxSet = []
  const config = measurements['influx']
  for (const measurement of Object.keys(config)) {
    const configPart = config[measurement]
    const query = {
      measurement: configPart[0] || measurement,
      tags: { device: devID },
      fields: {},
    }
    for (const channel of Object.keys(configPart[1])) {
      query.fields[configPart[1][channel]] = decoder.getChannelData(
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
