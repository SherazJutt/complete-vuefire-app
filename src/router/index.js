import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '../layout/MainLayout.vue';
import AdminLayout from '../layout/AdminLayout.vue';
import { getCurrentUser } from 'vuefire';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'Auth',
      redirect: { name: 'Login' },
      children: [
        { path: '/auth/login', name: 'Login', component: () => import('../pages/auth/Login.vue') },
        { path: '/auth/sign-up', name: 'SignUp', component: () => import('../pages/auth/SignUp.vue') },
      ],
    },

    {
      path: '/',
      component: MainLayout,
      children: [{ path: '', name: 'Homepage', component: () => import('../pages/index.vue') }],
    },
    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true },
      children: [
        { path: '', name: 'Admin', component: () => import('../pages/admin/index.vue') },
        { path: '/submissions', name: 'Submissions', component: () => import('../pages/admin/submissions.vue') },
        { path: '/stores', name: 'Stores', component: () => import('../pages/admin/stores.vue') },
        { path: '/attorneys', name: 'Attorneys', component: () => import('../pages/admin/attorneys.vue') },
        { path: '/customers', name: 'Customers', component: () => import('../pages/admin/customers.vue') },
      ],
    },

    { path: '/:catchAll(.*)*', name: '404', component: () => import('../pages/404.vue') },
  ],
});

router.beforeEach(async (to) => {
  // routes with `meta: { requiresAuth: true }` will check for
  // the users, others won't
  if (to.meta.requiresAuth) {
    const currentUser = await getCurrentUser();
    // if the user is not logged in, redirect to the login page
    if (!currentUser) {
      return {
        path: '/auth/login',
      };
    }
  }
});

export default router;
