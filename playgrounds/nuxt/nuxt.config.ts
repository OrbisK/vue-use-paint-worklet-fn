import { resolve } from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-expect-error dont know
export default defineNuxtConfig({
  features: {
    devLogs: false,
  },
  alias: {
    '@orbisk/vue-use-paint-worklet': resolve(__dirname, '../../src/index.ts'),
    '@orbisk/vue-use-paint-worklet/nuxt': resolve(__dirname, '../../src/nuxt/src/module.ts'),
  },
  modules: [
    '@orbisk/vue-use-paint-worklet/nuxt',
  ],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  typescript: {
    includeWorkspace: true,
  },
})
