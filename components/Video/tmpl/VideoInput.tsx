import { ChangeEvent, useRef } from 'react'
import { Button, Chip, makeStyles } from '@material-ui/core'
import AppEmoji from 'components/UI/AppEmoji'

export interface VideoInputProps {
  tmpl: 'input'
  disabled: boolean
  onSelect: (video: File) => void
}

export default function VideoInput({ disabled, onSelect }: VideoInputProps): JSX.Element {
  const classes = useStyles()
  const videoInputRef = useRef<HTMLInputElement>(null)

  const onAddVideo = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files?.[0] && onSelect(e.target.files?.[0])
  }

  const onClick = () => videoInputRef.current?.click()

  return (
    <>
      <Button
        color="secondary"
        variant="outlined"
        className={classes.control}
        title="load video"
        aria-label="load video"
        disabled={disabled}
        onClick={onClick}
      >
        <AppEmoji name="cassette" variant="h1" />
        <Chip label="Soon" size="small" className={classes.soon} />
      </Button>
      <input ref={videoInputRef} type="file" accept=".mov,.mp4" className={classes.input} onChange={onAddVideo} />
    </>
  )
}

const useStyles = makeStyles({
  input: {
    display: 'none',
  },
  control: {
    position: 'relative',
    width: 80,
    height: 80,
  },
  soon: {
    position: 'absolute',
    top: -12,
    right: 12,
    borderColor: 'rgba(255, 167, 38, 0.7)',
    color: 'rgb(255, 167, 38)',
  },
})
