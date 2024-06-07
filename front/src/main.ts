import './assets/main.scss';

import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate'

import App from './App.vue';
import router from './router';

const app = createApp(App);


const pinia = createPinia();

pinia.use(({store})=>{
    store.router = markRaw(router);
});

pinia.use(createPersistedState());

app.use(pinia);
app.use(router);

app.mount('#app');


