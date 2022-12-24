interface GenerateOptions {
  saturation?: number
  lightness?: number
  range?: number
}

type Ranges = [number, number]
type HSL = [number, number, number]
type GenerateHSL = (name: string, saturationRanges: Ranges, lightnessRanges: Ranges) => HSL
type NormalizeHash = (hash: number, min: number, max: number) => number
type GenerateColorHsl = (id: string, saturationRanges: Ranges, lightnessRanges: Ranges) => string
type GetRange = (value: number, range: number) => Ranges
type GenerateColorByName = (name: string, options?: GenerateOptions) => string

const getHashOfString = (value: string) => {
  const hash = Array.from(value).reduce((acc, symbol) => {
    return symbol.charCodeAt(0) + ((acc << 5) - acc)
  }, 0)

  return Math.abs(hash)
}

const normalizeHash: NormalizeHash = (hash, min, max) => {
  return Math.floor((hash % (max - min)) + min)
}

const generateHSL: GenerateHSL = (name, saturationRanges, lightnessRanges) => {
  const hash = getHashOfString(name)
  const h = normalizeHash(hash, 0, 360)
  const s = normalizeHash(hash, ...saturationRanges)
  const l = normalizeHash(hash, ...lightnessRanges)

  return [h, s, l]
}

const HSLtoString = ([h, s, l]: HSL) => `hsl(${h}, ${s}%, ${l}%)`

const generateColorHsl: GenerateColorHsl = (id, saturationRanges, lightnessRanges) => {
  return HSLtoString(generateHSL(id, saturationRanges, lightnessRanges))
}

const getRange: GetRange = (value: number, range: number): Ranges => {
  return [Math.max(0, value - range), Math.min(value + range, 100)]
}

export const generateColorByName: GenerateColorByName = (name, options = {}) => {
  const { saturation = 50, lightness = 60, range = 10 } = options
  const saturationRange = getRange(saturation, range)
  const lightnessRange = getRange(lightness, range)

  return generateColorHsl(name, saturationRange, lightnessRange)
}
