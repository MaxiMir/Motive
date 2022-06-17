export default {
  en: {
    getPlaceholder(isQuestion: boolean): string {
      return `Your ${isQuestion ? 'question' : 'answer'}`
    },
    getMessage(isQuestion: boolean): string {
      return `${isQuestion ? 'Question' : 'Answer'} added`
    },
  },
  ru: {
    getPlaceholder(isQuestion: boolean): string {
      return `Ваш ${isQuestion ? 'вопрос' : 'ответ'}`
    },
    getMessage(isQuestion: boolean): string {
      return `${isQuestion ? 'Вопрос' : 'Ответ'} добавлен`
    },
  },
  uk: {
    getPlaceholder(isQuestion: boolean): string {
      return `Ваш ${isQuestion ? 'питання' : 'відповідь'}`
    },
    getMessage(isQuestion: boolean): string {
      return `${isQuestion ? 'Питання' : 'Відповідь'} додано`
    },
  },
}
