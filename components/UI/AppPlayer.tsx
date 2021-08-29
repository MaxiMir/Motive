import ReactPlayer, { ReactPlayerProps } from 'react-player/lazy'

export default function AppPlayer({ url, ...restProps }: ReactPlayerProps): JSX.Element {
  return <ReactPlayer url={url} width="100%" height="100%" pip controls {...restProps} />
}
