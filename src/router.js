import Vue from 'vue';
import Router from 'vue-router';
import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'
import Role from './components/Role.vue'
import User from './components/User.vue'
import ExpenseCategory from './components/ExpenseCategory.vue'
import Expenses from './components/Expenses.vue'

Vue.use(Router)

export default new Router({
    mode:'history',
    routes:[
        {
            path: '/',
            component: Login
        },
        {
            path: '/dashboard',
            component: Dashboard
        },
        {
            path: '/roles',
            component: Role
        },
        {
            path: '/users',
            component: User
        },
        {
            path: '/expense_categories',
            component: ExpenseCategory
        },
        {
            path: '/expenses',
            component: Expenses
        },

    ]
})