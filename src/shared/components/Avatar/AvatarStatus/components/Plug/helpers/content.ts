export const getShortName = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
