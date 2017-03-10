import Nes from 'nes'
const wsURL = 'ws://localhost:8080'

const createWsConnection = (connectOptions = {}, clientOptions = {}) => new Promise((resolve, reject) => {
  const client = new Nes.Client(wsURL, clientOptions)
  client.connect(connectOptions, (err) => err ? reject(err) : resolve(client))
})

export default createWsConnection
