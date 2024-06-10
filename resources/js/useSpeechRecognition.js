import { ref,watch,shallowRef,unref } from 'vue'

export function useSpeechRecognition({lang,continuous,interimResults}) {
    const isListening = ref(false)
    const isFinal = ref(false)
    const result = ref('')
    const error = shallowRef(undefined)


    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    // Checks if the browser supports the API
    const isSupported = Boolean(SpeechRecognition)
    // The speech recognition constructor
    const recognition = SpeechRecognition? new SpeechRecognition() : false
  
    const toggle = (value = isListening.value) => {
      isListening.value = value
    }
  
    const start = () => {
      isListening.value = true
    }
  
    const stop = () => {
      isListening.value = false
    }

 
    if (isSupported) {
      recognition.continuous = continuous
      recognition.interimResults = interimResults
      recognition.lang = unref(lang)
  
      recognition.onstart = () => {
        isFinal.value = false
      }
  
  
      recognition.onresult = (event) => {
        // raw words that the user spoke
        const transcript = Array.from(event.results)
          .map((result) => {
            isFinal.value = result.isFinal
            return result[0]
          })
          .map(result => result.transcript)
          .join('')
  
        result.value = transcript
        error.value = undefined
      }

 
  
      recognition.onerror = (event) => {
        error.value = 'Speech recognition error detected: ' + event.error
      }
  
      recognition.onend = () => {
        isListening.value = false
      }
  
      watch(isListening, () => {
        if (isListening.value)
        // Starting the speech recognition
          recognition.start()
        else
        // stopping the recognition
          recognition.stop()
      })
    }
  
   
  
    return {
      isSupported,
      isListening,
      isFinal,
      recognition,
      result,
      error,
      toggle,
      start,
      stop,
    }
  }