<script setup>
const test = useTemplateRef('test')

const { name, repaint } = usePaintWorkletElement(test, (ctx, geo, props) => {
  const { width, height } = geo
  const toggle = props.get('--toggle')?.toString()
  ctx.fillStyle = toggle === '1' ? 'red' : 'blue'
  ctx.fillRect(0, 0, width, height)
  ctx.fillStyle = 'black'
})
function t() {
  repaint()
}
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <div ref="test" style="width: 300px" @click="() => t()">
      lol
    </div>
    <span>{{ name }}</span>
  </div>
</template>
