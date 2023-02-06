export const scrollToElem = (id: string) => {
  return document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export const clickOnElem = (id: string) => document.getElementById(id)?.click()
