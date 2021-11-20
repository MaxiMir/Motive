import AppMenuButton from 'components/UI/AppMenuButton'

export default function Menu(): JSX.Element {
  return (
    <>
      <AppMenuButton ariaControls="message-menu" title="open message menu" onClick={(e) => console.log(e)} />
    </>
  )
}
