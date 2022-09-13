export interface Story {
  id: number
  url: string
  title: string
  started: string
  end: string
}

export interface SlideProps {
  story: Story
}

export default function Slide({ story }: SlideProps) {
  return <>{story.title}</>
}
