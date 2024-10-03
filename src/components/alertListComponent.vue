<template>
  <TransitionGroup name="alert-list" class="alerts" tag="div">
    <AlertMessage
        v-for="alert in alerts"
        :key="alert.id"
        :alert="alert"
    />
  </TransitionGroup>
</template>

<script>
import AlertMessage from "./utils/alertMessage.vue";

export default {
  name: "alertListComponent",
  components: {
    AlertMessage
  },
  props: {
    alerts: Array
  }
}
</script>

<style scoped lang="scss">
.alert-list {
  &-enter-active,
  &-leave-active {
    opacity: 0;
    transform: scale(0);
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
}

.alerts {
  z-index: 1000;
  width: 30%;
  position: fixed;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
