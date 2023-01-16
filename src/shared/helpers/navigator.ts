export const copyText = (text: string): Promise<void> => {
  return navigator.clipboard.writeText(text)
}
