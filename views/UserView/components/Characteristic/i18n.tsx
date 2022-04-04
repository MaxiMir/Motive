import AppEmoji from 'components/UI/AppEmoji'

export default {
  en: {
    motivation: (
      <>
        Motivation points are given for: <br />
        • goal completion <br />
        • every <AppEmoji name="motivation" onlyEmoji /> put on your goal
      </>
    ),
    creativity: (
      <>
        Creativity points are given for: <br />
        • every <AppEmoji name="creativity" onlyEmoji /> put on your goal
      </>
    ),
    support: (
      <>
        Support points are given for: <br />
        • each <AppEmoji name="support" onlyEmoji /> put on your message in discussion
      </>
    ),
    abandoned: (
      <>
        Goals were eaten up by Old Pitt <AppEmoji name="pitt" onlyEmoji />
      </>
    ),
    completed: undefined,
    followers: undefined,
  },
  ru: {
    motivation: (
      <>
        Очки мотивации даются за: <br />
        • выполнение целей <br />
        • каждый <AppEmoji name="motivation" onlyEmoji /> поставленный Вашей цели
      </>
    ),
    creativity: (
      <>
        Очки креативности даются за: <br />
        • каждый <AppEmoji name="creativity" onlyEmoji /> поставленный Вашей цели
      </>
    ),
    support: (
      <>
        Очки поддержки даются за: <br />
        • каждый <AppEmoji name="support" onlyEmoji /> поставленный вашему сообщению в обсуждении
      </>
    ),
    abandoned: (
      <>
        Cъеденных Стариной Питтом целей <AppEmoji name="pitt" onlyEmoji />
      </>
    ),
    completed: undefined,
    followers: undefined,
  },
}
