<script setup lang="ts">
import { useToggle } from '@orbisk/vue-use-paint-worklet'

const [value, toggle] = useToggle()
</script>

<template>
  <div>
    <button @click="toggle">
      Toggle: {{ value }}
    </button>
  </div>
</template>
