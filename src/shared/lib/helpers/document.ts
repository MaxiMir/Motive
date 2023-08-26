export function scrollToElem(id: string) {
  return document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
