<script>
  export default {
    name: "Notification",

    props: ['notify', 'notificationType', 'notificationMessage']
  }
</script>

<template>
  <div v-if="notify" class="callout {{notificationType}}">
    <p>
      {{notificationMessage}}
    </p>
  </div>
</template>

<style lang="sass">
  // Imports
  @import "../variables.scss";

  // Styles
</style>
