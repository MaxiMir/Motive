import AppMenuButton from 'components/UI/AppMenuButton'

export default function Menu(): JSX.Element {
  return (
    <>
      <AppMenuButton
        color="primary"
        ariaControls="message-menu"
        title="open message menu"
        compact
        onClick={(e) => console.log(e)}
      />
    </>
  )
}
