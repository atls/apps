const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')

module.exports = createVanillaExtractPlugin({
  unstable_turbopack: { mode: 'on' },
})({
  transpilePackages: [
    '@atls-ui/theme',
    '@atls-ui-parts/button',
    '@atls-ui-parts/condition',
    '@atls-ui-parts/input',
    '@atls-ui-parts/layout',
    '@atls-ui-parts/text',
    '@atls-ui-parts/theme',
    '@grpc-playground/data-registry',
    '@grpc-playground/editor-fragment',
    '@grpc-playground/grpc-http-proxy-client',
    '@grpc-playground/index-page',
    '@grpc-playground/proto-registry',
    '@grpc-playground/sidebar-fragment',
    '@grpc-playground/tabs-fragment',
  ],
})
