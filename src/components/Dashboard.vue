<template>
  <h3>Dashboard</h3>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'Dashboard',
    computed:{
      ...mapGetters(['user'])
    }
}
</script>

<style>

</style>