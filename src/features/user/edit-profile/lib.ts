import { useIntl } from 'react-intl'

export const useMessages = () => {
  const { formatMessage } = useIntl()

  return {
    title: formatMessage({ id: 'page.user.modal-profile.title' }),
    nameLabel: formatMessage({ id: 'page.user.modal-profile.name' }),
    nicknameLabel: formatMessage({ id: 'common.nickname' }),
    mottoLabel: formatMessage({ id: 'common.motto' }),
    locationLabel: formatMessage({ id: 'common.location' }),
    bioLabel: formatMessage({ id: 'common.bio' }),
    buttonText: formatMessage({ id: 'common.save' }),
    buttonLoading: formatMessage({ id: 'common.saving' }),
  }
}
