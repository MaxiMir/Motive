import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { AppProps } from 'next/app'
import { SessionProvider, SignInOptions } from 'next-auth/react'
import DateFnsUtils from '@date-io/date-fns'
import { Hydrate, MutationCache, QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import NextNprogress from 'nextjs-progressbar'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ContextSnackbarProps, SnackbarContext } from 'context/snackbarContext'
import { ModalSignInContext } from 'context/modalSignInContext'
import theme from 'theme'

const AppSnackbar = dynamic(() => import('components/UI/AppSnackbar'))
const Modal = dynamic(() => import('components/Modal'))

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps): JSX.Element {
  const [snackbarProps, setSnackbarProps] = useState<ContextSnackbarProps | null>(null)
  const [options, setOptions] = useState<SignInOptions>()
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

  const onCloseSignIn = () => setOptions(undefined)

  const onCloseSnackbar = () => setSnackbarProps(null)

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')

    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <SessionProvider session={session} refetchOnWindowFocus>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ThemeProvider theme={theme}>
              <NextNprogress color="#b46a5a" />
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <ModalSignInContext.Provider value={{ options, providers: pageProps.providers, setOptions }}>
                <SnackbarContext.Provider value={{ props: snackbarProps, setProps: setSnackbarProps }}>
                  <Component {...pageProps} />
                </SnackbarContext.Provider>
              </ModalSignInContext.Provider>
              {snackbarProps && <AppSnackbar {...snackbarProps} onClose={onCloseSnackbar} />}
              {options && <Modal tmpl="signIn" options={options} onClose={onCloseSignIn} />}
            </ThemeProvider>
          </MuiPickersUtilsProvider>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  )
}
