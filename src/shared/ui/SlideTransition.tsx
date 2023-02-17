import { Slide, SlideProps } from '@mui/material'
import { forwardRef, Ref } from 'react'

const Transition = forwardRef(function Transition(props: SlideProps, ref: Ref<unknown>) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default Transition
