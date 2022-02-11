import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { AppProps } from 'next/app'
import DateFnsUtils from '@date-io/date-fns'
import { Hydrate, MutationCache, QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import NextNprogress from 'nextjs-progressbar'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ContextSnackbarProps, SnackbarContext } from 'context/snackbarContext'
import theme from 'theme'

const AppSnackbar = dynamic(() => import('components/UI/AppSnackbar'))

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [snackbarProps, setSnackbarProps] = useState<ContextSnackbarProps | null>(null)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError() {
            setSnackbarProps({ message: 'Something went wrong...', severity: 'error' })
          },
        }),
        mutationCache: new MutationCache({
          onError() {
            setSnackbarProps({ message: 'Something went wrong...', severity: 'error' })
          },
        }),
      }),
  )

  const onClose = () => setSnackbarProps(null)

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')

    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={theme}>
            <NextNprogress color="#b46a5a" />
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <SnackbarContext.Provider value={{ props: snackbarProps, setProps: setSnackbarProps }}>
              <Component {...pageProps} />
            </SnackbarContext.Provider>
            {snackbarProps && <AppSnackbar {...snackbarProps} onClose={onClose} />}
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}
