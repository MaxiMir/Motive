import { SvgIcon, SvgIconProps } from '@material-ui/core'

export default function CloseIcon(props: SvgIconProps): JSX.Element {
  return (
    <SvgIcon {...props}>
      <path d="M1 1L24 24M24 1L1 24" stroke="#515152" />
    </SvgIcon>
  )
}
