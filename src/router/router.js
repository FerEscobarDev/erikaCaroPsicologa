import { createRouter, createWebHistory } from 'vue-router'; 
import IndexPage from '../pages/IndexPage.vue';
import AboutPage from '../pages/AboutPage.vue';
import ServicesPage from '../pages/ServicesPage.vue';
import FoundationPage from '../pages/FoundationPage.vue';

const routes = [
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
    /* { Pagina Not Fount
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFount,
    }, */
]

const router = createRouter({
    history: createWebHistory(),
    routes, 
})

export default router