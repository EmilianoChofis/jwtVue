import Vue from 'vue'
import VueRouter from 'vue-router'
import {jwtDecode} from "jwt-decode";
import Login from "@/views/Login.vue";

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    /*{
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },*/
    {
      path: '/',
      name: '',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin.vue'),
      meta: {role:'admin'}
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import('../views/Editor.vue'),
        meta: {role:'editor'}
    },
    {
      path: '/viewer',
      name: 'viewer',
      component: () => import('../views/Viewer.vue'),
      meta: {role:'viewer'}
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('../views/Unauthorized.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

/*export const router = new VueRouter({
  routes
})*/

router.beforeEach((to, from, next) => {
  const publicPages = ['/login','/', '/unauthorized'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  if(loggedIn){
    const decoded = jwtDecode(loggedIn);
    const role = decoded.role;
    //si la ruta tiene un rol y el rol no es el mismo que el del usuario
    if(to.meta.role && to.meta.role !== role){
      return next('/unauthorized');
    }
  }
})

export default router