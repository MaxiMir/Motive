export default function Head() {
  return (
    <>
      <meta charSet="UTF-8" />
      {/* PWA */}
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/apple-icon.png" />
      <meta name="theme-color" content="#000000" />
      <meta name="google-site-verification" content="agmCksft6b7nOz-CbmrjAcflYLb5ztxWLN6o9vFImak" />
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
    </>
  )
}
