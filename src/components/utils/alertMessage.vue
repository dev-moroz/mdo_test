<template>
  <div class="alert">
    <v-alert transition="scale-transition" prominent :type="alert.type">
      <v-row align="center">
        <v-col class="grow">
          {{ alert.message }}
        </v-col>
        <v-col class="shrink">
          <!-- иконка -->
          <v-btn @click="$store.dispatch('alert/clear', alert.id)">Закрыть</v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </div>
</template>

<script>
export default {
  name: "AlertMessage",
  props: {
    alert: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dismissTimeout: null
    }
  },
  created () {
    this.alert.message
        ? this.dismissTimeout = setTimeout(() => {
          this.$store.dispatch('alert/clear', this.alert.id)
        }, 5000)
        : clearTimeout(this.dismissTimeout);
  },
  beforeDestroy () {
    clearTimeout(this.dismissTimeout);
  }
};
</script>

<style lang="scss">
.alert {
  transition: all .3s ease;
  width: 100%;
}
</style>
