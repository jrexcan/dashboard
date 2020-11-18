<template>
  <v-app>
  <v-navigation-drawer app 
  v-if="user" 
  v-model="drawer"
  
  permanent
  clipped >
    <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img :src="userLogo"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>{{user.name}}</v-list-item-title>

        <!-- <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn> -->
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <router-link to="/dashboard">
        <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
        </router-link>
        <v-list-group
          :value="true"
          no-action
          sub-group
          v-if="user.role_id == 1"
        >
          <template v-slot:activator>
            <v-list-item-icon>
            <v-icon>mdi-account-multiple-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>User Management</v-list-item-title>
            </v-list-item-content>
          </template>

          <router-link to="/roles">
          <v-list-item link>
            
            <v-list-item-title >Roles</v-list-item-title>
            
          </v-list-item>
          </router-link>
          <router-link to="/users">
          <v-list-item link>
            <v-list-item-title >Users</v-list-item-title>
          </v-list-item>
           </router-link>
        </v-list-group>

        <!-- expense -->
        <v-list-group
          :value="true"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon>mdi-square-inc-cash</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Expenses Management</v-list-item-title>
            </v-list-item-content>
          </template>

          <router-link to="/expense_categories">
          <v-list-item link>
            
            <v-list-item-title >Expense Categories</v-list-item-title>
            
          </v-list-item>
          </router-link>
          <router-link to="/expenses">
          <v-list-item link>
            <v-list-item-title >Expenses</v-list-item-title>
          </v-list-item>
           </router-link>
        </v-list-group>
      </v-list>
  </v-navigation-drawer>

  <v-app-bar app v-if="user" clipped-left>
    <!-- -->
    <v-toolbar>
      <!-- <v-toolbar-title>
        <v-img :src="userLogo" width="40" ></v-img>
      </v-toolbar-title> -->
      <v-toolbar-items>
        <v-btn text>Welcome to Expense Manager</v-btn>
        <v-btn text @click="logoutHandler">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-main>

    <!-- Provides the application the proper gutter -->
    <v-container fluid :class="user?'':'fill-height'" >

      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
  </v-main>

  <v-footer app>
    <!-- -->
  </v-footer>
</v-app>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
export default {
  name: 'App',
  computed:{
      ...mapGetters(['user'])
    },
  data () {
      return {
        userLogo: require('./assets/user.png'),
        drawer: true,
        mini: true,
      }
    },
    methods:{
      logoutHandler(){
          localStorage.removeItem('token');
          this.$store.dispatch('user',null)
            this.$router.push('/')
        }
    },
    async created(){
        const response = await axios.get('user');

        // this.user = response.data;
        this.$store.dispatch('user', response.data)
    }
}
</script>

<style>
.v-toolbar__content, .v-toolbar__extension{
  padding: 0 !important;
}
</style>
