import AppBox from 'components/UI/AppBox'

export default function Level(): JSX.Element {
  return (
    <AppBox
      component="sup"
      display={undefined}
      sx={{ marginLeft: '2px', fontSize: '0.625rem', color: 'text.disabled' }}
    >
      lvl
    </AppBox>
  )
}
