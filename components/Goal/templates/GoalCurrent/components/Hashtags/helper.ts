export const getHashtags = (hashtags: string[], isMobile: boolean): string[] =>
  !isMobile ? hashtags : hashtags.slice(0, 2)
