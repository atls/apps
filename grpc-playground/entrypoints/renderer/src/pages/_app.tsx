import { ThemeProvider } from '@atls-ui-parts/theme'
import React             from 'react'

import '../global.css'

const App = ({ Component, pageProps, ...props }) => (
  <ThemeProvider>
    <Component {...pageProps} {...props} />
  </ThemeProvider>
)

export default App
