export function scrollToElem(selector: string) {
  return document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
}
