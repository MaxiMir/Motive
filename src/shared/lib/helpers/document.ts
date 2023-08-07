export function scrollToElem(id: string) {
  return document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function clickOnElem(id: string) {
  return document.getElementById(id)?.click()
}
