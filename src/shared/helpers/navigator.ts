export const copyText = (text: string): Promise<void> => {
  return navigator.clipboard.writeText(text)
}

export type Device = 'mobile' | 'tablet' | 'desktop'

export const getDevice = (): Device => {
  const { userAgent: ua } = navigator

  switch (true) {
    case /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua):
      return 'tablet'
    case /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua,
    ):
      return 'mobile'
    default:
      return 'desktop'
  }
}
