<template>
  <div class="app">
    <h1 class="text-center text-4xl font-black italic mb-8">Soapy!</h1>
    <div v-if="!isSupported">
      Your browser does not support SpeechRecognition API,
      <a href="https://caniuse.com/mdn-api_speechrecognition" target="_blank"
        >more details</a
      >
    </div>
    <div v-else>
      <div class="flex flex-row w-full m-1 p-1">
        <div class="basis-5/12 text-left">
          <div class="rounded-lg bg-gray-200 p-2">
            <h2 class="text-3xl font-bold">Listening Area</h2>
            <textarea v-model="result" class="w-full min-h-96"></textarea>
          </div>
        </div>
        <div class="basis-2/12 text-center">
          <div v-if="!isListening" >
            <button @click="start" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"><span v-if="result">Continue</span><span v-else>Start</span></button>
          </div>
          <div v-if="isListening"  >
            <button class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-2" @click="stop">Stop</button>
          </div>
          <div v-if="!isListening && result">
            <button  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2" @click="generateSoap">Generate SOAP</button>
          </div>
          
          <div>
            
            <button @click="soap_mode = !soap_mode" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
              <span v-if="soap_mode">SOAP MODE</span>
              <span v-else>Conversation Mode</span>
            </button>
          </div>
          


          <div v-if="aiWorking" class="text-center">Doing AI...&nbsp;</div>
          <div v-if="isListening" class="text-center">Listening...&nbsp;</div>
          <div v-if="!isListening && !aiWorking" class="text-center">Idle...</div>
        </div>
        <div class="basis-5/12 text-left">
          <div class="rounded-lg bg-gray-200 p-2">
            <h2 class="text-xl font-bold">Result</h2>
            <textarea v-model="ai_response" class="w-full min-h-96"></textarea>
          </div>
        </div>
      </div>

     
     
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useSpeechRecognition } from "../useSpeechRecognition";
export default {
  name: "App",
  setup() {
    const soap = ref({});
    const sstWorking = ref(false);
    const aiWorking = ref(false);
    const ai_response = ref("");
    const soap_mode = ref(true);

    //  Calling the composable and passing a parameter
    const { isListening, isSupported, stop, result, start, error } =
      useSpeechRecognition({
        lang: "en-US",
        continuous: true,
        interimResults: true,
      });
    

    

    //do a function to send data via axios
    function generateSoap() {
      aiWorking.value = true;

      let convoToSend = "";
      if (soap_mode.value) {
        convoToSend = "Convert the following text into a medical SOAP: " + result;
      } else {
        convoToSend = result;
      }

      //do an axios post
      axios
        .post(
          `/simple`,
          {
            convo: convoToSend,
          },
          { timeout: 120000 }
        )
        .then((response) => {
          ai_response.value = response.data.choices[0].message.content;
          aiWorking.value = false;
        });
    }
    
    return {
      soap,
      sstWorking,
      aiWorking,
      ai_response,
      soap_mode,
      generateSoap,
      isListening,
      isSupported,
      stop,
      result,
      start,
      error,
    };
  },
};
</script>

<style>
</style>

