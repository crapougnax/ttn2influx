export const config = {
  ttn: {
    appID: 'some-app-id',
    accessKey: 'some-ttn-account-access-key',
  },
  influx: {
    host: '',
    protocol: 'https',
    options: {
      // not sure which one is/are required for self-signed cert
      insecure: true,
      rejectUnauthorized: false,
      strictSSL: false,
    },
    username: '',
    password: '',
    database: '',
  },
}
