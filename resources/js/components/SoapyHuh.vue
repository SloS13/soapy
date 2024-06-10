<script setup>
import { ref } from "vue";
import { useSpeechRecognition } from "../useSpeechRecognition";
import axios from "axios";
import {isListening, isSupported, stop, result, start, error} from useSpeechRecognition({
  lang: "en-US",
  continuous: true,
  interimResults: true,
});

    const soap = ref({});
    const sstWorking = ref(false);
    const aiWorking = ref(false);
    const ai_response = ref(false);
    const soap_mode = ref(true);

       

    //do a function to send data via axios
    function generateSoap() {
      aiWorking.value = true;
      //do an axios post
      axios
        .post(
          `/simple`,
          {
            convo: "Convert the following text into a medical SOAP: " + result,
          },
          { timeout: 60000 }
        )
        .then((response) => {
          ai_response.value = response.data.choices[0].message.content;
          aiWorking.value = false;
        });
    }

</script>
 
<template>
  <div class="app">
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
            <h2 class="text-xl font-bold">Listening Area</h2>
            <textarea v-model="result" class="w-full min-h-96"></textarea>
            <button @click="soap = 'SOAP'">Set SOAP</button>
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
            sm:{{ soap_mode }}
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