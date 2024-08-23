import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Applications from '@/views/Applications.vue';

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/', name: 'Applications', component: Applications, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', redirect: '/login' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware для проверки авторизации
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;


