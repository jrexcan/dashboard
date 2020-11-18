<template>
    
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md3>
            <v-card>
                <v-card-title>Login</v-card-title>
                <v-divider></v-divider>
                <v-form v-model="valid" @submit.prevent="handleSubmit">

                    <v-card-text>
                    <v-text-field 
                        label="Email" 
                        v-model="email"
                        required></v-text-field>
                        <v-text-field 
                        type='password' 
                        label="Password"
                        v-model="password"
                        required
                        ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="info" title>Register</v-btn>
                        <v-btn color="primary" type="submit" title >Login</v-btn>
                    </v-card-actions>

                </v-form>
                
            </v-card>
        </v-flex>
        
    </v-layout>
</template>

<script>
import axios from 'axios'
export default {
    name:'Login',
    data: () => ({
      valid: false,
      email: '',
      password:''
    }),
    methods:{
        // dashboard(){
        //     this.$router.push('/dashboard')
        // },

        async handleSubmit(){
            const response = await axios.post('login',{
                email:this.email,
                password:this.password
            })

            localStorage.setItem('token',response.data.access_token)
            this.$store.dispatch('user',response.data.user)
            // console.log(response.data.user)
            this.$router.push('/dashboard')
        }
    }
}
</script>

<style>

</style>