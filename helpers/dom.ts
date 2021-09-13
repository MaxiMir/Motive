export const scrollToElem = (selector: string): void =>
  document.getElementById(selector)?.scrollIntoView({ behavior: 'smooth' })
