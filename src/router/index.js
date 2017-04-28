import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
import Login from '@/components/Login';
import Todolist from '@/components/Todolist';
import Register from '@/components/Register';

const router = new Router({
    mode: 'history',
    base: __dirname,
    routes: [{
            path: '/',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/todolist',
            component: Todolist
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});
router.beforeEach((to, from, next) => {
    const token = sessionStorage.getItem('demo-token');
    if (to.path === '/') {
        if (token != null) {
            next('/todolist');
        }
        next();
    } else {
        if (token != null) {
            Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token; // 全局添加token验证
            next();
        } else {
            next('/');
        }
    }
});
export default router;