import { ChangeEvent, useRef } from 'react'
import { Button, makeStyles } from '@material-ui/core'
import AppEmoji from 'components/UI/AppEmoji'

export interface PhotoInputProps {
  tmpl: 'input'
  multiple?: boolean
  disabled: boolean
  onSelect: (photos: File[]) => void
}

export default function PhotoInput({ multiple, disabled, onSelect }: PhotoInputProps): JSX.Element {
  const classes = useStyles()
  const photoInputRef = useRef<HTMLInputElement>(null)

  const onAddPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files && onSelect(Array.from(e.target.files))
  }

  const onClick = () => photoInputRef.current?.click()

  return (
    <>
      <Button
        color="secondary"
        variant="outlined"
        className={classes.control}
        title="Load photo"
        aria-label="Load photo"
        disabled={disabled}
        onClick={onClick}
      >
        <AppEmoji name="tape" variant="h1" />
      </Button>
      <input
        ref={photoInputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className={classes.input}
        onChange={onAddPhoto}
      />
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
})
