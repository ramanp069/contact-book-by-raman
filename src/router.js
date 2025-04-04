import { createRouter, createWebHistory } from 'vue-router';
import ContactList from './pages/ContactList.vue';
import ContactCreate from './pages/ContactCreate.vue';
import ContactEdit from './pages/ContactEdit.vue';
import ContactProfile from './pages/ContactProfile.vue';

const routes = [
    { path: '/', name: 'HomePage', component: ContactList },
    { path: '/create', name: 'CreateEntry', component: ContactCreate },
    { path: '/edit/:contactId', name: 'ModifyEntry', component: ContactEdit },
    { path: '/profile/:contactId', name: 'ViewEntry', component: ContactProfile },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
