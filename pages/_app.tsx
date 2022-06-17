import { useState, useMemo, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { AppProps } from 'next/app'
import { SessionProvider, SignInOptions } from 'next-auth/react'
import { Hydrate, MutationCache, QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import NextNprogress from 'nextjs-progressbar'
import { StylesProvider, createGenerateClassName } from '@mui/styles'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { PaletteMode, useMediaQuery } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import CssBaseline from '@mui/material/CssBaseline'
import { getDesignTokens } from 'theme'
import { ContextSnackbarProps, SnackbarContext } from 'context/snackbarContext'
import { ThemeContext } from 'context/themeContext'
import { ModalSignInContext } from 'context/modalSignInContext'
import { getFnsLocale } from 'helpers/date'
import useLocale from 'hooks/useLocale'
import Event from 'components/Event'

const AppSnackbar = dynamic(() => import('components/UI/AppSnackbar'))
const ModalSignIn = dynamic(() => import('components/Modal/ModalSignIn'))

const generateClassName = createGenerateClassName({ productionPrefix: 'be' })

const i18n = {
  en: {
    error: 'Sorry, something went wrong...',
  },
  ru: {
    error: 'Что-то пошло не так...',
  },
  uk: {
    error: 'Щось пішло не так...',
  },
}

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { dehydratedState, providers } = pageProps
  const { locale } = useLocale()
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  console.log('@ prefersDarkMode:', prefersDarkMode)
  const [mode, setMode] = useState<PaletteMode>('dark')
  const [snackbarProps, setSnackbarProps] = useState<ContextSnackbarProps | null>(null)
  const [options, setOptions] = useState<SignInOptions>()
  const fnsLocale = getFnsLocale(locale)
  const { error } = i18n[locale]
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError() {
            setSnackbarProps({ message: error, severity: 'error' })
          },
        }),
        mutationCache: new MutationCache({
          onError() {
            setSnackbarProps({ message: error, severity: 'error' })
          },
        }),
      }),
  )
  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])
  const themeCtx = useMemo(() => ({ mode, setMode }), [mode])
  const modalSignInCtx = useMemo(() => ({ options, providers, setOptions }), [options, providers])
  const snackbarCtx = useMemo(() => ({ props: snackbarProps, setProps: setSnackbarProps }), [snackbarProps])

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
        <Hydrate state={dehydratedState}>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={fnsLocale}>
            <ThemeContext.Provider value={themeCtx}>
              <StylesProvider generateClassName={generateClassName}>
                <ThemeProvider theme={theme}>
                  <NextNprogress color="#b46a5a" />
                  {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                  <CssBaseline />
                  <ModalSignInContext.Provider value={modalSignInCtx}>
                    <SnackbarContext.Provider value={snackbarCtx}>
                      <Component {...pageProps} />
                      <Event />
                    </SnackbarContext.Provider>
                  </ModalSignInContext.Provider>
                  {snackbarProps && <AppSnackbar {...snackbarProps} onClose={onCloseSnackbar} />}
                  {options && <ModalSignIn options={options} onClose={onCloseSignIn} />}
                </ThemeProvider>
              </StylesProvider>
            </ThemeContext.Provider>
          </LocalizationProvider>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  )
}
