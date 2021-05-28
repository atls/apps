import BJSON from 'buffer-json'

const getDefaultUrl = () => {
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    return window.location.origin
  }

  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    if (window.location.origin.includes('.local.')) {
      return `${window.location.origin}/api`
    }

    return window.location.origin
  }

  return 'http://localhost:3000/api'
}

export class GrpcHttpProxyClient {
  constructor(private readonly url: string = getDefaultUrl()) {}

  async call(service: string, method: string, payload) {
    const response = await fetch(`${this.url}/grpc-proxy/${service}/${method}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    return BJSON.parse(await response.text())
  }
}
