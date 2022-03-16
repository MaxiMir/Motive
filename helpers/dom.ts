export const scrollToElem = (id: string): void => {
  return document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export const clickOnElem = (id: string): void => {
  return document.getElementById(id)?.click()
}
