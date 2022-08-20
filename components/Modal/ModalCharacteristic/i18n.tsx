import AppDecorEmoji from 'components/ui/AppDecorEmoji'

export default {
  en: {
    motivation: {
      header: 'Motivation points are given for:',
      list: [
        'Goal completion',
        <>
          Every <AppDecorEmoji name="motivation" /> put on your goal
        </>,
      ],
    },
    creativity: {
      header: 'Creativity points are given for:',
      list: [
        <>
          Every <AppDecorEmoji name="creativity" /> put on your goal
        </>,
      ],
    },
    support: {
      header: 'Support points are given for:',
      list: [
        <>
          Each <AppDecorEmoji name="support" /> put on your message in discussion
        </>,
      ],
    },
    abandoned: (
      <>
        Goals were eaten up by Old Pitt <AppDecorEmoji name="pitt" />
      </>
    ),
  },
  ru: {
    motivation: {
      header: 'Очки мотивации даются за:',
      list: [
        'Выполнение целей',
        <>
          Каждый <AppDecorEmoji name="motivation" /> поставленный Вашей цели
        </>,
      ],
    },
    creativity: {
      header: 'Очки креативности даются за:',
      list: [
        <>
          Каждый <AppDecorEmoji name="creativity" /> поставленный Вашей цели
        </>,
      ],
    },
    support: {
      header: 'Очки поддержки даются за:',
      list: [
        <>
          Каждый <AppDecorEmoji name="support" /> поставленный вашему сообщению в обсуждении
        </>,
      ],
    },
    abandoned: (
      <>
        Cъеденных Стариной Питтом целей <AppDecorEmoji name="pitt" />
      </>
    ),
  },
  uk: {
    motivation: {
      header: 'Окуляри мотивації даються за:',
      list: [
        'Виконання цілей',
        <>
          Кожен <AppDecorEmoji name="motivation" /> поставлений Вашої мети
        </>,
      ],
    },
    creativity: {
      header: 'Окуляри креативності даються за:',
      list: [
        <>
          Кожен <AppDecorEmoji name="creativity" /> поставлений Вашої мети
        </>,
      ],
    },
    support: {
      header: 'Окуляри підтримки даються за:',
      list: [
        <>
          Кожен <AppDecorEmoji name="support" /> поставлений вашому повідомленню в обговоренні
        </>,
      ],
    },
    abandoned: (
      <>
        З&#39;їдених Стариною Піттом цілей <AppDecorEmoji name="pitt" />
      </>
    ),
  },
}
