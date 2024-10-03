<template>
  <v-app>
    <AlertListComponent :alerts="alerts" />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import AlertListComponent from "@/components/alertListComponent.vue";
export default {
  name: 'App',
  components: {
    AlertListComponent
  },
  computed: {
    alerts() {
      return this.$store.getters["alert/alerts"];
    },
  }
};
</script>
