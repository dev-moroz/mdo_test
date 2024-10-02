import Vue from 'vue';
import Router from 'vue-router';
import Home from '../pages/HomePage.vue';
import Login from '../pages/LoginPage.vue';
import isAuthenticated from './checkAuth'

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (!isAuthenticated() && to.path !== '/login') {
        next({ path: '/login' });
    } else {
        next();
    }
});

export default router;
