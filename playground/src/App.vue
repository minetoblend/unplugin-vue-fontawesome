<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>

<template>
  <div>
    <!-- regular icon name -->
    <FontAwesomeIcon icon="coffee" />

    <!-- icon with collection as array -->
    <FontAwesomeIcon :icon="['fab', 'apple']" />

    <!-- icon with collection as string -->
    <FontAwesomeIcon icon="fa-user" />
  </div>
</template>