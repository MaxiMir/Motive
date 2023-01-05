import { Children } from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import produce from 'immer'
import { ServerStyleSheets } from '@mui/styles'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="UTF-8" />
          {/* PWA */}
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/apple-icon.png" />
          <meta name="theme-color" content="#000000" />
          <meta
            name="google-site-verification"
            content="agmCksft6b7nOz-CbmrjAcflYLb5ztxWLN6o9vFImak"
          />
          <link rel="icon" type="image/x-icon" href="/favicon.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          />
          <meta
            httpEquiv="Content-Security-Policy"
            content={`
              default-src * self blob: data: gap:;
              style-src * self 'unsafe-inline' blob: data: gap:;
              script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:;
              object-src * 'self' blob: data: gap:;
              img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:;
              frame-src * self blob: data: gap:;
            `}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets()

  const initialProps = await Document.getInitialProps(
    produce(ctx, (draft) => {
      draft.renderPage = () =>
        ctx.renderPage({
          enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
        })
    }),
  )

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...Children.toArray(initialProps.styles), sheets.getStyleElement()],
  }
}
