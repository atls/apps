module.exports = {
  experimental: {
    externalDir: true,
    swcFileReading: false,
    workerThreads: true,
    esmExternals: 'loose',
  },
  webpack: (config) => {
    // eslint-disable-next-line
    config.resolve.alias['@emotion/react'] = require.resolve('@emotion/react')
    // eslint-disable-next-line
    config.resolve.alias['@emotion/styled'] = require.resolve('@emotion/styled')
    // eslint-disable-next-line
    config.resolve.alias['react-router'] = require.resolve('react-router')

    if (!config.resolve.fallback) {
      // eslint-disable-next-line
      config.resolve.fallback = {}
    }

    // eslint-disable-next-line
    config.resolve.fallback.events = require.resolve('events/')

    return config
  },
}
