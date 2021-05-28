import React             from 'react'
import { Global }        from '@emotion/react'
import { ThemeProvider } from '@atls-ui-proto/theme'

const App = ({ Component, pageProps, ...props }) => (
  <>
    <Global
      styles={{
        '.ace_gutter-layer': {
          background: 'white !important',
        },
      }}
    />
    <ThemeProvider>
      <Component {...pageProps} {...props} />
    </ThemeProvider>
  </>
)

export default App
