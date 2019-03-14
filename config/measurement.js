export const measurements = {
  influx: {
    temperature: {
      key: 'temperature',
      channels: { 1: 'soil', 3: 'air' },
    },
    humidity: {
      key: 'humidity',
      channels: { 2: 'soil', 4: 'air' },
    },
    // voltage: 'volt',
  },
}
