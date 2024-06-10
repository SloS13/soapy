<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const convo = ref("Summarize the following text into a medical SOAP:");
const working = ref(false);
const ai_response = ref(false);

function generateSoap() {
  working.value = true;
  //do an axios post
//   axios({
//     method: "post",
//     url: "/simple",
//     timeout: 8000, // Let's say you want to wait at least 8 seconds
//     data: {
//       firstName: "Fred",
//       lastName: "Flintstone",
//     },
//   })
//     .then(function (response) {
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });

  axios
    .post(
      `/simple`,
      {
        convo: convo.value,
      },
      { timeout: 60000 }
    )
    .then((response) => {
      ai_response.value = response.data;
      working.value = false;
    });
}
</script>
 
<template>
  <div>
    Put your text here:
    <textarea cols="100" rows="25" v-model="convo"></textarea>
    <br />
    <button @click="generateSoap()">Generate SOAP</button>

    <div v-if="working">Working...Please Wait</div>

    <div v-if="ai_response">
      <pre>{{ ai_response.choices[0].message.content }}</pre>
    </div>
  </div>
</template>