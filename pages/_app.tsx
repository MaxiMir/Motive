import { useState, useMemo, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { AppProps } from 'next/app'
import { SessionProvider, SignInOptions } from 'next-auth/react'
import { Hydrate, MutationCache, QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import NextNprogress from 'nextjs-progressbar'
import { StylesProvider, createGenerateClassName } from '@mui/styles'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { PaletteMode, useMediaQuery } from '@mui/material'
import { LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { getDesignTokens } from 'theme'
import CssBaseline from '@mui/material/CssBaseline'
import { ContextSnackbarProps, SnackbarContext } from 'context/snackbarContext'
import { ThemeContext } from 'context/themeContext'
import { ModalSignInContext } from 'context/modalSignInContext'

const generateClassName = createGenerateClassName({
  productionPrefix: 'b',
})

const AppSnackbar = dynamic(() => import('components/UI/AppSnackbar'))
const Modal = dynamic(() => import('components/Modal'))

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps): JSX.Element {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  console.log(`prefersDarkMode: ${prefersDarkMode}`) // TODO REMOVE
  const [mode, setMode] = useState<PaletteMode>('dark') // TODO change prefersDarkMode
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
  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  const toggle = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'))

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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeContext.Provider value={{ mode, toggle }}>
              <StylesProvider generateClassName={generateClassName}>
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
              </StylesProvider>
            </ThemeContext.Provider>
          </LocalizationProvider>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  )
}
