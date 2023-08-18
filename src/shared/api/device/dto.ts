export interface Device {
  type?:
    | 'desktop'
    | 'tablet'
    | 'smartphone'
    | 'feature phone'
    | 'phablet'
    | 'console'
    | 'tv'
    | 'car browser'
    | 'smart display'
    | 'camera'
    | 'portable media player'
    | 'smart speaker'
    | 'wearable'
    | 'peripheral'
  browser?: string
}
