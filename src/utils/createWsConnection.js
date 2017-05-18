import Nes from 'nes'
const wsURL = 'localhost:8080'//'wss://smartmirror.localtunnel.me'//

const createWsConnection = (connectOptions = {}, clientOptions = {}) => new Promise((resolve, reject) => {
  const client = new Nes.Client(wsURL, clientOptions)
  client.connect(connectOptions, (err) => err ? reject(err) : resolve(client))
})

export default createWsConnection
