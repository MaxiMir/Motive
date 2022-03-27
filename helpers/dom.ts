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
