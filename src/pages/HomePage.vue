<template>
  <div>
    <button @click="lol">click</button>
    <button @click="create">createRequest</button>
    <tableComponent
      :tableData="getDataFormService"
    />
  </div>
</template>

<script>
import tableComponent from "@/components/tableComponent.vue";
export default {
  name: 'HomePage',
  components: {
    tableComponent
  },
  computed: {
    env() {
      return process.env.BASE_URL
    },
    getDataFormService(){
      return this.$store.getters.getRequests
    }
  },
  methods: {
    setData(){
      this.$store.dispatch('setRequests');
    },
    lol(){
      this.$store.dispatch('setFilteredRequests');
    },
    create(){
      this.$store.dispatch('createRequest');
    },
  },
  created(){
    this.setData()
  }
}
</script>

<style scoped>

</style>