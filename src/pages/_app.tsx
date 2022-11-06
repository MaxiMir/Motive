import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import { AppProps } from 'next/app'
import { SessionProvider, SignInOptions } from 'next-auth/react'
import { Hydrate, MutationCache, QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import NextNprogress from 'nextjs-progressbar'
import { IntlProvider } from 'react-intl'
import { createGenerateClassName, StylesProvider } from '@mui/styles'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { PaletteMode, useMediaQuery } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import CssBaseline from '@mui/material/CssBaseline'
import { getDesignTokens } from 'src/common/theme'
import { ContextSnackbarProps, SnackbarContext } from '@context/snackbarContext'
import { Locale } from '@hooks/useSetLocale'
import { ThemeContext } from '@context/themeContext'
import { ModalSignInContext } from '@context/modalSignInContext'
import { getFnsLocale } from '@utils/date'
import EventSocket from '@components/Event/EventSocket'
import en from 'src/common/lang/en.json'
import ru from 'src/common/lang/ru.json'
import uk from 'src/common/lang/uk.json'

const AppSnackbar = dynamic(() => import('@ui/AppSnackbar'))
const ModalSignIn = dynamic(() => import('@components/Modal/ModalSignIn'))

type MessageKey = keyof typeof en
const MESSAGES: Record<Locale, Record<MessageKey, string>> = { en, ru, uk }

const generateClassName = createGenerateClassName({ productionPrefix: 'be' })

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { locale } = useRouter()
  const currentLocale = (locale || Locale.En) as Locale
  const { dehydratedState, providers } = pageProps
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [mode, setMode] = useState<PaletteMode>('dark')
  const [snackbarProps, setSnackbarProps] = useState<ContextSnackbarProps | null>(null)
  const [options, setOptions] = useState<SignInOptions>()
  const fnsLocale = getFnsLocale(currentLocale)
  const messages = MESSAGES[currentLocale]
  const error = messages['common.error']
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: true,
          },
        },
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
    <IntlProvider locale={currentLocale} messages={messages}>
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
                        <Script
                          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
                          strategy="afterInteractive"
                        />
                        <Script id="google-analytics" strategy="afterInteractive">
                          {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){window.dataLayer.push(arguments);}
                            gtag('js', new Date());

                            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
                          `}
                        </Script>
                        <Component {...pageProps} />
                      </SnackbarContext.Provider>
                    </ModalSignInContext.Provider>
                    <EventSocket />
                    {snackbarProps && <AppSnackbar {...snackbarProps} onClose={onCloseSnackbar} />}
                    {options && <ModalSignIn options={options} onClose={onCloseSignIn} />}
                  </ThemeProvider>
                </StylesProvider>
              </ThemeContext.Provider>
            </LocalizationProvider>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </IntlProvider>
  )
}
