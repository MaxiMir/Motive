import ReactPlayer, { ReactPlayerProps } from 'react-player/lazy'

function Player({ url, ...restProps }: ReactPlayerProps) {
  return <ReactPlayer url={url} width="100%" height="100%" pip controls {...restProps} />
}

export default Player
