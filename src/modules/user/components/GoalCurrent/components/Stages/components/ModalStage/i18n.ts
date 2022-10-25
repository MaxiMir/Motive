export default {
  en: {
    title: 'Completion stage',
    behind: 'Excellent! One stage behind!',
    button: 'Complete',
    buttonLoading: 'Completing',
    message: 'The stage for the next day has been successfully set',
    getNextTitle(isFinal: boolean): string {
      return `${isFinal ? 'Final' : 'Next'} stage is`
    },
  },
  ru: {
    title: 'Завершение этапа',
    behind: 'Превосходно! Один этап позади!',
    button: 'Завершить',
    buttonLoading: 'Завершаю',
    message: 'Этап для следующего дня успешно установлен',
    getNextTitle(isFinal: boolean): string {
      return `${isFinal ? 'Заключительный' : 'Следующий'} этап`
    },
  },
  uk: {
    title: 'Завершення етапу',
    behind: 'Чудово! Один етап позаду!',
    button: 'Завершити',
    buttonLoading: 'Завершаю',
    message: 'Етап для наступного дня успішно встановлений',
    getNextTitle(isFinal: boolean): string {
      return `${isFinal ? 'Прикінцевий' : 'Наступний'} етап`
    },
  },
}
