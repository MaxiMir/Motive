import { useCallback, useEffect, useRef, useState } from 'react'
import { useIntl } from 'react-intl'

interface UseSpeechRecognition {
  running: boolean
  interim: string
  final: string
  onClick: () => void
  onStop: () => void
}

export function useSpeechRecognition(): UseSpeechRecognition {
  const recognitionRef = useRef<SpeechRecognition>()
  const { locale } = useIntl()
  const [interim, setInterim] = useState('')
  const [final, setFinal] = useState('')
  const [running, setRunning] = useState(false)

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.lang = locale
    recognitionRef.current.continuous = true
    recognitionRef.current.interimResults = true
    recognitionRef.current.onend = () => setRunning(false)
    recognitionRef.current.onresult = (event) => {
      const results = Array.from(event.results)
      const finalResult = results.find((r) => r.isFinal)?.[0]?.transcript || ''
      const interimResult = Array.from(event.results)
        .map((result) => result[0]?.transcript || '')
        .join('')

      setInterim(interimResult)
      setFinal(finalResult)
    }
  }, [locale])

  const onStart = () => {
    recognitionRef.current?.start()
    setInterim('')
    setFinal('')
    setRunning(true)
  }

  const onStop = useCallback(() => {
    recognitionRef.current?.abort()
    setRunning(false)
  }, [])

  const onClick = () => {
    const nextCallback = running ? onStop : onStart

    nextCallback()
  }

  return { running, interim, final, onClick, onStop }
}
