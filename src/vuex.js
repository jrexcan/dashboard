import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    user: null,
    roles: null,
    users: null,
    categories:null,
    expenses:null
}

const store = new Vuex.Store({
    state,
    getters:{
        user:(state)=>{
            return state.user
        },
        users:(state)=>{
            return state.users
        },
        roles:(state)=>{
            return state.roles
        },
        categories:(state)=>{
            return state.categories
        },
        expenses:(state)=>{
            return state.expenses
        }

    },
    actions:{
        user(context,user){
            context.commit('user',user)
        },
        users(context,users){
            context.commit('users',users)
        },
        roles(context,roles){
            context.commit('roles',roles)
        },
        categories(context,categories){
            context.commit('categories',categories)
        },
        expenses(context,expenses){
            context.commit('expenses',expenses)
        }

    },
    mutations:{
        user(state,user){
            state.user = user;
        },
        users(state,users){
            state.users = users;
        },
        roles(state,roles){
            state.roles = roles;
        },
        categories(state,categories){
            state.categories = categories;
        },
        expenses(state,expenses){
            state.expenses = expenses;
        }

    }
})

export default store;
