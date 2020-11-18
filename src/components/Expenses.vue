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
          <span class="headline">Add New Expenses</span>
        </v-card-title>
        <v-form v-model="valid" @submit.prevent="handleSubmit">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                :items="categories"
                item-value="id" 
                item-text="name"
                label="Expense Category"
                v-model="category"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="amount"
                  label="Amount*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="entry_date"
                      label="Picker in menu"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="entry_date"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="menu = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
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
            Category
          </th>
          <th class="text-left">
            Amount
          </th>
          <th class="text-left">
            Entry Date
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
          v-for="item in expenses"
          :key="item.id"
        >
          <td>{{ item.category.name }}</td>
          <td>$ {{ item.amount }}</td>
          <td>{{ item.entry_date | moment("MMMM Do YYYY")}}</td>
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
      ...mapGetters(['user','expenses','categories'])
    },
    data () {
        
      return {
        category: '',
        amount: '',
        entry_date: '',
        dialog: false,
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        modal: false,
        menu2: false,
      }
    },
    async created(){
        const response = await axios.get('expenses');
        this.$store.dispatch('expenses', response.data)

        const response_categories = await axios.get('expense_categories');
        this.$store.dispatch('categories', response_categories.data)

    },
    methods:{
        async handleSubmit(){
        await axios.post('expenses',{
                category: this.category,
                amount: this.amount,
                entry_date: this.entry_date
                
            }).then(
                this.$router.push('/expenses')
            )
                
        },
        deleteItem(id){
          axios.delete('expenses/'+id).then(this.$router.push('/expenses'))
        }
    }
  }
</script>

<style>

</style>