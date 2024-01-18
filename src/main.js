import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import { QuillEditor } from '@vueup/vue-quill';

createApp(App).use(store).use(router).mount('#app')
