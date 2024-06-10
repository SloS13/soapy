import './bootstrap';

import { createApp } from 'vue';
import Soapy from './components/Soapy.vue';


 
const app = createApp({})
app.component('soapy', Soapy);
app.mount('#app')