import _ from 'lodash'

export const getClientIp = request => {
  const proxyHeader = 'x-forwarded-for'

  const ip = request.connection.remoteAddress.replace('::ffff:', '')

  const trustedProxies = ['172.17.100.151', '192.168.100.181', '192.168.100.182']

  if (_.indexOf(trustedProxies, ip) >= 0 && _.has(request.headers, proxyHeader)) {
    const proxyList = request.headers[proxyHeader].split(',')
    const clientIp = _.trim(_.last(proxyList))

    if (
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        clientIp
      )
    ) {
      return clientIp
    }
  }

  return ip
}

export default {
  getClientIp,
}
