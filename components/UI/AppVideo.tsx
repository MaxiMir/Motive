import AppPlayer from 'components/UI/AppPlayer'

interface AppVideoProps {
  video: string
  className?: string
}

export default function AppVideo({ video, className }: AppVideoProps) {
  return <AppPlayer url={video} width="100%" height="auto" className={className} />
}
