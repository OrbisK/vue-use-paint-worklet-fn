<script setup>
import { useToggle } from '@orbisk/vue-use-paint-worklet'

const [toggleable, toggle] = useToggle()
</script>

<template>
  <button :style="{ background: toggleable ? 'green' : 'red' }" @click="toggle">
    Toggle: {{ toggleable }}
  </button>
</template>
