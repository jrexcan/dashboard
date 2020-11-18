<template>
    <div>
        <h3>Expense Category</h3>
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
          <span class="headline">Add New Category</span>
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
                  v-model="description"
                  label="Description*"
                  required
                ></v-text-field>
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
            Description
          </th>
          <th class="text-left">
              Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in categories"
          :key="item.id"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
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
    name: 'ExpenseCategory',
    computed:{
      ...mapGetters(['user','categories'])
    },
    data () {
        
      return {
        name:'',
        description:'',
        dialog: false,
        // roles: [roles]
      }
    },
    async created(){
        const response = await axios.get('expense_categories');
        // this.user = response.data;
        this.$store.dispatch('categories', response.data)
    },
    methods:{
        async handleSubmit(){
        await axios.post('expense_categories',{
                name: this.name,
                description: this.description,
            }).then(
                this.$router.push('/expense_categories')
            )
                
        },
        deleteItem(id){
          axios.delete('expense_categories/'+id).then(this.$router.push('/expense_categories'))
        }
    }
  }
</script>

<style>

</style>