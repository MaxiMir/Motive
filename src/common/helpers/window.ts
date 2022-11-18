export const scrollToElem = (id: string): void => {
  return document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export const clickOnElem = (id: string): void => {
  return document.getElementById(id)?.click()
}

/**
 * Handler for copying text to the clipboard
 */
export const copyHandler = async (
  text: string,
  onSuccess: () => void,
  onError: (err: unknown) => void,
): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text)
    onSuccess()
  } catch (err) {
    onError(err)
  }
}

export type Device = 'mobile' | 'tablet' | 'desktop'

export const getDeviceType = (): Device => {
  const { userAgent: ua } = navigator

  switch (true) {
    case /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua):
      return 'tablet'
    case /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua):
      return 'mobile'
    default:
      return 'desktop'
  }
}
