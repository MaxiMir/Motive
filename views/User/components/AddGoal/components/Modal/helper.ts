export const prepareHashtags = (hashtags: string): string[] =>
  hashtags
    .toLowerCase()
    .split(' ')
    .map((v) => v.replace(/[^a-z\d]/g, ''))
    .filter(Boolean)
