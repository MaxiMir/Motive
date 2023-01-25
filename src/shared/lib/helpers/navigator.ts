export const copyText = (text: string): Promise<void> => {
  return navigator.clipboard.writeText(text)
}

export const share = (href: string, title: string, onNotSupported: () => void): Promise<void> => {
  if (!navigator.canShare) {
    return Promise.resolve().then(onNotSupported)
  }

  const url = process.env.NEXT_PUBLIC_APP_URL + href

  return navigator.share({ url, title }).catch(() => undefined) // then for AbortError: Abort due to cancellation of share.
}
