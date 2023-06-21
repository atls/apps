import { ThemeProvider } from '@atls-ui-proto/theme'
import { Global }        from '@emotion/react'

import React             from 'react'

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
