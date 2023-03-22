import { createRouter, createWebHistory } from 'vue-router'; 
import IndexPage from '../pages/IndexPage.vue';
import AboutPage from '../pages/AboutPage.vue';
import ServicesPage from '../pages/ServicesPage.vue';
import FoundationPage from '../pages/FoundationPage.vue';

const routes = [
    
    /* { 
        path: '/:pathMatch(.*)*',
        redirect: '/',
        name: 'not-found',
        component: NotFount,
    }, */
    { 
        path: '/', 
        name: 'home',
        component: IndexPage,
    },
    {
        path: '/services',
        name: 'services',
        component: ServicesPage,
    },
    { 
        path: '/about', 
        name: 'about',
        component: AboutPage,
    },
    { 
        path: '/foundation', 
        name: 'foundation',
        component: FoundationPage,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes, 
})

export default router