import { createRouter, createWebHistory } from 'vue-router';
import Homepage from '../features/infomation/HomePage.vue'; 
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Homepage
  },
  {
    path: '/common',
    name: 'common',
    component: () => import('../common/components/commonview.vue')
  },
  {
    path: '/news',
    name: 'NewsList',
    component: () => import('../features/infomation/NewsListPage.vue')
  },
  {
    path: '/document',
    name: 'Document',
    component: () => import('../features/document/DocumentDownloads.vue')
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;