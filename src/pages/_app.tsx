import { use, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import { AppProps } from 'next/app'
import { SessionProvider, SignInOptions } from 'next-auth/react'
import { Hydrate, MutationCache, QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import NextNprogress from 'nextjs-progressbar'
import { IntlProvider } from 'react-intl'
import { Locale as FnsLocale } from 'date-fns'
import { createGenerateClassName, StylesProvider } from '@mui/styles'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { PaletteMode } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import CssBaseline from '@mui/material/CssBaseline'
import { ContextSnackbarProps, SnackbarContext } from '@context/snackbarContext'
import { ThemeContext } from '@context/themeContext'
import { ModalSignInContext } from '@features/signin'
import { getLocaleFolder } from '@lib/date'
import { makeMapLoader } from '@helpers/iterable'
import { Locale } from '@features/locale'
import useRemoveServerStyles from '@hooks/useRemoveServerStyles'
import EventSocket from '@components/EventSocket'
import { getDesignTokens } from 'src/shared/theme'

const AppSnackbar = dynamic(() => import('@ui/AppSnackbar'))
const ModalSignIn = dynamic(() => import('@features/signin'))

const generateClassName = createGenerateClassName({ productionPrefix: 'be' })
const langLoader = makeMapLoader<Record<string, string>>()
const dateFnsLangLoader = makeMapLoader<FnsLocale>()

function App({
  Component,
  pageProps: { session, dehydratedState, providers, ...pageProps },
}: AppProps) {
  const { locale } = useRouter()
  const currentLocale = locale || Locale.En
  const localeFolder = getLocaleFolder(currentLocale)
  const messages = use(
    langLoader(currentLocale, () => import(`src/shared/lang/${currentLocale}.json`)),
  )
  const dateFnsLocale = use(
    dateFnsLangLoader(currentLocale, () => import(`date-fns/locale/${localeFolder}/index.js`)),
  )
  const [mode, setMode] = useState<PaletteMode>('dark')
  const [snackbarProps, setSnackbarProps] = useState<ContextSnackbarProps | null>(null)
  const [options, setOptions] = useState<SignInOptions>()
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
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])
  const themeCtx = useMemo(() => ({ mode, setMode }), [mode])
  const modalSignInCtx = useMemo(() => ({ options, providers, setOptions }), [options, providers])
  const snackbarCtx = useMemo(
    () => ({ props: snackbarProps, setProps: setSnackbarProps }),
    [snackbarProps],
  )
  useRemoveServerStyles()

  const onCloseSignIn = () => setOptions(undefined)

  const onCloseSnackbar = () => setSnackbarProps(null)

  return (
    <IntlProvider locale={currentLocale} messages={messages}>
      <SessionProvider session={session} refetchOnWindowFocus>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={dehydratedState}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={dateFnsLocale}>
              <ThemeContext.Provider value={themeCtx}>
                <StylesProvider generateClassName={generateClassName}>
                  <ThemeProvider theme={theme}>
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
                        <NextNprogress color="#b46a5a" />
                        <CssBaseline />
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

export default App
