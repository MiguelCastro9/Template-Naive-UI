import { createApp } from 'vue';
import '@/style.css';
import App from '@/App.vue';
import router from '@/router/router';

import {
  create,
  NLayout,
  NSpace,
  NLayoutSider,
  NMenu,
  NSwitch,
  NIcon
} from 'naive-ui';

const naive = create({
  components: [
    NLayout, 
    NSpace, 
    NLayoutSider, 
    NMenu, 
    NSwitch, 
    NIcon
  ]
});

const app = createApp(App);

app.use(router);
app.use(naive);
app.mount('#app');