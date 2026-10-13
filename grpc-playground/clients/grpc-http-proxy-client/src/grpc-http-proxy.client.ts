import BJSON from 'buffer-json'

const getDefaultUrl = () => {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/api`
  }

  return 'http://localhost:3000/api'
}

export class GrpcHttpProxyClient {
  constructor(private readonly url: string = getDefaultUrl()) {}

  async call<Response = unknown>(
    service: string,
    method: string,
    payload: unknown
  ): Promise<Response> {
    const response = await fetch(`${this.url}/grpc-proxy/${service}/${method}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const result: unknown = BJSON.parse(await response.text())

    return result as Response
  }
}
