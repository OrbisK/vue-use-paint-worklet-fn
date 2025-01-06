<script setup lang="ts">
import { Toggle, useToggle } from '@orbisk/vue-use-paint-worklet'

const [toggleable, toggle] = useToggle()
</script>

<template>
  <div>
    as component:
    <Toggle />
    plain:
    <button @click="toggle">
      Toggle: {{ toggleable }}
    </button>
  </div>
</template>
