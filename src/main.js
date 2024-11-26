import { createApp } from 'vue';
import App from './App.vue';
import router from '../src/router/index.js';

// Vue uygulamasını oluşturma ve router'ı kullanma
createApp(App)
    .use(router) // .use(router) ifadesi burada olmalı
    .mount('#app'); // .mount('#app') son satır olmalı
