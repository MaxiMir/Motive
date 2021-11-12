export const scrollToElem = (id: string): void => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
