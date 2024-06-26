import { createRouter, createWebHistory } from 'vue-router';
import adminGuard from './guards/admin.guard';
import customerGuard from './guards/customer.guard';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'auth',
      component: (() => import('../modules/auth/views/AuthView.vue')),
      children: [
        {
          path: '',
          name: 'sign-in',
          component: (()=>import('../modules/auth/views/SignInView.vue'))
        },

        {
          path: 'sign-up',
          name: 'sign-up',
          component: (()=>import('../modules/auth/views/SignUpView.vue'))
        }
      ]
    },

    {
      path: '/dashboard-admin',
      name: 'dashboard-admin',
      component: (()=>import('../modules/dashboard_admin/views/DashboardAdminView.vue')),
      beforeEnter:[adminGuard]
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: (()=>import('../modules/dashboard_user/views/DashboardView.vue')),
      beforeEnter:[customerGuard]
    },

  ]
})

export default router
