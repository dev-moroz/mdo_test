<template>
  <tableComponent
      style="margin-top: 10px"
      :tableData="getDataFormService"
      :homeData="getHomes"
  />
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
      return this.$store.getters['request/getRequests']
    },
    getHomes(){
      return this.$store.getters['request/getHomes']
    }
  },
  methods: {
    setData(){
      this.$store.dispatch('request/setRequests');
    },
    setHomes(){
      this.$store.dispatch('request/setHomes');
    },
    loadData(){
      this.setData()
      this.setHomes()
    }
  },
  created(){
    this.loadData()
  }
}
</script>

<style scoped>

</style>