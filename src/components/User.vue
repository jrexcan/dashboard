<template>
    <div>
        <h3>User</h3>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">

        <v-btn 
      class="float-right"
      fab
      dark
      color="green"
      v-bind="attrs"
    v-on="on"
    >
      <v-icon dark>
        mdi-plus
      </v-icon>
    </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add New User</span>
        </v-card-title>
        <v-form v-model="valid" @submit.prevent="handleSubmit">
        <v-card-text>
          <v-container>
            <v-row>
                
              <v-col cols="12">
                <v-text-field
                  label="Name*"
                  required
                  v-model="name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  label="Email*"
                  required
                  type='email'
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  label="Password*"
                  required
                  type='password'
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="password_confirmation"
                  label="Re-password*"
                  required
                  type='password'
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                :items="roles"
                item-value="id" 
                item-text="name"
                label="Role"
                v-model="role_id"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
            type="submit"
          >
            Save
          </v-btn>
          
        </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    
    
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Email
          </th>
          <th class="text-left">
            Role
          </th>
          <th class="text-left">
            Created At
          </th>
          <th class="text-left">
              Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in users"
          :key="item.id"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.role.name }}</td>
          <td>{{ item.created_at | moment("MMMM Do YYYY")}}</td>
        <td>
            <v-btn
      class="ma-2"
      outlined
      small
      fab
      color="indigo"
    >
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-btn
      class="ma-2"
      outlined
      small
      fab
      color="red"
      @click="deleteItem(item.id)"
    >
      <v-icon >mdi-delete</v-icon>
    </v-btn>
        </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
    </div>

</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
  export default {
    name: 'User',
    computed:{
      ...mapGetters(['user','roles','users'])
    },
    data () {
        
      return {
        name:'',
        email:'',
        password:'',
        password_confirmation:'',
        role_id:'',
        dialog: false,
      }
    },
    async created(){
        const response = await axios.get('users');
        this.$store.dispatch('users', response.data)

        const response_roles = await axios.get('roles');
        this.$store.dispatch('roles', response_roles.data)

    },
    methods:{
        async handleSubmit(){
        await axios.post('users',{
                name: this.name,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation,
                role_id: this.role_id
            }).then(
                this.$router.push('/users')
            )
                
        },
        deleteItem(id){
          axios.delete('users/'+id).then(this.$router.push('/users'))
        }
    }
  }
</script>

<style>

</style>