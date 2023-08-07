export function getShortName(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
}

function getHashOfString(value: string) {
  const hash = Array.from(value).reduce((acc, symbol) => {
    return symbol.charCodeAt(0) + ((acc << 5) - acc)
  }, 0)

  return Math.abs(hash)
}

function normalizeHash(hash: number, min: number, max: number) {
  return Math.floor((hash % (max - min)) + min)
}

type Ranges = [number, number]
type HSL = [number, number, number]

function generateHSL(name: string, saturationRanges: Ranges, lightnessRanges: Ranges): HSL {
  const hash = getHashOfString(name)
  const h = normalizeHash(hash, 0, 360)
  const s = normalizeHash(hash, ...saturationRanges)
  const l = normalizeHash(hash, ...lightnessRanges)

  return [h, s, l]
}

function HSLtoString([h, s, l]: HSL) {
  return `hsl(${h}, ${s}%, ${l}%)`
}

function generateColorHsl(id: string, saturationRanges: Ranges, lightnessRanges: Ranges) {
  return HSLtoString(generateHSL(id, saturationRanges, lightnessRanges))
}

function getRange(value: number, range: number): Ranges {
  return [Math.max(0, value - range), Math.min(value + range, 100)]
}

interface GenerateOptions {
  saturation?: number
  lightness?: number
  range?: number
}

export function generateColorByName(name: string, options: GenerateOptions = {}) {
  const { saturation = 50, lightness = 60, range = 10 } = options
  const saturationRange = getRange(saturation, range)
  const lightnessRange = getRange(lightness, range)

  return generateColorHsl(name, saturationRange, lightnessRange)
}
