import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import Template1 from '@/components/template1.vue';
import Template2 from '@/components/template2.vue';
import Template3 from '@/components/template3.vue';

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/template1', component: Template1 },
  { path: '/template2', component: Template2 },
  { path: '/template3', component: Template3 }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;